window.app_saku3_transaksi_ypt_btp_fAkruPiuProyekBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_btp_fAkruPiuProyekBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_btp_fAkruPiuProyekBill";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tagihan Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Akru Bill","List Akru Bill"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,500,80,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Bukti",maxLength:30,readOnly:true});				
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_nokwi = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"No Kuitansi", tag:1, tipeText:ttNilai, text:"0"});		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:1,multiSelection:false,change:[this,"doChange"]});
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"NIK Approve",tag:2,multiSelection:false,change:[this,"doChange"]}); 										
		this.e_jabatan = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Jabatan", maxLength:50});				

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,15,996,282], childPage:["Data Proyek","Detail Billing","Rekening","File Dokumen"]});						
		this.cb_proyek = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"ID Proyek",tag:1,readOnly:true,multiSelection:false,change:[this,"doChange"]}); 										
		this.cb_cons = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Consumer",tag:1,readOnly:true}); 										
		this.e_umur = new saiLabelEdit(this.pc1.childPage[0],{bound:[690,15,200,20],caption:"Umur Piutang (bln)", maxLength:50, text:"0", tipeText:ttNilai});									
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Customer",tag:1,readOnly:true}); 										
		this.e_ke = new saiLabelEdit(this.pc1.childPage[0],{bound:[690,18,200,20],caption:"Termin Ke-", maxLength:50, readOnly:true, text:"0", tipeText:ttNilai});									
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Uraian Bill", maxLength:150});													
		this.l_tgl12 = new portalui_label(this.pc1.childPage[0],{bound:[690,16,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[790,16,100,18],selectDate:[this,"doChange"]}); 				
		this.e_namabill = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Atensi Bill", maxLength:50});				
		this.l_tgl13 = new portalui_label(this.pc1.childPage[0],{bound:[690,17,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[790,17,100,18]}); 				
		this.cb_akunpiu = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Akun Piutang",tag:0,readOnly:true}); 						
		this.cb_akunpdpt = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Akun Pendpt",tag:0,readOnly:true}); 						
		this.cb_drk = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"DRK",tag:0,readOnly:true}); 								
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Saldo Proyek", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai Tagihan", tag:1, tipeText:ttNilai, text:"0", readOnly:true, change:[this,"doChange"]});
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]}); 
		this.i_ppn = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,17,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});				
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[270,17,200,20],caption:"Total Tagihan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
					colTitle:["Judul Kegiatan","Satuan","Jumlah Satuan","Harga Satuan","Total"],
					colWidth:[[4,3,2,1,0],[100,100,100,100,400]],
					columnReadOnly:[true,[4],[0,1,2,3]],
					buttonStyle:[[1],[bsAuto]], 
					picklist:[[1],[new portalui_arrayMap({items:["Paket","Peserta","Hari"]})]],checkItem: true,
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],					
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],					
					defaultRow:1,autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});	

		this.cb_rek = new saiCBBL(this.pc1.childPage[2],{bound:[20,17,220,20],caption:"Rekening", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_bank = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"Bank/Cabang", maxLength:50});		
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[2],{bound:[225,15,245,20],caption:"", maxLength:50,labelWidth:0});		
		this.e_norek = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,450,20],caption:"No Rekening", maxLength:50});		
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,450,20],caption:"Nama Rekening", maxLength:50});		

		this.e_fp = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,300,20],caption:"No Faktur Pajak", maxLength:50, tag:2, text:"-"});									
		this.l_tgl5 = new portalui_label(this.pc1.childPage[3],{bound:[20,18,100,18],caption:"Tgl Faktur Pajak", underline:true});
		this.dp_d5 = new portalui_datePicker(this.pc1.childPage[3],{bound:[120,18,100,18]}); 				
		this.e_file1 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,450,20],caption:"File Faktur Pajak", readOnly:true, tag:9});		
		this.uploader1 = new uploader(this.pc1.childPage[3],{bound:[489,15,80,18],caption:"Upload File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.e_ba = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,13,300,20],caption:"No BAST", maxLength:50, text:"-", tag:2});											
		this.l_tgl4 = new portalui_label(this.pc1.childPage[3],{bound:[20,16,100,18],caption:"Tgl Terima", underline:true});
		this.dp_d4 = new portalui_datePicker(this.pc1.childPage[3],{bound:[120,16,100,18]}); 				
		this.e_file2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,450,20],caption:"File BAST", readOnly:true, tag:9});		
		this.uploader2 = new uploader(this.pc1.childPage[3],{bound:[489,17,80,18],caption:"Upload File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);			
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
						
			this.cb_rek.setSQL("select kode_rek, nama_rek from bill_spro where kode_lokasi='"+this.app._lokasi+"'",["kode_rek","nama_rek"],false,["Kode","Nama"],"and","Data Rekening",true);					
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);  
			this.cb_pp.setText(this.app._kodePP);
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_akunpiu.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_akunpdpt.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);

			this.cb_app.setText(this.app._userLog);

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "HUTPPN") this.akunHutPPN = line.flag;											
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_btp_fAkruPiuProyekBill.extend(window.childForm);
window.app_saku3_transaksi_ypt_btp_fAkruPiuProyekBill.implement({
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) sender.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
	},
	doLoadCBproyek: function() {					
			var strSQL = "select a.kode_proyek,a.nama as keterangan "+
						 "from pr_proyek a 							"+
						 "left join ( 								"+
						
						 "	select kode_project,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai_piu "+
						 "	from piutang_d					"+
						 "	where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' "+
						 "	group by kode_project,kode_lokasi "+						 
						 ")	b "+
						
						 "on a.kode_proyek=b.kode_project and a.kode_lokasi=b.kode_lokasi 			"+
						 "where a.nilai-ISNULL(nilai_piu,0) > 0 and 			"+
						 "a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.progress='1' ";
			
			this.cb_proyek.setSQL(strSQL,["a.kode_proyek","a.keterangan"],false,["No Bukti","Keterangan"],"and","Data Proyek",true);									  
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {						
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																											
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from piutang_d where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from bill_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					sql.add("insert into piutang_d (no_piutang,kode_lokasi,no_dokumen,no_fp,tanggal,kode_pp,akun_piutang,keterangan,kode_project,kode_cust,kode_cons,kode_curr,kurs,nilai,nilai_ppn,nilai_pph,periode,nik_user,tgl_input,modul,dc,umur) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ba.getText()+"','"+this.e_fp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_pp.getText()+"','"+this.cb_akunpiu.getText()+"','"+this.e_ket.getText()+"','"+this.cb_proyek.getText()+"','"+this.cb_cust.getText()+"','"+this.cb_cons.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",0,'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'PIUBILL','D',"+nilaiToFloat(this.e_umur.getText())+")");

					sql.add("insert into bill_m(no_bill,no_dokumen,no_ba,no_faktur,tanggal,keterangan,kode_curr,kurs,nilai,nilai_ppn,kode_cust,no_kontrak,kode_pp,nik_buat,nik_app,jabatan,kode_lokasi,periode,nik_user,tgl_input,bank,cabang,no_rek,nama_rek,draft,nama_bill,kode_rek,no_kuitansi,no_piutang,progress,no_app,modul,tgl_mulai,tgl_selesai, file_fp, file_ba, tgl_ba,tgl_fp) values "+
							"('"+this.e_nb.getText()+"','"+this.e_ke.getText()+"','"+this.e_ba.getText()+"','"+this.e_fp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.cb_cust.getText()+"','"+this.cb_proyek.getText()+"','"+this.cb_pp.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.e_jabatan.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','-','"+this.e_namabill.getText()+"','"+this.cb_rek.getText()+"','"+this.e_nokwi.getText()+"','-','0','-','BILL','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"', '"+this.e_file1.getText()+"', '"+this.e_file2.getText()+"', '"+this.dp_d4.getDateString()+"', '"+this.dp_d5.getDateString()+"')");								 

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																											
								sql.add("insert into bill_d(no_bill,kode_lokasi,nu,item,satuan,harga,jumlah) values "+  
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"',"+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(2,i))+")");
							}
						}						
                    }
                    
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','PR','AKRUPIU','F','-','-','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_proyek.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_ppn.getText())+",0,'"+this.cb_app.getText()+"','-','-','-','-','-','-','-','-')");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akunpiu.getText()+"','D',"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','PR','PIUTANG','IDR',1,'"+this.cb_pp.getText()+"','-','"+this.cb_cust.getText()+"','-','-','-','-','-','-')");
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_akunpdpt.getText()+"','C',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.e_ket.getText()+"','PR','PDPT','IDR',1,'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','-','-','-','-','-','-','-')");
					
					if (nilaiToFloat(this.e_ppn.getText()) != 0) {
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunHutPPN+"','C',"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.e_ket.getText()+"','PR','HPPN','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");
					}
					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_gar,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+												
							"('"+this.e_nb.getText()+"','AKRUPIU','"+this.app._lokasi+"','"+this.cb_akunpdpt.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',0,"+parseNilai(this.e_nilai.getText())+")"); //C = realisasi

					
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
					setTipeButton(tbAllFalse);
					this.sg3.clear(1);										
				break;
			case "simpan" :					
			case "ubah" :									
				this.preView = "1";
				this.sg2.validasi();
				 if (nilaiToFloat(this.e_saldo.getText()) < nilaiToFloat(this.e_nilai.getText()) ){
					system.alert(this,"Transaksi tidak valid.","Total Akru tidak boleh melebihi Saldo.");
					return false;
				}		
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.standarLib.doCekPeriode(this.dbLib,"PR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (PR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else 
				this.simpan();
				
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :					
				this.preView = "0";		
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.standarLib.doCekPeriode(this.dbLib,"PR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (PR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																											
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from piutang_d where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from bill_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				}
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			this.cb_drk.setSQL("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
			if (this.stsSimpan == 1) {
				this.doClick();				
			}
		}
		catch (e) {
			alert(e);
		}			
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.sg3.clear(1);			
				this.e_nilai.setText("0");	
				this.e_ppn.setText("0");					
				this.e_total.setText("0");	
			}				
			this.stsSimpan = 1; 
			
			if (this.e_periode.getText()!="") {
				this.stsSimpan = 1;			
				var AddFormat = "/"+"TPCC-P/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(2,2);			
				
				var data = this.dbLib.getDataProvider("select isnull(max(no_piutang),0) as no_bill from piutang_d where no_piutang like '___"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.no_bill == "0") this.e_nb.setText("001"+AddFormat);
						else {
							var idx = parseFloat(line.no_bill.substr(0,4)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;
							this.e_nb.setText(nu+AddFormat);						
						}
					} 
				}
				this.e_nokwi.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"bill_m","no_kuitansi","A"+this.e_periode.getText().substr(2,2),"000"));
				this.cb_proyek.setFocus();		
				setTipeButton(tbSimpan);					
			}
			
			
			this.cb_pp.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doPPN:function(sender){	
		if (this.e_nilai.getText() != "") {				
			var nilaiPPN = Math.round(nilaiToFloat(this.e_nilai.getText()) * 10/100);
			this.e_ppn.setText(floatToNilai(nilaiPPN));				
		}			
	},
	doChange:function(sender){		
		if (sender == this.cb_pp && this.cb_pp.getText() != "" && this.stsSimpan==1) this.doLoadCBproyek();

		if (sender == this.cb_app && this.cb_app.getText() != "") {
			var strSQL = "select jabatan from karyawan where nik='"+this.cb_app.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){												
					this.e_jabatan.setText(line.jabatan);					
				}				
			}
		}

		if (sender == this.cb_proyek && this.cb_proyek.getText()!="" && this.stsSimpan==1) {
			this.e_ket.setText(this.cb_proyek.rightLabelCaption);
			
			var strSQL = "select d.akun_piutang,b.akun_pdpt,a.nilai-isnull(c.nilai_piu,0) as sisa_akru,a.kode_cust,a.kode_cons,a.kode_drkp,dd.nama as cons,d.nama as cust, a.tgl_mulai,a.tgl_selesai "+
						 "from pr_proyek a "+
						 "inner join pr_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						 "inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
						 "inner join consumer dd on a.kode_cons=dd.kode_cons and a.kode_lokasi=dd.kode_lokasi "+

						 "left join ( "+						 		
						 "		select kode_project,kode_lokasi,isnull(sum(case dc when 'D' then nilai else -nilai end),0) as nilai_piu "+
						 "		from piutang_d "+
						 "		where kode_project='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "		group by kode_project,kode_lokasi "+										 				 		
				 		 "	) c "+

						 "		on  a.kode_proyek=c.kode_project and a.kode_lokasi=c.kode_lokasi "+
						 
					     "where a.kode_proyek='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='1'";		
					     		   			 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.cb_cons.setText(line.kode_cons,line.cons);
					this.cb_cust.setText(line.kode_cust,line.cust);
					this.e_namabill.setText(line.cust);
					this.cb_akunpiu.setText(line.akun_piutang);
					this.cb_akunpdpt.setText(line.akun_pdpt);	
					this.cb_drk.setText(line.kode_drkp);	
					this.e_saldo.setText(floatToNilai(line.sisa_akru));	
					
					this.dp_d2.setText(line.tgl_mulai);
					this.dp_d3.setText(line.tgl_selesai);
				}
			}

			var data = this.dbLib.getDataProvider("select count(*)+1 as ke from bill_m where no_kontrak='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_ke.setText(floatToNilai(line.ke));
				}
			}

		}	

		if ((sender == this.e_nilai || sender == this.e_ppn) && this.e_nilai.getText() != "" && this.e_ppn.getText() != "") {				
			var total = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText());
			this.e_total.setText(floatToNilai(total));
		}

		if (sender == this.cb_rek && this.cb_rek.getText() != "" && this.stsSimpan==1) {
			var sql="select a.bank,a.cabang,a.no_rek,a.nama_rek "+
					"from bill_spro a "+					
					"where a.kode_rek='"+this.cb_rek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_bank.setText(line.bank);
				this.e_cabang.setText(line.cabang);
				this.e_norek.setText(line.no_rek);
				this.e_namarek.setText(line.nama_rek);				
			}
		}	

	},	
	doChangeCell2: function(sender, col, row){		
		if (col == 3 || col == 2) {
			if (this.sg2.cells(3,row) != "" && this.sg2.cells(2,row) != "" ) {
			    var tot = Math.round(nilaiToFloat(this.sg2.cells(3,row)) * nilaiToFloat(this.sg2.cells(2,row)));
				this.sg2.cells(4,row,floatToNilai(tot));
			}
			this.sg2.validasi();
		}							
    },
	doNilaiChange2: function(){
		try{			
			var tot = 0;			
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(4,i));										
				}
			}				
			this.e_nilai.setText(floatToNilai(tot));									
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
								// this.nama_report="server_report_saku3_tpcc_proyek_rptPiutangJurnal";
								this.nama_report="server_report_saku3_tpcc_bill_rptBillGabung";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";							
								var filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";							
								this.filter2 = this.e_periode.getText()+"|"+filter2;
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);						
			setTipeButton(tbAllFalse);
			this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																									
		var strSQL = "select a.no_piutang,convert(varchar,c.tanggal,103) as tgl,c.keterangan,a.nilai+a.nilai_ppn as total "+
		             "from piutang_d a "+
					 " inner join trans_m c on a.no_piutang=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+
					 " left join ("+
					 "         select distinct no_piutang from piutang_bayar where kode_lokasi='"+this.app._lokasi+"' "+
					 ") b on a.no_piutang=b.no_piutang "+
		             "where b.no_piutang is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and c.posted='F' ";	
					 
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
			this.sg3.appendData([line.no_piutang,line.tgl,line.keterangan,floatToNilai(line.total)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;					
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				this.cb_proyek.setSQL("select a.kode_proyek, a.nama "+
									  "from pr_proyek a inner join piutang_d b on a.kode_proyek =b.kode_project and a.kode_lokasi=b.kode_lokasi "+
									  "where b.no_piutang='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.progress='1'",["a.kode_proyek","a.nama"],false,["Kode","Nama"],"and","Data Proyek",true);
									  
				var strSQL = "select * from trans_m a where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.cb_proyek.setText(line.no_dokumen);
						this.cb_pp.setText(line.kode_pp);						
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik1);						
					}
				}																

				var strSQL = "select d.umur, e.no_dokumen as ke, e.bank,e.cabang,e.no_rek,e.nama_rek,e.kode_rek,e.no_ba,e.no_faktur, e.file_fp,e.file_ba,e.tgl_ba,e.tgl_fp ,e.jabatan,e.no_kuitansi,e.nama_bill, b.akun_piutang,b.akun_pdpt,a.nilai-isnull(c.nilai_piu,0) as sisa_akru,d.nilai, d.nilai_ppn,a.kode_cust,d.kode_cons, a.kode_drkp "+
							 "from pr_proyek a "+							 
							 "inner join pr_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "inner join piutang_d d on a.kode_proyek=d.kode_project and a.kode_lokasi=d.kode_lokasi "+
							 "inner join bill_m e on d.no_piutang=e.no_bill and d.kode_lokasi=e.kode_lokasi "+
							 
							 "left join ( "+						 		
									"select no_piutang,kode_lokasi,isnull(sum(case dc when 'D' then nilai else -nilai end),0) as nilai_piu "+
									"from piutang_d "+
									"where no_piutang <> '"+this.e_nb.getText()+"' and kode_project='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									"group by no_piutang,kode_lokasi "+						 											
							 "		) c "+
							 "		on  a.kode_proyek=c.no_piutang and a.kode_lokasi=c.kode_lokasi "+
							
							 "where d.no_piutang='"+this.e_nb.getText()+"' and d.kode_lokasi='"+this.app._lokasi+"' and a.progress='1'";		
												
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.cb_cust.setText(line.kode_cust);
						this.cb_cons.setText(line.kode_cons);
						this.cb_drk.setText(line.kode_drkp);
						this.cb_akunpiu.setText(line.akun_piutang);
						this.cb_akunpdpt.setText(line.akun_pdpt);	
						this.e_saldo.setText(floatToNilai(line.sisa_akru));		
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));	
						this.e_umur.setText(floatToNilai(line.umur));
						
						this.e_nokwi.setText(line.no_kuitansi);
						this.e_ba.setText(line.no_ba);
						this.e_fp.setText(line.no_faktur);
						this.e_jabatan.setText(line.jabatan);
						this.e_namabill.setText(line.nama_bill);

						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);																										
						this.cb_rek.setText(line.kode_rek);		
						
						this.dp_d2.setText(line.tgl_mulai);
						this.dp_d3.setText(line.tgl_selesai);

						this.e_ke.setText(line.ke);

						this.e_file1.setText(line.file_fp);
						this.e_file2.setText(line.file_ba);
						this.dp_d4.setText(line.tgl_ba);
						this.dp_d5.setText(line.tgl_fp);
					}
				}

				var strSQL = "select a.nu,a.item,a.satuan,a.harga,a.jumlah,a.harga*a.jumlah as total "+
							 "from bill_d a "+
							 "where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by nu";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.item,line.satuan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
					}
				} else this.sg2.clear(1);			
                this.sg2.validasi();
														
			}									
		} catch(e) {alert(e);}
	}
});