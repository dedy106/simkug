window.app_saku3_transaksi_yakes21_inves_fObliSPI = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_yakes21_inves_fObliSPI.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fObliSPI";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan SPI Obligasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,350,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true,change:[this,"doChange"]});				
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Jenis",items:["REGULAR","NBUKU"], readOnly:true,tag:2});				
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[910,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,305], childPage:["Data Obligasi","Data Closing","Rekap Nilai"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:16,tag:9,
		            colTitle:["ID Beli","ID Seri","Nama","SPI | Amort","Nilai Oleh","NBuku(AFS) | Nominal(HTM)","Nilai Wajar","Selisih","Total","Rev SPI","Ni Amortisasi","Ni Kupon","Status","Akun Obli","Akun Kupon","Rev Amort."],
					colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,80,80,70,100,100,100,100,100,100,150,100,70,250,80,100]],
					colFormat:[[4,5,6,7,8,9,10,11,15],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tgl Closing Harga", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18],selectDate:[this,"doSelectDate2"]}); 
		this.bHitung = new portalui_button(this.pc1.childPage[1],{bound:[230,11,98,18],caption:"Hitung",click:[this,"doHitung"]});		
								
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,242],colCount:2,tag:9,
					colTitle:["ID Seri","Price"],
					colWidth:[[1,0],[100,100]],
					colFormat:[[1],[cfNilai]],readOnly:true,
					autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.e_amor = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"Tot Amortisasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_revamor = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Rev Amortisasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_kupon = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,18,200,20],caption:"Tot Akru Kupon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,200,20],caption:"Total SPI", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_revspi = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"Rev SPI", tag:8, readOnly:true, tipeText:ttNilai, text:"0"});				

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
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
			
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
			
			var strSQL = "select dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.app._periode.substr(0,4)+"-"+this.app._periode.substr(4,2)+"-01')+1,0)) as tglakhir" ;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){											
					this.dp_d1.setText(line.tglakhir);
					this.dp_d2.setText(line.tglakhir);
				}
			}
			
			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PLAN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
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
window.app_saku3_transaksi_yakes21_inves_fObliSPI.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fObliSPI.implement({
	doHitung: function() {
		var strSQL = "select distinct a.kode_jenis,a.h_wajar from inv_obli_harga a "+
					 "inner join inv_obli_d b on a.kode_jenis=b.kode_jenis "+					 
					 "where a.tanggal ='"+this.dp_d2.getDateString()+"' order by a.kode_jenis";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU4 = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);	
			
			//inisialisasi
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].nilai_wajar =0;
				this.dataJU.rs.rows[i].n_amor =0;
				this.dataJU.rs.rows[i].n_kupon =0;
			}				
			
			var line; 
			var tot = 0;
			for (var i=0; i < this.dataJU4.rs.rows.length;i++){
				line = this.dataJU4.rs.rows[i];
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (this.dataJU.rs.rows[j].status != "HTM" && line.kode_jenis == this.dataJU.rs.rows[j].kode_jenis && this.dataJU.rs.rows[j].no_oblijual=="-") {							
						this.dataJU.rs.rows[j].persen = parseFloat(line.h_wajar);							
						this.dataJU.rs.rows[j].n_wajar = Math.round(((parseFloat(line.h_wajar)/100) * this.dataJU.rs.rows[j].n_buku));							
						this.dataJU.rs.rows[j].n_selisih =  Math.round(((parseFloat(line.h_wajar)/100) * this.dataJU.rs.rows[j].n_buku)) - parseFloat(this.dataJU.rs.rows[j].n_buku);
						this.dataJU.rs.rows[j].total =  Math.round(((parseFloat(line.h_wajar)/100) * this.dataJU.rs.rows[j].n_buku)) - parseFloat(this.dataJU.rs.rows[j].n_buku);
						tot += parseFloat(this.dataJU.rs.rows[j].total);							
					}
				}
			}
			this.e_nilai.setText(floatToNilai(tot));			
		} else this.sg4.clear(1);	


		//------ amortisasi, kupon
		var strSQL = "select no_beli,n_amor,n_kupon from inv_obli_kkp "+					 
					 "where tanggal ='"+this.dp_d2.getDateString()+"' order by no_beli";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU5 = data;
			var line; 
			var totamor = totkupon = 0;
			for (var i=0; i < this.dataJU5.rs.rows.length;i++){
				line = this.dataJU5.rs.rows[i];
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (line.no_beli == this.dataJU.rs.rows[j].no_beli && this.dataJU.rs.rows[j].no_oblijual=="-") {							
						if (this.dataJU.rs.rows[j].status == "HTM") {
							this.dataJU.rs.rows[j].n_amor = parseFloat(line.n_amor);								
							totamor += parseFloat(this.dataJU.rs.rows[j].n_amor);							
						}
						this.dataJU.rs.rows[j].n_kupon = parseFloat(line.n_kupon);								
						totkupon += parseFloat(this.dataJU.rs.rows[j].n_kupon);							
					}					
				}
			}
		}
		this.e_amor.setText(floatToNilai(totamor));
		this.e_kupon.setText(floatToNilai(totkupon));

		this.doTampilData(1);
	},
	doTampilData4: function(page) {		
		this.sg4.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line.kode_jenis,floatToNilai(line.h_wajar)]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
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
						
					//jurnal-jurnal SPI,AMOR,KUPON
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];			
						if (line.status != "HTM") {		
							//spi s/d
							var nilai = parseFloat(line.n_selisih);
							if (nilai > 0) {
								var akunDr = line.akun_obli;
								var akunCr = line.akun_lawan;
								var jenis1 = "SPI";
								var jenis2 = "NT";
							}
							else {
								var akunDr = line.akun_lawan;																																					
								var akunCr = line.akun_obli;
								var jenis1 = "NT";
								var jenis2 = "SPI";	
							}
							if (nilai != 0) {
								nilai = Math.abs(nilai);
								sql.add("insert into inv_oblispi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+akunDr+"','"+this.e_ket.getText()+" | "+line.no_beli+"','D',"+nilai+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLSPI','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
								sql.add("insert into inv_oblispi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+akunCr+"','"+this.e_ket.getText()+" | "+line.no_beli+"','C',"+nilai+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLSPI','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																
							}			
							
							//reverse spi s/d
							var nilai = parseFloat(line.total_spi);								
							if (nilai < 0) {
								var akunDr = line.akun_obli;
								var akunCr = line.akun_lawan;																								
								var jenis1 = "SPIREV";
								var jenis2 = "NTREV";
							}
							else {
								var akunDr = line.akun_lawan;																			
								var akunCr = line.akun_obli;
								var jenis1 = "NTREV";
								var jenis2 = "SPIREV";
							}								
							if (nilai != 0) {
								nilai = Math.abs(nilai);
								sql.add("insert into inv_oblispi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+akunDr+"','"+this.e_ket.getText()+" | "+line.no_beli+"','D',"+nilai+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLSPI','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
								sql.add("insert into inv_oblispi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+akunCr+"','"+this.e_ket.getText()+" | "+line.no_beli+"','C',"+nilai+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLSPI','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
							}

							if (this.c_jenis.getText() == "NBUKU") {								
								var flag_rev = "Z";
							}
							else var flag_rev = "-";
							
							var h_oleh = parseFloat(line.n_oleh);
							var h_buku = parseFloat(line.n_buku);
							var h_wajar = parseFloat(line.n_wajar);
							var persen = parseFloat(line.persen);
							
							sql.add("update inv_obli_d set nilai_buku = "+line.n_wajar+" where kode_jenis='"+line.kode_jenis+"' and no_beli='"+line.no_beli+"'");
							sql.add("insert into inv_oblispi_d(no_spi,kode_lokasi,no_beli,kode_jenis,n_oleh,n_buku,n_wajar,persen,flag_rev,dc,kode_plan,kode_rdkelola) values "+								
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.no_beli+"','"+line.kode_jenis+"',"+h_oleh+","+h_buku+","+h_wajar+","+persen+",'"+flag_rev+"','D','"+this.cb_plan.getText()+"','"+line.kode_rdkelola+"')");
						}
						//----------------------------------------------
						if (line.status == "HTM") {
							//amor s/d
							var nilai = parseFloat(line.n_amor);								
							if (nilai > 0) {
								var akunDr = line.akun_obli;
								var akunCr = line.akun_lawan;
								var jenis1 = "OBLI";
								var jenis2 = "AMOR";
							} else {
								var akunDr = line.akun_lawan;
								var akunCr = line.akun_obli;
								var jenis1 = "AMOR";
								var jenis2 = "OBLI";
							}													
							if (nilai != 0) {
								nilai = Math.abs(nilai);
								sql.add("insert into inv_obliamor_j(no_amor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,'"+akunDr+"','"+this.e_ket.getText()+" | "+line.no_beli+"','D',"+nilai+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLAMOR','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
								sql.add("insert into inv_obliamor_j(no_amor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',5,'"+akunCr+"','"+this.e_ket.getText()+" | "+line.no_beli+"','C',"+nilai+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLAMOR','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");								
							}

							//reverse amor s/d
							var nilai = parseFloat(line.total_amor);								
							if (nilai < 0) {
								var akunDr = line.akun_obli;
								var akunCr = line.akun_lawan;
								var jenis1 = "OBLI";
								var jenis2 = "AMOR";
							} else {
								var akunDr = line.akun_lawan;
								var akunCr = line.akun_obli;
								var jenis1 = "AMOR";
								var jenis2 = "OBLI";
							}													
							if (nilai != 0) {
								nilai = Math.abs(nilai);
								sql.add("insert into inv_obliamor_j(no_amor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',6,'"+akunDr+"','"+this.e_ket.getText()+" | "+line.no_beli+"','D',"+nilai+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','REVOBLAMOR','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
								sql.add("insert into inv_obliamor_j(no_amor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',7,'"+akunCr+"','"+this.e_ket.getText()+" | "+line.no_beli+"','C',"+nilai+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','REVOBLAMOR','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");								
							}

						}

						//kupon
						var nilai = parseFloat(line.n_kupon);
						if (nilai != 0) {
							sql.add("insert into inv_obliakru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',8,'"+this.akunPiuKupon+"','"+this.e_ket.getText()+" | "+line.no_beli+"','D',"+nilai+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLIAKRU','PIUKUPON','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
							sql.add("insert into inv_obliakru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',9,'"+line.akun_kupon+"','"+this.e_ket.getText()+" | "+line.no_beli+"','C',"+nilai+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLIAKRU','KUPON','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
						}
					}	
					

					//--------------------------- modul -----------------
					//spi 
					if (nilaiToFloat(this.e_nilai.getText()) != 0 || nilaiToFloat(this.e_revspi.getText()) != 0) {
						//---- spi
						sql.add("insert into inv_oblispi_m(no_spi,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input,jenis,no_app1,progress,kode_plan) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.kodepp+"','"+this.drkSPI+"','F','OBLSPI','"+this.app._userLog+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate(),'"+this.c_jenis.getText()+"','-','0','"+this.cb_plan.getText()+"')");
						
						if (this.e_periode.getText().substr(4,2) != "01") {						
							sql.add("insert into inv_oblispi_d(no_spi,kode_lokasi,no_beli,kode_jenis,n_oleh,n_buku,n_wajar,persen,flag_rev,dc,kode_plan) "+					
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',no_beli,kode_jenis,n_oleh,n_buku,n_wajar,persen,no_spi,'C',kode_plan "+
									"from inv_oblispi_d where no_spi <> '"+this.e_nb.getText()+"' and kode_plan='"+this.cb_plan.getText()+"' and flag_rev='-' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("update inv_oblispi_d set flag_rev='"+this.e_nb.getText()+"' where no_spi <> '"+this.e_nb.getText()+"' and kode_plan='"+this.cb_plan.getText()+"' and flag_rev='-' and kode_lokasi='"+this.app._lokasi+"'");																		
						}
						else {
							sql.add("insert into inv_oblispi_d(no_spi,kode_lokasi,no_beli,kode_jenis,n_oleh,n_buku,n_wajar,persen,flag_rev,dc,kode_plan)	"+				
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.no_beli,a.kode_jenis,a.n_oleh,a.n_buku,a.n_wajar,a.persen,a.no_spi,'C',a.kode_plan "+
									"from inv_oblispi_d a inner join inv_oblispi_m b on a.no_spi=b.no_spi and b.jenis = 'NBUKU' "+
									"where a.kode_plan='"+this.cb_plan.getText()+"' and a.dc = 'D' and a.no_spi = (select MAX(no_spi) from inv_oblispi_m where jenis='NBUKU') ");
						}
					}	

					//---- amortisasi		
					if (nilaiToFloat(this.e_amor.getText()) != 0) {
						sql.add("insert into inv_obliamor_m(no_amor,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,kode_lokasi,periode,nik_user,tgl_input,nik_sap,no_app1,progress,kode_plan) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.kodepp+"','"+this.drkSPI+"','F','OBLIAMOR','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','-','0','"+this.cb_plan.getText()+"')");										

						//reverse amortisasi sebelumnya
						sql.add("insert into inv_obliamor_d(no_amor,kode_lokasi,periode,no_beli,kode_jenis,akun_obligasi,akun_amor,tgl_akru_seb,tgl_akru,jml_hari,nilai,dc,no_rev,kode_plan)  "+
								"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',a.no_beli,a.kode_jenis,c.akun_hts,c.akun_amor,'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"',0,a.nilai,'C',a.no_amor,b.kode_plan "+
								"from inv_obliamor_d a "+
								"inner join inv_obli_d b on a.no_beli=b.no_beli and a.kode_lokasi=b.kode_lokasi and b.status='HTM' and b.no_oblijual='-' "+
								"inner join inv_oblijenis d on b.kode_jenis=d.kode_jenis "+
								"inner join inv_obligor c on d.kode_obligor=c.kode_obligor "+
								"where a.no_rev='-' and a.no_amor <> '"+this.e_nb.getText()+"' ");		
								
						sql.add("update a set a.no_rev='"+this.e_nb.getText()+"' "+
								"from inv_obliamor_d a inner join inv_obli_d b on a.no_beli=b.no_beli and a.kode_lokasi=b.kode_lokasi and b.status='HTM' and b.no_oblijual='-' "+
								"where a.no_rev='-' and no_amor <> '"+this.e_nb.getText()+"' ");	
			
						//amortisasi s/d tgl generate		
						sql.add("insert into inv_obliamor_d(no_amor,kode_lokasi,periode,no_beli,kode_jenis,akun_obligasi,akun_amor,tgl_akru_seb,tgl_akru,jml_hari,nilai,dc,no_rev,kode_plan)  "+
								"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',a.no_beli,a.kode_jenis,c.akun_hts,c.akun_amor,a.tanggal,a.tanggal,datediff(day,b.tgl_mulai,a.tanggal),a.n_amor,'D','-',b.kode_plan "+
								"from inv_obli_kkp a "+
								"inner join inv_obli_d b on a.no_beli=b.no_beli and b.no_oblijual='-' "+
								"inner join inv_oblijenis d on b.kode_jenis=d.kode_jenis "+
								"inner join inv_obligor c on d.kode_obligor=c.kode_obligor "+
								"where a.kode_plan='"+this.cb_plan.getText()+"' and a.status='HTM' and a.tanggal='"+this.dp_d1.getDateString()+"'");		
					}
					
					//---- akru kupon	
					if (nilaiToFloat(this.e_kupon.getText())!=0) {							
						sql.add("insert into inv_obliakru_m(no_akru,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input,nik_sap,no_app1,progress,kode_plan) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_kupon.getText())+",'"+this.kodepp+"','"+this.drkSPI+"','F','OBLIAKRU','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate(),'-','-','0','"+this.cb_plan.getText()+"')");										

						sql.add("insert into inv_obliakru_d(no_akru,no_beli,kode_jenis,periode,kode_lokasi,akun_piukupon,akun_kupon,nilai,kode_pp,kode_drk,dc,no_del,nominal,jml_hari,tgl_awal,tgl_akhir,no_cair,no_kas,nilai_cair,kode_plan)  "+
								"select '"+this.e_nb.getText()+"',a.no_beli,a.kode_jenis,'"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.akunPiuKupon+"',c.akun_kupon,a.n_kupon,'"+this.kodepp+"','"+this.drkSPI+"','D','-',a.n_kupon,datediff(day,b.tgl_akru,a.tanggal),b.tgl_akru,a.tanggal,'-','-',0,b.kode_plan "+
								"from inv_obli_kkp a "+
								"inner join inv_obli_d b on a.no_beli=b.no_beli and b.no_oblijual='-' "+
								"inner join inv_oblijenis d on b.kode_jenis=d.kode_jenis "+
								"inner join inv_obligor c on d.kode_obligor=c.kode_obligor "+
								"where a.kode_plan='"+this.cb_plan.getText()+"' and a.tanggal='"+this.dp_d1.getDateString()+"'");		
						
						sql.add("update a "+
								"set a.tgl_akru_seb=a.tgl_akru, "+
								"a.tgl_akru = (case when a.tgl_selesai <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) "+							
								"from inv_obli_d a inner join inv_obli_kkp b on a.no_beli=b.no_beli and b.tanggal='"+this.dp_d1.getDateString()+"' "+
								"where a.kode_plan ='"+this.cb_plan.getText()+"' and a.no_oblijual='-' and datediff(month,a.tgl_akru,a.tgl_selesai)<>0 and a.tgl_akru < a.tgl_selesai and a.tgl_akru <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) ");					
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
					this.dataJU = {rs:{rows:[]}};				
					this.sg.clear(1);
					this.sg3.clear(1);					
					this.sg4.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick(this.i_gen);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);			
					this.bTampil.show();					
				break;
			case "simpan" :				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				/* boleh nol jika hrg wajar=hrg buku dan h buku mau diupdate dengan h_wajr (akhir tahun)
				if (nilaiToFloat(this.e_nilai.getText()) == 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai akru tidak boleh nol.");
					return false;						
				}
				*/
				
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;		
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update a set a.tgl_akru=a.tgl_akru_seb, a.tgl_akru_seb=b.tgl_awal "+
							"from inv_obli_d a inner join inv_obliakru_d b on a.no_beli=b.no_beli "+
							"where b.no_akru='"+this.e_nb.getText()+"'");
												
					sql.add("delete from inv_oblispi_m where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_oblispi_j where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_oblispi_d where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_oblispi_d set flag_rev = '-' where flag_rev='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("delete from inv_obliamor_m where no_amor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_obliamor_j where no_amor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_obliamor_d where no_amor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update inv_obliamor_d set no_rev = '-' where no_rev='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					

					sql.add("delete from inv_obliakru_m where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_obliakru_j where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_obliakru_d where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doChange:function(sender){
		if (sender == this.cb_plan && this.cb_plan.getText()!="") {			
			var data = this.dbLib.getDataProvider("select kode_param,flag from inv_obli_param where kode_plan = '"+this.cb_plan.getText()+"' and kode_param in ('PPINV','DRKOBLSPI','PIUKUPON')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_param == "PPINV") this.kodepp = line.flag;														
					if (line.kode_param == "DRKOBLSPI") this.drkSPI = line.flag;		
					if (line.kode_param == "PIUKUPON") this.akunPiuKupon = line.flag;					
				}
			}	
		}

		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.dataJU = {rs:{rows:[]}};
			this.sg.clear(1); 
			this.e_nilai.setText("0");
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0){
				this.sg.clear(1); 				
				this.sg3.clear(1);	
				this.sg4.clear(1);		
				this.bTampil.show();				
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_oblispi_m","no_spi",this.app._lokasi+"-OSPI"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doLoadData: function(sender){
		this.pc1.setActivePage(this.pc1.childPage[0]);
		this.nik_user=this.app._nikUser;						
		var sql = "call sp_get_hobli ('"+this.cb_plan.getText()+"','"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";								
		this.dbLib.execQuerySync(sql);	
		
		this.e_nilai.setText("0");		
		var strSQL = "select a.no_beli,y.no_oblijual,a.kode_jenis,x.nama,a.n_oleh,case when a.status <> 'HTM' then a.n_buku else y.nilai end as n_buku,0 as n_wajar,0 as n_selisih,0 as total,isnull(b.nilai_spi,0) as total_spi, 0 as persen,0 as n_amor,0 as n_kupon,a.status,y.kode_rdkelola,isnull(c.nilai_amor,0) as total_amor "+		
					 ", case when y.status = 'HTM' then z.akun_amor else z.akun_oci end as akun_lawan "+    
					 ", case when y.status = 'HTM' then z.akun_hts else z.akun_trading end as akun_obli "+ 
					 ", z.akun_kupon "+        
					 "from inv_obli_tmp a "+
					 "		inner join inv_oblijenis x on a.kode_jenis=x.kode_jenis "+
					 "		inner join inv_obli_d y on a.no_beli=y.no_beli "+
					 "		inner join inv_obligor z on x.kode_obligor=z.kode_obligor "+

					 "      left join ( "+
					 "       	select x.kode_plan,x.no_beli,round(sum( (case x.dc when 'D' then (x.n_wajar-x.n_buku) else -(x.n_wajar-x.n_buku) end) ),0) as nilai_spi "+
					 "       	from inv_oblispi_d x inner join inv_oblispi_m y on x.no_spi=y.no_spi and x.kode_lokasi=y.kode_lokasi "+
					 "       	where y.periode<='"+this.e_periode.getText()+"' and x.flag_rev='-' "+
					 "			group by x.kode_plan,x.no_beli "+
					 "		  ) b on a.no_beli=b.no_beli and a.kode_plan=b.kode_plan "+

					 "      left join ( "+
					 "       	select x.kode_plan,x.no_beli,round(sum( (case x.dc when 'D' then x.nilai else -x.nilai end) ),0) as nilai_amor "+
					 "       	from inv_obliamor_d x inner join inv_obliamor_m y on x.no_amor=y.no_amor and x.kode_lokasi=y.kode_lokasi "+
					 "       	where y.periode<='"+this.e_periode.getText()+"' and x.no_rev='-' "+
					 "			group by x.kode_plan,x.no_beli "+
					 "		  ) c on a.no_beli=c.no_beli and a.kode_plan=c.kode_plan "+

					 "where a.nik_user='"+this.nik_user+"'  and a.kode_plan='"+this.cb_plan.getText()+"' "+
					 "order by a.kode_jenis"; 
					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var totrevspi = totrevamor = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];	
				totrevspi += parseFloat(line.total_spi);						
				totrevamor += parseFloat(line.total_amor);						
			}					
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();			
			this.doTampilData(1);
		} else this.sg.clear(1);	
		this.e_revspi.setText(floatToNilai(totrevspi));	
		this.e_revamor.setText(floatToNilai(totrevamor));								
	},	
	doTampilData: function(page) {		
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];								
			var noleh = Math.round( parseFloat(line.n_oleh) * 10000) / 10000;
			var nbuku = Math.round( parseFloat(line.n_buku) * 10000) / 10000;
			
			this.sg.appendData([line.no_beli,line.kode_jenis,line.nama,line.akun_lawan,floatToNilai(noleh),floatToNilai(nbuku),floatToNilai(line.n_wajar),floatToNilai(line.n_selisih),floatToNilai(line.total),floatToNilai(line.total_spi),floatToNilai(line.n_amor),floatToNilai(line.n_kupon),line.status,line.akun_obli,line.akun_kupon,floatToNilai(line.total_amor)]);								   
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
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.dataJU = {rs:{rows:[]}};					
			this.sg.clear(1);
			this.sg3.clear(1);			
			this.sg4.clear(1);
			setTipeButton(tbSimpan);
			this.bTampil.show();
			this.stsSimpan = 1;
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.bTampil.show();			
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){														
		var strSQL = "select a.no_spi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from inv_oblispi_m a "+	
					 "	   inner join inv_obliamor_m x on a.no_spi=x.no_amor and x.posted='F' "+				 
					 "	   inner join inv_obliakru_m y on a.no_spi=y.no_akru and x.posted='F' "+				 
					 "     left join (select distinct no_spi from inv_oblispi_d where dc ='D' and flag_rev<>'-' and kode_lokasi='"+this.app._lokasi+"') c on a.no_spi=c.no_spi "+
					 "where a.posted='F' and c.no_spi is null and a.progress in ('0','M') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
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
			this.sg3.appendData([line.no_spi,line.tgl,line.keterangan,line.nilai,"Pilih"]); 
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
				this.bTampil.hide();
				this.pc2.setActivePage(this.pc2.childPage[0]);																						
				this.pc1.setActivePage(this.pc1.childPage[2]);																						
				setTipeButton(tbHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_oblispi_m where no_spi= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.dp_d1.setText(line.tanggal);																									
						this.e_ket.setText(line.keterangan);
						this.cb_plan.setText(line.kode_plan);						
						this.c_jenis.setText(line.jenis);											
						this.e_nilai.setText(floatToNilai(line.nilai));	
					}
				}	
				
				var strSQL = "select * from inv_obliamor_m where no_amor= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_amor.setText(floatToNilai(line.nilai));	
					}
				}
				
				var strSQL = "select * from inv_obliakru_m where no_akru= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_kupon.setText(floatToNilai(line.nilai));	
					}
				}

				/*
				sush nampilin.. dihapus juga koq.. gak usah nampilin lagi
									
				*/	
			}
		} catch(e) {alert(e);}
	}	
});

