window.app_saku3_transaksi_bangtel_barang_fPbSpk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_barang_fPbSpk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_barang_fPbSpk";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Permintaan Bayar PO/SPK", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Permohonan","List Permohonan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9,
		            colTitle:["No Bukti","Tanggal","Modul","No Dokumen","Deskripsi","Progress","Nilai","Catatan"],
					colWidth:[[7,6,5,4,3,2,1,0],[200,100,60,350,180,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});						
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});						
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[770,13,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[870,13,100,18]}); 		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_totalDC = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,200,20],caption:"Tot Nilai PB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,328], childPage:["Data PO/SPK","Detail Barang","Jurnal Tambahan/Pajak","Catatan","File Dok"]});
		this.cb_po = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"SPK/ PO", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.cb_vendor = new saiCBBL(this.pc1.childPage[0], { bound: [20, 14, 220, 20], caption: "Vendor",  readOnly:true, tag: 1});
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 15, 300, 20], caption: "Bank", readOnly:true });
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 16, 300, 20], caption: "Cabang", readOnly:true });
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 17, 300, 20], caption: "No Rekening", readOnly:true });
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 18, 300, 20], caption: "Nama Rekening", readOnly:true });
		this.e_nilaipo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Nilai SPK", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_hutang = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Sisa Hutang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Ni Pelunasan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.cb_tahu = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});						
						
		this.sg = new saiGrid(this.pc1.childPage[1], {
				bound: [1, 5, this.pc1.width - 5, this.pc1.height - 35], colCount: 8,
				colTitle: ["ID Barang", "Nama Barang", "Satuan","Harga","Qty SPK", "Jml Terima","SubTotal","Idx"],
				colWidth: [[ 7, 6, 5, 4, 3, 2, 1, 0], [50, 100, 100, 100, 100, 80, 300, 100]],
				colFormat: [[3,4,5,6], [cfNilai, cfNilai, cfNilai, cfNilai]],
				readOnly:true,				
				autoAppend: false, defaultRow: 1
		});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg });
	
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
		this.e_memo = new saiMemo(this.pc1.childPage[3],{bound:[20,10,450,60],caption:"Catatan",tag:9});	
		
		this.sgUpld = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[4],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
			colTitle:["namaFile","status"],
			colWidth:[[1,0],[80,180]],
			readOnly: true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
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
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.flagGarFree = "0"; this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('PBBMHD','GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
					if (line.kode_spro == "PBBMHD") this.akunBMHD = line.flag;																		
				}
			}						
			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '051' "+					
			        "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
			this.cb_app.setSQL("select distinct a.nik, a.nama from karyawan a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_tahu.setSQL("select distinct a.nik, a.nama from karyawan a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"'  where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
		
			this.totTambah = 0;
			this.e_memo.setReadOnly(true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_barang_fPbSpk.extend(window.childForm);
window.app_saku3_transaksi_bangtel_barang_fPbSpk.implement({	
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
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
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {			
						sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_pb_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_pb_dok where no_pb ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																												
						sql.add("delete from spm_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}								
					
					//tidak perlu di jurnal akru(cashbasis saja), krn transaksi penerimaan sebelumnya sudah di akru ke hutang
					sql.add("insert into yk_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_tahu,no_hutang,no_app,no_spb,no_ver,kode_bidang,kode_loktuj,nilai_final,posted,kode_proyek,no_app2,no_app3,no_fiat,no_kas,akun_hutang) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_totalDC.getText())+",'PBLOG','0','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.cb_tahu.getText()+"','"+this.cb_po.getText()+"','-','-','-','"+this.app._kodePP+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_totalDC.getText())+",'X','-','-','-','-','-','"+this.akunBMHD+"')");
					
					sql.add("insert into yk_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunBMHD+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBLOG','HUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								sql.add("insert into yk_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(5,i)+"','-','"+this.app._lokasi+"','PBLOG','TAMBAH','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
							}
						}
					}	
					
					sql.add("insert into yk_pb_d(no_pb,kode_lokasi,kode_lokvendor,kode_vendor,bank,cabang,no_rek,nama_rek,nilai,pajak,keterangan) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.cb_vendor.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"',"+nilaiToFloat(this.e_totalDC.getText())+",0,'"+this.e_ket.getText()+"')");					
					
					//kolom nilai sebagai kontrol jumlah hutang yg dibayar (berasosiasi dgn nilai hutang di PO tanpa akun2 tambahan)
					sql.add("insert into spm_rek(no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,cabang,bruto,pajak,nilai) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','PBLOG','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"',"+nilaiToFloat(this.e_totalDC.getText())+",0,"+nilaiToFloat(this.e_nilai.getText())+")");

					
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}																					
							sql.add("insert into yk_pb_dok(no_pb,no_gambar,nu,kode_jenis,kode_lokasi,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+i+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','"+this.cb_po.getText()+"')");								
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);								
					setTipeButton(tbAllFalse);					
					this.progSeb ="";
				break;
			case "simpan" :															
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);														
				this.preView = "1";												
				this.sg2.validasi();
				for (var i=0;i < this.sg2.getRowCount();i++){					
					if (!this.sg2.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg2.getColCount();j++){
							if (this.sg2.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal Tambahan.");
							return false;
						}
					}										
				}				
				
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Pelunasan tidak boleh nol atau kurang.");
					return false;						
				}														
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_hutang.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Pelunasan tidak boleh melebihi Sisa Hutang.");
					return false;						
				}
				if (nilaiToFloat(this.e_totalDC.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}			
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_pb_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_pb_dok where no_pb ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																												
					sql.add("delete from spm_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) {
			this.doClick();		
			this.cb_po.setSQL("select distinct a.no_spk,a.keterangan "+
							  "from log_spk_m a inner join log_terima_m b on a.no_spk=b.no_po and a.kode_lokasi=b.kode_lokasi "+
							  "					inner join trans_m c on c.no_bukti=b.no_terima and c.kode_lokasi=b.kode_lokasi and c.posted='T' "+
							  "where c.kode_lokasi='"+this.app._lokasi+"' and c.periode<='"+this.e_periode.getText()+"' ",
							  ["a.no_spk","a.keterangan"],false,["No SPK","Deskripsi"],"and","Data SPK/PO",true);			
		}
	},
	doChange:function(sender){
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();					
		
		if (sender == this.cb_po && this.cb_po.getText() != "")  {
			var strSQL = "select b.kode_vendor,b.nama as vendor, b.bank, b.cabang, b.no_rek, b.nama_rek, a.nilai "+
						 "from log_spk_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_spk='"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";													
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){			
					this.cb_vendor.setText(line.kode_vendor,line.vendor);										
					this.e_bank.setText(line.bank);
					this.e_cabang.setText(line.cabang);
					this.e_norek.setText(line.no_rek);
					this.e_namarek.setText(line.nama_rek);
					this.e_nilaipo.setText(floatToNilai(line.nilai));
				}
			}
			
			var strSQL = "select sum(b.nilai1) as sisa_hutang "+
						 "from log_terima_m a inner join trans_m b on a.no_terima=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.posted='T' "+						 
						 "where a.no_po='"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";									 									
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){			
					this.e_hutang.setText(floatToNilai(line.sisa_hutang));
				}
			}

			var strSQL = "select isnull(sum(b.nilai),0) as nilai_pb "+
						 "from yk_pb_m a inner join spm_rek b on a.no_pb=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+						 
						 "where a.no_hutang='"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb<>'"+this.e_nb.getText()+"' ";													
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){			
					var sisa = nilaiToFloat(this.e_hutang.getText()) - parseFloat(line.nilai_pb);
					this.e_hutang.setText(floatToNilai(sisa));
				}
			}

			var strSQL = "select c.kode_barang,c.nama,c.sat_kecil,a.harga,a.jumlah, isnull(d.jml_terima,0) as terima,a.no_urut, isnull(d.jml_terima,0)* a.harga as tot "+
						"from log_spk_d a " +
						"		inner join log_spk_m b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi " +
						"		inner join brg_barang c on a.kode_klpfa=c.kode_barang and a.kode_lokasi=c.kode_lokasi  "+
						
						"     left join (" +
						"			select b.no_po,b.no_po+'-'+a.no_batch as id_pesan,sum(a.jumlah+a.bonus) as jml_terima " +
						"			from brg_trans_d a inner join log_terima_m b on a.no_bukti=b.no_terima and a.kode_lokasi=b.kode_lokasi "+
						"			where a.kode_lokasi='" + this.app._lokasi + "' " +
						"			group by b.no_po,b.no_po+'-'+a.no_batch) d on d.id_pesan=a.no_spk+'-'+cast(a.no_urut as varchar) and d.no_po=a.no_spk " +

						"where a.no_spk='" + this.cb_po.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' " +
						"order by a.no_urut";

			var data = this.dbLib.getDataProvider(strSQL, true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line2;
				this.sg.clear();
				for (var i in data.rs.rows) {
					line2 = data.rs.rows[i];
					this.sg.appendData([line2.kode_barang, line2.nama, line2.sat_kecil, floatToNilai(line2.harga), floatToNilai(line2.jumlah), floatToNilai(line2.terima),floatToNilai(line2.tot),line2.no_urut]);
				}
			} else this.sg.clear(1);
		}
		
		if (sender == this.e_nilai && this.e_nilai.getText() != "") this.doNilaiChange();

	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {			
					this.progSeb = "0";
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);					
				}
				this.noAppLama = "-";
				this.noVerLama = "-";
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_pb_m","no_pb",this.app._lokasi+"-PBL"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}
	},	
	doNilaiChange: function(){		
		try{
			var totDC = 0;			
			for (var i = 0; i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") {
						totDC += nilaiToFloat(this.sg2.cells(4,i));						
					}
					if (this.sg2.cells(2,i).toUpperCase() == "C") {
						totDC -= nilaiToFloat(this.sg2.cells(4,i));						
					}					
				}
			}
			totDC = totDC + nilaiToFloat(this.e_nilai.getText());
			this.e_totalDC.setText(floatToNilai(totDC));
			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},			
	doChangeCell2: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg2.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) {
					sender.cells(1,row,akun);
					var data = this.dbLib.getDataProvider("select normal from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							sender.cells(2,row,line.normal);
						}
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
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
		sender.onChange.set(this,"doChangeCell2");		
	},	
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '051' "+							
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '051' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}								
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
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_bangtel_barang_rptPbrForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();	
							this.dataPP = new portalui_arrayMap();	
							
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
									this.dataPP.set(line.kode_pp, line.nama);										
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
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			setTipeButton(tbAllFalse);
			this.progSeb ="";
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																			
		var strSQL = "select a.no_pb,convert(varchar,a.tanggal,103) as tgl,a.modul,a.no_dokumen,a.keterangan,a.progress,a.nilai, "+
					 "case when a.progress = 'S' then isnull(b.catatan,'-') "+
					 "     when a.progress = 'V' then isnull(c.catatan,'-') "+
					 "     when a.progress = 'K' then isnull(d.catatan,'-') "+
					 "     when a.progress = 'D' then isnull(e.catatan,'-') "+
					 "     when a.progress = 'F' then isnull(f.catatan,'-') "+
					 "end as catatan "+
					 "from yk_pb_m a "+		
					 "				  inner join karyawan_pp x on a.kode_pp=x.kode_pp and a.kode_lokasi=x.kode_lokasi and x.nik='"+this.app._userLog+"' "+			 					 				 					 
					 "			      left join spm_app_m b on a.no_pb=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.no_flag='-' and b.form = 'APPSM' "+
					 "			      left join spm_app_m c on a.no_pb=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.no_flag='-' and c.form = 'APPVER' "+
					 "			      left join spm_app_m d on a.no_pb=d.no_bukti and a.kode_lokasi=d.kode_lokasi and d.no_flag='-' and d.form = 'APPFIN' "+
					 "			      left join spm_app_m e on a.no_pb=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.no_flag='-' and e.form = 'APPDIR' "+
					 "			      left join spm_app_m f on a.no_pb=f.no_bukti and a.kode_lokasi=f.kode_lokasi and f.no_flag='-' and f.form = 'APPFIAT' "+
					 "where a.no_kas ='-' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'PBLOG' and a.progress in ('0','S','V','K','D','F') ";
					 
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
			this.sg3.appendData([line.no_pb,line.tgl,line.modul,line.no_dokumen,line.keterangan,line.progress,floatToNilai(line.nilai),line.catatan]); 
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
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select a.keterangan,a.no_dokumen,a.modul,a.due_date,a.tanggal,a.nik_tahu,a.nik_app,a.no_hutang "+
							 "from yk_pb_m a "+								 
							 "where a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						this.cb_app.setText(line.nik_app);
						this.cb_tahu.setText(line.nik_tahu);											
						this.cb_po.setText(line.no_hutang);											
					}
				}		
				
				var strSQL = "select sum(b.nilai) as nilai_hutang "+
							"from yk_pb_m a inner join spm_rek b on a.no_pb=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+						 
							"where a.no_hutang='"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";													
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){									
						this.e_nilai.setText(floatToNilai(line.nilai_hutang));
					}
				}
				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							"from yk_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																				
							"where a.jenis='TAMBAH' and a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg2.clear(1);	

				this.sgUpld.clear(); this.sgFile.clear();											
				var data = this.dbLib.getDataProvider(
						   "select b.kode_jenis,b.nama,a.no_gambar from yk_pb_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						   "where a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgUpld.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);
					}
				} else this.sgUpld.clear(1);
															
			}									
		} catch(e) {alert(e);}
	}	
});