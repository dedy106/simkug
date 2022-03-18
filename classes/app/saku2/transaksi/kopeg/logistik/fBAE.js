window.app_saku2_transaksi_kopeg_logistik_fBAE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_logistik_fBAE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_logistik_fBAE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form BAST : Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 				
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_akun = new saiCBBL(this,{bound:[20,13,220,20],caption:"Akun Hutang", multiSelection:false, maxLength:10, tag:2});		
		this.cb_vendor = new saiCBBL(this,{bound:[20,14,220,20],caption:"Vendor", readOnly:true});				
		this.e_mtn = new saiLabelEdit(this,{bound:[700,14,220,20],caption:"Maintenance", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_po = new saiCBBL(this,{bound:[20,16,220,20],caption:"No PO", readOnly:true});		
		this.e_nilai = new saiLabelEdit(this,{bound:[700,16,220,20],caption:"Nilai Termin", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_termin = new saiCBBL(this,{bound:[20,15,200,20],caption:"Termin", readOnly:true});				
		this.e_ppn = new saiLabelEdit(this,{bound:[700,15,220,20],caption:"Nilai PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.e_tambah = new saiLabelEdit(this,{bound:[700,16,220,20],caption:"Tambahan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,270], childPage:["Data Item Jurnal","Tambahan","Dokumen Pendukung"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:11,
		            colTitle:["ID","Item Barang","Merk","Tipe","Harga","Jumlah","Total","Jml Terima","Kode Akun","Kode PP","Kode DRK"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,130,140,150,100]],
					colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
					readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,50,100,50,100,250,40,150,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter2"],ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Dokumen","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='LOGAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			this.flagGarFree = "0"; this.flagDokFree = "0";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('LOGUM','LOGMTN','LOGADK','GARFREE','DOKFREE','PPNM') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;	
					if (line.kode_spro == "PPNM") this.akunPPN = line.flag;
					if (line.kode_spro == "LOGADK") this.akunADK = line.flag;
					if (line.kode_spro == "LOGUM") this.akunUM = line.flag;
					if (line.kode_spro == "LOGMTN") this.akunHutMtn = line.flag;
				}
			}			
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);		
						
			this.dataPP = this.app._pp;		
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";							
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_logistik_fBAE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_logistik_fBAE.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from log_ba_m where no_ba='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from log_ba_j where no_ba='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("update log_po_termin set akun_hutang='-',no_ba='-' where no_ba='"+this.e_nb.getText()+"' and no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from log_ba_dok where no_ba ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					if (this.jenisTermin == "FINAL") {
						sql.add("update fa_asset set progress='1' where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update log_pesan_d set no_ba='-' where no_ba='"+this.e_nb.getText()+"' and no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gl_fa_asset where no_fa ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					}
					
					if (this.jenisTermin == "ADK") var akunTemp = this.akunADK;
					else var akunTemp = this.akunUM;
					
					sql.add("insert into log_ba_m(no_ba,kode_lokasi,tgl_input,nik_user,periode,tanggal,no_dokumen,keterangan,nilai,nilai_ppn,kode_vendor,nik_buat,nik_app,no_po,akun_hutang,nilai_tambah,nilai_mtn,nu,akun_adk,modul,kode_pp,posted) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.cb_vendor.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_po.getText()+"','"+this.cb_akun.getText()+"',"+nilaiToFloat(this.e_tambah.getText())+","+nilaiToFloat(this.e_mtn.getText())+",'"+this.cb_termin.getText()+"','"+akunTemp+"','"+this.jenisTermin+"','"+this.app._kodePP+"','F')"); 
					if (nilaiToFloat(this.e_ppn.getText()) != 0) {
						sql.add("insert into log_ba_j(no_ba,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',100,'"+this.akunPPN+"','"+this.e_ket.getText()+"','D','IDR',1,"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGBA','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");													
					}		
					if (this.jenisTermin == "ADK" || this.jenisTermin == "UM") {
						sql.add("insert into log_ba_j(no_ba,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+akunTemp+"','"+this.e_ket.getText()+"','D','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGBA','"+this.jenisTermin+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					}
					else {					
						if (this.jenisTermin == "FINAL") {
							sql.add("update fa_asset set progress='2',no_ba='"+this.e_nb.getText()+"' where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("update log_pesan_d set no_ba='"+this.e_nb.getText()+"' where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							if (this.sg.getRowValidCount() > 0){
								for (var i=0;i < this.sg.getRowCount();i++){
									if (this.sg.rowValid(i) && (nilaiToFloat(this.sg.cells(6,i)) != 0)){								
										sql.add("insert into log_ba_j(no_ba,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
												"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(8,i)+"','"+this.e_ket.getText()+"','D','IDR',1,"+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(9,i)+"','"+this.sg.cells(10,i)+"','"+this.app._lokasi+"','LOGBA','BRG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");																
									}
								}								
							}							
							sql.add("insert into log_ba_j(no_ba,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) "+
									"select '"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,a.akun_adk,'"+this.e_ket.getText()+"','C','IDR',1,a.nilai,a.nilai,'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGBA','REVADKUM','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate() "+
									"from log_ba_m a inner join log_po_termin b on a.no_po=b.no_po and a.kode_lokasi=b.kode_lokasi and a.nu=b.nu and b.jenis in ('ADK','UM') "+
									"where a.no_po='"+this.cb_po.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ");							
													
							sql.add("insert into log_ba_j(no_ba,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',998,'"+this.akunHutMtn+"','"+this.e_ket.getText()+"','C','IDR',1,"+nilaiToFloat(this.e_mtn.getText())+","+nilaiToFloat(this.e_mtn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGBA','HUTMTN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							sql.add("update log_po_termin set akun_hutang='"+this.akunHutMtn+"',no_ba='"+this.e_nb.getText()+"' where no_po='"+this.cb_po.getText()+"' and jenis='MTN' and kode_lokasi='"+this.app._lokasi+"'");						
						
							sql.add("insert into gl_fa_asset (no_fa,kode_lokasi,kode_pp,kode_klpakun,umur,persen,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,progress,tgl_perolehan,periode,tgl_susut,periode_susut,nik_user,tgl_input,kode_akun,kode_pp_susut,nilai_susut,no_ref) "+
							        "select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_pp,kode_klpakun,umur,persen,'"+this.e_ket.getText()+"','IDR',1,sum(nilai),1,kode_drk,'2','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),kode_akun,kode_pp,round(sum(nilai)/umur,0),'"+this.e_nb.getText()+"' "+
									"from fa_asset where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									"group by kode_pp,kode_klpakun,umur,persen,kode_drk,kode_akun") ;
						}
					}
					var nilaiHutSPB = nilaiToFloat(this.e_total.getText());
					sql.add("insert into log_ba_j(no_ba,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C','IDR',1,"+nilaiHutSPB+","+nilaiHutSPB+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGBA','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && (nilaiToFloat(this.sg2.cells(4,i)) != 0)){
								sql.add("insert into log_ba_j(no_ba,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i).toUpperCase()+"','IDR',1,"+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(7,i)+"','"+this.app._lokasi+"','LOGBA','TAMBAH','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");																
							}
						}
					}					
					sql.add("update log_po_termin set akun_hutang='"+this.cb_akun.getText()+"',no_ba='"+this.e_nb.getText()+"' where nu='"+this.cb_termin.getText()+"' and no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
							if (this.sgUpld.rowValid(i)){
								ix++;
								sql.add("insert into log_ba_dok(no_ba,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).filedest+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
							}	
					}
					for (var i in this.listFiles.objList) {
						var ketemu = false;
						for (var j=0;j < this.sgUpld.getRowCount();j++){
							ketemu = i == this.sgUpld.cells(2,j);
							if (ketemu) break;
						}
						if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
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
					this.sg.clear(1); this.sg2.clear(1); this.sgUpld.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				var strSQL = "select termin from log_po_termin "+
				             "where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and ((jenis <> 'MTN' and no_ba<>'-' and nu>"+this.cb_termin.getText()+")  or  (jenis = 'MTN' and no_final<>'-' and nu>"+this.cb_termin.getText()+"))";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						system.alert(this,"Transaksi tidak valid.","PO sudah pernah dilakukan BA untuk termin selanjutnya ("+line.termin+").");
						return false;
					} 
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (this.jenisTermin == "FINAL") {
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && (nilaiToFloat(this.sg.cells(5,i)) != nilaiToFloat(this.sg.cells(7,i)))){
								var j = i+1;
								system.alert(this,"Jumlah diterima baris "+j+" tidak valid.","Jumlah terima tidak sama dengan jumlah PO.");
								return false;
							}
						}
					}				
				}
				if (this.flagDokFree == "1") {				
					var data = this.dbLib.getDataProvider("select no_po from log_ba_m where no_ba<>'"+this.e_nb.getText()+"' and no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_po);
							return false;
						} 
					}
				}										
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
						
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
				var strSQL = "select termin from log_po_termin "+
				             "where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_ba<>'-' and nu>"+this.cb_termin.getText();
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						system.alert(this,"Transaksi tidak valid.","PO sudah pernah dilakukan BA untuk termin selanjutnya ("+line.termin+").");
						return false;
					} 
				}
				this.cb1.setSelected(false);
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from log_ba_m where no_ba='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from log_ba_j where no_ba='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("update log_po_termin set akun_hutang='-',no_ba='-' where no_ba='"+this.e_nb.getText()+"' and no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from log_ba_dok where no_ba ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					if (this.jenisTermin == "FINAL") {
						sql.add("update fa_asset set progress='1' where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update log_pesan_d set no_ba='-' where no_ba='"+this.e_nb.getText()+"' and no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gl_fa_asset where no_fa ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					}					
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
				break								
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
		sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '039' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");
		sql.add("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_periode.getText().substr(0,4)+"' ");
		this.dbLib.getMultiDataProviderA(sql);				
	},	
	doChange:function(sender){		
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.sg.clear(1); this.sg2.clear(1); 
			this.e_nb.setSQL("select a.no_ba, a.keterangan from log_ba_m a "+
			                 "       inner join log_po_termin b on a.no_po=b.no_po and a.nu=b.nu and a.kode_lokasi=b.kode_lokasi and b.no_final = '-' "+
							 "       left join log_po_termin c on a.no_po=c.no_po and a.kode_lokasi=c.kode_lokasi and c.no_final <> '-' "+							 
							 "       left join (select distinct no_fa,kode_lokasi from fasusut_d where kode_lokasi='"+this.app._lokasi+"') d on a.no_ba=d.no_fa and a.kode_lokasi=d.kode_lokasi "+							 
							 "where d.no_fa is null and a.posted ='F' and c.no_ba is null and b.no_spb='-' and a.modul <> 'MTN' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_ba","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);			
		}		
		if (sender == this.e_nb && this.e_nb.getText()!= "") {									
			var strSQL = "select a.tanggal,a.periode,a.keterangan,a.no_dokumen,a.nik_buat,a.nik_app,b.no_po,c.keterangan as ket_po,c.kode_vendor,d.nama as nama_vendor,b.nu,b.termin,b.nilai,b.nilai_ppn,b.nilai+b.nilai_ppn as total,b.akun_hutang,b.jenis "+
						 "from log_ba_m a inner join log_po_termin b on a.no_ba=b.no_ba and a.nu=b.nu and a.no_po=b.no_po and a.kode_lokasi=b.kode_lokasi "+
						 "                inner join log_po_m c on a.no_po=c.no_po and a.kode_lokasi=c.kode_lokasi "+
						 "                inner join vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
						 "where a.no_ba='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);					
					this.e_dok.setText(line.no_dokumen);					
					this.e_ket.setText(line.keterangan);					
					this.cb_akun.setText(line.akun_hutang);
					this.cb_vendor.setText(line.kode_vendor,line.nama_vendor);
					this.cb_po.setText(line.no_po,line.ket_po);
					this.cb_termin.setText(line.nu,line.termin);
					this.cb_buat.setText(line.nik_buat);
					this.cb_app.setText(line.nik_app);					
					
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.e_ppn.setText(floatToNilai(line.nilai_ppn));
					this.e_total.setText(floatToNilai(line.total));										
					this.jenisTermin = line.jenis;
					
					if (this.jenisTermin == "FINAL") {						
						var data = this.dbLib.getDataProvider("select isnull(nilai,0) as nilai from log_po_termin where no_po='"+this.cb_po.getText()+"' and jenis='MTN' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){									
								this.e_mtn.setText(floatToNilai(line.nilai));
							} 
						}				
					}
				} 			
				var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							 "from log_ba_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "			      inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
							 "where a.jenis = 'TAMBAH' and a.no_ba='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg2.appendData([line2.kode_akun,line2.nama_akun,line2.dc,line2.keterangan,floatToNilai(line2.nilai),line2.kode_pp,line2.nama_pp,line2.kode_drk,line2.nama_drk]);
					}
				} else this.sg2.clear(1);	
				
				var strSQL = "select a.no_pesan+'-'+cast(a.no_urut as varchar) as id,a.item,a.merk,a.tipe,a.harga,a.jum_po as jumlah,a.harga*a.jum_po as total,isnull(d.jml_terima,0) jml_terima,b.kode_akun,b.kode_pp,b.kode_drk "+
							 "from log_pesan_d a inner join log_pesan_m b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi "+						 
							 "                   left join (select id_pesan,no_po,kode_lokasi,count(no_fa) as jml_terima from fa_asset where kode_lokasi='"+this.app._lokasi+"' and no_po='"+this.cb_po.getText()+"' group by id_pesan,no_po,kode_lokasi) d on d.id_pesan=a.no_pesan+'-'+cast(a.no_urut as varchar) and d.no_po=a.no_po and a.kode_lokasi=d.kode_lokasi "+
							 "where a.no_po='"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.item";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg.appendData([line2.id,line2.item,line2.merk,line2.tipe,floatToNilai(line2.harga),floatToNilai(line2.jumlah),floatToNilai(line2.total),floatToNilai(line2.jml_terima),line2.kode_akun,line2.kode_pp,line2.kode_drk]);
					}
				} else this.sg.clear(1);															
				
				this.sgUpld.clear();
				this.deleteFiles = [];
				this.listFiles = new arrayMap();			
				var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from log_ba_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						   "where a.no_ba = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgUpld.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.listFiles.set(line.no_gambar,line.no_gambar); 
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
					}
				} else this.sgUpld.clear(1);						
			}						
		}		
	},		
	doChangeCell2: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg2.cells(2,row) != "" && this.sg2.cells(4,row) != "") {
				this.sg2.validasi();			
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
		sender.onChange.set(this,"doChangeCell2");			
	},	
	doNilaiChange2: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){										
					if (this.sg2.cells(2,i).toUpperCase() == "C") tot -= nilaiToFloat(this.sg2.cells(4,i));
					else tot += nilaiToFloat(this.sg2.cells(4,i));									
				}
			}						
			this.e_tambah.setText(floatToNilai(tot));			
			this.e_total.setText(floatToNilai(Math.round(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText()) + nilaiToFloat(this.e_tambah.getText()))));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '039' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '039' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
												  "select kode_drk, nama  from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"'",
												  "select count(kode_drk) from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"'",
												  ["kode_drk","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doCellEnter2: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg2.cells(2,row) == ""){
						this.sg2.setCell(2,row,"C");						
					}
				break;						
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kopeg_logistik_rptBa";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ba='"+this.e_nb.getText()+"' ";
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
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						}else system.info(this,result,"");
	    			break;		
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){							
							this.dataAkun = new portalui_arrayMap();
							this.dataDRK = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
								}
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
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
			this.sg.clear(1); this.sg2.clear(1); this.sgUpld.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
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
                this.sgUpld.cells(2,row, data.filedest);
                
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});

