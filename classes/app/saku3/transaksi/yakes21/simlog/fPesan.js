window.app_saku3_transaksi_yakes21_simlog_fPesan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_simlog_fPesan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_simlog_fPesan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Justifikasi Kebutuhan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,435], childPage:["Data Justifikasi","List Justifikasi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["No Request","Tanggal","Jenis","Kegiatan","Nilai","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,100,300,100,80,100]],
					colFormat:[[4,5],[cfNilai,cfButton]],readOnly:true,					
					click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,22,202,20],caption:"Jenis",items:["CAPEX","OPEX"], readOnly:true,tag:2, change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Request",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,355], childPage:["Anggaran","Justifikasi","Item Barang","File Dok"]});			
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"PP / Unit", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});				
		this.cb_akun = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Akun Anggaran", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});						
		this.cb_drk = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});				
		this.e_gar = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Sisa Anggaran", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai Kebutuhan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_lokproses = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Lokasi Proses", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]}); 
		this.cb_pplog = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"PP Pelaksana", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});				
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Diperiksa Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_sah = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Disahkan Oleh", multiSelection:false, maxLength:10, tag:2});				

		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,750,20],caption:"Nama Kegiatan", maxLength:200});		
		this.e_waktu = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,750,20],caption:"Waktu Penggunaan", maxLength:200});				
		this.e_maksud = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,750,20],caption:"Maksud/Tujuan", maxLength:200});		
		this.e_spek = new saiMemo(this.pc1.childPage[1],{bound:[20,11,750,60],caption:"Spesfks. Kebutuhan"});						
		this.e_latar = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,750,20],caption:"Latar Belakang", maxLength:200});		
		this.e_aspek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,750,20],caption:"Aspek Strategis", maxLength:200});		
		this.e_penutup = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,750,20],caption:"Penutup", maxLength:200});		

		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,
					colTitle:["Item Barang","Spesifikasi","Jumlah","Harga","Total"],
					colWidth:[[4,3,2,1,0],[100,100,80,400,250]],															
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[4],[0,1,2,3]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					pasteEnable:true, afterPaste:[this,"doAfterPaste"], 
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		

		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClickDok"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[3],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});
					
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
					
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
			
			this.minCapex = 0;
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('MINCAPEX') ",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "MINCAPEX") this.minCapex = parseFloat(line.value1);			
				}
			}			
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_bidang='"+this.app._kodeBidang+"' "+
			                   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);			
			this.cb_sah.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);			
			
			this.cb_lokproses.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi in ('"+this.app._lokasi+"','"+this.app._kodeLokasiPusat+"')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Proses",true);					
			
			this.c_jenis.setText("CAPEX");	


			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_simlog_fPesan.extend(window.childForm);
window.app_saku3_transaksi_yakes21_simlog_fPesan.implement({	
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
					"select kode_jenis, nama  from pbh_dok_ver  ", 
					"select count(*) from pbh_dok_ver ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClickDok: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	doAfterPaste: function(sender,totalRow){
		this.doNilaiChange();
	},
	doChangeCell: function(sender, col, row){
		if (col == 2 || col == 3 ) {
			if (this.sg.cells(2,row) != "" && this.sg.cells(3,row) != "") {
				this.sg.cells(4,row,floatToNilai(nilaiToFloat(this.sg.cells(2,row)) * nilaiToFloat(this.sg.cells(3,row))));
				this.sg.validasi();		
			}
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){					
					tot += nilaiToFloat(this.sg.cells(4,i));
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
						sql.add("delete from log_pesan_m where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from log_pesan_d where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','JUSKEB','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',"+nilaiToFloat(this.e_gar.getText())+","+nilaiToFloat(this.e_total.getText())+")");
					
					sql.add("insert into log_pesan_m(no_pesan,kode_lokasi,tgl_input,nik_user,periode,jenis,tanggal,keterangan,kode_pp,kode_drk,kode_akun,saldo_gar,nilai,nik_buat,nik_app,nik_sah,no_app,no_sah,progress,maksud,aspek,  waktu,spek,latar,penutup,  no_terima,no_spph,lok_proses,kode_pplog,nik_vp,no_vp) values "+
						   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.c_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"',"+nilaiToFloat(this.e_gar.getText())+","+nilaiToFloat(this.e_total.getText())+",'"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.cb_sah.getText()+"', '-','-','0','"+this.e_maksud.getText()+"','"+this.e_aspek.getText()+"','"+this.e_waktu.getText()+"','"+this.e_spek.getText()+"','"+this.e_latar.getText()+"','"+this.e_penutup.getText()+"','-','-','"+this.cb_lokproses.getText()+"','"+this.cb_pplog.getText()+"','-','-')"); 							
					
						if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into log_pesan_d(no_pesan,kode_lokasi,no_urut,item,catatan,jumlah,nilai,harga,no_po,no_ba,kode_dana,jum_po,kode_klpfa,ppn) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+",0,'-','-','-',0,'-',0)");
							}
						}
					}

					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','JUSKEB','"+this.e_nb.getText()+"')");															
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
					this.sg3.clear(1); this.sg.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);					
					this.stsSimpan = 1;
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				
				if ((nilaiToFloat(this.e_total.getText()) < this.minCapex) && this.c_jenis.getText() == "CAPEX") {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak memenuhi syarat CAPEX.");
					return false;						
				}

				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);									
				this.doHitungGar();													
				
				if (nilaiToFloat(this.e_gar.getText()) < nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total melebihi saldo anggaran.");
					return false;						
				}	
							
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
					sql.add("delete from log_pesan_m where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	},
	doClick:function(sender){		
		if (this.stsSimpan == 0) {					
			this.sg3.clear(1); this.sg.clear(1);
			this.e_nilai.setText("0");							
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"log_pesan_m","no_pesan",this.app._lokasi+"-JK"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
			
	},				
	doChange: function(sender){		
		try {				
			if (sender == this.cb_lokproses && this.cb_lokproses.getText()!="") {
				this.cb_pplog.setSQL("select a.kode_pp, a.nama from pp a where a.flag_aktif='1' and a.kode_lokasi='"+this.cb_lokproses.getText()+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data PP",true);
			}
			if (sender == this.c_jenis) {			
				this.cb_akun.setText("","");
				this.e_gar.setText("0");
				if (this.c_jenis.getText() == "CAPEX") 
					this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '038' "+			                        
										"where a.modul='A' and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
				else this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '038' "+
										"where a.modul<>'A' and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			}		

			if (sender == this.cb_pp || sender == this.cb_akun || sender == this.e_periode) {	
				if (this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="") {					
					if (this.e_periode.getText().substr(4,2) == "13") var vPeriode = this.e_periode.getText().substr(0,4) + "12";
					else vPeriode = this.e_periode.getText();
					
					this.cb_drk.setSQL(						
						"select distinct a.kode_drk,a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk "+
						"where b.modul='RELEASE' and a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+vPeriode.substr(0,4)+"%' "+
						"and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"
					,["a.kode_drk","a.nama"],false,["Kode","Nama"],"and","Data DRK",true);
				}
			}	

			if (sender == this.cb_pp || sender == this.cb_drk || sender == this.cb_akun || sender == this.e_periode) {	
				this.e_gar.setText("0");
				this.doHitungGar();
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doHitungGar: function(){				
		if (this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.cb_drk.getText()!="" && this.e_periode.getText()!="") {			
			var data = this.dbLib.getDataProvider("select fn_saldoRilis('"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as saldo ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];									
				this.e_gar.setText(floatToNilai(line.saldo));                   
			}				
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
								this.nama_report="server_report_saku3_logistik_rptPesan";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pesan='"+this.e_nb.getText()+"' ";
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
			this.sg3.clear(1); this.sg.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.c_jenis.setText("CAPEX");			
			setTipeButton(tbSimpan);			
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select no_pesan,convert(varchar,tanggal,103) as tgl,jenis,no_dokumen,keterangan,nilai "+
		             "from log_pesan_m  "+					 					 
					 "where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and progress in ('0','R','S','P')";		
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
			this.sg3.appendData([line.no_pesan,line.tgl,line.jenis,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 5) {
				this.doDoubleClick3(this.sg3,5,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.* from log_pesan_m a where a.no_pesan = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);						
						this.c_jenis.setText(line.jenis);												
						this.cb_pp.setText(line.kode_pp);												
						this.cb_akun.setText(line.kode_akun);												
						this.cb_drk.setText(line.kode_drk);												
						this.cb_app.setText(line.nik_app);												
						this.cb_lokproses.setText(line.lok_proses);		
						this.cb_pplog.setText(line.kode_pplog);																						
						this.cb_app.setText(line.nik_app);
						this.cb_sah.setText(line.nik_sah);
						this.e_total.setText(floatToNilai(line.nilai));						

						this.e_ket.setText(line.keterangan);						
						this.e_waktu.setText(line.waktu);
						this.e_spek.setText(line.spek);						
						this.e_maksud.setText(line.maksud);
						this.e_latar.setText(line.latar);
						this.e_aspek.setText(line.aspek);						
						this.e_penutup.setText(line.penutup);
					}				
				}	

				var strSQL = "select no_urut,item,catatan,jumlah,nilai,jumlah*nilai as total from log_pesan_d where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg.appendData([line2.item,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.nilai),floatToNilai(line2.total)]);
					}
				} else this.sg.clear(1);	

				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(							 
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
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