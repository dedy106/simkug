window.app_saku3_transaksi_yakes_inves_fRDSPI = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_yakes_inves_fRDSPI.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fRDSPI";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan SPI Reksadana", 0);	
		
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
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true,change:[this,"doChange"]});		
		this.e_revspi = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,13,200,20],caption:"Rev SPI", tag:8, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_sap = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Post SAP", multiSelection:false, maxLength:10, tag:2,visible:false});		
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"DRK SPI", multiSelection:false, maxLength:10, tag:2,visible:false });
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Jenis",items:["REGULAR","NBUKU"], readOnly:true,tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[650,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,305], childPage:["Data Reksadana","Rekap Data","Data Closing"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:13,tag:9,
		            colTitle:["Kode RD","Nama","Kd Kelola","Akun SPI","Jumlah","Nilai Oleh","Nilai Buku","Nilai Wajar","Selisih","Total","Rev SPI","Kd Klp","Jenis"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,100,100,100,100,100,100,60,60,180,80]],
					colFormat:[[4,5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:6,tag:0,
		            colTitle:["Akun","Nilai SPI","Rev SPI","Kode Klp","Jenis","Akun SPI"],
					colWidth:[[5,4,3,2,1,0],[100,80,80,100,100,80]],
					colFormat:[[1,2],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});	
				
		this.l_tgl2 = new portalui_label(this.pc1.childPage[2],{bound:[20,11,100,18],caption:"Tgl Closing Harga", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[2],{bound:[120,11,100,18],selectDate:[this,"doSelectDate2"]}); 
		this.bHitung = new portalui_button(this.pc1.childPage[2],{bound:[230,11,98,18],caption:"Hitung",click:[this,"doHitung"]});		
								
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,242],colCount:2,tag:9,
					colTitle:["Kode RD","Harga/Lbr"],
					colWidth:[[1,0],[200,100]],
					colFormat:[[1],[cfNilai]],readOnly:true,
					autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
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
window.app_saku3_transaksi_yakes_inves_fRDSPI.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fRDSPI.implement({
	doHitung: function() {
		var strSQL = "select a.kode_rd,a.h_wajar from inv_rd_harga a inner join inv_rd b on a.kode_rd=b.kode_rd where a.tanggal ='"+this.dp_d2.getDateString()+"' order by a.kode_rd";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU4 = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);	
			
			//rekondata
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].nilai_wajar=0;
			}				
			
			var line; 
			var tot = 0;
			for (var i=0; i < this.dataJU4.rs.rows.length;i++){
				line = this.dataJU4.rs.rows[i];
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (line.kode_rd == this.dataJU.rs.rows[j].kode_rd) {							
						this.dataJU.rs.rows[j].nilai_wajar = parseFloat(line.h_wajar) * parseFloat(this.dataJU.rs.rows[j].jumlah);							
						this.dataJU.rs.rows[j].h_sls = (parseFloat(line.h_wajar) - parseFloat(this.dataJU.rs.rows[j].h_buku)) * parseFloat(this.dataJU.rs.rows[j].jumlah);
						this.dataJU.rs.rows[j].total = Math.round((parseFloat(line.h_wajar) - parseFloat(this.dataJU.rs.rows[j].h_buku)) *  parseFloat(this.dataJU.rs.rows[j].jumlah));
						tot += parseFloat(this.dataJU.rs.rows[j].total);							
					}
				}
			}

			this.e_nilai.setText(floatToNilai(tot));
			this.doTampilData(1);

			this.sg2.clear();
			var nilaispi1 = nilaispi2 = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				nilaispi1 = parseFloat(line.total);
				nilaispi2 = parseFloat(line.total_spi);
				var isAda = false;
				var idx = totalspi1 = totalspi2 = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (line.akun_spi == this.sg2.cells(0,j) && line.kode_rdklp == this.sg2.cells(3,j) && line.jenis == this.sg2.cells(4,j)  && line.akun_nt == this.sg2.cells(5,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				
				if (!isAda) {
					this.sg2.appendData([line.akun_spi,floatToNilai(nilaispi1),floatToNilai(nilaispi2),line.kode_rdklp,line.jenis,line.akun_nt]);
				} 
				else { 
					totalspi1 = nilaiToFloat(this.sg2.cells(1,idx));
					totalspi1 = totalspi1 + nilaispi1;
					this.sg2.setCell(1,idx,totalspi1);
					
					totalspi2 = nilaiToFloat(this.sg2.cells(2,idx));
					totalspi2 = totalspi2 + nilaispi2;
					this.sg2.setCell(2,idx,totalspi2);
				}			
			}	

		} else this.sg4.clear(1);	
	},
	doTampilData4: function(page) {		
		this.sg4.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line.kode_rd,floatToNilai(line.h_wajar)]); 
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
						sql.add("delete from inv_rdspi_m where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_rdspi_j where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_rdspi_d where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update inv_rdspi_d set flag_rev = '-' where flag_rev='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from glsap where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					}
					
					sql.add("insert into inv_rdspi_m(no_spi,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input,jenis,no_spikug,no_app1,progress,kode_plan) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','F','RDSPI','"+this.app._userLog+"','"+this.cb_sap.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate(),'"+this.c_jenis.getText()+"','-','-','0','"+this.cb_plan.getText()+"')");
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(1,i)) > 0 ) {
									var akunDr = this.sg2.cells(0,i);																		
									// var strSQL = "select akun_nt from inv_rdklp where kode_rdklp='"+this.sg2.cells(3,i)+"'";
									// var data = this.dbLib.getDataProvider(strSQL,true);
									// if (typeof data == "object"){
									// 	var line = data.rs.rows[0];							
									// 	if (line != undefined){											
									// 		var akunCr = line.akun_nt;
									// 	} 
									// }							
									
									var akunCr = this.sg2.cells(5,i);

									var jenis1 = "SPI";
									var jenis2 = "NT";
								} else {									
									// var strSQL = "select akun_nt from inv_rdklp where kode_rdklp='"+this.sg2.cells(3,i)+"'";
									// var data = this.dbLib.getDataProvider(strSQL,true);
									// if (typeof data == "object"){
									// 	var line = data.rs.rows[0];							
									// 	if (line != undefined){											
									// 		var akunDr = line.akun_nt;
									// 	} 
									// }	
									var akunDr = this.sg2.cells(5,i);

									var akunCr = this.sg2.cells(0,i);
									var jenis1 = "NT";
									var jenis2 = "SPI";
								}					
								
								
								var nilai = Math.abs(nilaiToFloat(this.sg2.cells(1,i)));					
								var n = i*4;
								var j = 1+n;
								var k = 2+n;
								if (nilai != 0) {
									sql.add("insert into inv_rdspi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+akunDr+"','"+this.e_ket.getText()+"','D',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','RDSPI','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
									sql.add("insert into inv_rdspi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+k+",'"+akunCr+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','RDSPI','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");								
								}
							
								//reverse SPI
								if (nilaiToFloat(this.sg2.cells(2,i)) < 0 ) {
									var akunDr = this.sg2.cells(0,i);
									// var strSQL = "select akun_nt from inv_rdklp where kode_rdklp='"+this.sg2.cells(3,i)+"'";
									// var data = this.dbLib.getDataProvider(strSQL,true);
									// if (typeof data == "object"){
									// 	var line = data.rs.rows[0];							
									// 	if (line != undefined){											
									// 		var akunCr = line.akun_nt;
									// 	} 
									// }							
									var akunCr = this.sg2.cells(5,i);

									var jenis1 = "SPIREV";
									var jenis2 = "NTREV";
								} else {
									// var strSQL = "select akun_nt from inv_rdklp where kode_rdklp='"+this.sg2.cells(3,i)+"'";
									// var data = this.dbLib.getDataProvider(strSQL,true);
									// if (typeof data == "object"){
									// 	var line = data.rs.rows[0];							
									// 	if (line != undefined){											
									// 		var akunDr = line.akun_nt;
									// 	} 
									// }								
									var akunDr = this.sg2.cells(5,i);

									var akunCr = this.sg2.cells(0,i);
									var jenis1 = "NTREV";
									var jenis2 = "SPIREV";
								}					
								var nilai = Math.abs(nilaiToFloat(this.sg2.cells(2,i)));					
								var j = 3+n;
								var k = 4+n;
								if (nilai != 0) {
									sql.add("insert into inv_rdspi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+akunDr+"','"+this.e_ket.getText()+"','D',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','RDSPI','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
									sql.add("insert into inv_rdspi_j(no_spi,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+k+",'"+akunCr+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','RDSPI','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								}
							}
						}
					}
					
					if (this.e_periode.getText().substr(4,2) != "01") {
						sql.add("insert into inv_rdspi_d(no_spi,kode_lokasi,kode_rdkelola,kode_rd,jumlah,h_oleh,h_buku,h_wajar,flag_rev,dc,kode_plan) "+					
								"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_rdkelola,kode_rd,jumlah,h_oleh,h_buku,h_wajar,no_spi,'C',kode_plan "+
								"from inv_rdspi_d where kode_plan='"+this.cb_plan.getText()+"' and flag_rev='-' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update inv_rdspi_d set flag_rev='"+this.e_nb.getText()+"' where kode_plan='"+this.cb_plan.getText()+"' and flag_rev='-' and kode_lokasi='"+this.app._lokasi+"'");					
					}
					else {
						sql.add("insert into inv_rdspi_d(no_spi,kode_lokasi,kode_rdkelola,kode_rd,jumlah,h_oleh,h_buku,h_wajar,flag_rev,dc,kode_plan)	"+				
								"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.kode_rdkelola,a.kode_rd,a.jumlah,a.h_oleh,a.h_buku,a.h_wajar,a.no_spi,'C',a.kode_plan "+
								"from inv_rdspi_d a inner join inv_rdspi_m b on a.no_spi=b.no_spi and b.jenis = 'NBUKU' "+
								"where a.kode_plan='"+this.cb_plan.getText()+"' and a.dc = 'D' and a.no_spi = (select MAX(no_spi) from inv_rdspi_m where jenis='NBUKU') ");
					}
					
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];						
						if (this.c_jenis.getText() == "NBUKU") var flag_rev = "Z";
						else var flag_rev = "-";
						if (parseFloat(line.jumlah)!=0) {
							var h_oleh = parseFloat(line.nilai_oleh) / parseFloat(line.jumlah);
							var h_buku = parseFloat(line.nilai_buku) / parseFloat(line.jumlah);
							var h_wajar = parseFloat(line.nilai_wajar) / parseFloat(line.jumlah);
						}
						else {
							var h_oleh = 0;
							var h_buku = 0;
							var h_wajar = 0;
						}
						sql.add("insert into inv_rdspi_d(no_spi,kode_lokasi,kode_rdkelola,kode_rd,jumlah,h_oleh,h_buku,h_wajar,flag_rev,dc,kode_plan) values "+								
					            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_rdkelola+"','"+line.kode_rd+"',"+line.jumlah+","+h_oleh+","+h_buku+","+h_wajar+",'"+flag_rev+"','D','"+this.cb_plan.getText()+"')");
					}	
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_spi,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"','-','-','-','-','-','-','-', '-','-','-' "+
							"from inv_rdspi_j "+
							"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_spi='"+this.e_nb.getText()+"'");
							
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
					this.sg2.clear(1);
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
					sql.add("delete from inv_rdspi_m where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_rdspi_j where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_rdspi_d where no_spi='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_rdspi_d set flag_rev = '-' where flag_rev='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
			var data = this.dbLib.getDataProvider("select kode_param,flag from inv_rd_param where kode_plan = '"+this.cb_plan.getText()+"' and kode_param in ('RDDRKSPI','PPINV')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_param == "PPINV") this.kodepp = line.flag;	
					if (line.kode_param == "RDDRKSPI") this.cb_drk.setText(line.flag);							
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
				this.sg2.clear(1); 
				this.sg3.clear(1);	
				this.sg4.clear(1);		
				this.bTampil.show();				
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_rdspi_m","no_spi",this.app._lokasi+"-RSPI"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doLoadData: function(sender){
		this.pc1.setActivePage(this.pc1.childPage[0]);
		// this.nik_user=this.app._nikUser;						
		// var sql = "call sp_get_hrdkelola ('"+this.cb_plan.getText()+"','"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";								
		// this.dbLib.execQuerySync(sql);	
		
		this.e_nilai.setText("0");		
		var strSQL = "select yy.kode_rdklp,case z.jenis when 'TRADING' then yy.akun_spi else yy.akun_rdhts end as akun_spi,x.kode_rdkelola,a.kode_rd,x.nama,a.jumlah,a.h_oleh,a.h_buku,a.h_oleh * a.jumlah as nilai_oleh,a.h_buku * a.jumlah as nilai_buku,0 as nilai_wajar,0 as nilai_sls,0 as total,isnull(b.nilai_spi,0) as total_spi, z.jenis,  case z.jenis when 'TRADING' then yy.akun_nt else yy.akun_nthts end as akun_nt "+		        
					 //"from inv_rd_tmp a inner join inv_rd x on a.kode_rd=x.kode_rd "+
					 "from inv_rd_kkp a inner join inv_rd x on a.kode_rd=x.kode_rd "+
					 "                  inner join inv_rdkelola y on x.kode_rdkelola=y.kode_rdkelola "+
					 "                  inner join inv_rdklp yy on x.kode_rdklp=yy.kode_rdklp "+

					 "					inner join inv_rd_d z on z.kode_rd=a.kode_rd and a.kode_plan=z.kode_plan "+

					 "       left join ( "+
					 "       	select x.kode_plan,x.kode_rdkelola,x.kode_rd,round(sum( (case x.dc when 'D' then (x.h_wajar-x.h_buku) else -(x.h_wajar-x.h_buku) end) * x.jumlah),0) as nilai_spi "+
					 "       	from inv_rdspi_d x inner join inv_rdspi_m y on x.no_spi=y.no_spi and x.kode_lokasi=y.kode_lokasi "+
					 "       	where y.periode<='"+this.e_periode.getText()+"' and x.flag_rev='-' "+
					 "			group by x.kode_plan,x.kode_rd,x.kode_rdkelola "+
					 "		  ) b on a.kode_rd=b.kode_rd and a.kode_plan=b.kode_plan "+
					//"where a.nik_user='"+this.nik_user+"'  and a.kode_plan='"+this.cb_plan.getText()+"' "+
					 "where a.tanggal='"+this.dp_d1.getDateString()+"'  and a.kode_plan='"+this.cb_plan.getText()+"' "+
					 "order by a.kode_rd"; //where a.jumlah <> 0 --> yg sudah dijual di reverse meski jmlnya sudah nol		

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
			var jml = Math.round( parseFloat(line.jumlah) * 100) / 100;
			var noleh = Math.round( parseFloat(line.nilai_oleh) * 100) / 100;
			var nbuku = Math.round( parseFloat(line.nilai_buku) * 100) / 100; 		
			this.sg.appendData([line.kode_rd,line.nama,line.kode_rdkelola,line.akun_spi,floatToNilai(jml),floatToNilai(noleh),floatToNilai(nbuku),floatToNilai(line.nilai_wajar),floatToNilai(line.nilai_sls),floatToNilai(line.total),floatToNilai(line.total_spi),line.kode_rdklp,line.jenis]);								   
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
			this.sg2.clear(1);
			this.sg4.clear(1);
			setTipeButton(tbSimpan);
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
		             "from inv_rdspi_m a "+					 
					 "     left join (select distinct no_spi from inv_rdspi_d where dc ='D' and flag_rev<>'-' and kode_lokasi='"+this.app._lokasi+"') c on a.no_spi=c.no_spi "+
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
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_rdspi_m where no_spi= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
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
				var strSQL = "select yy.kode_rdklp,case z.jenis when 'TRADING' then yy.akun_spi else yy.akun_rdhts end as akun_spi,x.kode_rdkelola,a.kode_rd,x.nama,a.jumlah,a.h_oleh,a.h_buku,a.h_oleh * a.jumlah as nilai_oleh,a.h_buku * a.jumlah as nilai_buku,round(a.h_wajar * a.jumlah,0) as nilai_wajar,round((a.h_wajar-a.h_buku) * a.jumlah,0) as nilai_sls,round((a.h_wajar-a.h_buku) * a.jumlah,0) as total,isnull(b.nilai_spi,0) as total_spi,z.jenis ,  case z.jenis when 'TRADING' then yy.akun_nt else yy.akun_nthts end as akun_nt "+		        
						 	 "from inv_rdspi_d a inner join inv_rd x on a.kode_rd=x.kode_rd  "+
							 "                   inner join inv_rdklp yy on x.kode_rdklp=yy.kode_rdklp "+

							 "					 inner join inv_rd_d z on z.kode_rd=a.kode_rd and a.kode_plan=z.kode_plan "+

							 "       left join ( "+
							 "       	select x.kode_plan,x.kode_rdkelola,x.kode_rd,round(sum( (case x.dc when 'D' then (x.h_wajar-x.h_buku) else -(x.h_wajar-x.h_buku) end) * x.jumlah),0) as nilai_spi "+
							 "       	from inv_rdspi_d x inner join inv_rdspi_m y on x.no_spi=y.no_spi and x.kode_lokasi=y.kode_lokasi "+
							 "       	where y.no_spi<>'"+this.e_nb.getText()+"' and y.periode<='"+this.e_periode.getText()+"' and x.flag_rev='"+this.e_nb.getText()+"' "+
							 "			group by x.kode_plan,x.kode_rd,x.kode_rdkelola "+
							 "		 ) b on a.kode_rd=b.kode_rd and a.kode_plan=b.kode_plan "+
					 		 "where a.dc='D' and a.no_spi='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_rd";
					 		 			 
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
					
					
					this.sg2.clear();
					var nilaispi1 = nilaispi2 = 0;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						nilaispi1 = parseFloat(line.total);
						nilaispi2 = parseFloat(line.total_spi);
						var isAda = false;
						var idx = totalspi1 = totalspi2 = 0;
						for (var j=0;j < this.sg2.getRowCount();j++){
							if (line.akun_spi == this.sg2.cells(0,j) && line.kode_rdklp == this.sg2.cells(3,j) && line.jenis == this.sg2.cells(4,j) && line.akun_nt == this.sg2.cells(5,j) ) {
								isAda = true;
								idx = j;
								break;
							}
						}
				
						if (!isAda) {
							this.sg2.appendData([line.akun_spi,floatToNilai(nilaispi1),floatToNilai(nilaispi2),line.kode_rdklp,line.jenis, line.akun_nt]);
						} 
						else { 
							totalspi1 = nilaiToFloat(this.sg2.cells(1,idx));
							totalspi1 = totalspi1 + nilaispi1;
							this.sg2.setCell(1,idx,totalspi1);
					
							totalspi2 = nilaiToFloat(this.sg2.cells(2,idx));
							totalspi2 = totalspi2 + nilaispi2;
							this.sg2.setCell(2,idx,totalspi2);
						}			
					}
			
				} else this.sg.clear(1);					
				
			}
		} catch(e) {alert(e);}
	}	
});