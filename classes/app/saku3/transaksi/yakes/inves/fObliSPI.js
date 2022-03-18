window.app_saku3_transaksi_yakes_inves_fObliSPI = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_yakes_inves_fObliSPI.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fObliSPI";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan SPI Obligasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,350,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_amor = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,12,200,20],caption:"Tot Amortisasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});		
		this.e_kupon = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,18,200,20],caption:"Tot Akru Kupon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true,change:[this,"doChange"]});		
		this.e_revspi = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,13,200,20],caption:"Rev SPI", tag:8, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_sap = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Post SAP", multiSelection:false, maxLength:10, tag:2,visible:false});		
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"DRK SPI", multiSelection:false, maxLength:10, tag:2,visible:false });
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Jenis",items:["REGULAR","NBUKU"], readOnly:true,tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,200,20],caption:"Total SPI", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[650,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,305], childPage:["Data Obligasi","Data Closing"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:13,tag:9,
		            colTitle:["ID Beli","ID Seri","Nama","SPI | Amort","Nilai Oleh","NBuku(AFS) | Nominal(HTM)","Nilai Wajar","Selisih","Total","Rev SPI","Ni Amortisasi","Ni Kupon","Status"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[70,100,100,100,100,100,100,150,100,70,250,80,100]],
					colFormat:[[4,5,6,7,8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
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
			
			this.cb_sap.setSQL("select a.nik, a.nama from karyawan a inner join sap_nik_post b on a.nik=b.nik "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			var data = this.dbLib.getDataProvider("select nik from sap_nik_post where kode_lokasi ='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.cb_sap.setText(line.nik);
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fObliSPI.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fObliSPI.implement({
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
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_oblispi_m where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_oblispi_j where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_oblispi_d where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update inv_oblispi_d set flag_rev = '-' where flag_rev='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					

						sql.add("delete from inv_obliamor_m where no_amor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_obliamor_j where no_amor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_obliamor_d where no_amor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from inv_obliakru_m where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_obliakru_j where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_obliakru_d where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("delete from glsap where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					}
					
					//---- spi
					sql.add("insert into inv_oblispi_m(no_spi,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input,jenis,no_app1,progress,kode_plan) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','F','OBLSPI','"+this.app._userLog+"','"+this.cb_sap.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate(),'"+this.c_jenis.getText()+"','-','0','"+this.cb_plan.getText()+"')");
					
					//jurnal spi		
					if (nilaiToFloat(this.e_nilai.getText()) > 0) {
						var akunDr = this.akunSPI;																		
						var akunCr = this.akunNT;																								
						var jenis1 = "SPI";
						var jenis2 = "NT";
					}
					else {
						var akunDr = this.akunNT;																																					
						var akunCr = this.akunSPI;
						var jenis1 = "NT";
						var jenis2 = "SPI";	
					}
					var nilai = Math.abs(nilaiToFloat(this.e_nilai.getText()));	
					if (nilai != 0) {
						sql.add("insert into inv_oblispi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+akunDr+"','"+this.e_ket.getText()+"','D',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLSPI','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
						sql.add("insert into inv_oblispi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+akunCr+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLSPI','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																
					}				

					//reverse spi
					if (nilaiToFloat(this.e_revspi.getText()) < 0) {
						var akunDr = this.akunSPI;
						var akunCr = this.akunNT;																								
						var jenis1 = "SPIREV";
						var jenis2 = "NTREV";
					}
					else {
						var akunDr = this.akunNT;																			
						var akunCr = this.akunSPI;
						var jenis1 = "NTREV";
						var jenis2 = "SPIREV";
					}
					var nilai = Math.abs(nilaiToFloat(this.e_revspi.getText()));			
					if (nilai != 0) {
						sql.add("insert into inv_oblispi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+akunDr+"','"+this.e_ket.getText()+"','D',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLSPI','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
						sql.add("insert into inv_oblispi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+akunCr+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLSPI','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}		

					if (this.e_periode.getText().substr(4,2) != "01") {						
						sql.add("insert into inv_oblispi_d(no_spi,kode_lokasi,no_beli,kode_jenis,n_oleh,n_buku,n_wajar,persen,flag_rev,dc,kode_plan) "+					
								"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',no_beli,kode_jenis,n_oleh,n_buku,n_wajar,persen,no_spi,'C',kode_plan "+
								"from inv_oblispi_d where kode_plan='"+this.cb_plan.getText()+"' and flag_rev='-' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update inv_oblispi_d set flag_rev='"+this.e_nb.getText()+"' where kode_plan='"+this.cb_plan.getText()+"' and flag_rev='-' and kode_lokasi='"+this.app._lokasi+"'");																		
					}
					else {
						sql.add("insert into inv_oblispi_d(no_spi,kode_lokasi,no_beli,kode_jenis,n_oleh,n_buku,n_wajar,persen,flag_rev,dc,kode_plan)	"+				
								"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.no_beli,a.kode_jenis,a.n_oleh,a.n_buku,a.n_wajar,a.persen,a.no_spi,'C',a.kode_plan "+
								"from inv_oblispi_d a inner join inv_oblispi_m b on a.no_spi=b.no_spi and b.jenis = 'NBUKU' "+
								"where a.kode_plan='"+this.cb_plan.getText()+"' and a.dc = 'D' and a.no_spi = (select MAX(no_spi) from inv_oblispi_m where jenis='NBUKU') ");
					}
					
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];			
						if (line.status != "HTM") {			
							if (this.c_jenis.getText() == "NBUKU") var flag_rev = "Z";
							else var flag_rev = "-";
							
							var h_oleh = parseFloat(line.n_oleh);
							var h_buku = parseFloat(line.n_buku);
							var h_wajar = parseFloat(line.n_wajar);
							var persen = parseFloat(line.persen);
							
							sql.add("insert into inv_oblispi_d(no_spi,kode_lokasi,no_beli,kode_jenis,n_oleh,n_buku,n_wajar,persen,flag_rev,dc,kode_plan,kode_rdkelola) values "+								
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.no_beli+"','"+line.kode_jenis+"',"+h_oleh+","+h_buku+","+h_wajar+","+persen+",'"+flag_rev+"','D','"+this.cb_plan.getText()+"','"+line.kode_rdkelola+"')");
						}
					}	
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_spi,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"','-','-','-','-','-','-','-', '-','-','-' "+
							"from inv_oblispi_j "+
							"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_spi='"+this.e_nb.getText()+"'");

					//---- amorstisasi		
					sql.add("insert into inv_obliamor_m(no_amor,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,kode_lokasi,periode,nik_user,tgl_input,nik_sap,no_app1,progress,kode_plan) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','F','OBLIAMOR','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_sap.getText()+"','-','0','"+this.cb_plan.getText()+"')");										

					if (nilaiToFloat(this.e_amor.getText()) > 0) {
						var akunDr = this.akunObli;
						var akunCr = this.akunAmor;
						var jenis1 = "OBLI";
						var jenis2 = "AMOR";
					} else {
						var akunDr = this.akunAmor;
						var akunCr = this.akunObli;
						var jenis1 = "AMOR";
						var jenis2 = "OBLI";
					}					
					var nilai = Math.abs(nilaiToFloat(this.e_amor.getText()));					
					if (nilai != 0) {
						sql.add("insert into inv_obliamor_j(no_amor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,'"+akunDr+"','"+this.e_ket.getText()+"','D',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLAMOR','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
						sql.add("insert into inv_obliamor_j(no_amor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',5,'"+akunCr+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLAMOR','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");								
					}						
					//reverse amortisasi sebelumnya
					sql.add("insert into inv_obliamor_d(no_amor,kode_lokasi,periode,no_beli,kode_jenis,akun_obligasi,akun_amor,tgl_akru_seb,tgl_akru,jml_hari,nilai,dc,no_rev)  "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',a.no_beli,a.kode_jenis,'"+this.akunObli+"','"+this.akunAmor+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"',0,a.nilai,'C',a.no_amor "+
							"from inv_obliamor_d a inner join inv_obli_d b on a.no_beli=b.no_beli and a.kode_lokasi=b.kode_lokasi and b.status='HTM' and b.no_oblijual='-' "+
							"where a.no_rev='-' ");		
					sql.add("update a set a.no_rev='"+this.e_nb.getText()+"' "+
							"from inv_obliamor_d a inner join inv_obli_d b on a.no_beli=b.no_beli and a.kode_lokasi=b.kode_lokasi and b.status='HTM' and b.no_oblijual='-' "+
							"where a.no_rev='-' ");	
		
					//amortisasi s/d tgl generate		
					sql.add("insert into inv_obliamor_d(no_amor,kode_lokasi,periode,no_beli,kode_jenis,akun_obligasi,akun_amor,tgl_akru_seb,tgl_akru,jml_hari,nilai,dc,no_rev)  "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',a.no_beli,a.kode_jenis,'"+this.akunObli+"','"+this.akunAmor+"',a.tanggal,a.tanggal,datediff(day,b.tgl_mulai,a.tanggal),a.n_amor,'D','-' "+
							"from inv_obli_kkp a inner join inv_obli_d b on a.no_beli=b.no_beli and b.no_oblijual='-' "+
							"where a.kode_plan='"+this.cb_plan.getText()+"' and a.status='HTM' and a.tanggal='"+this.dp_d1.getDateString()+"'");		
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_amor,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"','-','-','-','-','-','-','-', '-','-','-' "+
							"from inv_obliamor_j "+
							"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_amor='"+this.e_nb.getText()+"'");
												
					//---- akru kupon		
					sql.add("insert into inv_obliakru_m(no_akru,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input,nik_sap,no_app1,progress,kode_plan) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_kupon.getText())+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','F','OBLIAKRU','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate(),'"+this.cb_sap.getText()+"','-','0','"+this.cb_plan.getText()+"')");										

					sql.add("insert into inv_obliakru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',6,'"+this.akunPiuKupon+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_kupon.getText())+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLIAKRU','PIUKUPON','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					sql.add("insert into inv_obliakru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',7,'"+this.akunKupon+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_kupon.getText())+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLIAKRU','KUPON','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");

					sql.add("insert into inv_obliakru_d(no_akru,no_beli,kode_jenis,periode,kode_lokasi,akun_piukupon,akun_kupon,nilai,kode_pp,kode_drk,dc,no_del,nominal,jml_hari,tgl_awal,tgl_akhir,no_cair,no_kas,nilai_cair)  "+
							"select '"+this.e_nb.getText()+"',a.no_beli,a.kode_jenis,'"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.akunPiuKupon+"','"+this.akunKupon+"',a.n_kupon,'"+this.kodepp+"','"+this.cb_drk.getText()+"','D','-',a.n_kupon,0,a.tanggal,a.tanggal,'-','-',0 "+
							"from inv_obli_kkp a inner join inv_obli_d b on a.no_beli=b.no_beli and b.no_oblijual='-' "+
							"where a.kode_plan='"+this.cb_plan.getText()+"'");		
					
					sql.add("update inv_obli_d "+
							"set tgl_akru_kupon_seb=tgl_akru_kupon, "+
							"tgl_akru_kupon = (case when tgl_selesai <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) "+							
							"where no_oblijual='-' and datediff(month,tgl_akru_kupon,tgl_selesai)<>0 and tgl_akru_kupon<tgl_selesai and tgl_akru_kupon <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) ");					
							
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_akru,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"','-','-','-','-','-','-','-', '-','-','-' "+
							"from inv_obliakru_j "+
							"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_akru='"+this.e_nb.getText()+"'");		

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
					this.dataJU.rs.rows = [];					
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
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				/* boleh nol jika hrg wajar=hrg buku dan h buku mau diupdate dengan h_wajr (akhir tahun)
				if (nilaiToFloat(this.e_nilai.getText()) == 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai akru tidak boleh nol.");
					return false;						
				}
				*/
				
				/*
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
				else */ this.simpan();
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
					sql.add("delete from inv_oblispi_m where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_oblispi_j where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_oblispi_d where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_oblispi_d set flag_rev = '-' where flag_rev='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("delete from inv_obliamor_m where no_amor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_obliamor_j where no_amor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_obliamor_d where no_amor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from inv_obliakru_m where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_obliakru_j where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_obliakru_d where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("delete from glsap where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			var data = this.dbLib.getDataProvider("select kode_param,flag from inv_obli_param where kode_plan = '"+this.cb_plan.getText()+"' and kode_param in ('PPINV','DRKOBLSPI','AKUNSPI','OBLINT','OBLAMOR','AKUNOBLI','PIUKUPON','AKUNKUPON')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_param == "PPINV") this.kodepp = line.flag;														
					if (line.kode_param == "DRKOBLSPI") this.drkSPI = line.flag;		
					if (line.kode_param == "AKUNSPI") this.akunSPI = line.flag;
					if (line.kode_param == "OBLINT") this.akunNT = line.flag;
					if (line.kode_param == "OBLAMOR") this.akunAmor = line.flag;
					if (line.kode_param == "AKUNOBLI") this.akunObli = line.flag;
					if (line.kode_param == "PIUKUPON") this.akunPiuKupon = line.flag;
					if (line.kode_param == "AKUNKUPON") this.akunKupon = line.flag;
				}
			}	
		}

		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);
			this.dataJU.rs.rows = [];
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
		var strSQL = "select a.no_beli,y.no_oblijual,a.kode_jenis,x.nama,a.n_oleh,case when a.status <> 'HTM' then a.n_buku else y.nilai end as n_buku,0 as n_wajar,0 as n_selisih,0 as total,isnull(b.nilai_spi,0) as total_spi, 0 as persen,0 as n_amor,0 as n_kupon,a.status,y.kode_rdkelola "+		        
					 "from inv_obli_tmp a "+
					 "		inner join inv_oblijenis x on a.kode_jenis=x.kode_jenis "+
					 "		inner join inv_obli_d y on a.no_beli=y.no_beli "+

					 "      left join ( "+
					 "       	select x.kode_plan,x.no_beli,round(sum( (case x.dc when 'D' then (x.n_wajar-x.n_buku) else -(x.n_wajar-x.n_buku) end) ),0) as nilai_spi "+
					 "       	from inv_oblispi_d x inner join inv_oblispi_m y on x.no_spi=y.no_spi and x.kode_lokasi=y.kode_lokasi "+
					 "       	where y.periode<='"+this.e_periode.getText()+"' and x.flag_rev='-' "+
					 "			group by x.kode_plan,x.no_beli "+
					 "		  ) b on a.no_beli=b.no_beli and a.kode_plan=b.kode_plan "+

					 "where a.nik_user='"+this.nik_user+"'  and a.kode_plan='"+this.cb_plan.getText()+"' "+
					 "order by a.kode_jenis"; 
					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var totrevspi = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];	
				totrevspi += parseFloat(line.total_spi);						
			}					
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();			
			this.doTampilData(1);
		} else this.sg.clear(1);	
		this.e_revspi.setText(floatToNilai(totrevspi));								
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
			
			if (line.status == "HTM") var akunLawan = this.akunAmor;
			else var akunLawan = this.akunSPI;
			this.sg.appendData([line.no_beli,line.kode_jenis,line.nama,akunLawan,floatToNilai(noleh),floatToNilai(nbuku),floatToNilai(line.n_wajar),floatToNilai(line.n_selisih),floatToNilai(line.total),floatToNilai(line.total_spi),floatToNilai(line.n_amor),floatToNilai(line.n_kupon),line.status]);								   
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
			this.dataJU.rs.rows = [];					
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
					 "     left join (select distinct no_spi from inv_oblispi_d where dc ='D' and flag_rev<>'-' and kode_lokasi='"+this.app._lokasi+"') c on a.no_spi=c.no_spi "+
					 "where a.posted='F' and c.no_spi is null and a.progress in ('0','M') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and c.no_spi is null ";
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
				//setTipeButton(tbUbahHapus);
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
						this.cb_drk.setText(line.kode_drk);
						this.c_jenis.setText(line.jenis);											
					}
				}			

				this.e_nilai.setText("0");	
				/*

				belum jadi... tabel spi dan amor berbeda

				var strSQL = "select a.no_beli,y.no_oblijual,x.kode_jenis,x.nama,a.n_oleh,a.n_buku,a.n_wajar,a.n_wajar-a.n_buku as n_selisih,a.n_wajar-a.n_buku as total,isnull(b.nilai_spi,0) as total_spi, 0 as persen,0 as n_amor,0 as n_kupon,'-' as status "+
							 "from   "+
							 "		 inv_oblispi_d a "+
							 "		 inner join inv_oblijenis x on a.kode_jenis=x.kode_jenis  "+		
							 "		 inner join inv_obli_d y on a.no_beli=y.no_beli "+								 			 
							 "       left join ( "+
							 "       	select x.kode_plan,x.no_beli,round(sum(case x.dc when 'D' then (x.n_wajar-x.n_buku) else -(x.n_wajar-x.n_buku) end),0) as nilai_spi "+
							 "       	from inv_oblispi_d x inner join inv_oblispi_m y on x.no_spi=y.no_spi and x.kode_lokasi=y.kode_lokasi "+
							 "       	where y.no_spi<>'"+this.e_nb.getText()+"' and y.periode<='"+this.e_periode.getText()+"' and x.flag_rev='"+this.e_nb.getText()+"' "+
							 "			group by x.kode_plan,x.no_beli "+
							 "		 ) b on a.no_beli=b.no_beli and a.kode_plan=b.kode_plan "+
							  "where a.dc='D' and a.no_spi='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_jenis";
							  
							  alert(strSQL);

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					var line;
					var tot = totrevspi = 0;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];								
						tot += parseFloat(line.total);
						totrevspi += parseFloat(line.total_spi);
					}					
					this.e_nilai.setText(floatToNilai(tot));
					this.e_revspi.setText(floatToNilai(totrevspi));
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();			
					this.doTampilData(1);
					
					
				} else this.sg.clear(1);					
				*/	
			}
		} catch(e) {alert(e);}
	}	
});