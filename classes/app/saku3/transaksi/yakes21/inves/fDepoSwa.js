window.app_saku3_transaksi_yakes21_inves_fDepoSwa = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fDepoSwa.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fDepoSwa";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penempatan Deposito Swakelola", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl;tinymceCtrl");

		this.l_tgl1 = new portalui_label(this,{bound:[20,10,100,18],caption:"Tgl Justifikasi", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,98,18],selectDate:[this,"doSelectDate"]}); 			
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});					

		this.pc2 = new pageControl(this,{bound:[10,11,1000,430], childPage:["Shopping","List Data"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,				
				colTitle:["No Shopping","Tanggal","Keterangan","Nilai","Pilih"],
				colWidth:[[4,3,2,1,0],[70,100,300,80,100]],
				readOnly:true,
				colFormat:[[3,4],[cfNilai,cfButton]],
				click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
				dblClick:[this,"doDoubleClick3"],defaultRow:1,autoAppend:false});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Shoping",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});										
		this.cb_kelola = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Pengelola", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});								
		this.e_totdoc = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Tot. DOC", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});										
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true,change:[this,"doChange"]});		
		this.e_totdepo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Tot. Deposito", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});										
		this.bGetData = new button(this.pc2.childPage[0],{bound:[675,15,80,18],caption:"Justifikasi",click:[this,"getKomposisi"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,996,305], childPage:["Justifikasi","Penempatan","Catatan","File Dok","Add On"]});					
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:23,tag:9,
				colTitle:["Kd Bank","Nama Bank","Kategori", "1-4H","5-12H","13-20H","21-28H","1B","3B",
						  "Maks Penempatan","DOC Eks","Deposito Eks","Jumlah","Sisa","Keterangan",  
						  "DOC JthTempo","Deposito JthTempo","DOC Cair","Deposito Cair","DOC Perpanjang","Deposito Perpanjang","DOC Baru","Deposito Baru"],
				colWidth:[[22,21, 20,19,18,17,16,15,  14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[110,110,110,110,110,110,110,110, 200, 100,100,100,100,100, 60,60, 60,60,60,60 ,80,200,80]],
				columnReadOnly:[true,[9,10,11,12,13, 15,16,17,18,19,20,21,22],[0,1,2,3,4,5,6,7,8,14]],
				colFormat:[[3,4,5,6,7,8,9,10,11,12,13, 15,16,17,18,19,20,21,22],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],																				
				autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.bClear = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear Rate",click:[this,"doClear"]});		

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:15,tag:0,		            
				colTitle:["Jenis","Kd Bank","Deskripsi","Bank","Tgl Mulai","Jum Hr/Bl","Tgl Selesai","Nominal","Basis","Rate","Rek Cair","Nm Rek Cair","Rek Bunga","Nm Rek Bunga","Status"],					
				colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,150,80,150,80,60,60,100,80,60,80,60,250,60,80]],
				colFormat:[[5,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				columnReadOnly:[true,[0,3,11,13,14],[1,2,4,5,7,8,9,10,12]],					
				buttonStyle:[[0,1,4,6,10,12],[bsAuto,bsEllips,bsDate,bsDate,bsEllips,bsEllips]],					
				picklist:[[0],[new portalui_arrayMap({items:["DOC","DEPOSITO"]})]],checkItem: true,					
				ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],					
				autoAppend:true,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		//deposito tutup sebagian
		this.sgDepo = new saiGrid(this.pc1.childPage[1],{bound:[40,50,300,100],colCount:1,tag:9,visible:false,
				colTitle:["noDepoTutup"],
				colWidth:[[0],[180]],
				readOnly: true,autoAppend:false,defaultRow:1});

		this.mDesk1 = new tinymceCtrl(this.pc1.childPage[2],{bound:[1,5,990,290], withForm:false});		
			
		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
				colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
				columnReadOnly:[true,[0,1,2,3,4],[]],					
				colFormat:[[3,4],[cfUpload,cfButton]], 
				buttonStyle:[[0],[bsEllips]], 	
				click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
				ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[3],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
			colTitle:["namaFile","status"],
			colWidth:[[1,0],[80,180]],
			readOnly: true,autoAppend:false,defaultRow:1});
								
		this.e_hal1 = new saiCB(this.pc1.childPage[4],{bound:[20,16,350,20],caption:"Perihal Nodin",items:["Transfer Dana untuk Penempatan Deposito","Pemindahbukuan Dana"], readOnly:true,tag:2});				
		this.e_nokonfo = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,14,350,20],caption:"No Konfirmasi", maxLength:50,tag:2, text:"/KU120/YAKES-20/"});				
		this.e_hal2 = new saiCB(this.pc1.childPage[4],{bound:[20,17,350,20],caption:"Perihal Konfirm",items:["Penempatan Dana Deposito","Penempatan Dana Deposito On Call (DOC)","Penempatan Dana Money Market Account (MMA)"], readOnly:true,tag:2});				
		this.e_break = new saiCB(this.pc1.childPage[4],{bound:[20,14,200,20],caption:"Status Breakable",items:["NON","Breakable"], readOnly:true,tag:2});				
		this.cb_ttd1 = new saiCBBL(this.pc1.childPage[4],{bound:[20,15,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_jab1 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,17,450,20],caption:"Jabatan", maxLength:100,tag:2});				
		this.cb_ttd2 = new saiCBBL(this.pc1.childPage[4],{bound:[20,15,220,20],caption:"NIK Pejabat 1", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_jab2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,17,450,20],caption:"Jabatan", maxLength:100,tag:2});				
		this.cb_ttd3 = new saiCBBL(this.pc1.childPage[4],{bound:[20,15,220,20],caption:"NIK Pejabat 2", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_jab3 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,17,450,20],caption:"Jabatan", maxLength:100,tag:2});				
			
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
					
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
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
			
			this.cb_ttd1.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' and b.kode_bidang='4'",["nik","nama"],false,["NIK","Nama"],"where","Daftar Karyawan",true);			
			this.cb_ttd2.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' and b.kode_bidang='4'",["nik","nama"],false,["NIK","Nama"],"where","Daftar Karyawan",true);			
			this.cb_ttd3.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' and b.kode_bidang='4'",["nik","nama"],false,["NIK","Nama"],"where","Daftar Karyawan",true);			
			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola where jenis='SWAKELOLA' and flag_aktif='1'",["kode_kelola","nama"],false,["Kode","Nama"],"and","Daftar Pengelola",true);			
			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);						
			
			var data = this.dbLib.getDataProvider("select kode_kelola from inv_kelola where kode_kelola='YKT' and jenis='SWAKELOLA' and flag_aktif='1'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.cb_kelola.setText(line.kode_kelola);
			}										   												  
										   			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('PLAN','MAXEQU','MAXKAS','REKDC','REKBC','HDEPO','VDRDEPO') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "VDRDEPO") this.vendorDepo = line.flag;
					if (line.kode_spro == "HDEPO") this.akunHDepo = line.flag;								
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);	
					if (line.kode_spro == "REKDC") this.bDepoCair = line.flag;	
					if (line.kode_spro == "REKBC") this.bBungaCair = line.flag;						
					if (line.kode_spro == "MAXEQU") this.stsMaxEqu = line.flag;						
					if (line.kode_spro == "MAXKAS") {
						this.stsMaxKas = line.flag;	
						this.persenMaxKas = parseFloat(line.value1);
					}
				}
			}

			var sql = new server_util_arrayList();									
			sql.add("select kode_bank, nama from inv_bank");			
			this.dbLib.getMultiDataProviderA(sql);

			this.cb_ttd1.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fDepoSwa.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fDepoSwa.implement({	
	getKomposisi: function() {
		try {
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

			var strSQL = "select max(no_shop) as no_shop from inv_shop_m where kode_plan='"+this.cb_plan.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					var noShopLast = line.no_shop;
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

			this.sg.clear();
			var strSQL = "select a.kode_bankklp,a.nama,a.jenis,a.nu, "+		
			
						"  isnull(g.pdoc,0) as h1, "+
						"  isnull(g.pdoc,0) as h2, "+
						"  isnull(g.pdoc,0) as h3, "+
						"  isnull(g.pdoc,0) as h4, "+
						"  isnull(g.pdeposito,0) as b1, "+
						"  isnull(g.pdeposito,0) as b3, "+
						
						"	isnull(b.doc_eks,0)  as doc, "+ 
						"	isnull(b.depo_eks,0)  as deposito, "+ 
						"   isnull(c.doc_jthtempo,0) as doc_jthtempo, "+ 
						"   isnull(c.depo_jthtempo,0) as deposito_jthtempo, "+ 
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
						"		where a.progress in ('0','1') and a.kode_kelola ='"+this.cb_kelola.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_plan='"+this.cb_plan.getText()+"' "+
						"		group by c.kode_bankklp "+
						"		) b on a.kode_bankklp=b.kode_bankklp "+

						//eksisting baru aju dan aktif -hanya yg jatuh tempo
						"left join ( "+
						"		select c.kode_bankklp,sum(case when a.jenis = 'DOC' then a.nilai else 0 end) as doc_jthtempo ,sum(case when a.jenis = 'DEPOSITO' then a.nilai else 0 end) as depo_jthtempo "+
						"		from inv_depo2_m a  "+
						"		inner join inv_bank b on a.bdepo=b.kode_bank "+
						"		inner join inv_bankklp c on b.kode_bankklp=c.kode_bankklp "+ 
						"		where a.tgl_selesai='"+this.dp_d1.getDateString()+"' and a.progress in ('0','1') and a.kode_kelola ='"+this.cb_kelola.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_plan='"+this.cb_plan.getText()+"' "+
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
						"		where a.tanggal='"+this.dp_d1.getDateString()+"' and c.kode_lokasi='"+this.app._lokasi+"' and c.kode_kelola='"+this.cb_kelola.getText()+"' and c.kode_plan='"+this.cb_plan.getText()+"'  "+
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
						"		where a.tanggal='"+this.dp_d1.getDateString()+"' and c.kode_lokasi='"+this.app._lokasi+"' and c.kode_kelola='"+this.cb_kelola.getText()+"' and c.kode_plan='"+this.cb_plan.getText()+"'  "+
						"		group by e.kode_bankklp "+
						"      ) f on a.kode_bankklp=f.kode_bankklp "+

						//tabel terakhir rate berdasar bank

						// "left join ( "+
						// "		select z.kode_bankklp, "+
						// "		max(case when z.jenis='DOC' then z.p_bunga else 0 end) as pdoc, "+
						// "		max(case when z.jenis='DEPOSITO' then z.p_bunga else 0 end) as pdeposito "+
						// "		from ( "+
						// " 				select DISTINCT x.kode_bankklp, x.jenis, a.p_bunga "+
						// " 				from ( "+					
						// " 					select b.kode_bankklp,a.jenis, max(tgl_mulai) as tgl_mulai  "+
						// " 					from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank "+
						// " 					where a.kode_lokasi='"+this.app._lokasi+"' "+
						// " 					group by b.kode_bankklp,a.jenis "+					
						// "				) x "+
						// " 				left join  "+
						// " 					( "+					
						// " 					select b.kode_bankklp,a.jenis,a.tgl_mulai,max(a.p_bunga) as p_bunga "+
						// " 					from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank "+
						// " 					where a.kode_lokasi='"+this.app._lokasi+"' "+
						// " 					group by b.kode_bankklp,a.tgl_mulai,a.jenis "+					
						// " 				) a on a.kode_bankklp = x.kode_bankklp and a.tgl_mulai = x.tgl_mulai and a.jenis=x.jenis "+
						// " 			) z group by z.kode_bankklp "+
						// "		) g	on a.kode_bankklp=g.kode_bankklp "+

						"left join ( "+
						"		select kode_bankklp,h1 as pdoc,b1 as pdeposito "+
						"		from inv_shop_just where no_shop='"+noShopLast+"' "+
						"	) g on a.kode_bankklp=g.kode_bankklp "+

						"where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1' "+		
						
						"union "+

						// "		select kode_bankklp, nama, jenis, nu, h1, h2, h3, h4, b1, b3,sum(doc) as doc, sum(deposito) as deposito, doc_jthtempo, deposito_jthtempo, maks, doc_tutup, deposito_tutup, doc_panjang, deposito_panjang "+
						// "		from ("+
						// "			select a.kode_kelola as kode_bankklp,b.nama,'DISCRETIONARY' as jenis,5 as nu ,"+
						// "					0 as h1,0 as h2,0 as h3,0 as h4,0 as b1,0 as b3,0 as maks,0 as doc_tutup,0 as deposito_tutup,0 as doc_panjang,"+
						// "					0 as deposito_panjang ,sum(case a.jenis when 'DOC' then a.nilai_depo else 0 end) as doc ,sum(case a.jenis when 'DEPOSITO' then a.nilai_depo else 0 end) as deposito, 0 as doc_jthtempo, 0  as deposito_jthtempo "+
						// "			from inv_depo_kkp a inner join inv_kelola b on a.kode_kelola=b.kode_kelola and b.jenis='MI' "+
						// "			where a.tanggal = '"+tglMaxDepo+"' and a.kode_plan='"+this.cb_plan.getText()+"' "+
						// "			group by a.kode_kelola,b.nama,a.jenis "+
						// "		) x "+
						// "		group by kode_bankklp, nama, jenis, nu, h1, h2, h3, h4, b1, b3, maks, doc_tutup, deposito_tutup, doc_panjang, deposito_panjang,doc_jthtempo, deposito_jthtempo "+

						"	  select kode_bankklp, nama, jenis, nu, h1, h2, h3, h4, b1, b3,sum(doc) as doc, sum(deposito) as deposito, doc_jthtempo, deposito_jthtempo, maks, doc_tutup, deposito_tutup, doc_panjang, deposito_panjang "+
						"	  from ("+
						"		select "+
						"			d.kode_kelola as kode_bankklp,d.nama,'DISCRETIONARY' as jenis, 5 as nu, "+
						"			0 as h1,0 as h2,0 as h3,0 as h4,0 as b1,0 as b3,0 as maks,0 as doc_tutup,0 as deposito_tutup,0 as doc_panjang, "+
						"			0 as deposito_panjang ,sum(case a.jenis when 'DOC' then a.nilai else 0 end) as doc , "+
						"			sum(case a.jenis when 'DEPOSITO' then a.nilai else 0 end) as deposito, "+ 
						"			0 as doc_jthtempo, 0  as deposito_jthtempo "+ 
						"		from inv_depo2_m a "+
						"				inner join inv_bank b on a.bdepo=b.kode_bank "+
						"				inner join inv_bankklp bb on b.kode_bankklp=bb.kode_bankklp "+
						"				inner join inv_kelola d on a.kode_kelola=d.kode_kelola and d.jenis='MI' "+ 
						"				left join inv_depotutup_m c on a.no_depo=c.no_depo and c.tanggal <= '"+this.dp_d1.getDateString()+"' "+
						"		where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_plan='"+this.cb_plan.getText()+"' "+
						"	  		and a.tgl_mulai <= '"+this.dp_d1.getDateString()+"' and c.no_depo is null "+
						"		group by d.kode_kelola,d.nama,a.jenis "+
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
					this.sg.appendData([line.kode_bankklp,line.nama,line.jenis.toUpperCase(), 
										floatToNilai(line.h1),floatToNilai(line.h2),floatToNilai(line.h3),floatToNilai(line.h4),
										floatToNilai(line.b1),floatToNilai(line.b3),
										floatToNilai(line.maks),
										floatToNilai(line.doc),floatToNilai(line.deposito),floatToNilai(total),floatToNilai(sisa), "-",
										floatToNilai(line.doc_jthtempo),floatToNilai(line.deposito_jthtempo), 
										floatToNilai(line.doc_tutup),floatToNilai(line.deposito_tutup), 
										floatToNilai(line.doc_panjang),floatToNilai(line.deposito_panjang),"0","0"]);				
				}
			} else this.sg.clear(1);

			//perpanjang sebagian utk shoppingrate lg (data copy-paste dr depo yg ditutup dulu/untuk diedit yg sebetulnya)
			this.sg1.clear();
			this.sgDepo.clear();
			var strSQL = "select a.no_depo,a.jenis,a.bdepo,b.nama,b.kode_bankklp,convert(varchar,a.tgl_mulai,103) as tglmulai,d.nilai_panjang as nilai_sebagian, a.basis,a.bcair,a.bbunga "+
						"from inv_depo2_m a "+
						"inner join inv_depotutup_d d on a.no_depo=d.no_depo and a.kode_lokasi=d.kode_lokasi "+
						"inner join inv_bank b on a.bdepo = b.kode_bank "+						 
						"where a.kode_kelola='"+this.cb_kelola.getText()+"' and d.nilai_panjang <> 0 and d.no_shop='-' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;					
				for (var i in data.rs.rows){
					line = data.rs.rows[i];		
					this.sgDepo.appendData([line.no_depo]);				
					this.sg1.appendData([line.jenis,line.bdepo,line.nama,line.kode_bankklp,line.tglmulai,"0",line.tglmulai,floatToNilai(line.nilai_sebagian),floatToNilai(line.basis),"0",line.bcair,"-",line.bbunga,"-","PERPANJANG"]);				
					this.doChangeCell1(this.sg1,1,i);
					this.doChangeCell1(this.sg1,10,i);
					this.doChangeCell1(this.sg1,12,i);				
				}
			} else this.sg1.clear(1);
		}
		catch(e) {
			alert(e);
		}
	},
	doClear: function() {
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)) {							
				for (var j=3;j < 9;j++){
					this.sg.cells(j,i,"0");
				}
			}	
		}	
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
					"select kode_jenis,nama   from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"'  and modul ='DP'",
					"select count(kode_jenis) from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"'  and modul ='DP'",
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
						sql.add("update  inv_depotutup_d set no_shop = '-' where no_shop = '"+this.e_nb.getText()+"'");
						sql.add("delete from inv_depo2_m where no_shop='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_shop_just where no_shop='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='DEPOSWA'");																			
					
						sql.add("delete from pbh_rek where no_bukti in (select no_depo from pbh_pb_m where no_hutang='"+this.e_nb.getText()+"') and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_dok where no_bukti in (select no_depo from pbh_pb_m where no_hutang='"+this.e_nb.getText()+"') and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("delete from pbh_pb_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_pb_j where no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
					}
					
					//depo yg ditutup dan perpanjang sebagian di upadate no Shopping-nya
					for (var i=0;i < this.sgDepo.getRowCount();i++){
						if (this.sgDepo.rowValid(i)){
							sql.add("update inv_depotutup_d set no_shop='"+this.e_nb.getText()+"' where no_depo='"+this.sgDepo.cells(0,i)+"'");	
						}
					}

					//jurnal di kasbank via PB (cashbasis)
					var total = nilaiToFloat(this.e_totdoc.getText()) + nilaiToFloat(this.e_totdepo.getText());					
					sql.add("insert into inv_shop_m (no_shop,periode,nik_user,tgl_input,kode_lokasi,tanggal,keterangan,nik_app,tgl_awal,tgl_akhir,jml_hari,jml_bulan,progress,nilai, no_app,no_spb,bsumber,nodin,kepada1,dari1,lamp1,hal1,nikttd1,jab1,noins,nikttd2,jab2,nikttd3,jab3,just,kode_pp,modul,kode_kelola,kode_plan,catatan,hal2,posted,nik_sap) values "+
							"('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"',0,0,'0',"+total+"	,'-','-','-','-','-','-','-','"+this.e_hal1.getText()+"','"+this.cb_ttd1.getText()+"','"+this.e_jab1.getText()+"','"+this.e_nokonfo.getText()+"', '"+this.cb_ttd2.getText()+"','"+this.e_jab2.getText()+"','"+this.cb_ttd3.getText()+"','"+this.e_jab3.getText()+"','"+this.e_break.getText()+"','"+this.app._kodePP+"','SHOP19','"+this.cb_kelola.getText()+"','"+this.cb_plan.getText()+"','"+urlencode(this.mDesk1.getCode())+"','"+this.e_hal2.getText()+"','X','-')");
															
					var no_depo = this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depo2_m","no_depo",this.app._lokasi+"-DEPO"+this.e_periode.getText().substr(2,4)+".","000");
					var format = no_depo.substr(0,12);   					
					var nu = parseFloat(no_depo.substr(12,3));					
					var jthTempo = tglMulai = noDepo = "";				

					for (var i=0;i < this.sg1.getRowCount();i++) {
						if (this.sg1.rowValid(i)){		
							tglMulai = this.sg1.getCellDateValue(4,i);
							jthTempo = this.sg1.cells(6,i).substr(6,4)+"-"+this.sg1.cells(6,i).substr(3,2)+"-"+this.sg1.cells(6,i).substr(0,2);

							if (this.sg1.cells(7,i) != "0") {
								var idx = i + nu;
								idx = idx.toString();
								if (idx.length == 1) var urut = "00"+idx;
								if (idx.length == 2) var urut = "0"+idx;
								if (idx.length == 3) var urut = idx;						
								noDepo = format + urut;	

								if (this.sg1.cells(14,i) == "BARU") {
									var vProg = "0";
									var noKas = "-";
								}
								else {
									var vProg = "1";
									var noKas = this.e_nb.getText();
								}

								sql.add("insert into inv_depo2_m(no_depo,kode_lokasi,periode,tanggal,nik_user,tgl_input,no_kas,progress,tgl_akru_seb,tgl_akru,jenis,status_dana,no_bilyet,keterangan,tgl_mulai,tgl_selesai,jml_hari,basis,p_bunga,nilai,bsumber,bdepo,bcair,bbunga,akun_depo,akun_piutang,akun_pdpt,nik_buat,kode_kelola,no_shop,ref1,tgl_hitung,tgl_hitungseb, kode_plan) values "+
										"('"+noDepo+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+tglMulai+"','"+this.app._userLog+"',getdate(),'"+noKas+"','"+vProg+"','"+tglMulai+"','"+tglMulai+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(14,i)+"','-','"+this.sg1.cells(2,i)+"','"+tglMulai+"','"+jthTempo+"',"+nilaiToFloat(this.sg1.cells(5,i))+",   "+nilaiToFloat(this.sg1.cells(8,i))+","+nilaiToFloat(this.sg1.cells(9,i))+","+nilaiToFloat(this.sg1.cells(7,i))+",'-','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(10,i)+"','"+this.sg1.cells(12,i)+"','-','-','-','"+this.app._userLog+"','"+this.cb_kelola.getText()+"','"+this.e_nb.getText()+"','-','"+tglMulai+"','"+tglMulai+"','"+this.cb_plan.getText()+"')");

							}							
							
						}
					}
					
					sql.add("update a set a.akun_depo=b.akun_depo,a.akun_piutang=b.akun_piutang,a.akun_pdpt=b.akun_bunga "+							
							"from inv_depo2_m a inner join inv_depo_param b on a.jenis=b.jenis and a.kode_plan=b.kode_plan "+
							"where a.no_shop='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					for (var i=0;i < this.sg.getRowCount();i++) {
						if (this.sg.rowValid(i)){		
							sql.add("insert into inv_shop_just(no_shop,kode_lokasi,kode_bankklp,h1,h2,h3,h4,b1,b3, maks,doc_eks,depo_eks,keterangan,doc_jth,depo_jth,doc_cair,depo_cair,doc_pjg,depo_pjg,doc_baru,depo_baru) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+
									","+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+",'"+this.sg.cells(14,i)+
									"',"+nilaiToFloat(this.sg.cells(15,i))+","+nilaiToFloat(this.sg.cells(16,i))+","+nilaiToFloat(this.sg.cells(17,i))+","+nilaiToFloat(this.sg.cells(18,i))+","+nilaiToFloat(this.sg.cells(19,i))+","+nilaiToFloat(this.sg.cells(20,i))+","+nilaiToFloat(this.sg.cells(21,i))+","+nilaiToFloat(this.sg.cells(22,i))+")");
						}
					}

					//----------- PBH untuk yg bukan (!=) berstatus PERPANJANG -------		PB harus per no depo (130122)			
					// sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+		
					// 		"select '"+this.e_nb.getText()+"',no_depo,'"+this.dp_d1.getDateString()+"',1,akun_depo,keterangan,'D',nilai,'"+this.app._kodePP+"','-',kode_lokasi,'DEPOSWA','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
					// 		"from inv_depo2_m "+
					// 		"where no_kas='-' and status_dana<>'PERPANJANG' and no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					// sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_buat,no_hutang,no_spb,no_ver,akun_hutang,nik_ver,bank_trans,no_nota,no_kas)  "+
					// 		"select no_pb,'-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',sum(nilai),'DEPOSWA','0','"+this.app._kodePP+"','"+this.cb_ttd1.getText()+"','"+this.app._userLog+"',no_pb,'-','-','-','"+this.cb_ttd2.getText()+"','NONBT','-','-' "+
					// 		"from pbh_pb_j where no_pb='"+this.e_nb.getText()+"' "+
					// 		"group by no_pb");

					// sql.add("insert into pbh_rek(nu,no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) "+
					// 		"select 0,no_pb,'"+this.app._lokasi+"','DEPOSWA','-','-','-','-',sum(nilai),0,sum(nilai) "+
					// 		"from pbh_pb_j where no_pb='"+this.e_nb.getText()+"' "+
					// 		"group by no_pb");
					
					sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+		
							"select no_depo,'"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',1,akun_depo,keterangan,'D',nilai,'"+this.app._kodePP+"','-',kode_lokasi,'DEPOSWA','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
							"from inv_depo2_m "+
							"where no_kas='-' and status_dana<>'PERPANJANG' and no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					//no hutang diisi no shoping(nodokumen pbh_j), no pb = no depo
					sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_buat,no_hutang,no_spb,no_ver,akun_hutang,nik_ver,bank_trans,no_nota,no_kas)  "+
							"select no_pb,'-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',nilai,'DEPOSWA','0','"+this.app._kodePP+"','"+this.cb_ttd1.getText()+"','"+this.app._userLog+"',no_dokumen,'-','-','-','"+this.cb_ttd2.getText()+"','NONBT','-','-' "+
							"from pbh_pb_j where no_dokumen='"+this.e_nb.getText()+"' ");

					sql.add("insert into pbh_rek(nu,no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) "+
							"select 0,no_pb,'"+this.app._lokasi+"','DEPOSWA','-','-','-','-',nilai,0,nilai "+
							"from pbh_pb_j where no_dokumen='"+this.e_nb.getText()+"' ");	

					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into inv_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','DEPOSWA','"+this.e_nb.getText()+"')");															
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','DEPOSWA','"+this.e_nb.getText()+"')");															
						}	
					}	

					sql.add("update karyawan set jabatan ='"+this.e_jab3.getText()+"' where nik='"+this.cb_ttd3.getText()+"'");										

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
	doRekapJust: function() {
		//perpnajng sebagian masuk kolom perpanjang bukan ke baru		
		this.sg1.validasi();

		for (var k=0;k < this.sg.getRowCount();k++){					
			if (this.sg.rowValid(k)){
				var nilaiBaruDoc = nilaiBaruDepo =  0;
				for (var i=0;i < this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){
						if ((this.sg.cells(0,k) == this.sg1.cells(3,i)) && (this.sg1.cells(14,i)=="BARU")) {
							if (this.sg1.cells(0,i)=="DOC") nilaiBaruDoc += nilaiToFloat(this.sg1.cells(7,i));
							if (this.sg1.cells(0,i)=="DEPOSITO") nilaiBaruDepo += nilaiToFloat(this.sg1.cells(7,i));
						}
					}
				}
				this.sg.cells(21,k,nilaiBaruDoc);
				this.sg.cells(22,k,nilaiBaruDepo);
			}
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
					setTipeButton(tbSimpan);
					this.doClick(this.i_gen);
					this.stsSimpan = 1;
					this.sg.clear(1);
					this.sg1.clear(1)
					this.sg3.clear(1);
					this.sgDepo.clear(1);					
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
					this.bGetData.show();
					this.pc2.setActivePage(this.pc2.childPage[0]);																		
					this.pc1.setActivePage(this.pc1.childPage[0]);
				break;
			case "simpan" :			
			case "ubah" :						
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);

				this.doRekapJust();

				for (var i=0;i < this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){
						var j = i+1;
						if (nilaiToFloat(this.sg1.cells(5,i)) <= 0) {
							system.alert(this,"Jumlah Hari/Bulan tidak boleh nol atau kurang","(Baris : "+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg1.cells(9,i)) <= 0) {
							system.alert(this,"Rate tidak boleh nol atau kurang","(Baris : "+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg1.cells(7,i)) <= 0) {
							system.alert(this,"Nominal tidak boleh nol atau kurang","(Baris : "+j+")");
							return false;
						}
						if (nilaiToFloat(this.sg1.cells(8,i)) != 360 && nilaiToFloat(this.sg1.cells(8,i)) != 365 && nilaiToFloat(this.sg1.cells(8,i)) != 366) {
							system.alert(this,"Basis hari harus 360/365/366","(Baris : "+j+")");
							return false;
						}							
					}
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
					sql.add("update  inv_depotutup_d set no_shop = '-' where no_shop = '"+this.e_nb.getText()+"'");
					sql.add("delete from inv_depo2_m where no_shop='"+this.e_nb.getText()+"'");
					sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"'");
					sql.add("delete from inv_shop_just where no_shop='"+this.e_nb.getText()+"'");
					sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='DEPOSWA'");																			

					sql.add("delete from pbh_rek where no_bukti in (select no_depo from pbh_pb_m where no_hutang='"+this.e_nb.getText()+"') and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_dok where no_bukti in (select no_depo from pbh_pb_m where no_hutang='"+this.e_nb.getText()+"') and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("delete from pbh_pb_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_pb_j where no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					
					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;	
		}
	},		
	doSelectDate: function(sender, y,m,d){		
		if (sender == this.dp_d1) {
			if (m < 10) m = "0" + m;			
			this.e_periode.setText(y+""+m);			
		}
		if (this.stsSimpan==1) {
			this.doClick(this.i_gen);
			this.e_nokonfo.setText("     /KU120/YAKES-20/"+y);
		}
	},		
	doChange: function(sender) {
		try {
			if (sender == this.cb_ttd1 && this.cb_ttd1.getText()!="" && this.stsSimpan==1) {
				var strSQL = "select jabatan from karyawan where nik ='"+this.cb_ttd1.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_jab1.setText(line.jabatan);
					}				
				}	
			}

			if (sender == this.cb_ttd2 && this.cb_ttd2.getText()!="" && this.stsSimpan==1) {
				var strSQL = "select jabatan from karyawan where nik ='"+this.cb_ttd2.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_jab2.setText(line.jabatan);
					}				
				}	
			}

			if (sender == this.cb_ttd3 && this.cb_ttd3.getText()!="" && this.stsSimpan==1) {
				var strSQL = "select jabatan from karyawan where nik ='"+this.cb_ttd3.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_jab3.setText(line.jabatan);
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
				this.sg.clear(1);
				this.sg1.clear(1);
				this.sgDepo.clear(1);					
				this.sgUpld.clear(1);
				this.sgFile.clear(1);
				this.bGetData.show();
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_shop_m","no_shop",this.app._lokasi+"-SR"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},		
	doChangeCell1: function(sender, col, row){
		try {
			if (col == 1) {
				var data = this.dbLib.getDataProvider("select kode_bankklp,jml_hari from inv_bank where kode_bank='"+this.sg1.cells(1,row)+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];												
					this.sg1.cells(3,row,line.kode_bankklp);
					if (this.stsSimpan == 1) {
						this.sg1.cells(2,row,"Penempatan .....");
						this.sg1.cells(8,row,line.jml_hari);
						this.sg1.cells(10,row,this.bDepoCair);
						this.sg1.cells(12,row,this.bBungaCair);
						this.doChangeCell1(this.sg1,10,row);
						this.doChangeCell1(this.sg1,12,row);
						if (this.sg1.cells(4,row) == "") this.sg1.cells(4,row,this.dp_d1.getText());	
						if (this.sg1.cells(14,row) == "") this.sg1.cells(14,row,"BARU");										
					}
				} 
			}
			if (col == 4 || col == 5) {
				if (this.sg1.cells(4,row) != "" && this.sg1.cells(5,row) != "")  {
					if (this.sg1.cells(0,row) == "DOC") var strSQL = "select substring(convert(varchar,dateadd(day,"+nilaiToFloat(this.sg1.cells(5,row))+",'"+this.sg1.getCellDateValue(4,row)+"'),103),1,10) as tgl";
					else var strSQL = "select substring(convert(varchar,dateadd(month,"+nilaiToFloat(this.sg1.cells(5,row))+",'"+this.sg1.getCellDateValue(4,row)+"'),103),1,10) as tgl";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																			
							this.sg1.cells(6,row,line.tgl);
						}
					}

					if (this.stsSimpan == 1) {
						var jum = nilaiToFloat(this.sg1.cells(5,row));
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i)==this.sg1.cells(3,row)) {							
								if (this.sg1.cells(0,row) == "DOC" && (jum>=1 && jum<=4)) this.sg1.cells(9,row,this.sg.cells(3,i));		
								if (this.sg1.cells(0,row) == "DOC" && (jum>=5 && jum<=12)) this.sg1.cells(9,row,this.sg.cells(4,i));		
								if (this.sg1.cells(0,row) == "DOC" && (jum>=13 && jum<=20)) this.sg1.cells(9,row,this.sg.cells(5,i));		
								if (this.sg1.cells(0,row) == "DOC" && (jum>=21 && jum<=28)) this.sg1.cells(9,row,this.sg.cells(6,i));		
				
								if (this.sg1.cells(0,row) == "DEPOSITO" && (jum>=1 && jum<=2)) this.sg1.cells(9,row,this.sg.cells(7,i));		
								if (this.sg1.cells(0,row) == "DEPOSITO" && jum==3) this.sg1.cells(9,row,this.sg.cells(8,i));		
							}	
						}
					}
				}
			}
			
			if (col == 7) this.doRekapJust();

			if (col == 10) {
				if (this.sg1.cells(10,row) != "" && this.sg1.cells(10,row) != "-") {				
					var rek = this.dataRek.get(this.sg1.cells(10,row));				
					if (rek) this.sg1.cells(11,row,rek);
					else {
						if (trim(this.sg1.cells(10,row)) != "") system.alert(this,"Kode Rekening "+this.sg1.cells(10,row)+" tidak ditemukan","Inputkan kode lainnya.","");                
						this.sg1.cells(10,row,"");
						this.sg1.cells(11,row,"");
					}				
				}
			}		
			if (col == 12) {
				if (this.sg1.cells(12,row) != "" && this.sg1.cells(12,row) != "-") {
					var rek = this.dataRek.get(this.sg1.cells(12,row));				
					if (rek) this.sg1.cells(13,row,rek);
					else {
						if (trim(this.sg1.cells(12,row)) != "") system.alert(this,"Kode Rekening "+this.sg1.cells(12,row)+" tidak ditemukan","Inputkan kode lainnya.","");                
						this.sg1.cells(12,row,"");
						this.sg1.cells(13,row,"");
					}				
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doEllipsClick1: function(sender, col, row){
		try{
			if (col == 1){
				this.standarLib.showListData(this, "Daftar Rekening",sender,undefined, 
						"select kode_bank, nama+' - '+no_rek as nama from inv_bank where kode_kelola='"+this.cb_kelola.getText()+"' and flag_bdepo='1' ",
						"select count(*) from inv_bank where kode_kelola='"+this.cb_kelola.getText()+"' and flag_bdepo='1' ",						
						["kode_bank","nama"],"and",["Kode","Nama"],false);				
			}
			if (col == 10){
				this.standarLib.showListData(this, "Daftar Rekening",sender,undefined, 
						"select kode_bank, nama+' - '+no_rek as nama from inv_bank",
						"select count(*) from inv_bank",						
						["kode_bank","nama"],"where",["Kode","Nama"],false);				
			}
			if (col == 12){
				this.standarLib.showListData(this, "Daftar Rekening",sender,undefined, 
						"select kode_bank, nama+' - '+no_rek as nama from inv_bank",
						"select count(*) from inv_bank",						
						["kode_bank","nama"],"where",["Kode","Nama"],false);				
			}	
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doNilaiChange1: function(){
		try{			
			var totDOC = totDepo = 0 ;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(7,i) != ""){										
					if (this.sg1.cells(0,i) == "DOC") totDOC += nilaiToFloat(this.sg1.cells(7,i));		
					if (this.sg1.cells(0,i) == "DEPOSITO") totDepo += nilaiToFloat(this.sg1.cells(7,i));		
				}
			}			
			this.e_totdoc.setText(floatToNilai(totDOC));			
			this.e_totdepo.setText(floatToNilai(totDepo));			
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
						if (result.toLowerCase().search("error") == -1)	{										
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}
							
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi. (Bukti : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						} 
						else system.info(this,result,"");
					break;	 
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataRek = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataRek.set(line.kode_bank, line.nama);										
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
	doLoad3:function(sender){																											
		var strSQL = "select distinct a.no_shop,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
					 "from inv_shop_m a inner join inv_depo2_m b on a.no_shop=b.no_shop "+
					 "where a.kode_lokasi ='"+this.app._lokasi+"' and b.progress = '0' and a.modul in ('SHOP19')";			 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.sg3.clear();
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
			this.sg3.appendData([line.no_shop,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]);
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.bGetData.hide();
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));	

				var strSQL = "select * from inv_shop_m where no_shop='"+this.e_nb.getText()+"'";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);					
						this.cb_kelola.setText(line.kode_kelola);
						this.cb_plan.setText(line.kode_plan);
						this.mDesk1.setCode(urldecode(line.catatan));	
						this.e_nokonfo.setText(line.noins);
						this.e_hal1.setText(line.hal1);
						this.e_hal2.setText(line.hal2);
						this.e_break.setText(line.just);
						
						this.cb_ttd1.setText(line.nikttd1);
						this.e_jab1.setText(line.jab1);						
						this.cb_ttd2.setText(line.nikttd2);						
						this.e_jab2.setText(line.jab2);
						this.cb_ttd3.setText(line.nikttd3);						
						this.e_jab3.setText(line.jab3);					
					}
				}

				this.sg.clear(); 			
				var strSQL = "select a.*,b.nama,b.jenis,a.doc_eks+depo_eks as tot_eks, a.maks-(a.doc_eks+depo_eks) as sisa "+
							 "from inv_shop_just a inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp "+
							 "where a.no_shop='"+this.e_nb.getText()+"' order by b.nu";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg.appendData([line.kode_bankklp,line.nama,line.jenis,floatToNilai(line.h1),floatToNilai(line.h2),floatToNilai(line.h3),floatToNilai(line.h4),floatToNilai(line.b1),floatToNilai(line.b3),
											floatToNilai(line.maks),floatToNilai(line.doc_eks),floatToNilai(line.depo_eks),floatToNilai(line.tot_eks),floatToNilai(line.sisa),line.keterangan,
											floatToNilai(line.doc_jth),floatToNilai(line.depo_jth),floatToNilai(line.doc_cair),floatToNilai(line.depo_cair),floatToNilai(line.doc_pjg),floatToNilai(line.depo_pjg),floatToNilai(line.doc_baru),floatToNilai(line.depo_baru)]);						
					}
				} else this.sg.clear(1);
				
				this.sg1.clear();				
				var strSQL = "select a.no_depo,a.jenis,a.bdepo,a.keterangan,b.kode_bankklp,convert(varchar,a.tgl_mulai,103) as tglmulai,convert(varchar,a.tgl_selesai,103) as tglselesai,a.nilai, a.basis,a.bcair,a.bbunga, a.jml_hari,a.status_dana,a.p_bunga "+
							 "from inv_depo2_m a "+							 
							 "inner join inv_bank b on a.bdepo = b.kode_bank "+						 							 
							 "where a.no_shop='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];											
						this.sg1.appendData([line.jenis,line.bdepo,line.keterangan,line.kode_bankklp,line.tglmulai,line.jml_hari,line.tglselesai,floatToNilai(line.nilai),floatToNilai(line.basis),floatToNilai(line.p_bunga),line.bcair,"-",line.bbunga,"-",line.status_dana]);				
						this.doChangeCell1(this.sg1,1,i);
						this.doChangeCell1(this.sg1,10,i);
						this.doChangeCell1(this.sg1,12,i);				
					}
				} else this.sg1.clear(1);

				this.sgDepo.clear();
				var strSQL = "select no_depo from inv_depotutup_d "+
							 "where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						this.sgDepo.appendData([line.no_depo]);										
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