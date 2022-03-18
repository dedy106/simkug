window.app_saku3_transaksi_yakes21_inves_fObliJual = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fObliJual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fObliJual";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjualan Obligasi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Penjualan","List Penjualan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,350,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});				
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"],readOnly:true});		
		this.cb_kelola = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Pengelola", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_tipe = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Tipe Transaksi",readOnly:true});
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Settlement", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate2"]}); 				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Settlement Amount",text:"0",tag:2, tipeText:ttNilai, readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,996,282], childPage:["Daftar Seri","Data Seri","File Dok"]});					
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
					colTitle:["No Seri","ISIN","Nama Seri","Tgl Settlmt","No Pembelian","Nominal","Tipe","Pilih"],
					colWidth:[[7,6,5,4,3,2,1,0],[70,80,100,100,80,300,100,100]],
					colFormat:[[5,7],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick4"], colAlign:[[7],[alCenter]],
					dblClick:[this,"doDoubleClick4"],autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.cb_broker = new saiCBBL(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Broker", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});									
		this.cb_seri = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Security ID", readOnly:true, tag:1,change:[this,"doChange"]});					
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Security Name", readOnly:true});				
		this.e_obligor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Emiten", readOnly:true});				
		this.e_tgl1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Issue Date", readOnly:true});				
		this.e_tgl2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,13,200,20],caption:"Maturity Date", readOnly:true});			
		this.l_tgl3 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Last Coupon Date", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate2"]}); 		
		this.e_basis = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,11,200,20],caption:"Basis",text:"360",tag:2, tipeText:ttNilai,readOnly:true, change:[this,"doChange"]});				
		this.e_jmlhari = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Days On Act", tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]});					
		this.e_persen = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,12,200,20],caption:"Coupon Rate", tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});												
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"Nominal Price", tipeText:ttNilai, text:"0", readOnly:true, change:[this,"doChange"]});						
		this.e_piukupon = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,18,200,20],caption:"Accrued Interest", tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.e_kuponbeli = new saiLabelEdit(this.pc1.childPage[1],{bound:[500,18,200,20],caption:"Kupon Blm Cair", tipeText:ttNilai, text:"0",readOnly:true});
		this.e_pharga1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Acquisition Price", tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});				
		this.e_pharga2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,19,200,20],caption:"Selling Price", tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_noleh = new saiLabelEdit(this.pc1.childPage[1],{bound:[500,19,200,20],caption:"Nilai Perolehan", tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_nilaijual = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"Principal", tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_pjkkupon = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,18,200,20],caption:"Tax On Accrued", tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_dpp = new saiLabelEdit(this.pc1.childPage[1],{bound:[500,18,200,20],caption:"Taxbl Cpt Gain", tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_nbuku = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Nilai Buku", tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_gainlos = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,22,200,20],caption:"Ni Gain/Loss", tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_pajak = new saiLabelEdit(this.pc1.childPage[1],{bound:[500,22,200,20],caption:"Tax On Cpt Gain", tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
				colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
				columnReadOnly:[true,[0,1,2,3,4],[]],					
				colFormat:[[3,4],[cfUpload,cfButton]], 
				buttonStyle:[[0],[bsEllips]], 	
				click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
				ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[2],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
				colTitle:["namaFile","status"],
				colWidth:[[1,0],[80,180]],
				readOnly: true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
					
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

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);			
			
			//flag_aktif = 2 MI utk obligasi diisi oleh kode reksadana 
			this.cb_kelola.setSQL("select kode_rdkelola, nama from inv_rdkelola where flag_aktif<>'2'",["kode_rdkelola","nama"],false,["Kode","Nama"],"and","Daftar Pengelola",true);			
			this.cb_seri.setSQL("select kode_jenis, isin from inv_oblijenis",["kode_jenis","isin"],false,["No Seri","ISIN"],"and","Daftar Seri",true);			
			this.cb_broker.setSQL("select kode_broker, nama from inv_broker where flag_aktif='1' ",["kode_broker","nama"],false,["Kode","Nama"],"and","Daftar Broker",true);			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('PLAN') and kode_lokasi='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];									
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);
				}
			}			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fObliJual.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fObliJual.implement({	
	doSgBtnClick4: function(sender, col, row){
		try{
			if (col == 7) this.doDoubleClick4(this.sg4,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick4: function(sender, col , row) {
		if (this.stsSimpan == 1) this.noBeli = this.sg4.cells(4,row);

		var strSQL = "select a.*,a.nilai_buku+isnull(d.amor,0) as nilai_buku,b.nama as nama_seri,convert(varchar,b.tgl_mulai,103) as tglmulai,convert(varchar,b.tgl_selesai,103) as tglselesai,c.nama as obligor, "+
					 "case when a.no_cair_piukupon ='-' then a.nilai_piukupon else 0 end as kuponbeli, case when a.status='TRADING' then c.akun_trading else c.akun_hts end as akun_obli, "+
					 "case when a.status='TRADING' then c.akun_oci else c.akun_amor end as akun_nt "+
					 "from inv_obli_d a "+
					 "		inner join inv_oblijenis b on a.kode_jenis=b.kode_jenis "+
					 "		inner join inv_obligor c on b.kode_obligor=c.kode_obligor "+					 
					 "		left join ("+
					 "				select kode_jenis,no_beli,sum(case dc when 'D' then nilai else -nilai end) as amor "+
					 "      		from inv_obliamor_d group by kode_jenis,no_beli "+
					 "		) d on a.no_beli=d.no_beli and a.kode_jenis=d.kode_jenis "+
					 "where a.no_beli='"+this.noBeli+"'"; 

		var data = this.dbLib.getDataProvider(strSQL,true);			
		if (typeof data == "object"){
			var line = data.rs.rows[0];	
			if (line != undefined){		
				if (this.stsSimpan == 1) {
					this.e_pharga2.setText("0");
					this.e_gainlos.setText("0");					
				}				
				this.dp_d3.setText(line.tgl_akru_kupon);
				this.e_tipe.setText(line.status);
				this.cb_seri.setText(line.kode_jenis);
				this.e_kuponbeli.setText(floatToNilai(line.kuponbeli));
				this.e_nilai.setText(floatToNilai(line.nilai));
				this.e_pharga1.setText(floatToNilai(line.p_price));								
				this.e_nama.setText(line.nama_seri);
				this.e_obligor.setText(line.obligor);
				this.e_tgl1.setText(line.tglmulai);
				this.e_tgl2.setText(line.tglselesai);
				this.e_persen.setText(floatToNilai(line.rate));
				this.e_basis.setText(floatToNilai(line.basis));		

				this.akunObli = line.akun_obli;
				this.akunNT = line.akun_nt;
				this.niOleh = parseFloat(line.nilai_beli);				
				this.niBuku = parseFloat(line.nilai_buku);

				this.e_noleh.setText(floatToNilai(this.niOleh));
				this.e_nbuku.setText(floatToNilai(this.niBuku));

 			}					
		}	

		this.pc1.setActivePage(this.pc1.childPage[1]);				
	},
	doLoadSeri: function() {
		var strSQL = "select b.kode_jenis,b.isin,b.nama,convert(varchar,c.tgl_settl,103) as tgl_set, a.no_beli,a.nilai,a.status "+
					 "from inv_obli_d a "+
					 "inner join inv_oblijenis b on a.kode_jenis=b.kode_jenis "+
					 "inner join inv_oblibeli_m c on a.no_beli=c.no_beli "+
					 "where c.kode_rdkelola='"+this.cb_kelola.getText()+"' and a.no_oblijual='-'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;		
			this.sg4.clear();			
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg4.appendData([line.kode_jenis,line.isin,line.nama,line.tgl_set,line.no_beli,floatToNilai(line.nilai),line.status,"Pilih"]);						
			}
		} else this.sg4.clear(1);

	},
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
					"select kode_jenis,nama   from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='FI'",
					"select count(kode_jenis) from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='FI'",
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_oblijual_m where no_oblijual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_oblijual_d where no_oblijual='"+this.e_nb.getText()+"'");	
						sql.add("delete from inv_oblijual_j where no_oblijual='"+this.e_nb.getText()+"'");	
						sql.add("update inv_obli_d set no_oblijual='-' where no_oblijual='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					}

					sql.add("update inv_obli_d set no_oblijual='"+this.e_nb.getText()+"' where no_beli='"+this.noBeli+"'");
					sql.add("insert into inv_oblijual_m(no_oblijual,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kasjual,nik_buat,no_dokumen,keterangan,kode_drk,kode_jenis,akun_piutang,akun_piukupon,kode_plan,tgl_settl,kode_rdkelola) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'F','-','"+this.app._userLog+"','-','"+this.e_ket.getText()+"','-','"+this.cb_seri.getText()+"','-','-','"+this.cb_plan.getText()+"','"+this.dp_d2.getDateString()+"','"+this.cb_kelola.getText()+"')");					

					sql.add("insert into inv_oblijual_d (no_oblijual,kode_jenis,no_beli,n_oleh,n_buku,n_piukupon,n_jual,gainlos,n_kupon,tgl_kupon,p_price,p_price2,dpp,pajak,kode_broker,kode_plan,pajak_kupon) values "+
					 		"('"+this.e_nb.getText()+"','"+this.cb_seri.getText()+"','"+this.noBeli+"',"+this.niOleh+","+this.niBuku+","+nilaiToFloat(this.e_kuponbeli.getText())+","+nilaiToFloat(this.e_nilaijual.getText())+","+this.niGainLos+","+nilaiToFloat(this.e_piukupon.getText())+",'"+this.dp_d3.getDateString()+"',"+nilaiToFloat(this.e_pharga1.getText())+","+nilaiToFloat(this.e_pharga2.getText())+","+nilaiToFloat(this.e_dpp.getText())+","+nilaiToFloat(this.e_pajak.getText())+",'"+this.cb_broker.getText()+"','"+this.cb_plan.getText()+"',"+nilaiToFloat(this.e_pjkkupon.getText())+")");
					
					if (nilaiToFloat(this.e_gainlos.getText()) > 0) {
						var gainlos = nilaiToFloat(this.e_gainlos.getText());																							
						var DCgl = "C";																		
					}
					else {
						var gainlos = Math.abs(nilaiToFloat(this.e_gainlos.getText()));
						var DCgl = "D";						
					}					
					var nilaiPiutang = nilaiToFloat(this.e_nilaijual.getText()) - nilaiToFloat(this.e_pajak.getText());	
					
					//jurnal piutang dan gainloss
					sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.noBeli+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiutang+"','"+this.e_ket.getText()+"','D',"+nilaiPiutang+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLJUAL','PIUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");														
					sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.noBeli+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunGL+"','"+this.e_ket.getText()+"','"+DCgl+"',"+gainlos+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLJUAL','GAINLOS','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");		

					//piutang kupon talangan diselesaikan, jika masih gantung (blm kas)
					if (nilaiToFloat(this.e_kuponbeli.getText()) != 0) {
						sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','"+this.noBeli+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunPiukupon+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_kuponbeli.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLJUAL','RPIUKUPON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");		
						sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','"+this.noBeli+"','"+this.dp_d1.getDateString()+"',5,'"+this.akunGL+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_kuponbeli.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLJUAL','RPIUKUPON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");		
					}

					if (nilaiToFloat(this.e_piukupon.getText()) > 0) {
						var nilaiKupon = nilaiToFloat(this.e_piukupon.getText()) - nilaiToFloat(this.e_pjkkupon.getText());	
						sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','"+this.noBeli+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPiukupon+"','"+this.e_ket.getText()+"','D',"+nilaiKupon+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLJUAL','PIUKUPON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");														
						sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','"+this.noBeli+"','"+this.dp_d1.getDateString()+"',4,'"+this.akunKupon+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_piukupon.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLJUAL','KUPON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");														
					}

					var totpajak = nilaiToFloat(this.e_pajak.getText()) + nilaiToFloat(this.e_pjkkupon.getText());
					if (totpajak > 0) {
						sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.noBeli+"','"+this.dp_d1.getDateString()+"',6,'"+this.akunPPh+"','"+this.e_ket.getText()+"','D',"+totpajak+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLJUAL','PAJAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");														
					}

					if (nilaiToFloat(this.e_nilaijual.getText()) != 0 ) {
						sql.add("update inv_obli_d set no_oblijual='"+this.e_nb.getText()+"' where no_beli='"+this.noBeli+"' and kode_jenis='"+this.cb_seri.getText()+"'");
						
						if (this.e_tipe.getText() == "HTM") var nilaiObli = nilaiToFloat(this.e_nbuku.getText());
						else var nilaiObli = nilaiToFloat(this.e_noleh.getText());
						sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','"+this.noBeli+"','"+this.dp_d1.getDateString()+"',99,'"+this.akunObli+"','"+this.e_ket.getText()+"','C',"+nilaiObli+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLJUAL','OBLI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
												
						if (this.e_tipe.getText() == "TRADING") {
							if (this.niOleh != this.niBuku) {
								var nilaiSPI = this.niBuku - this.niOleh;
								if (nilaiSPI > 0) {
									var DCnt = "D";
									var DCspi = "C";
								}
								else {
									var DCnt = "C";
									var DCspi = "D";
								}
								nilaiSPI = Math.abs(nilaiSPI);								
								sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.noBeli+"','"+this.dp_d1.getDateString()+"',97,'"+this.akunNT+"','"+this.e_ket.getText()+"','"+DCnt+"',"+nilaiSPI+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLJUAL','NAIKTURUN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
								sql.add("insert into inv_oblijual_j(no_oblijual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.noBeli+"','"+this.dp_d1.getDateString()+"',98,'"+this.akunObli+"','"+this.e_ket.getText()+"','"+DCspi+"',"+nilaiSPI+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLJUAL','SPI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");							
							}
						}
					}

					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into inv_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','OBLIJUAL','"+this.e_nb.getText()+"')");															
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
					this.sg3.clear(1);
					this.sg4.clear(1);
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick(this.i_gen);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);			
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);									
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Settlement tidak boleh nol atau kurang.");
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
				sql.add("delete from inv_oblijual_m where no_oblijual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from inv_oblijual_d where no_oblijual='"+this.e_nb.getText()+"'");	
				sql.add("delete from inv_oblijual_j where no_oblijual='"+this.e_nb.getText()+"'");	
				sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
				sql.add("update inv_obli_d set no_oblijual='-' where no_oblijual='"+this.e_nb.getText()+"'");				
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);								
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doSelectDate2: function(sender, y,m,d){
		var data = this.dbLib.getDataProvider("select datediff(day,'"+this.dp_d3.getDateString()+"','"+this.dp_d2.getDateString()+"') as jmlhari",true);			
		if (typeof data == "object"){
			var line = data.rs.rows[0];	
			this.e_jmlhari.setText(floatToNilai(line.jmlhari));	
		}	
	},
	doChange:function(sender){		
		if ((sender == this.cb_kelola || sender == this.cb_plan) && this.stsSimpan==1) {
			if (sender ==  this.cb_plan) {
				var data = this.dbLib.getDataProvider("select kode_param,flag from inv_obli_param where kode_plan = '"+this.cb_plan.getText()+"' and kode_param in ('PPINV','PIUJUAL','PIUKUPON','DRKOBLSPI','PPHJUAL')",true);			
				if (typeof data == "object"){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						if (line.kode_param == "PPINV") this.kodepp = line.flag;
						if (line.kode_param == "PIUJUAL") this.akunPiutang = line.flag;														
						if (line.kode_param == "PIUKUPON") this.akunPiukupon = line.flag;	
						if (line.kode_param == "DRKOBLSPI") this.drkSPI = line.flag;	
						if (line.kode_param == "PPHJUAL") this.akunPPh = line.flag;														
					}
				}				
			}	
			if (sender == this.cb_kelola && this.cb_kelola.getText()!="") {
				this.doLoadSeri();
			}					
		}
		
		if (sender == this.cb_seri && this.cb_seri.getText()!="") {
			var strSQL = "select a.nama,a.persen,convert(varchar,a.tgl_mulai,103) as tglmulai,convert(varchar,a.tgl_selesai,103) as tglselesai,b.nama as obligor,b.jenis,b.kode_obligor,b.akun_gl,b.akun_kupon "+
						 "from inv_oblijenis a inner join inv_obligor b on a.kode_obligor=b.kode_obligor "+
						 "where a.kode_jenis='"+this.cb_seri.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				if (line != undefined){		
					this.kodeObligor = line.kode_obligor;
					this.e_nama.setText(line.nama);
					this.e_obligor.setText(line.obligor);
					this.e_tgl1.setText(line.tglmulai);
					this.e_tgl2.setText(line.tglselesai);
					this.e_persen.setText(floatToNilai(line.persen));		
					this.akunGL = line.akun_gl;
					this.akunKupon = line.akun_kupon;

				}					
			}	
		}

		if (sender == this.cb_broker && this.cb_broker.getText()!="") {
			var strSQL = "select sts_bank from inv_broker where kode_broker='"+this.cb_broker.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				if (line != undefined){		
					this.stsBank = line.sts_bank;
					if (this.stsBank == "BANK") {
						this.e_pharga2.setReadOnly(true);
						this.e_dpp.setReadOnly(true);
						this.e_pajak.setReadOnly(true);
					}
					else {
						this.e_pharga2.setReadOnly(false);
						this.e_dpp.setReadOnly(false);
						this.e_pajak.setReadOnly(false);
					}
				}									
			}	
		}

		if (sender == this.e_nilai || sender == this.e_jmlhari || sender == this.e_basis || sender == this.e_persen ) {
			if (this.e_nilai.getText()!="" && this.e_jmlhari.getText()!="" && this.e_basis.getText()!="" && this.e_persen.getText()!="") {
				var piuBunga = (nilaiToFloat(this.e_jmlhari.getText()) / nilaiToFloat(this.e_basis.getText()) * (nilaiToFloat(this.e_persen.getText()) /100)) * nilaiToFloat(this.e_nilai.getText());
				this.e_piukupon.setText(floatToNilai(Math.round(piuBunga)));
			}
		}

		if (sender == this.e_piukupon) {
			if (this.e_piukupon.getText()!="") {
				var pjkkupon = 0.15 * nilaiToFloat(this.e_piukupon.getText());
				this.e_pjkkupon.setText(floatToNilai(pjkkupon));
			}
		}

		if (sender == this.e_pharga1 || sender == this.e_pharga2 || sender == this.e_nilai) {
			if (this.e_pharga1.getText()!="" && this.e_pharga2.getText()!="" && this.e_nilai.getText()!="" && this.e_pharga2.getText()!="0") {
				
				if (this.e_tipe.getText() == "TRADING") 
					this.niGainLos = nilaiToFloat(this.e_nilaijual.getText()) - nilaiToFloat(this.e_noleh.getText());
				else this.niGainLos = ((nilaiToFloat(this.e_pharga2.getText()) /100) * nilaiToFloat(this.e_nilai.getText())) - this.niBuku; 
				
				this.e_gainlos.setText(floatToNilai(this.niGainLos));

				if (this.niGainLos > 0) {				
					this.e_dpp.setText(floatToNilai(Math.round(this.niGainLos)));
					this.e_dpp.setReadOnly(false);
					this.e_pajak.setReadOnly(false);
				}	
				else {
					this.e_dpp.setText("0");
					this.e_dpp.setReadOnly(true);
					this.e_pajak.setReadOnly(true);
				}

				var hjual = (nilaiToFloat(this.e_pharga2.getText()) /100) * nilaiToFloat(this.e_nilai.getText());
				this.e_nilaijual.setText(floatToNilai(Math.round(hjual)));				
				
			}
		}

		if (sender == this.e_dpp) {
			if (this.e_dpp.getText()!="") {
				var pajak =  0.15 * nilaiToFloat(this.e_dpp.getText());
				this.e_pajak.setText(floatToNilai(Math.round(pajak)));
			}
		}

		if (sender == this.e_nilaijual || sender == this.e_piukupon || sender == this.e_pjkkupon || sender == this.e_pajak) {
			var tot  = nilaiToFloat(this.e_nilaijual.getText()) + nilaiToFloat(this.e_piukupon.getText()) - nilaiToFloat(this.e_pajak.getText()) - nilaiToFloat(this.e_pjkkupon.getText());
		 	this.e_total.setText(floatToNilai(tot));
		}
		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0){
				this.sg3.clear(1);	
				this.sgUpld.clear(1);
				this.sgFile.clear(1);		
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_oblijual_m","no_oblijual",this.app._lokasi+"-FIJ"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
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
								//this.nama_report="server_report_saku3_yakes_inves_rptSahamBeliGabung";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_shmbeli='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithBs(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
			this.sg3.clear(1);
			this.sg4.clear(1);
			this.sgUpld.clear(1);
			this.sgFile.clear(1);
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select a.no_oblijual,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.n_jual+b.n_kupon-b.pajak as total "+
		             "from inv_oblijual_m a inner join inv_oblijual_d b on a.no_oblijual=b.no_oblijual "+					 
					 "where a.periode='"+this.e_periode.getText()+"'"+
					 "order by a.no_oblijual desc";
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
			this.sg3.appendData([line.no_oblijual,line.tgl,line.keterangan,line.total,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);		
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
				
				var strSQL = "select a.*,b.*,c.nilai,c.no_beli "+
							 "from inv_oblijual_m a "+
							 "inner join inv_oblijual_d b on a.no_oblijual=b.no_oblijual "+
							 "inner join inv_obli_d c on a.no_oblijual=c.no_oblijual "+
							 "where a.no_oblijual= '"+this.e_nb.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.cb_plan.setText(line.kode_plan);
						this.cb_kelola.setText(line.kode_rdkelola);
						this.dp_d2.setText(line.tgl_settl);													
						this.cb_broker.setText(line.kode_broker);					
						this.dp_d3.setText(line.tgl_kupon);	
						this.cb_seri.setText(line.kode_jenis);						
						
						this.noBeli = line.no_beli;						
						this.doDoubleClick4();

						this.niPiuKupon = line.n_piukupon; 
						this.niGainLos = line.gainlos;

						this.e_pharga1.setText(floatToNilai(line.p_price));
						this.e_pharga2.setText(floatToNilai(line.p_price2));
						this.e_nilaijual.setText(floatToNilai(line.n_jual));
						this.e_piukupon.setText(floatToNilai(line.n_kupon));
					}
				}
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from inv_dok a inner join inv_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
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