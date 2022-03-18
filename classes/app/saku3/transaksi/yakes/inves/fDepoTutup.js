window.app_saku3_transaksi_yakes_inves_fDepoTutup = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fDepoTutup.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fDepoTutup";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penutupan Deposito", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,340,80,100]],colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.e_nb2 = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[260,12,200,20],caption:"No Bukti AkruBunga",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});												
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,996,351], childPage:["Data Deposito","Justifikasi","Data Baru","AkruBunga"]});		
		this.cb_sap = new saiCBBL(this.pc1.childPage[0],{bound:[620,13,220,20],caption:"NIK Post SAP", multiSelection:false, maxLength:10, tag:2,visible:false});
		this.cb_plan = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true,change:[this,"doChange"]});		
		this.c_jenisdata = new saiCB(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Filter Data",items:["JTHTEMPO","ALL"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_depo = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"No Deposito", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_tanggal = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,300,20],caption:"Tgl Deposito", readOnly:true});						
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Jenis", readOnly:true});
		this.e_status = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Status Dana", readOnly:true});								
		this.e_nominal = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nominal", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_rbunga = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Reverse Bunga", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_pinalti = new saiLabelEdit(this.pc1.childPage[0],{bound:[320,13,200,20],caption:"Biaya Pinalti", tag:1, tipeText:ttNilai, text:"0"});															
		this.e_nbunga = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai Bunga", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_biaya = new saiLabelEdit(this.pc1.childPage[0],{bound:[320,14,200,20],caption:"Biaya Administrasi", tag:1, tipeText:ttNilai, text:"0"});													
		this.bcair = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Bank Pencairan", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});				
		this.cb_cair = new saiCBBL(this.pc1.childPage[0],{bound:[20,20,220,20],caption:"Akun Bank Cair", multiSelection:false, maxLength:10, tag:9});					
		this.bbunga = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"Bank Bunga", multiSelection:false, maxLength:10, tag:9});								
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Jenis Transaksi",items:["TUTUP","PERPANJANG","SEBAGIAN","PINDAHJNS"], readOnly:true,tag:2,change:[this,"doChange"]});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:21,tag:9,
				colTitle:["Kd Bank","Nama Bank","Kategori", "1-4H","5-12H","13-20H","21-28H","1B","3B",
						  "Maks Penempatan","DOC Eks","Deposito Eks","Jumlah","Sisa","Keterangan",  
						  "DOC JthTempo","Deposito JthTempo","DOC Cair","Deposito Cair","DOC Perpanjang","Deposito Perpanjang"],
				colWidth:[[20,19,18,17,16,15,  14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[110,110,110,110,110,110, 200, 100,100,100,100,100, 60,60, 60,60,60,60 ,80,200,80]],
				columnReadOnly:[true,[9,10,11,12,13, 15,16,17,18,19,20],[0,1,2,3,4,5,6,7,8,14]],
				colFormat:[[3,4,5,6,7,8,9,10,11,12,13, 15,16,17,18,19,20],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],																				
				autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager"]});		
		this.bClear = new portalui_imageButton(this.sgn2,{bound:[this.sgn2.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear Rate",click:[this,"doClear"]});		

		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,450,20],caption:"Keterangan", maxLength:150,tag:9,readOnly:true});												
		this.c_jenis2 = new saiCB(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Jenis Baru",items:["DOC","DEPOSITO"], readOnly:true,tag:9,change:[this,"doChange"]});				
		this.l_tgl2 = new portalui_label(this.pc1.childPage[2],{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[2],{bound:[120,11,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.l_tgl3 = new portalui_label(this.pc1.childPage[2],{bound:[20,12,100,18],caption:"Jth Tempo", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[2],{bound:[120,12,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.e_jml2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"Jumlah Hari", readOnly:true, tipeText:ttNilai, text:"0",tag:9,change:[this,"doChange"]});
		this.e_pbunga2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"Rate [%Tahun]", tipeText:ttNilai, text:"0",tag:9,readOnly:true});				
		this.e_basis2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"Basis [Hari]", tipeText:ttNilai, text:"0",tag:9,readOnly:true});						
		this.e_npanjang = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"Nilai Perpanjang", tag:9, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_noDepoBaru = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,200,20],caption:"No Depo Baru", maxLength:150,tag:9,readOnly:true});												
		
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:15,tag:9,
		            colTitle:["No Deposito","Keterangan","Akun Piutang","Akun Pdpt","Tgl Awal","Tgl Akhir","Jml Hari","Basis","Rate","Nominal","Net Akru","Net Hitung","Nilai Rev","Pajak Akru","Pajak Hitung"],
					colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,70,70,70,80,80,80,80,150,100]],
					colFormat:[[6,7,8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					colHide:[[13,14],[true,true]],
					autoPaging:true, rowPerPage:20,
					readOnly:true,
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
				
			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('PPINV','PLAN','MAXEQU','MAXKAS','BUDEPDRK') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];				
					if (line.kode_spro == "PPINV") this.kodePP = line.flag;	
					if (line.kode_spro == "BUDEPDRK") this.drkBunga = line.flag;													
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);
					if (line.kode_spro == "MAXEQU") this.stsMaxEqu = line.flag;						
					if (line.kode_spro == "MAXKAS") {
						this.stsMaxKas = line.flag;	
						this.persenMaxKas = parseFloat(line.value1);
					}																										
				}
			}
			
			var data = this.dbLib.getDataProvider("select kode_kelola from inv_kelola where jenis ='SWAKELOLA'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.kodeKelola = line.kode_kelola; 
			}

			this.cb_sap.setSQL("select a.nik, a.nama from karyawan a inner join sap_nik_post b on a.nik=b.nik "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);							   
			var data = this.dbLib.getDataProvider("select nik from sap_nik_post where kode_lokasi ='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.cb_sap.setText(line.nik);
			}			
			
			this.c_jenisdata.setText("JTHTEMPO");			
			this.cb_cair.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and b.kode_lokasi='"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun",true);			
			this.bcair.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);			
			this.bbunga.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);			
			
			this.c_jenis2.setText("");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fDepoTutup.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fDepoTutup.implement({
	doRekap: function() {		
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.sg2.rowValid(i)){
				if (this.sg2.cells(0,i) == this.bDepoBank) {
					if (this.c_jenis2.getText() == "DOC") {
						var tot = nilaiToFloat(this.sg2.cells(19,i)) + nilaiToFloat(this.e_npanjang.getText());
						this.sg2.cells(19,i,tot);
					}
					else {
						var tot = nilaiToFloat(this.sg2.cells(20,i)) + nilaiToFloat(this.e_npanjang.getText());
						this.sg2.cells(20,i,tot);
					}
				}
			}
		}
	},
	doHitungBunga: function(sender){
		try {
			if (this.cb_depo.getText()!="") {
				this.e_nbunga.setText("0");								
				this.e_rbunga.setText("0");								
				
				//this.periodeAktif = this.dbLib.getPeriode(this.app._lokasi); --- jd minus kl belum closing	
				this.periodeAktif = this.e_periode.getText();					
				if (this.periodeAktif.substr(4,2) == "13")	this.periodeAktif = this.periodeAktif.substr(0,4)+"12";
						
				var tglPerAktif = this.periodeAktif.substr(0,4)+"-"+this.periodeAktif.substr(4,2)+"-01";				
				var data = this.dbLib.getDataProvider("select convert(varchar,dateadd(s,-1,dateadd(mm, datediff(m,0,'"+tglPerAktif+"')+1,0)),111) as tgl_akhir",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.tglAkhirAkru = line.tgl_akhir;
					}
				}
				
				if (this.c_jenisdata.getText() == "JTHTEMPO") {
					var strSQL = "select a.no_depo,a.keterangan,a.akun_piutang,a.akun_pdpt,"+
								 "convert(varchar,a.tgl_akru,111) as tgl_akru, "+		             
								 "convert(varchar,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+tglPerAktif+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+tglPerAktif+"')+1,0))) end ,111) as tgl_akhir, "+
								 "datediff(day,a.tgl_akru,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+tglPerAktif+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+tglPerAktif+"')+1,0))) end) as jml_hari,"+
								 "a.basis,a.p_bunga,a.nilai, "+					 
								 "round((cast(datediff(day,a.tgl_akru,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+tglPerAktif+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+tglPerAktif+"')+1,0))) end) as float) / a.basis * a.nilai * a.p_bunga/100 * 0.8),0) as nilai_akru, "+					 
								 "round((cast(datediff(day,a.tgl_akru,a.tgl_selesai) as float)  / a.basis * a.nilai * a.p_bunga/100 * 0.8),0) as nilai_hitung, "+
							 
								 "round((cast(datediff(day,a.tgl_akru,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+tglPerAktif+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+tglPerAktif+"')+1,0))) end) as float) / a.basis * a.nilai * a.p_bunga/100 * 0.2),0) as pajak_akru, "+					 
								 "round((cast(datediff(day,a.tgl_akru,a.tgl_selesai) as float)  / a.basis * a.nilai * a.p_bunga/100 * 0.2),0) as pajak_hitung, "+
							 
								 "isnull(b.reverse,0) as reverse "+
								 "from inv_depo2_m a "+
								 "    left join ( "+
								 "                select no_depo,kode_lokasi,sum(nilai-pajak_akru) as reverse "+
								 "                from inv_depoakru_d "+
								 "                where no_cair ='-' and no_flag='-' and kode_lokasi='"+this.app._lokasi+"' group by no_depo,kode_lokasi "+
								 "     ) b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
								 "where a.progress = '1' and a.no_depo='"+this.cb_depo.getText()+"' and a.tgl_akru < a.tgl_selesai";		
				}
				else { //ALL ---> BREAKABLE
					var strSQL = "select a.no_depo,a.keterangan,a.akun_piutang,a.akun_pdpt,"+
								 "convert(varchar,a.tgl_akru,111) as tgl_akru, "+		             
								 "convert(varchar, '"+this.dp_d1.getDateString()+"' ,111) as tgl_akhir, "+
								 "datediff(day,a.tgl_akru,'"+this.dp_d1.getDateString()+"') as jml_hari,"+
								 "a.basis,a.p_bunga,a.nilai, "+					 
								 "round((cast(datediff(day,a.tgl_akru,'"+this.dp_d1.getDateString()+"') as float) / a.basis * a.nilai * a.p_bunga/100 * 0.8),0) as nilai_akru, "+					 
								 "round((cast(datediff(day,a.tgl_akru,a.tgl_selesai) as float)  / a.basis * a.nilai * a.p_bunga/100 * 0.8),0) as nilai_hitung, "+
							 
								 "round((cast(datediff(day,a.tgl_akru,'"+this.dp_d1.getDateString()+"') as float) / a.basis * a.nilai * a.p_bunga/100 * 0.2),0) as pajak_akru, "+					 
								 "round((cast(datediff(day,a.tgl_akru,a.tgl_selesai) as float)  / a.basis * a.nilai * a.p_bunga/100 * 0.2),0) as pajak_hitung, "+
							 
								 "isnull(b.reverse,0) as reverse "+
								 "from inv_depo2_m a "+
								 "    left join ( "+
								 "                select no_depo,kode_lokasi,sum(nilai-pajak_akru) as reverse "+
								 "                from inv_depoakru_d "+
								 "                where no_cair ='-' and no_flag='-' and kode_lokasi='"+this.app._lokasi+"' group by no_depo,kode_lokasi "+
								 "     ) b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
								 "where a.progress = '1' and a.no_depo='"+this.cb_depo.getText()+"' and a.tgl_akru < a.tgl_selesai";
				}
				var data = this.dbLib.getDataProvider(strSQL,true);		
				var nbunga = rbunga = 0;
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						nbunga += parseFloat(line.nilai_akru);
						rbunga += parseFloat(line.reverse);
						this.sg.appendData([line.no_depo,line.keterangan,line.akun_piutang,line.akun_pdpt,line.tgl_akru,line.tgl_akhir,floatToNilai(line.jml_hari),floatToNilai(line.basis),floatToNilai(line.p_bunga),floatToNilai(line.nilai),floatToNilai(line.nilai_akru),floatToNilai(line.nilai_hitung),floatToNilai(line.reverse),floatToNilai(line.pajak_akru),floatToNilai(line.pajak_hitung)]);
					}
				} else this.sg.clear(1);						
				
				this.e_nbunga.setText(floatToNilai(nbunga));								
				this.e_rbunga.setText(floatToNilai(rbunga));								
			}
		}
		catch(e) {
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
			if (this.stsSimpan == 1) {
				this.doClick(this.i_gen);
				this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depoakru_m","no_akru",this.app._lokasi+"-DAK"+this.e_periode.getText().substr(2,4)+".","0000"));
			}
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_depotutup_m where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update inv_depo2_m set progress='1',ref1='-' where ref1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depotutup_d where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("update inv_depoakru_d set no_flag='-' where no_flag='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update a set a.tgl_hitung=a.tgl_hitungseb "+
						        "from inv_depo2_m a inner join inv_depoakru_d b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
								"where b.no_akru='"+this.e_nb2.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("delete from inv_depoakru_m where no_akru='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depoakru_j where no_akru='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depoakru_d where no_akru='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from glsap where no_bukti='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
						sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_shop_just where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depotutup_j where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depo2_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from glsap where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from inv_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_app_d where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					}					
					
					//nilai= nilai tutup
					var nilai = nilaiToFloat(this.e_nominal.getText()) - nilaiToFloat(this.e_npanjang.getText());							
					//jika pindah jenis, DOC-->DEPO atau sebaliknya, maka diposting dri inv_depotutup_m, else dari inv_shop_m
					if (this.c_jenis.getText() == "PINDAHJNS") var vPosted = "F";
					else var vPosted = "X";
					
					if (this.c_jenis.getText() == "TUTUP" || this.c_jenis.getText() == "PERPANJANG" || this.c_jenis.getText() == "PINDAHJNS")
						var noShop = this.e_nb.getText();					
					else var noShop = "-";

					sql.add("update inv_depo2_m set progress='Z',ref1='"+this.e_nb.getText()+"' where no_depo='"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("insert into inv_depotutup_m(no_tutup,no_depo,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,modul,nik_buat,nik_setuju,kode_lokasi,periode,akun_doc,nik_user,tgl_input,no_kas,jenis,nilai_pinalti,nilai_adm,posted,nilai_panjang,bcair,bbunga, no_app,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilai+",'"+this.kodePP+"','DOCTTP','"+this.app._userLog+"','"+this.cb_sap.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.akunDepo+"','"+this.app._userLog+"',getdate(),'-','"+this.c_jenis.getText()+"',"+nilaiToFloat(this.e_pinalti.getText())+","+nilaiToFloat(this.e_biaya.getText())+",'"+vPosted+"',"+nilaiToFloat(this.e_npanjang.getText())+",'"+this.bcair.getText()+"','"+this.bbunga.getText()+"','-','0')");										
					sql.add("insert into inv_depotutup_d (no_tutup,kode_lokasi,no_depo,nilai_tutup,nilai_panjang,no_shop) values "+
					        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_depo.getText()+"',"+nilai+","+nilaiToFloat(this.e_npanjang.getText())+",'"+noShop+"')");
													
					//---------------------------------------------------- utk pindah jenis atau perpanjang --------------------------------------------------		
					if (this.c_jenis.getText() == "PINDAHJNS" || this.c_jenis.getText() == "PERPANJANG") {
						if (this.c_jenis2.getText() == "DOC") {
							var jmlHari = nilaiToFloat(this.e_jml2.getText());
							var jmlBulan = 0;
						}
						else {
							var jmlBulan = nilaiToFloat(this.e_jml2.getText());
							var jmlHari = 0;
						}
						sql.add("insert into inv_shop_m (no_shop,periode,nik_user,tgl_input,kode_lokasi,tanggal,keterangan,nik_app,tgl_awal,tgl_akhir,jml_hari,jml_bulan,progress,nilai,no_app,no_spb,bsumber,  nodin,kepada1,dari1,lamp1,hal1,nikttd1,jab1,  noins,nikttd2,jab2,nikttd3,jab3,just,kode_pp,modul, nik_sap, kode_plan) values "+
								"('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"',"+jmlHari+","+jmlBulan+",'0',"+nilaiToFloat(this.e_npanjang.getText())+",'-','-','-', '-','-','-','-','-','-','-','-','-','-','-','-','-','"+this.app._kodePP+"','"+this.c_jenis.getText()+"','"+this.cb_sap.getText()+"', '"+this.cb_plan.getText()+"')");
						
						for (var i=0;i < this.sg2.getRowCount();i++) {
							if (this.sg2.rowValid(i)){		
								sql.add("insert into inv_shop_just(no_shop,kode_lokasi,kode_bankklp,h1,h2,h3,h4,b1,b3, maks,doc_eks,depo_eks,keterangan,doc_jth,depo_jth,doc_cair,depo_cair,doc_pjg,depo_pjg,doc_baru,depo_baru) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(7,i))+","+nilaiToFloat(this.sg2.cells(8,i))+
										","+nilaiToFloat(this.sg2.cells(9,i))+","+nilaiToFloat(this.sg2.cells(10,i))+","+nilaiToFloat(this.sg2.cells(11,i))+",'"+this.sg2.cells(14,i)+
										"',"+nilaiToFloat(this.sg2.cells(15,i))+","+nilaiToFloat(this.sg2.cells(16,i))+","+nilaiToFloat(this.sg2.cells(17,i))+","+nilaiToFloat(this.sg2.cells(18,i))+","+nilaiToFloat(this.sg2.cells(19,i))+","+nilaiToFloat(this.sg2.cells(20,i))+",0,0)");
							}
						}

						if (this.c_jenis2.getText() == "DOC") var sat = "HARI"; else var sat = "BULAN";												
						var noDepo = this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depo2_m","no_depo",this.app._lokasi+"-DEPO"+this.e_periode.getText().substr(2,4)+".","000");
						
						//langsung approve pogress=1 nokas = nobuktitutup
						sql.add("insert into inv_depo2_m(no_depo,kode_lokasi,periode,tanggal,nik_user,tgl_input,no_kas,progress,tgl_akru_seb,tgl_akru,jenis,status_dana,no_bilyet,keterangan,tgl_mulai,tgl_selesai,jml_hari,basis,p_bunga,nilai,bsumber,bdepo,bcair,bbunga,akun_depo,akun_piutang,akun_pdpt,nik_buat,kode_kelola,no_shop,ref1,tgl_hitung,tgl_hitungseb, kode_plan) values "+
								"('"+noDepo+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d2.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','1','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.c_jenis2.getText()+"','"+this.e_status.getText()+"','-','"+this.e_nama2.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"',"+nilaiToFloat(this.e_jml2.getText())+","+nilaiToFloat(this.e_basis2.getText())+","+nilaiToFloat(this.e_pbunga2.getText())+","+nilaiToFloat(this.e_npanjang.getText())+",'"+this.bSumberLama+"','"+this.bDepoLama+"','"+this.bCairLama+"','"+this.bBungaLama+"','-','-','-','"+this.app._userLog+"','"+this.kelolaLama+"','"+this.e_nb.getText()+"','-','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.cb_plan.getText()+"')");
								
						sql.add("update a set a.akun_depo=b.akun_depo,a.akun_piutang=b.akun_piutang,a.akun_pdpt=b.akun_bunga "+							
								"from inv_depo2_m a inner join inv_depo_param b on a.jenis=b.jenis and a.kode_plan=b.kode_plan "+
								"where a.no_depo='"+noDepo+"' and a.kode_lokasi='"+this.app._lokasi+"'");
										
						if (this.c_jenis.getText() == "PINDAHJNS") {
							sql.add("insert into inv_depotutup_j(no_tutup,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
									"select '"+this.e_nb.getText()+"','"+noDepo+"','"+this.dp_d1.getDateString()+"',0,akun_depo,'"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_npanjang.getText())+",'"+this.kodePP+"','-','"+this.app._lokasi+"','DOCTTP','DEPOBARU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
									"from inv_depo2_m "+
									"where no_depo = '"+noDepo+"'");						
							sql.add("insert into inv_depotutup_j(no_tutup,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
									"select '"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"',1,akun_depo,'"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_npanjang.getText())+",'"+this.kodePP+"','-','"+this.app._lokasi+"','DOCTTP','DEPOLAMA','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
									"from inv_depo2_m "+
									"where no_depo = '"+this.cb_depo.getText()+"' ");
						}										
					}					
					

					//-------------------------------------------------  bunga  -------------------------------------------------------------
					if (this.e_rbunga.getText() != "0" || this.e_nbunga.getText() != "0") {
						this.periodeAktif = this.e_periode.getText();
						this.tglAkhirAkru = this.dp_d1.getDateString(); 
						
						sql.add("insert into inv_depoakru_m(no_akru,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input, no_app,progress) values "+
								"('"+this.e_nb2.getText()+"','-','"+this.tglAkhirAkru+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nbunga.getText())+",'"+this.kodePP+"','"+this.drkBunga+"','F','TUTUPAKRU','"+this.app._userLog+"','"+this.cb_sap.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','"+this.e_nb.getText()+"','"+this.app._userLog+"',getdate(),'-','0')");
						
						if (this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){ 
								if (this.sg.rowValid(i)){
									//reverse akru seb								
									sql.add("update inv_depoakru_d set no_flag='"+this.e_nb2.getText()+"' where no_depo='"+this.sg.cells(0,i)+"' and dc='D' and no_flag='-' and no_cair='-' and kode_lokasi='"+this.app._lokasi+"'");
									sql.add("insert into inv_depoakru_d(no_akru,no_depo,periode,nilai,kode_lokasi,akun_piutang,akun_pdpt,kode_pp,kode_drk,dc,no_del,nilai_depo,jml_hari,tgl_awal,tgl_akhir,no_cair,no_kas,nilai_cair,pajak_akru,nilai_hitung,pajak_hitung,nilai_adm,no_flag) "+
											"select '"+this.e_nb2.getText()+"',no_depo,'"+this.periodeAktif+"',nilai,kode_lokasi,akun_piutang,akun_pdpt,kode_pp,kode_drk,'C',no_del,nilai_depo,jml_hari,tgl_awal,tgl_akhir,'"+this.e_nb2.getText()+"','"+this.e_nb2.getText()+"',nilai_cair,pajak_akru,nilai_hitung,pajak_hitung,nilai_adm,no_akru "+
											"from inv_depoakru_d where no_depo='"+this.sg.cells(0,i)+"' and no_flag='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
											
									var akruBruto = nilaiToFloat(this.sg.cells(10,i)) + nilaiToFloat(this.sg.cells(13,i));
									var hitungBruto = nilaiToFloat(this.sg.cells(11,i)) + nilaiToFloat(this.sg.cells(14,i));
									sql.add("insert into inv_depoakru_d(no_akru,no_depo,periode,nilai,kode_lokasi,akun_piutang,akun_pdpt,kode_pp,kode_drk,dc,no_del,nilai_depo,jml_hari,tgl_awal,tgl_akhir,no_cair,no_kas,nilai_cair,pajak_akru,nilai_hitung,pajak_hitung,nilai_adm,no_flag) values "+
											"('"+this.e_nb2.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"',"+akruBruto+",'"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.kodePP+"','"+this.drkBunga+"','D','-',"+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','-','-',0,"+nilaiToFloat(this.sg.cells(13,i))+","+hitungBruto+","+nilaiToFloat(this.sg.cells(14,i))+",0,'-')");								
									sql.add("update inv_depo2_m set tgl_hitungseb=tgl_hitung,tgl_hitung=(case when dateadd(MONTH,1,tgl_hitung) <= tgl_selesai then dateadd(MONTH,1,tgl_hitung) else tgl_selesai end)  where no_depo='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
							}
						}
						
						sql.add("insert into inv_depoakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
								"select no_akru,'"+this.e_nb.getText()+"','"+this.tglAkhirAkru+"',0,akun_piutang,'"+this.e_ket.getText()+"','D',sum(nilai-pajak_akru),'"+this.kodePP+"','-','"+this.app._lokasi+"','TUTUPAKRU','PIU','"+this.periodeAktif+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from inv_depoakru_d where no_akru = '"+this.e_nb2.getText()+"' and no_flag='-' group by no_akru,akun_piutang");
						sql.add("insert into inv_depoakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
								"select no_akru,'"+this.e_nb.getText()+"','"+this.tglAkhirAkru+"',1,akun_pdpt,'"+this.e_ket.getText()+"','C',sum(nilai-pajak_akru),'"+this.kodePP+"','"+this.drkBunga+"','"+this.app._lokasi+"','TUTUPAKRU','PDPT','"+this.periodeAktif+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from inv_depoakru_d where no_akru = '"+this.e_nb2.getText()+"' and no_flag='-' group by no_akru,akun_pdpt");					
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
								"select no_akru,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,nilai "+
								"from inv_depoakru_j where jenis = 'PDPT' and no_akru = '"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						//reverse akru seb, pake drk eksisting
						sql.add("insert into inv_depoakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
								"select no_flag,'"+this.e_nb.getText()+"','"+this.tglAkhirAkru+"',99,akun_piutang,'"+this.e_ket.getText()+"','C',sum(nilai-pajak_akru),'"+this.kodePP+"','-','"+this.app._lokasi+"','TUTUPAKRU','PIUREV','"+this.periodeAktif+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from inv_depoakru_d where no_flag = '"+this.e_nb2.getText()+"' group by no_flag,akun_piutang");					
						sql.add("insert into inv_depoakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
								"select no_flag,'"+this.e_nb.getText()+"','"+this.tglAkhirAkru+"',98,akun_pdpt,'"+this.e_ket.getText()+"','D',sum(nilai-pajak_akru),'"+this.kodePP+"','"+this.drkBunga+"','"+this.app._lokasi+"','TUTUPAKRU','PDPTREV','"+this.periodeAktif+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from inv_depoakru_d where no_flag = '"+this.e_nb2.getText()+"' group by no_flag,akun_pdpt");				
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
								"select no_akru,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,nilai "+
								"from inv_depoakru_j where jenis = 'PDPTREV' and no_akru = '"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					}
					//---bunga
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod)  "+
							"select no_tutup,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,tgl_input,nik_user,'-','-','-','-','-','-','-' ,'-','-','-' "+
							"from inv_depotutup_j where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod)  "+
							"select no_akru,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,tgl_input,nik_user,'-','-','-','-','-','-','-' ,'-','-','-' "+
							"from inv_depoakru_j where no_akru='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if ((this.c_jenis.getText() == "PERPANJANG") || (this.c_jenis.getText() == "PINDAHJNS")) {
						sql.add("insert into inv_app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'APPROVE','DEPO','-')");
						sql.add("insert into inv_app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
								"('"+this.e_nb.getText()+"','1','DEPO','"+this.e_nb.getText()+"','"+this.app._lokasi+"','-')");
					
						sql.add("update inv_shop_m set no_app='"+this.e_nb.getText()+"',progress='1' where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
						sql.add("update inv_depo2_m set progress='1',no_kas='"+this.e_nb.getText()+"' where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
					this.e_nama2.setTag(9);
					this.e_pbunga2.setTag(9);
					this.e_basis2.setTag(9);
					this.e_npanjang.setTag(9);
					
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);					
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;					
					this.c_jenis.setText("TUTUP");
					this.sg3.clear(1);
					this.sg.clear(1);
					this.sg2.clear(1);
					this.doChange(this.c_jenisdata);
					
					this.e_nama2.setReadOnly(true);
					this.e_pbunga2.setReadOnly(true);
					this.e_basis2.setReadOnly(true);
					this.e_npanjang.setReadOnly(true);									
				break;
			case "simpan" :	
			case "ubah" :				
				if (this.stsSimpan == 0) {
					var data = this.dbLib.getDataProvider("select top 1 no_akru from inv_depoakru_d where no_flag='-' and no_cair<>'-' and no_akru='"+this.e_nb2.getText()+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];
						if (line != undefined){							
							system.alert(this,"Transaksi tidak valid.","Bunga deposito sudah dicairkan.");
							return false;
						}					
					}				
				}
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (this.c_jenis.getText()=="SEBAGIAN" && nilaiToFloat(this.e_nominal.getText()) == nilaiToFloat(this.e_npanjang.getText())) {
					system.alert(this,"Nilai Perpanjang tidak valid.","Nilai Deposito Lama dan Baru tidak boleh sama untuk jenis cair SEBAGAIN.");
					return false;
				}
				if ((this.c_jenis.getText()=="PERPANJANG" || this.c_jenis.getText()=="PINDAHJNS") && nilaiToFloat(this.e_jml2.getText()) == 0) {
					system.alert(this,"Jumlah Hari/Bulan tidak valid.","Data Deposito Baru harap dilengkapi.");
					return false;
				}
				if ((this.c_jenis.getText()=="PERPANJANG" || this.c_jenis.getText()=="PINDAHJNS" || this.c_jenis.getText()=="SEBAGIAN") && ((nilaiToFloat(this.e_nominal.getText()) < nilaiToFloat(this.e_npanjang.getText())) || (nilaiToFloat(this.e_npanjang.getText()) <= 0))) {
					system.alert(this,"Nilai Deposito Baru tidak valid.","Melebihi nominal deposito awal atau kurang dari sama dengan nol.");
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
				else this.simpan();
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
					sql.add("delete from inv_depotutup_m where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_depo2_m set progress='1',ref1='-' where ref1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depotutup_d where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update inv_depoakru_d set no_flag='-' where no_flag='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update a set a.tgl_hitung=a.tgl_hitungseb "+
							"from inv_depo2_m a inner join inv_depoakru_d b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_akru='"+this.e_nb2.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from inv_depoakru_m where no_akru='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depoakru_j where no_akru='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depoakru_d where no_akru='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from glsap where no_bukti='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shop_just where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depotutup_j where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depo2_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from glsap where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from inv_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_app_d where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;	
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.doChange(this.c_jenisdata);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},	
	doSelectDate2: function(sender, y,m,d){				
		var data = this.dbLib.getDataProvider("select datediff (day ,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"') as jml ",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.e_jml2.setText(floatToNilai(line.jml));			
			
			if (nilaiToFloat(this.e_jml2.getText()) < 30 && this.e_periode.getText().substr(4,3) != "02") {
				this.c_jenis2.setText("DOC");	
			}
			if (nilaiToFloat(this.e_jml2.getText()) >= 30 && this.e_periode.getText().substr(4,3) != "02") {
				this.c_jenis2.setText("DEPOSITO");	
			}			
			if (nilaiToFloat(this.e_jml2.getText()) < 28 && this.e_periode.getText().substr(4,3) == "02") {
				this.c_jenis2.setText("DOC");	
			}
			if (nilaiToFloat(this.e_jml2.getText()) >= 28 && this.e_periode.getText().substr(4,3) == "02") {
				this.c_jenis2.setText("DEPOSITO");	
			}
		}
	},
	doChange:function(sender){		
		try {
			
			if (this.stsSimpan==1 && sender == this.e_jml2 && this.e_jml2.getText()!="" && this.e_jml2.getText()!="0") {
				this.doRekap();				
			}
			
			if ((sender == this.c_jenisdata || sender == this.cb_plan) && this.stsSimpan==1) {
				this.cb_depo.setText("","");
				if (this.c_jenisdata.getText() == "JTHTEMPO") 
					this.cb_depo.setSQL("select no_depo, keterangan from inv_depo2_m where  kode_plan='"+this.cb_plan.getText()+"' and tgl_selesai<='"+this.dp_d1.getDateString()+"' and progress ='1' and kode_lokasi='"+this.app._lokasi+"' ",["no_depo","keterangan"],false,["No DOC","Keterangan"],"and","Daftar Deposito",true);		
				else this.cb_depo.setSQL("select no_depo, keterangan from inv_depo2_m where kode_plan='"+this.cb_plan.getText()+"' and  progress ='1' and kode_lokasi='"+this.app._lokasi+"'",["no_depo","keterangan"],false,["No DOC","Keterangan"],"and","Daftar Deposito",true);		
			}
			
			if (sender == this.cb_depo && this.cb_depo.getText()!="") {
				var strSQL = "select a.bsumber,a.bdepo,a.kode_kelola,a.bcair,a.bbunga,convert(varchar,a.tgl_mulai,103)+' - '+convert(varchar,a.tgl_selesai,103) as tgl,jenis,a.status_dana,a.nilai,a.akun_depo,a.tgl_selesai,a.p_bunga,a.basis,b.kode_bankklp "+
							 "from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank "+
							 "where a.no_depo='"+this.cb_depo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.akunDepo = line.akun_depo;
						this.e_tanggal.setText(line.tgl);
						this.e_jenis.setText(line.jenis);
						this.e_status.setText(line.status_dana);
						this.e_nominal.setText(floatToNilai(line.nilai));					
						
						this.bCairLama = line.bcair;
						this.bBungaLama = line.bbunga;						
						this.bSumberLama = line.bsumber;
						this.bDepoLama = line.bdepo;
						this.kelolaLama = line.kode_kelola;
						this.bDepoBank = line.kode_bankklp;
							
						if (this.stsSimpan == 1) {
							this.dp_d2.setText(line.tgl_selesai);
							this.dp_d3.setText(line.tgl_selesai);
							this.e_pbunga2.setText(floatToNilai(line.p_bunga));					
							this.e_basis2.setText(floatToNilai(line.basis));					
							
							this.bcair.setText(line.bcair);
							this.bbunga.setText(line.bbunga);							
							this.doHitungBunga();
						}
					} 
				}			
			}						
			
			if (sender == this.c_jenis && this.c_jenis.getText()!="") {
				if (this.c_jenis.getText() != "SEBAGIAN") {					
					this.e_npanjang.setReadOnly(true);					
					if (this.c_jenis.getText() == "TUTUP") {
						this.e_npanjang.setTag(9);
						this.e_npanjang.setText("0");	
					}
					if (this.c_jenis.getText() == "PERPANJANG" || this.c_jenis.getText() == "PINDAHJNS") {
						this.getKomposisi();
						this.pc1.setActivePage(this.pc1.childPage[1]);		

						this.e_nama2.setTag(0);
						this.e_pbunga2.setTag(0);
						this.e_basis2.setTag(0);
						this.e_npanjang.setTag(0);
						
						this.e_nama2.setReadOnly(false);
						this.e_pbunga2.setReadOnly(false);
						this.e_basis2.setReadOnly(false);
						this.e_npanjang.setText(this.e_nominal.getText());	
						
						this.e_noDepoBaru.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depo2_m","no_depo",this.app._lokasi+"-DEPO"+this.e_periode.getText().substr(2,4)+".","000"));
						
					}
					
					if (this.c_jenis.getText() == "PINDAHJNS") {
						if (this.e_jenis.getText()!="") {
							this.c_jenis2.setTag("0");
							if (this.e_jenis.getText() == "DOC") this.c_jenis2.setText("DEPOSITO");
							else if (this.e_jenis.getText() == "DEPOSITO") this.c_jenis2.setText("DOC");
						}						
					}
					if (this.c_jenis.getText() == "PERPANJANG") this.c_jenis2.setText(this.e_jenis.getText());
					if (this.stsSimpan == 1) this.e_nama2.setText(this.cb_depo.rightLabelCaption);
				}
				else {
					this.e_nama2.setReadOnly(true);
					this.e_pbunga2.setReadOnly(true);
					this.e_basis2.setReadOnly(true);
					
					this.e_nama2.setTag(9);
					this.e_pbunga2.setTag(9);
					this.e_basis2.setTag(9);						
					this.e_npanjang.setTag(0);					
					this.e_npanjang.setReadOnly(false);				
					this.e_npanjang.setText(this.e_nominal.getText());	
				}
			}
			
			if (sender == this.bcair && this.bcair.getText()!="" && this.stsSimpan==1) {
				var strSQL = "select kode_akun from inv_bank where kode_bank = '"+this.bcair.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.cb_cair.setText(line.kode_akun);
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				this.sg3.clear(1);
				this.sg.clear(1);
				this.doChange(this.c_jenisdata);
			}			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depotutup_m","no_tutup",this.app._lokasi+"-DTP"+this.e_periode.getText().substr(2,4)+".","0000"));			
			this.e_ket.setFocus();			
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);
		}
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
			this.e_nama2.setTag(9);
			this.e_pbunga2.setTag(9);
			this.e_basis2.setTag(9);
			this.e_npanjang.setTag(9);
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);					
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.c_jenis.setText("TUTUP");
			this.pc2.setActivePage(this.pc2.childPage[0]);						
			this.sg3.clear(1);
			this.sg.clear(1);
			this.sg2.clear(1);
			this.doChange(this.c_jenisdata);
			
			this.e_nama2.setReadOnly(true);
			this.e_pbunga2.setReadOnly(true);
			this.e_basis2.setReadOnly(true);
			this.e_npanjang.setReadOnly(true);				
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																									
		var strSQL = "select a.no_tutup,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from inv_depotutup_m a "+
		             "    left join inv_shop_m b on b.no_shop=a.no_tutup and a.kode_lokasi=b.kode_lokasi "+
		             "    left join ( "+
		             "           select distinct x.no_link "+
		             "           from inv_depoakru_m x inner join inv_depoakru_d y on x.no_akru=y.no_akru "+
		             "           where  y.dc='D' and y.no_flag='-' and y.no_cair<>'-' "+
		             ") c on a.no_tutup=c.no_link "+
					 "where c.no_link is null and a.modul = 'DOCTTP' and (b.progress is null or b.progress in ('0','1')) and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='-' "+
					 "order by a.no_tutup";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.sg3.clear();
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.page = 1;
			for (var i=0;i < this.dataJU3.rs.rows.length;i++){				
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_tutup,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
			}
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);
		this.page = page;
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
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;												
				this.e_nb.setText(this.sg3.cells(0,baris));								
													
				var strSQL = "select a.tanggal,a.keterangan,no_depo,nilai_pinalti,nilai_adm,nilai_panjang,bcair,bbunga,jenis "+
							 "from inv_depotutup_m a "+
							 "where a.no_tutup = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.cb_depo.setSQL("select no_depo, keterangan from inv_depo2_m where no_depo='"+line.no_depo+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_depo","keterangan"],false,["No DOC","Keterangan"],"and","Daftar Deposito",true);
						this.dp_d1.setText(line.tanggal);	
						this.e_ket.setText(line.keterangan);	
						this.cb_depo.setText(line.no_depo);						
						this.e_pinalti.setText(floatToNilai(line.nilai_pinalti));
						this.e_biaya.setText(floatToNilai(line.nilai_adm));
						this.bcair.setText(line.bcair);
						this.bbunga.setText(line.bbunga);
						this.c_jenis.setText(line.jenis);
						this.e_npanjang.setText(floatToNilai(line.nilai_panjang));						
					}
				}
			
				if (this.c_jenis.getText() == "PINDAHJNS" || this.c_jenis.getText() == "PERPANJANG") {
					var strSQL = "select a.*,b.kode_bankklp from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank where a.no_shop = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							this.e_nama2.setText(line.keterangan);						
							this.e_pbunga2.setText(floatToNilai(line.p_bunga));						
							this.e_basis2.setText(floatToNilai(line.basis));						
							this.dp_d2.setText(line.tgl_mulai);						
							this.dp_d3.setText(line.tgl_selesai);													
							this.bDepoSeb = line.bdepo;
							this.bDepoBank = line.kode_bankklp;
						}
					}		
					this.getKomposisi();						
				}
				
				if (this.c_jenis.getText() == "TUTUP") {
					var data = this.dbLib.getDataProvider("select akun_kb from kas_m where no_kas='"+this.e_nb.getText()+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							this.cb_cair.setText(line.akun_kb);
						}					
					}				
				}
			
				var data = this.dbLib.getDataProvider("select no_akru,periode,convert(varchar,tanggal,111) as tgl from inv_depoakru_m where no_link='"+this.e_nb.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						var noAkru = line.no_akru;
						this.e_nb2.setText(line.no_akru);
						this.periodeAktif = line.periode;						
						this.tglAkhirAkru = line.tgl;
					}					
				}
								
				var strSQL = "select a.no_depo,a.keterangan,a.akun_piutang,a.akun_pdpt,"+
							 "convert(varchar,c.tgl_awal,111) as tgl_akru, "+		             
							 "convert(varchar,c.tgl_akhir,111) as tgl_akhir, "+
							 "c.jml_hari,"+
							 "a.basis,a.p_bunga,a.nilai, "+					 
							 "c.nilai-c.pajak_akru as nilai_akru, "+
							 "c.nilai_hitung-c.pajak_hitung as nilai_hitung, "+
							 
							 "c.pajak_akru, "+					 
							 "c.pajak_hitung, "+
							 
							 "isnull(b.reverse,0) as reverse "+
							 "from inv_depo2_m a "+
							 "	  inner join inv_depoakru_d c on a.no_depo=c.no_depo and a.kode_lokasi=c.kode_lokasi and c.no_flag='-' "+
							 "    left join ( "+
							 "                select no_depo,kode_lokasi,sum(nilai-pajak_akru) as reverse "+
							 "                from inv_depoakru_d "+
							 "                where no_flag='"+noAkru+"' and kode_lokasi='"+this.app._lokasi+"' group by no_depo,kode_lokasi "+
							 "     ) b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
							 "where c.no_akru='"+noAkru+"' and c.kode_lokasi='"+this.app._lokasi+"' order by a.no_depo";		
						 
				var data = this.dbLib.getDataProvider(strSQL,true);		
				var nbunga = rbunga = 0;
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						nbunga += parseFloat(line.nilai_akru);
						rbunga += parseFloat(line.reverse);
						this.sg.appendData([line.no_depo,line.keterangan,line.akun_piutang,line.akun_pdpt,line.tgl_akru,line.tgl_akhir,floatToNilai(line.jml_hari),floatToNilai(line.basis),floatToNilai(line.p_bunga),floatToNilai(line.nilai),floatToNilai(line.nilai_akru),floatToNilai(line.nilai_hitung),floatToNilai(line.reverse),floatToNilai(line.pajak_akru),floatToNilai(line.pajak_hitung)]);
					}
					this.e_nbunga.setText(floatToNilai(nbunga));								
					this.e_rbunga.setText(floatToNilai(rbunga));								
				} else this.sg.clear(1);						
				
			}
		} catch(e) {alert(e);}		
	},	
	getKomposisi: function() {
		//ambil data closingan hari kemarin dari aset KAS (deposito+doc+rdpasaruang) utk batasan maks penempatan
		//syarat generate kkp harus dilakukan uptodate (harian baik itu deposito maupun reksadana RDPU)
		var strSQL = "select max(tanggal) as tgl_max from inv_depo_kkp where kode_plan='"+this.cb_plan.getText()+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){		
				var tglMaxDepo = line.tgl_max;
			}
		}

		var strSQL = "select isnull(max(tanggal),getdate()) as tgl_max from inv_rd_kkp where h_wajar <> 0 and kode_plan='"+this.cb_plan.getText()+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){		
				var tglMaxRD = line.tgl_max;
			}
		}

		var strSQL = "select sum(x.total_kas) as total_kas from ("+
					 "select isnull(sum(nilai_depo),0) as total_kas from inv_depo_kkp "+
					 "where kode_plan='"+this.cb_plan.getText()+"' and tanggal = (select max(tanggal) from inv_depo_kkp where kode_plan='"+this.cb_plan.getText()+"' and kode_lokasi='"+this.app._lokasi+"')  "+
					 "union "+
					 "select round(sum(a.jumlah*a.h_wajar),0) as total_kas "+
					 "from inv_rd_kkp a "+
					 "	   inner join inv_rd b on a.kode_rd=b.kode_rd "+
					 "	   inner join inv_rdklp c on b.kode_rdklp = c.kode_rdklp "+
					 "	   inner join relinv d on c.kode_rdklp=d.modul and d.kode_fs='FS3' "+
					 "	   inner join neracainv e on d.kode_neraca=e.kode_neraca and e.modul='KAS' and e.kode_fs='FS3' "+ 
					 "where a.tanggal = (select max(tanggal) from inv_depo_kkp where kode_plan='"+this.cb_plan.getText()+"' and kode_lokasi='"+this.app._lokasi+"') and a.kode_plan='"+this.cb_plan.getText()+"' "+
					 ") x ";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){		
				this.batasAsetKas = Math.round((this.persenMaxKas/100) * parseFloat(line.total_kas));
			}
		}

		//jika keduanya pilihan aktif maka pakai terkecil angkanya diantara keduanya
		//kalo aktif salah satu pakai dari referensi sesuai yg aktif
		if (this.stsMaxEqu == "1" && this.stsMaxKas == "1") {			
			var strMaksTempat = "case when a.jenis = 'BUMN' then isnull(d.maxtempat,0) else "+
								"( "+
								"	case when isnull(d.maxtempat,0) > "+this.batasAsetKas+" then "+this.batasAsetKas+" else isnull(d.maxtempat,0) end "+
								") end as maks ";
		}
		else {
			if (this.stsMaxEqu == "1") {
				var strMaksTempat = " isnull(d.maxtempat,0) as maks ";
			} 
			else var strMaksTempat = "case when a.jenis = 'BUMN' then isnull(d.maxtempat,0) else "+this.batasAsetKas+" end) as maks ";
		}
		
		this.sg2.clear();
		var strSQL = "select a.kode_bankklp,a.nama,a.jenis,a.nu, "+		
		
					 "  isnull(g.pdoc,0) as h1, "+
					 "  isnull(g.pdoc,0) as h2, "+
					 "  isnull(g.pdoc,0) as h3, "+
					 "  isnull(g.pdoc,0) as h4, "+
					 "  isnull(g.pdeposito,0) as b1, "+
					 "  isnull(g.pdeposito,0) as b3, "+
					 
					 "	isnull(b.doc_eks,0)  as doc, "+ 
					 "	isnull(b.depo_eks,0)  as deposito, "+ 
					 "  isnull(c.doc_jthtempo,0) as doc_jthtempo, "+ 
					 "  isnull(c.depo_jthtempo,0) as deposito_jthtempo, "+ 
					 strMaksTempat+
					 ",	isnull(e.doc_tutup,0) as doc_tutup "+
					 ",	isnull(e.depo_tutup,0) as deposito_tutup "+					
					 ",	isnull(f.doc_panjang,0) as doc_panjang "+
					 ",	isnull(f.depo_panjang,0) as deposito_panjang "+					

					 "from inv_bankklp a "+
					
					 //eksisting baru aju dan aktif
					 "left join ( "+
					 "		select c.kode_bankklp,sum(case when a.jenis = 'DOC' then a.nilai else 0 end) as doc_eks,sum(case when a.jenis = 'DEPOSITO' then a.nilai else 0 end) as depo_eks "+ 
					 "		from inv_depo2_m a  "+
					 "		inner join inv_bank b on a.bdepo=b.kode_bank "+
					 "		inner join inv_bankklp c on b.kode_bankklp=c.kode_bankklp "+ 
					 "		where a.progress in ('0','1') and a.kode_kelola ='"+this.kodeKelola+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_plan='"+this.cb_plan.getText()+"' "+
					 "		group by c.kode_bankklp "+
					 "		) b on a.kode_bankklp=b.kode_bankklp "+

					 //eksisting baru aju dan aktif -hanya yg jatuh tempo
					 "left join ( "+
					 "		select c.kode_bankklp,sum(case when a.jenis = 'DOC' then a.nilai else 0 end) as doc_jthtempo ,sum(case when a.jenis = 'DEPOSITO' then a.nilai else 0 end) as depo_jthtempo "+
					 "		from inv_depo2_m a  "+
					 "		inner join inv_bank b on a.bdepo=b.kode_bank "+
					 "		inner join inv_bankklp c on b.kode_bankklp=c.kode_bankklp "+ 
					 "		where a.tgl_selesai='"+this.dp_d1.getDateString()+"' and a.progress in ('0','1') and a.kode_kelola ='"+this.kodeKelola+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_plan='"+this.cb_plan.getText()+"' "+
					 "		group by c.kode_bankklp "+
					 "		) c on a.kode_bankklp=c.kode_bankklp "+

					 //maksimal penempatan by equity
					 "left join ( "+
					 "		select b.kode_bankklp,b.maxtempat "+
					 "		from inv_banknilai_m a inner join inv_banknilai_d b on a.no_bukti=b.no_bukti where no_flag='-' "+
					 "      ) d on a.kode_bankklp=d.kode_bankklp "+

					 //yg sudah dalam status tutup di HARI/TANGGAL itu
					 "left join ( "+
					 "		select e.kode_bankklp,sum(case when c.jenis = 'DOC' then b.nilai_tutup+b.nilai_panjang else 0 end) as doc_tutup,sum(case when c.jenis = 'DEPOSITO' then b.nilai_tutup+b.nilai_panjang else 0 end) as depo_tutup "+
					 "		from inv_depotutup_m a "+
					 "			 inner join inv_depotutup_d b on a.no_tutup=b.no_tutup and a.kode_lokasi=b.kode_lokasi "+
					 "			 inner join inv_depo2_m c on b.no_depo=c.no_depo and b.kode_lokasi=c.kode_lokasi "+
					 "			 inner join inv_bank d on c.bdepo=d.kode_bank "+
					 "			 inner join inv_bankklp e on d.kode_bankklp=e.kode_bankklp "+
					 "		where a.tanggal='"+this.dp_d1.getDateString()+"' and c.kode_lokasi='"+this.app._lokasi+"' and c.kode_kelola='"+this.kodeKelola+"' and c.kode_plan='"+this.cb_plan.getText()+"'  "+
					 "		group by e.kode_bankklp "+
					 "      ) e on a.kode_bankklp=e.kode_bankklp "+

					 //yg statusnya diperpanjang
					 "left join ( "+
					 "		select e.kode_bankklp,sum(case when c.jenis = 'DOC' then b.nilai_panjang else 0 end) as doc_panjang,sum(case when c.jenis = 'DEPOSITO' then b.nilai_panjang else 0 end) as depo_panjang "+
					 "		from inv_depotutup_m a "+
					 "			 inner join inv_depotutup_d b on a.no_tutup=b.no_tutup and a.kode_lokasi=b.kode_lokasi "+
					 "			 inner join inv_depo2_m c on b.no_depo=c.no_depo and b.kode_lokasi=c.kode_lokasi "+
					 "			 inner join inv_bank d on c.bdepo=d.kode_bank "+
					 "			 inner join inv_bankklp e on d.kode_bankklp=e.kode_bankklp "+
					 "		where a.tanggal='"+this.dp_d1.getDateString()+"' and c.kode_lokasi='"+this.app._lokasi+"' and c.kode_kelola='"+this.kodeKelola+"' and c.kode_plan='"+this.cb_plan.getText()+"'  "+
					 "		group by e.kode_bankklp "+
					 "      ) f on a.kode_bankklp=f.kode_bankklp "+

					 //tabel terakhir rate berdasar bank
					 "left join ( "+
					 "		select z.kode_bankklp, "+
					 "		max(case when z.jenis='DOC' then z.p_bunga else 0 end) as pdoc, "+
					 "		max(case when z.jenis='DEPOSITO' then z.p_bunga else 0 end) as pdeposito "+
					 "		from ( "+
					 " 		select DISTINCT x.kode_bankklp, x.jenis, a.p_bunga "+
					 " 		from ( "+					
					 " 		select b.kode_bankklp,a.jenis, max(tgl_mulai) as tgl_mulai  "+
					 " 		from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank "+
					 " 		where a.kode_lokasi='"+this.app._lokasi+"' "+
					 " 		group by b.kode_bankklp,a.jenis "+					
					 "		) x "+
					 " 		left join  "+
					 " 		( "+					
					 " 		select b.kode_bankklp,a.jenis,a.tgl_mulai,max(a.p_bunga) as p_bunga "+
					 " 		from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank "+
					 " 		where a.kode_lokasi='"+this.app._lokasi+"' "+
					 " 		group by b.kode_bankklp,a.tgl_mulai,a.jenis "+					
					 " 		) a on a.kode_bankklp = x.kode_bankklp and a.tgl_mulai = x.tgl_mulai and a.jenis=x.jenis "+
					 " 		) z group by z.kode_bankklp "+
					 "		) g	on a.kode_bankklp=g.kode_bankklp "+

					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1' "+		
					 
					 "union "+

					"		select kode_bankklp, nama, jenis, nu, h1, h2, h3, h4, b1, b3,sum(doc) as doc, sum(deposito) as deposito, doc_jthtempo, deposito_jthtempo, maks, doc_tutup, deposito_tutup, doc_panjang, deposito_panjang "+
					"		from ("+
					"			select a.kode_kelola as kode_bankklp,b.nama,'DISCRETIONARY' as jenis,5 as nu ,"+
					"					0 as h1,0 as h2,0 as h3,0 as h4,0 as b1,0 as b3,0 as maks,0 as doc_tutup,0 as deposito_tutup,0 as doc_panjang,"+
					"					0 as deposito_panjang ,sum(case a.jenis when 'DOC' then a.nilai_depo else 0 end) as doc ,sum(case a.jenis when 'DEPOSITO' then a.nilai_depo else 0 end) as deposito, 0 as doc_jthtempo, 0  as deposito_jthtempo "+
					"			from inv_depo_kkp a inner join inv_kelola b on a.kode_kelola=b.kode_kelola and b.jenis='MI' "+
					"			where a.tanggal = '"+tglMaxDepo+"' and a.kode_plan='"+this.cb_plan.getText()+"' "+
					"			group by a.kode_kelola,b.nama,a.jenis "+
					"		) x "+
					"		group by kode_bankklp, nama, jenis, nu, h1, h2, h3, h4, b1, b3, maks, doc_tutup, deposito_tutup, doc_panjang, deposito_panjang,doc_jthtempo, deposito_jthtempo "+

					"union "+

					"select b.kode_rd,b.nama,'MONEY MARKET' as jenis,6 as nu, "+
					" 		0 as h1,0 as h2,0 as h3,0 as h4,0 as b1,0 as b3 "+
					"		,0 as doc "+
					"		,round(sum(a.jumlah*a.h_oleh),0) as deposito  "+
					"		,0 as doc_jthtempo,0 as deposito_jthtempo  "+
					"		,0 as maks "+
					"		,0 as doc_tutup,0 as deposito_tutup "+
					"		,0 as doc_panjang,0 as deposito_panjang "+
					"from inv_rd_kkp a "+
					"		inner join inv_rd b on a.kode_rd=b.kode_rd and b.kode_rdklp='RDPU' "+
					"where a.tanggal = '"+tglMaxRD+"' and a.kode_plan='"+this.cb_plan.getText()+"' "+
					"group by  b.kode_rd,b.nama "+

					 "order by nu";		
		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;					
			for (var i in data.rs.rows){
				line = data.rs.rows[i];		
				var total = parseFloat(line.doc) +	parseFloat(line.deposito);					
				var sisa = parseFloat(line.maks) - total;
				this.sg2.appendData([line.kode_bankklp,line.nama,line.jenis.toUpperCase(), 
									floatToNilai(line.h1),floatToNilai(line.h2),floatToNilai(line.h3),floatToNilai(line.h4),
									floatToNilai(line.b1),floatToNilai(line.b3),
									floatToNilai(line.maks),
									floatToNilai(line.doc),floatToNilai(line.deposito),floatToNilai(total),floatToNilai(sisa), "-",
									floatToNilai(line.doc_jthtempo),floatToNilai(line.deposito_jthtempo), 
									floatToNilai(line.doc_tutup),floatToNilai(line.deposito_tutup), 
									floatToNilai(line.doc_panjang),floatToNilai(line.deposito_panjang)]);				
			}
		} else this.sg2.clear(1);
	}

});