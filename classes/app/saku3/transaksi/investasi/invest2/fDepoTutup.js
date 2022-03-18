window.app_saku3_transaksi_investasi_invest2_fDepoTutup = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fDepoTutup.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fDepoTutup";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penutupan Deposito: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,410,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.e_nb2 = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[260,12,200,20],caption:"No Bukti AkruBunga",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});												
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,348], childPage:["Data Deposito","Data Baru","Bunga","Shopping Rate","Nota Konfirmasi"]});		
		this.c_jenisdata = new saiCB(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Filter Data",items:["JTHTEMPO","ALL"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_depo = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"No Deposito", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_tanggal = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,300,20],caption:"Tgl Deposito", readOnly:true});						
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Jenis", readOnly:true});
		this.e_status = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Status Dana", readOnly:true});								
		this.e_nominal = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nominal", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_rbunga = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Reverse Bunga", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_nbunga = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai Bunga", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_pinalti = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Biaya Pinalti", tag:1, tipeText:ttNilai, text:"0"});													
		this.e_biaya = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Biaya Administrasi", tag:1, tipeText:ttNilai, text:"0"});											
		this.bcair = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Bank Pencairan", multiSelection:false, maxLength:10, tag:9});				
		this.bbunga = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"Bank Bunga", multiSelection:false, maxLength:10, tag:9});						
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Jenis Transaksi",items:["TUTUP","PERPANJANG","SEBAGIAN","PINDAHJNS"], readOnly:true,tag:2,change:[this,"doChange"]});
		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Keterangan", maxLength:150,tag:9,readOnly:true});												
		this.c_jenis2 = new saiCB(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Jenis Baru",items:["DOC","DEPOSITO"], readOnly:true,tag:9});				
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.l_tgl3 = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,18],caption:"Jth Tempo", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.e_jml2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Jumlah Hari", readOnly:true, tipeText:ttNilai, text:"0",tag:9,change:[this,"doChange"]});
		this.e_pbunga2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Rate [%Tahun]", tipeText:ttNilai, text:"0",tag:9,readOnly:true});				
		this.e_basis2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Basis [Hari]", tipeText:ttNilai, text:"0",tag:9,readOnly:true});						
		this.e_npanjang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai Perpanjang", tag:9, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_noDepoBaru = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"No Depo Baru", maxLength:150,tag:9,readOnly:true});												
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:15,tag:9,
		            colTitle:["No Deposito","Keterangan","Akun Piutang","Akun Pdpt","Tgl Awal","Tgl Akhir","Jml Hari","Basis","Rate","Nominal","Net Akru","Net Hitung","Nilai Rev","Pajak Akru","Pajak Hitung"],
					colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,70,70,70,80,80,80,80,150,100]],
					colFormat:[[6,7,8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					colHide:[[13,14],[true,true]],
					autoPaging:true, rowPerPage:20,
					readOnly:true,
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
				
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,310],colCount:11,tag:9,		            
					colTitle:["Kd Cabang","Keterangan","Bank","Maks Tempat","Sisa Plafon","Tgl Shopping","Satuan","Jml Hari","Rate1","Rate2","Basis"],					
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,100,100,80,200,80]],
					colFormat:[[3,4,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],																				
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		
		
		this.e_noins = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,10,350,20],caption:"Nomor", tag:8, maxLength:50});										
		this.cb_ttd2 = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,11,220,20],caption:"Man Investasi",tag:8,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,12,350,20],caption:"Jabatan", tag:8, maxLength:50});												
		this.cb_ttd3 = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,13,220,20],caption:"Kabid Investasi",tag:8,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab3 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,14,350,20],caption:"Jabatan", tag:8, maxLength:50});										
		this.e_just = new saiCB(this.pc1.childPage[4],{bound:[20,15,350,20],caption:"Perihal",items:["Penempatan Dana (Pencairan dan Penempatan Kembali)","Penempatan Dana Deposito On Call","Penempatan Dana MMA","Penempatan Dana (Deposito Baru)"], readOnly:true,tag:2});				
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
		
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
				
			//--- surat	
			this.cb_ttd2.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.app._kodeBidang+"' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ttd3.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('DEPONODIN','DEPONOINS','KABIDIV','MANIV') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "DEPONOINS") this.noins = line.flag;
					if (line.kode_spro == "KABIDIV") this.kabidIV = line.flag;
					if (line.kode_spro == "MANIV") this.manIV = line.flag;
				}
			}

			this.e_noins.setText(this.noins);
			this.cb_ttd2.setText(this.manIV);
			this.cb_ttd3.setText(this.kabidIV);
			
			//-- surat
			
									
			this.c_jenisdata.setText("JTHTEMPO");
			this.bcair.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);			
			this.bbunga.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BUDEPDRK','PPINV','MANIV') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					if (line.kode_spro == "BUDEPDRK") this.drkBunga = line.flag;
					if (line.kode_spro == "PPINV") this.kodePP = line.flag;				
					if (line.kode_spro == "MANINV") this.nikMan = line.flag;				
				}
			}
			this.c_jenis2.setText("");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fDepoTutup.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fDepoTutup.implement({
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
						
						sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_shop_rate where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depotutup_j where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depo2_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					sql.add("update inv_depo2_m set progress='Z',ref1='"+this.e_nb.getText()+"' where no_depo='"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					var nilai = nilaiToFloat(this.e_nominal.getText()) - nilaiToFloat(this.e_npanjang.getText());
					
					if (this.c_jenis.getText() == "PINDAHJNS") var vPosted = "F";
					else var vPosted = "X";
					
					if (this.c_jenis.getText() == "TUTUP" || this.c_jenis.getText() == "PERPANJANG" || this.c_jenis.getText() == "PINDAHJNS") var noShop = this.e_nb.getText();					
					else var noShop = "-";
					
					sql.add("insert into inv_depotutup_m(no_tutup,no_depo,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,modul,nik_buat,nik_setuju,kode_lokasi,periode,akun_doc,nik_user,tgl_input,no_kas,jenis,nilai_pinalti,nilai_adm,posted,nilai_panjang,bcair,bbunga) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilai+",'"+this.kodePP+"','DOCTTP','"+this.app._userLog+"','"+this.nikMan+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.akunDepo+"','"+this.app._userLog+"',getdate(),'-','"+this.c_jenis.getText()+"',"+nilaiToFloat(this.e_pinalti.getText())+","+nilaiToFloat(this.e_biaya.getText())+",'"+vPosted+"',"+nilaiToFloat(this.e_npanjang.getText())+",'"+this.bcair.getText()+"','"+this.bbunga.getText()+"')");					
					sql.add("insert into inv_depotutup_d (no_tutup,kode_lokasi,no_depo,nilai_tutup,nilai_panjang,no_shop) values "+
					        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_depo.getText()+"',"+nilai+","+nilaiToFloat(this.e_npanjang.getText())+",'"+noShop+"')");
															
					if (this.c_jenis.getText() == "PINDAHJNS" || this.c_jenis.getText() == "PERPANJANG") {
						if (this.c_jenis2.getText() == "DOC") {
							var jmlHari = nilaiToFloat(this.e_jml2.getText());
							var jmlBulan = 0;
						}
						else {
							var jmlBulan = nilaiToFloat(this.e_jml2.getText());
							var jmlHari = 0;
						}
						sql.add("insert into inv_shop_m (no_shop,periode,nik_user,tgl_input,kode_lokasi,tanggal,keterangan,nik_app,tgl_awal,tgl_akhir,jml_hari,jml_bulan,progress,nilai,no_app,no_spb,bsumber,  nodin,kepada1,dari1,lamp1,hal1,nikttd1,jab1,  noins,nikttd2,jab2,nikttd3,jab3,just,kode_pp,modul) values "+
								"('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"',"+jmlHari+","+jmlBulan+",'0',"+nilaiToFloat(this.e_npanjang.getText())+",'-','-','-', '-','-','-','-','-','-','-','"+this.e_noins.getText()+"','"+this.cb_ttd2.getText()+"','"+this.e_jab2.getText()+"','"+this.cb_ttd3.getText()+"','"+this.e_jab3.getText()+"','"+this.e_just.getText()+"','"+this.app._kodePP+"','"+this.c_jenis.getText()+"')");
						
																
						if (this.c_jenis2.getText() == "DOC") var sat = "HARI"; else var sat = "BULAN";
						sql.add("insert into inv_shop_rate(no_shop,kode_lokasi,kode_bank,sisa,jml_hari,rate_aju,rate_final,nilai,tanggal,jenis,maks,tgl_rate,satuan,rate1,rate2,basis,jth_tempo,bcair,bbunga,status_dana) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.bDepoLama+"',0,"+nilaiToFloat(this.e_jml2.getText())+","+nilaiToFloat(this.e_pbunga2.getText())+","+nilaiToFloat(this.e_pbunga2.getText())+","+nilaiToFloat(this.e_npanjang.getText())+",'"+this.dp_d2.getDateString()+"','"+this.c_jenis2.getText()+"',0,'"+this.dp_d2.getDateString()+"','"+sat+"',"+nilaiToFloat(this.e_pbunga2.getText())+","+nilaiToFloat(this.e_pbunga2.getText())+","+nilaiToFloat(this.e_basis2.getText())+",'"+this.dp_d3.getDateString()+"','"+this.bCairLama+"','"+this.bBungaLama+"','"+this.e_status.getText()+"')");
						
						var noDepo = this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depo2_m","no_depo",this.app._lokasi+"-DEPO"+this.e_periode.getText().substr(2,4)+".","000");
						sql.add("insert into inv_depo2_m(no_depo,kode_lokasi,periode,tanggal,nik_user,tgl_input,no_kas,progress,tgl_akru_seb,tgl_akru,jenis,status_dana,no_bilyet,keterangan,tgl_mulai,tgl_selesai,jml_hari,basis,p_bunga,nilai,bsumber,bdepo,bcair,bbunga,akun_depo,akun_piutang,akun_pdpt,nik_buat,kode_kelola,no_shop,ref1,tgl_hitung,tgl_hitungseb) values "+
								"('"+noDepo+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d2.getDateString()+"','"+this.app._userLog+"',getdate(),'-','0','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.c_jenis2.getText()+"','"+this.e_status.getText()+"','-','"+this.e_nama2.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"',"+nilaiToFloat(this.e_jml2.getText())+","+nilaiToFloat(this.e_basis2.getText())+","+nilaiToFloat(this.e_pbunga2.getText())+","+nilaiToFloat(this.e_npanjang.getText())+",'"+this.bSumberLama+"','"+this.bDepoLama+"','"+this.bCairLama+"','"+this.bBungaLama+"','-','-','-','"+this.app._userLog+"','"+this.kelolaLama+"','"+this.e_nb.getText()+"','-','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"')");
								
						sql.add("update a set a.akun_depo=b.akun_depo,a.akun_piutang=b.akun_piutang,a.akun_pdpt=b.akun_bunga "+
								"from inv_depo2_m a inner join inv_depo_param b on a.jenis=b.jenis and a.status_dana=b.status "+
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
						
						for (var i=0;i < this.sg2.getRowCount();i++) {
							if (this.sg2.rowValid(i)){				
								tglBerlaku = this.sg2.cells(5,i).substr(6,4)+"-"+this.sg2.cells(5,i).substr(3,2)+"-"+this.sg2.cells(5,i).substr(0,2);														
								sql.add("insert into inv_shop_rate(no_shop,kode_lokasi,kode_bank,sisa,jml_hari,rate_aju,rate_final,nilai,tanggal,jenis,maks,tgl_rate,satuan,rate1,rate2,basis,jth_tempo,bcair,bbunga,status_dana) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.e_jml2.getText())+",0,0,0,'"+this.dp_d2.getDateString()+"','DOC',"+nilaiToFloat(this.sg2.cells(3,i))+",'"+tglBerlaku+"','"+this.sg2.cells(6,i)+"',"+nilaiToFloat(this.sg2.cells(8,i))+","+nilaiToFloat(this.sg2.cells(9,i))+","+nilaiToFloat(this.sg2.cells(10,i))+",'"+this.dp_d3.getDateString()+"','-','-','-')");
								
							}
						}						
					}					
					
					//bunga
					if (this.e_rbunga.getText() != "0" || this.e_nbunga.getText() != "0") {
						this.periodeAktif = this.e_periode.getText();
						this.tglAkhirAkru = this.dp_d1.getDateString(); 
						
						/*
						if (this.c_jenisdata.getText() == "JTHTEMPO") this.tglAkhirAkru = this.tglAkhirAkru;
						else this.tglAkhirAkru = this.dp_d1.getDateString(); //breakable
						*/
						sql.add("insert into inv_depoakru_m(no_akru,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input) values "+
								"('"+this.e_nb2.getText()+"','-','"+this.tglAkhirAkru+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nbunga.getText())+",'"+this.kodePP+"','"+this.drkBunga+"','F','TUTUPAKRU','"+this.app._userLog+"','"+this.nikMan+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','"+this.e_nb.getText()+"','"+this.app._userLog+"',getdate())");
						
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
								"select no_akru,'-','"+this.tglAkhirAkru+"',0,akun_piutang,'"+this.e_ket.getText()+"','D',sum(nilai-pajak_akru),'"+this.kodePP+"','-','"+this.app._lokasi+"','TUTUPAKRU','PIU','"+this.periodeAktif+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from inv_depoakru_d where no_akru = '"+this.e_nb2.getText()+"' and no_flag='-' group by no_akru,akun_piutang");
						sql.add("insert into inv_depoakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
								"select no_akru,'-','"+this.tglAkhirAkru+"',1,akun_pdpt,'"+this.e_ket.getText()+"','C',sum(nilai-pajak_akru),'"+this.kodePP+"','"+this.drkBunga+"','"+this.app._lokasi+"','TUTUPAKRU','PDPT','"+this.periodeAktif+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from inv_depoakru_d where no_akru = '"+this.e_nb2.getText()+"' and no_flag='-' group by no_akru,akun_pdpt");					
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
								"select no_akru,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,nilai "+
								"from inv_depoakru_j where jenis = 'PDPT' and no_akru = '"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						//reverse akru seb, pake drk eksisting
						sql.add("insert into inv_depoakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
								"select no_flag,'-','"+this.tglAkhirAkru+"',99,akun_piutang,'"+this.e_ket.getText()+"','C',sum(nilai-pajak_akru),'"+this.kodePP+"','-','"+this.app._lokasi+"','TUTUPAKRU','PIUREV','"+this.periodeAktif+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from inv_depoakru_d where no_flag = '"+this.e_nb2.getText()+"' group by no_flag,akun_piutang");					
						sql.add("insert into inv_depoakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
								"select no_flag,'-','"+this.tglAkhirAkru+"',98,akun_pdpt,'"+this.e_ket.getText()+"','D',sum(nilai-pajak_akru),'"+this.kodePP+"','"+this.drkBunga+"','"+this.app._lokasi+"','TUTUPAKRU','PDPTREV','"+this.periodeAktif+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from inv_depoakru_d where no_flag = '"+this.e_nb2.getText()+"' group by no_flag,akun_pdpt");				
						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
								"select no_akru,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,nilai "+
								"from inv_depoakru_j where jenis = 'PDPTREV' and no_akru = '"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
					
					sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shop_rate where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depotutup_j where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depo2_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
				if (this.c_jenis2.getText() == "DOC") this.doLoadDOCRate();
				if (this.c_jenis2.getText() == "DEPOSITO") this.doLoadDEPORate();
			}
			
			if (sender == this.c_jenisdata && this.stsSimpan==1) {
				this.cb_depo.setText("","");
				if (this.c_jenisdata.getText() == "JTHTEMPO") 
					this.cb_depo.setSQL("select no_depo, keterangan from inv_depo2_m where  tgl_selesai<='"+this.dp_d1.getDateString()+"' and progress ='1' and kode_lokasi='"+this.app._lokasi+"' ",["no_depo","keterangan"],false,["No DOC","Keterangan"],"and","Daftar Deposito",true);		
				else this.cb_depo.setSQL("select no_depo, keterangan from inv_depo2_m where progress ='1' and kode_lokasi='"+this.app._lokasi+"'",["no_depo","keterangan"],false,["No DOC","Keterangan"],"and","Daftar Deposito",true);		
			}
			
			if (sender == this.cb_depo && this.cb_depo.getText()!="") {
				var strSQL = "select bsumber,bdepo,kode_kelola,bcair,bbunga,convert(varchar,a.tgl_mulai,103)+' - '+convert(varchar,a.tgl_selesai,103) as tgl,jenis,status_dana,a.nilai,a.akun_depo,a.tgl_selesai,a.p_bunga,a.basis "+
							 "from inv_depo2_m a "+
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
	doLoadDOCRate:	function() {				
		try {					
			if (this.e_jml2.getText() != "") {								
				var strSQL = "select b.kode_bank,b.nama,b.kode_bankklp,convert(varchar,a.tanggal,103) as tglberlaku,cast(a.jk1 as varchar) +' - '+cast(a.jk2 as varchar) as jml,a.sat, a.persen1, a.persen2, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat end as maxtempat, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat - isnull(g.tot_depo,0) end as sisa, a.jenis, "+
							 "b.jml_hari as basis "+
							 "from  "+
							 
							 "( "+							 
							 "select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat  "+
							 "from (select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat, "+
						 	 "			 row_number() over(partition by kode_bank,jk1,jk2,jenis  order by tanggal desc) as rn "+
							 "	  from inv_bank_rate where kode_bank <> '"+this.bdepoLama+"' and tanggal<='"+this.dp_d2.getDateString()+"') as T "+ 
							 "where rn = 1  "+    
							 ") a "+
							 
							 "inner join inv_bank b on a.kode_bank=b.kode_bank "+ 
							 "inner join inv_bankklp c on b.kode_bankklp = c.kode_bankklp "+
							 "inner join inv_banknilai_d d on c.kode_bankklp = d.kode_bankklp "+
							 "inner join inv_banknilai_m e on d.no_bukti = e.no_bukti and e.no_flag='-' "+
							 
							 "left join inv_suspen f on c.kode_bankklp=f.kode_bankklp and f.status='SUSPEND' and '"+this.dp_d2.getDateString()+"' between f.tgl_awal and f.tgl_akhir "+
							 
							 "left join ( "+
							 "	select b.kode_bankklp,SUM(a.nilai) as tot_depo "+
							 "	from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank "+
							 "	where progress in ('1','0') group by b.kode_bankklp "+
							 ") g on b.kode_bankklp = g.kode_bankklp "+
							 
							 "where ("+nilaiToFloat(this.e_jml2.getText())+" between a.jk1 and a.jk2) and a.jenis='DOC' "+
							 "and  f.no_suspen is null "+
							 "and ((d.maxtempat - isnull(g.tot_depo,0) > 0 and c.jenis <> 'BUMN') or (c.jenis='BUMN')) "+							 
							 "order by ((a.persen1+persen2) /2) desc ";				
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																								
						this.sg2.appendData([line.kode_bank,line.nama,line.kode_bankklp,floatToNilai(line.maxtempat),floatToNilai(line.sisa),line.tglberlaku,line.sat,line.jml,floatToNilai(line.persen1),floatToNilai(line.persen2),floatToNilai(line.basis)]);
					}
				} else this.sg2.clear(1);										
			}
			else system.alert(this,"Jumlah tidak valid.","Isi dengan jumlah rencana penempatan.");
		}
		catch(e) {
			alert(e);
		}
	},	
	doLoadDEPORate:	function() {				
		try {					
			if (this.e_jml2.getText() != "") {								
				var strSQL = "select b.kode_bank,b.nama,b.kode_bankklp,convert(varchar,a.tanggal,103) as tglberlaku,cast(a.jk1 as varchar) +' - '+cast(a.jk2 as varchar) as jml,a.sat, a.persen1, a.persen2, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat end as maxtempat, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat - isnull(g.tot_depo,0) end as sisa, a.jenis, "+
							 "b.jml_hari as basis "+
							 "from  "+
							 
							 "( "+							 
							 "select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat  "+
							 "from (select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat, "+
						 	 "			 row_number() over(partition by kode_bank,jk1,jk2,jenis  order by tanggal desc) as rn "+
							 "	  from inv_bank_rate where kode_bank <> '"+this.bdepoLama+"' and tanggal<='"+this.dp_d2.getDateString()+"') as T "+
							 "where rn = 1  "+    
							 ") a "+
							 
							 "inner join inv_bank b on a.kode_bank=b.kode_bank "+ 
							 "inner join inv_bankklp c on b.kode_bankklp = c.kode_bankklp "+
							 "inner join inv_banknilai_d d on c.kode_bankklp = d.kode_bankklp "+
							 "inner join inv_banknilai_m e on d.no_bukti = e.no_bukti and e.no_flag='-' "+
							 
							 "left join inv_suspen f on c.kode_bankklp=f.kode_bankklp and f.status='SUSPEND' and '"+this.dp_d2.getDateString()+"' between f.tgl_awal and f.tgl_akhir "+
							 
							 "left join ( "+
							 "	select b.kode_bankklp,SUM(a.nilai) as tot_depo "+
							 "	from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank "+
							 "	where progress in ('1','0') group by b.kode_bankklp "+
							 ") g on b.kode_bankklp = g.kode_bankklp "+
							 
							 "where ("+nilaiToFloat(this.e_jml2.getText())+" between a.jk1 and a.jk2) and a.jenis='DEPOSITO' "+
							 "and  f.no_suspen is null "+
							 "and ((d.maxtempat - isnull(g.tot_depo,0) > 0 and c.jenis <> 'BUMN') or (c.jenis='BUMN')) "+
							 "order by ((a.persen1+persen2) /2) desc ";				
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																								
						this.sg2.appendData([line.kode_bank,line.nama,line.kode_bankklp,floatToNilai(line.maxtempat),floatToNilai(line.sisa),line.tglberlaku,line.sat,line.jml,floatToNilai(line.persen1),floatToNilai(line.persen2),floatToNilai(line.basis)]);
					}
				} else this.sg2.clear(1);										
			}
			else system.alert(this,"Jumlah tidak valid.","Isi dengan jumlah rencana penempatan.");
		}
		catch(e) {
			alert(e);
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
					 "where c.no_link is null and a.modul = 'DOCTTP' and (b.progress is null or b.progress = '0') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='-' "+
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
				this.sg3.appendData([line.no_tutup,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
					var strSQL = "select * from inv_depo2_m where no_shop = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
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
						}
					}			
					
					var strSQL = "select f.kode_bank,f.nama,f.kode_bankklp,e.maks,0 as sisa,convert(varchar,e.tgl_rate,103) as tgl_rate,e.satuan,e.jml_hari,e.rate1,e.rate2,e.basis "+
								 "from inv_shop_rate e "+
								 "inner join inv_bank f on e.kode_bank=f.kode_bank "+								 
								 "where e.no_shop = '"+this.e_nb.getText()+"' and e.kode_lokasi='"+this.app._lokasi+"' and f.kode_bank <>'"+this.bDepoSeb+"' "+
								 "order by ((e.rate1+e.rate2) /2) desc";								 
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg2.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];																																					
							this.sg2.appendData([line.kode_bank,line.nama,line.kode_bankklp,floatToNilai(line.maks),floatToNilai(line.sisa),line.tgl_rate,line.satuan.toUpperCase(),floatToNilai(line.jml_hari),floatToNilai(line.rate1),floatToNilai(line.rate2),floatToNilai(line.basis)]);
						}
					} else this.sg2.clear(1);															
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
	}	
});