window.app_saku3_transaksi_sapyakes_fShopRate = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fShopRate.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fShopRate";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penempatan Deposito", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Penempatan","List Penempatan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,300,80,100]],
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.l_tgl1 = new portalui_label(this.pc2.childPage[0],{bound:[20,13,100,18],caption:"Tgl Penempatan", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"NIK Post SAP",tag:2,multiSelection:false, visible:false});         						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,13,220,20],caption:"Tot. Open", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});										
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_totdoc = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,12,220,20],caption:"Tot. DOC", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});										
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});										
		this.e_totdepo = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,220,20],caption:"Tot. Deposito", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});									
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,10,990,347], childPage:["Depo Open","D O C","Deposito","Nota Dinas","Nota Konfirmasi"]});				
		this.sg2 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,303],colCount:9,tag:9,
		            colTitle:["Status","No Depo","No Bilyet","Deskripsi","Cabang","Bank","Jth Tempo","Nominal","Jenis"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,80,100,150,200,150,100,70]],
					colFormat:[[7],[cfNilai]],
					readOnly:true, dblClick:[this,"doDoubleClick2"], change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],					
					buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		
		this.e_jmlhari = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Jumlah Hari", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.bRateDOC = new button(this.pc1.childPage[1],{bound:[240,13,80,18],caption:"Rate DOC",click:[this,"doLoadDOCRate"]});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,280],colCount:20,tag:9,		            
					colTitle:["Kd Cabang","Keterangan","Bank","Maks Tempat","Sisa Plafon","Tgl Shopping","Satuan","Jml Hari","Rate1","Rate2","Rate YKT","Rate Final","Nominal","Status","Basis Hr","Jth Tempo","Rek Cair","Nama Rek","Rek Bunga","Nama Rek"],					
					colWidth:[[19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[150,60,150,60,80,60,80,100,80,80,60,60,60,60,80,100,100,60,200,60]],
					colFormat:[[3,4,7,8,9,10,11,12,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,2,3,4,5,6,7,8,9,12,13,15,17,19],[1,10,11,12,14,16,18]],					
					buttonStyle:[[13,15,16,18],[bsAuto,bsDate,bsEllips,bsEllips]],
					picklist:[[13],[new portalui_arrayMap({items:["DAKES","DAKEM"]})]],checkItem: true,					
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.e_jmlbulan = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"Jumlah Bulan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.bRateDEPO = new button(this.pc1.childPage[2],{bound:[240,13,80,18],caption:"Rate Deposito",click:[this,"doLoadDEPORate"]});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,280],colCount:20,tag:9,		            
					colTitle:["Kd Cabang","Keterangan","Bank","Maks Tempat","Sisa Plafon","Tgl Berlaku","Satuan","Jml Bulan","Rate1","Rate2","Rate YKT","Rate Final","Nominal","Status","Basis Hr","Jth Tempo","Rek Cair","Nama Rek","Rek Bunga","Nama Rek"],		
					colWidth:[[19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[150,60,150,60,80,60,80,100,80,80,60,60,60,60,80,100,100,60,200,60]],
					colFormat:[[3,4,7,8,9,10,11,12,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,2,3,4,5,6,7,8,9,12,13,15,17,19],[1,10,11,12,14,16,18]],					
					buttonStyle:[[13,15,16,18],[bsAuto,bsDate,bsEllips,bsEllips]],
					picklist:[[13],[new portalui_arrayMap({items:["DAKES","DAKEM"]})]],checkItem: true,					
					ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],					
					autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});		
		
		
		this.e_nodin = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,10,350,20],caption:"Nomor", tag:8, maxLength:50});										
		this.e_kepada1 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,350,20],caption:"Kepada", tag:8, maxLength:100});										
		this.e_dari1 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,350,20],caption:"Dari", tag:8, maxLength:100});										
		this.e_lamp1 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,13,350,20],caption:"Lampiran", tag:8, maxLength:100});										
		//this.e_hal1 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,14,350,20],caption:"Perihal", tag:8, maxLength:100});										
		this.e_hal1 = new saiCB(this.pc1.childPage[3],{bound:[20,20,350,20],caption:"Perihal",items:["Transfer Dana untuk Penempatan Deposito","Pemindahbukuan Dana"], readOnly:true,tag:2});				
		this.cb_ttd1 = new portalui_saiCBBL(this.pc1.childPage[3],{bound:[20,15,220,20],caption:"NIK Ttd",tag:8,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab1 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,16,350,20],caption:"Jabatan", tag:8, maxLength:50});										
		
		
		this.e_noins = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,10,350,20],caption:"Nomor", tag:8, maxLength:50});										
		this.cb_ttd2 = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,15,220,20],caption:"Man Investasi",tag:8,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,16,350,20],caption:"Jabatan", tag:8, maxLength:50});												
		this.cb_ttd3 = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,15,220,20],caption:"Kabid Investasi",tag:8,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab3 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,16,350,20],caption:"Jabatan", tag:8, maxLength:50});										
		//this.e_just = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,17,500,20],caption:"Justifikasi", tag:1, maxLength:200});
		this.e_just = new saiCB(this.pc1.childPage[4],{bound:[20,17,350,20],caption:"Perihal",items:["Penempatan Dana Deposito On Call","Penempatan Dana MMA","Penempatan Dana (Deposito Baru)","Penempatan Dana (Pencairan dan Penempatan Kembali)"], readOnly:true,tag:2});				
		
		
		this.rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		this.pc1.childPage[3].rearrangeChild(10, 23);		
		this.pc1.childPage[4].rearrangeChild(10, 23);		
						
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_ttd1.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.app._kodeBidang+"' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ttd2.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.app._kodeBidang+"' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ttd3.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			var sql = new server_util_arrayList();
			sql.add("select kode_bank, nama+' - '+no_rek as nama from inv_bank");						
			this.dbLib.getMultiDataProviderA(sql);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('DEPONODIN','DEPONOINS','KABIDIV','MANIV') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "DEPONODIN") this.nodin = line.flag;
					if (line.kode_spro == "DEPONOINS") this.noins = line.flag;
					if (line.kode_spro == "KABIDIV") this.kabidIV = line.flag;
					if (line.kode_spro == "MANIV") this.manIV = line.flag;
				}
			}

			this.e_nodin.setText(this.nodin);
			this.e_noins.setText(this.noins);
			this.e_kepada1.setText("Sdr. KABID KEUANGAN");
			this.e_dari1.setText("KABID INVESTASI");
			this.e_lamp1.setText("1 (satu) berkas");
			//this.e_hal1.setText("Transfer Dana untuk Penempatan Deposito");
			this.cb_ttd1.setText(this.kabidIV);
			this.cb_ttd2.setText(this.manIV);
			this.cb_ttd3.setText(this.kabidIV);
			
			var sql = new server_util_arrayList();
			sql.add("select kode_bank, nama+' - '+no_rek as nama from inv_bank");						
			this.dbLib.getMultiDataProviderA(sql);
			
			var data = this.dbLib.getDataProvider("select kode_kelola from inv_kelola where jenis = 'SWAKELOLA'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.kodeKelola = line.kode_kelola;
			}
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('VENDORDEPO','SAPHDEPO') ",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																								
					if (line.kode_spro == "VENDORDEPO") this.vendorDepo = line.flag;
					if (line.kode_spro == "SAPHDEPO") this.akunHDepo = line.flag;								
				}
			}
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join sap_nik_post b on a.nik=b.nik "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			
			var data = this.dbLib.getDataProvider("select nik from sap_nik_post where kode_lokasi ='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.cb_app.setText(line.nik);
			}
							   
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fShopRate.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fShopRate.implement({		
	doHitungPlafon : function() {		
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var ix,dtJrnl = 0;
		
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(12,i) != "0") {
				kdBank = this.sg.cells(2,i);
				nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if ((kdBank == dtJurnal.get(j).get("kode_bank"))){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_bank",kdBank);					
					row.set("sisa",nilaiToFloat(this.sg.cells(4,i)));
					row.set("nilai",nilaiToFloat(this.sg.cells(12,i)));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}
				else dtJurnal.get(ix).set("nilai",row.get("nilai") + nilaiToFloat(this.sg.cells(12,i)));
			}
		}
		
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.cells(12,i) != "0") {
				kdBank = this.sg1.cells(2,i);
				nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if ((kdBank == dtJurnal.get(j).get("kode_bank"))){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_bank",kdBank);					
					row.set("sisa",nilaiToFloat(this.sg1.cells(4,i)));
					row.set("nilai",nilaiToFloat(this.sg1.cells(12,i)));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}
				else dtJurnal.get(ix).set("nilai",row.get("nilai") + nilaiToFloat(this.sg1.cells(12,i)));
			}
		}		
		this.gridBank = dtJurnal;
	},
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();								
		} catch(e) {alert(e);}
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
						sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_shop_rate where no_shop='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_depo2_m where no_shop='"+this.e_nb.getText()+"'");
						sql.add("update inv_depotutup_d set no_shop='-' where no_shop='"+this.e_nb.getText()+"'");
						sql.add("delete from glsap where no_dokumen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}																		
					
					//sebagian langsung dianggap posting
					if (nilaiToFloat(this.e_total.getText()) == 0) {
						this.StsInput = "SHOP"; 
						var vPosted = "F";
					}
					else {
						this.StsInput = "SEBAGIAN";
						var vPosted = "X";
						//if () ...
					}
				
					var total = nilaiToFloat(this.e_totdoc.getText()) + nilaiToFloat(this.e_totdepo.getText());					
					sql.add("insert into inv_shop_m (no_shop,periode,nik_user,tgl_input,kode_lokasi,tanggal,keterangan,nik_app,tgl_awal,tgl_akhir,jml_hari,jml_bulan,progress,nilai,no_app,no_spb,bsumber,  nodin,kepada1,dari1,lamp1,hal1,nikttd1,jab1,  noins,nikttd2,jab2,nikttd3,jab3,just,kode_pp,modul,posted, nik_sap) values "+
							"('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_ttd2.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_jmlhari.getText())+","+nilaiToFloat(this.e_jmlbulan.getText())+",'0',"+total+",'-','-','-', '"+this.e_nodin.getText()+"','"+this.e_kepada1.getText()+"','"+this.e_dari1.getText()+"','"+this.e_lamp1.getText()+"','"+this.e_hal1.getText()+"','"+this.cb_ttd1.getText()+"','"+this.e_jab1.getText()+"','"+this.e_noins.getText()+"','"+this.cb_ttd2.getText()+"','"+this.e_jab2.getText()+"','"+this.cb_ttd3.getText()+"','"+this.e_jab3.getText()+"','"+this.e_just.getText()+"','"+this.app._kodePP+"','"+this.StsInput+"','"+vPosted+"','"+this.cb_app.getText()+"')");
							
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){
							if (this.sg2.cells(0,i) == "APP") {
								sql.add("update inv_depotutup_d set no_shop='"+this.e_nb.getText()+"' where no_depo='"+this.sg2.cells(1,i)+"'");
							}							
						}
					}
					
					
					//flag bayar langsung
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBDEPOTMP','BM','"+this.e_periode.getText()+"','IDR',1,"+total+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','X','-','-','-','-')");																
					
					
					var no_depo = this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depo2_m","no_depo",this.app._lokasi+"-DEPO"+this.e_periode.getText().substr(2,4)+".","000");
					var format = no_depo.substr(0,12);   					
					var nu = parseFloat(no_depo.substr(12,3));					
					var jthTempo = tglBerlaku = noDepo = "";
					
					for (var i=0;i < this.sg.getRowCount();i++) {
						if (this.sg.rowValid(i)){				
							jthTempo = this.sg.getCellDateValue(15,i)
							tglBerlaku = this.sg.cells(5,i).substr(6,4)+"-"+this.sg.cells(5,i).substr(3,2)+"-"+this.sg.cells(5,i).substr(0,2);
							if (this.sg.cells(12,i) != "0") {
								var idx = i + nu;
								idx = idx.toString();
								if (idx.length == 1) var nu = "00"+idx;
								if (idx.length == 2) var nu = "0"+idx;
								if (idx.length == 3) var nu = idx;						
								noDepo = format + nu;																						
								
								//flag kasbank diisi langsung no_shop
								//sebagian langsung dianggap posting
								if (this.StsInput == "SEBAGIAN") var vProg = "1";
								else var vProg = "0";

								sql.add("insert into inv_depo2_m(no_depo,kode_lokasi,periode,tanggal,nik_user,tgl_input,no_kas,progress,tgl_akru_seb,tgl_akru,jenis,status_dana,no_bilyet,keterangan,tgl_mulai,tgl_selesai,jml_hari,basis,p_bunga,nilai,bsumber,bdepo,bcair,bbunga,akun_depo,akun_piutang,akun_pdpt,nik_buat,kode_kelola,no_shop,ref1,tgl_hitung,tgl_hitungseb) values "+
										"('"+noDepo+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','"+vProg+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','DOC','"+this.sg.cells(13,i)+"','-','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"','"+jthTempo+"',"+nilaiToFloat(this.e_jmlhari.getText())+","+nilaiToFloat(this.sg.cells(14,i))+","+nilaiToFloat(this.sg.cells(11,i))+","+nilaiToFloat(this.sg.cells(12,i))+",'-','"+this.sg.cells(0,i)+"','"+this.sg.cells(16,i)+"','"+this.sg.cells(18,i)+"','-','-','-','"+this.app._userLog+"','"+this.kodeKelola+"','"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"')");
							}							
							sql.add("insert into inv_shop_rate(no_shop,kode_lokasi,kode_bank,sisa,jml_hari,rate_aju,rate_final,nilai,tanggal,jenis,maks,tgl_rate,satuan,rate1,rate2,basis,jth_tempo,bcair,bbunga,status_dana) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.e_jmlhari.getText())+","+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+","+nilaiToFloat(this.sg.cells(12,i))+",'"+this.dp_d1.getDateString()+"','DOC',"+nilaiToFloat(this.sg.cells(3,i))+",'"+tglBerlaku+"','"+this.sg.cells(6,i)+"',"+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(14,i))+",'"+jthTempo+"','"+this.sg.cells(16,i)+"','"+this.sg.cells(18,i)+"','"+this.sg.cells(13,i)+"')");
						}
					}
					
					if (noDepo == "") noDepo = no_depo;
					var format = noDepo.substr(0,12);   										
					var nu = parseFloat(noDepo.substr(12,3)) + 1;					
					var jthTempo = tglBerlaku = "";
					
					for (var i=0;i < this.sg1.getRowCount();i++) {
						if (this.sg1.rowValid(i)){				
							jthTempo = this.sg1.getCellDateValue(15,i)
							tglBerlaku = this.sg1.cells(5,i).substr(6,4)+"-"+this.sg1.cells(5,i).substr(3,2)+"-"+this.sg1.cells(5,i).substr(0,2);
							if (this.sg1.cells(12,i) != "0") {
								var idx = i + nu;
								idx = idx.toString();
								if (idx.length == 1) var nu = "00"+idx;
								if (idx.length == 2) var nu = "0"+idx;
								if (idx.length == 3) var nu = idx;						
								noDepo = format + nu;	
								
								//flag kasbank diisi langsung no_shop																					
								sql.add("insert into inv_depo2_m(no_depo,kode_lokasi,periode,tanggal,nik_user,tgl_input,no_kas,progress,tgl_akru_seb,tgl_akru,jenis,status_dana,no_bilyet,keterangan,tgl_mulai,tgl_selesai,jml_hari,basis,p_bunga,nilai,bsumber,bdepo,bcair,bbunga,akun_depo,akun_piutang,akun_pdpt,nik_buat,kode_kelola,no_shop,ref1,tgl_hitung,tgl_hitungseb) values "+
										"('"+noDepo+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','0','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','DEPOSITO','"+this.sg1.cells(13,i)+"','-','"+this.sg1.cells(1,i)+"','"+this.dp_d1.getDateString()+"','"+jthTempo+"',"+nilaiToFloat(this.e_jmlbulan.getText())+","+nilaiToFloat(this.sg1.cells(14,i))+","+nilaiToFloat(this.sg1.cells(11,i))+","+nilaiToFloat(this.sg1.cells(12,i))+",'-','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(16,i)+"','"+this.sg1.cells(18,i)+"','-','-','-','"+this.app._userLog+"','"+this.kodeKelola+"','"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"')");
							}
							sql.add("insert into inv_shop_rate(no_shop,kode_lokasi,kode_bank,sisa,jml_hari,rate_aju,rate_final,nilai,tanggal,jenis,maks,tgl_rate,satuan,rate1,rate2,basis,jth_tempo,bcair,bbunga,status_dana) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"',"+nilaiToFloat(this.sg1.cells(4,i))+","+nilaiToFloat(this.e_jmlbulan.getText())+","+nilaiToFloat(this.sg1.cells(10,i))+","+nilaiToFloat(this.sg1.cells(11,i))+","+nilaiToFloat(this.sg1.cells(12,i))+",'"+this.dp_d1.getDateString()+"','DEPOSITO',"+nilaiToFloat(this.sg1.cells(3,i))+",'"+tglBerlaku+"','"+this.sg1.cells(6,i)+"',"+nilaiToFloat(this.sg1.cells(8,i))+","+nilaiToFloat(this.sg1.cells(9,i))+","+nilaiToFloat(this.sg1.cells(14,i))+",'"+jthTempo+"','"+this.sg1.cells(16,i)+"','"+this.sg1.cells(18,i)+"','"+this.sg1.cells(13,i)+"')");
						}
					}
					
					sql.add("update a set a.akun_depo=b.akun_depo,a.akun_piutang=b.akun_piutang,a.akun_pdpt=b.akun_bunga "+
							"from inv_depo2_m a inner join inv_depo_param b on a.jenis=b.jenis and a.status_dana=b.status "+
							"where a.no_shop='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod)  "+
							"select no_depo,0,kode_lokasi,'DEPO','DEPO',no_shop,tanggal,akun_depo,'D',nilai,keterangan,'"+this.app._kodePP+"',periode,'-','IDR',1,nilai,tgl_input,nik_user,'-','-','-','-','-','-','-','-','-','-' "+
							"from inv_depo2_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_depo,999,kode_lokasi,'DEPO','HUTDEPO',no_shop,tanggal,'"+this.akunHDepo+"','C',nilai,keterangan,'"+this.app._kodePP+"',periode,'-','IDR',1,nilai,tgl_input,nik_user,'-','-','-','"+this.vendorDepo+"','-','-','-','R001','-','T' "+
							"from inv_depo2_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				
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
					setTipeButton(tbAllFalse);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.sg3.clear(1);
					this.sg2.clear(1);					
					this.sg.clear(1);
					this.sg1.clear(1);					
					this.doClick();
					this.doLoadDepo();
				break;
			case "simpan" :									
			case "ubah" :									
				this.doHitungPlafon();
				var line = undefined;
				for (var i in this.gridBank.objList){
					line = this.gridBank.get(i);
					if (parseFloat(line.get("sisa")) < parseFloat(line.get("nilai") && parseFloat(line.get("sisa")) > 0)) {
						system.alert(this,"Transaksi tidak valid.","Total penempatan (DOC/DEPOSITO) melebihi sisa plafon di Bank "+line.get("kode_bank")+".");
						return false;
					}
				}															
				this.preView = "1";
				var total = nilaiToFloat(this.e_totdoc.getText()) + nilaiToFloat(this.e_totdepo.getText());
				if (total == 0) {							
					system.alert(this,"Transaksi tidak valid.","Nominal penempatan (DOC/DEPOSITO) tidak boleh nol.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						var k = i+1;
						if (nilaiToFloat(this.sg.cells(12,i)) != 0 && (nilaiToFloat(this.sg.cells(10,i)) == 0 || nilaiToFloat(this.sg.cells(11,i)) == 0 || this.sg.cells(13,i) == "-" || this.sg.cells(16,i) == "-" || this.sg.cells(18,i) == "-")) {							
							system.alert(this,"Transaksi tidak valid.","Rate/Status/Bank Cair/Bank Bunga untuk Nominal penempatan tidak boleh nol.(Baris : "+k+")");
							return false;
						}							
					}
				}	
				for (var i=0;i < this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){
						var k = i+1;
						if (nilaiToFloat(this.sg1.cells(12,i)) != 0 && (nilaiToFloat(this.sg1.cells(10,i)) == 0 || nilaiToFloat(this.sg1.cells(11,i)) == 0 || this.sg1.cells(13,i) == "-" || this.sg1.cells(16,i) == "-" || this.sg1.cells(18,i) == "-")) {
							system.alert(this,"Transaksi tidak valid.","Rate/Status/Bank Cair/Bank Bunga untuk Nominal penempatan tidak boleh nol.(Baris : "+k+")");
							return false;
						}							
					}
				}					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"'");
				sql.add("delete from inv_shop_rate where no_shop='"+this.e_nb.getText()+"'");
				sql.add("delete from inv_depo2_m where no_shop='"+this.e_nb.getText()+"'");
				sql.add("update inv_depotutup_d set no_shop='-' where no_shop='"+this.e_nb.getText()+"'");
				sql.add("delete from glsap where no_dokumen='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
		if (this.stsSimpan == 1) {
			this.doClick();					
			this.doLoadDepo();
		}
	},
	doClick : function(sender){		
		if (this.stsSimpan == 0) {
			this.sg3.clear(1);
			this.sg2.clear(1);
			this.sg.clear(1);
			this.sg1.clear(1);			
			this.doLoadDepo();
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_shop_m","no_shop",this.app._lokasi+"-SR"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
		this.stsSimpan = 1;
	},	
	doChange : function(sender){		
		if (this.stsSimpan == 1) {
			if (sender == this.e_jmlhari) this.sg.clear(1);		
			if (sender == this.e_jmlbulan) this.sg1.clear(1);		
			this.sg.validasi();
		
			if (sender == this.cb_ttd1 && this.cb_ttd1.getText() != "") {
				var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_ttd1.getText()+"' ",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					this.e_jab1.setText(line.jabatan);
				}
			}
			if (sender == this.cb_ttd2 && this.cb_ttd2.getText() != "") {
				var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_ttd2.getText()+"' ",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					this.e_jab2.setText(line.jabatan);
				}
			}
			if (sender == this.cb_ttd3 && this.cb_ttd3.getText() != "") {
				var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_ttd3.getText()+"' ",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					this.e_jab3.setText(line.jabatan);
				}
			}		
		}
	},
	doDoubleClick2: function(sender, col , row) {
		if (this.sg2.cells(0,row) == "INPROG") this.sg2.cells(0,row,"APP");
		else this.sg2.cells(0,row,"INPROG");		
	},	
	doChangeCell2: function(sender, col, row){		
		if (col == 0) this.sg2.validasi();					
	},	
	doNilaiChange2: function(){
		try{			
			var tot = 0 ;			
			for (var i=0; i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(7,i) != "" && this.sg2.cells(0,i) == "APP"){										
					tot += nilaiToFloat(this.sg2.cells(7,i));														
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doNilaiChange: function(){
		try{			
			var tot = 0 ;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(12,i) != ""){										
					tot += nilaiToFloat(this.sg.cells(12,i));		
				}
			}			
			this.e_totdoc.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doNilaiChange1: function(){
		try{			
			var tot = 0 ;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(12,i) != ""){										
					tot += nilaiToFloat(this.sg1.cells(12,i));		
				}
			}			
			this.e_totdepo.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{						
			if (col == 16){
				this.standarLib.showListData(this, "Daftar Rekening",sender,undefined, 
						"select kode_bank, nama+' - '+no_rek as nama from inv_bank",
						"select count(*) from inv_bank",						
						["kode_bank","nama"],"where",["Kode","Nama"],false);				
			}
			if (col == 18){
				this.standarLib.showListData(this, "Daftar Rekening",sender,undefined, 
						"select kode_bank, nama+' - '+no_rek as nama from inv_bank",
						"select count(*) from inv_bank",						
						["kode_bank","nama"],"where",["Kode","Nama"],false);				
			}							
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doEllipsClick1: function(sender, col, row){
		try{						
			if (col == 16){
				this.standarLib.showListData(this, "Daftar Rekening",sender,undefined, 
						"select kode_bank, nama+' - '+no_rek as nama from inv_bank",
						"select count(*) from inv_bank",						
						["kode_bank","nama"],"where",["Kode","Nama"],false);				
			}
			if (col == 18){
				this.standarLib.showListData(this, "Daftar Rekening",sender,undefined, 
						"select kode_bank, nama+' - '+no_rek as nama from inv_bank",
						"select count(*) from inv_bank",						
						["kode_bank","nama"],"where",["Kode","Nama"],false);				
			}							
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){		
		if (col == 12) this.sg.validasi();					
		sender.onChange.set(undefined,undefined);	    
		if (col == 16) {
			if (sender.cells(16,row) != "" && sender.cells(16,row) != "-") {				
				var rek = this.dataRek.get(sender.cells(16,row));				
				if (rek) sender.cells(17,row,rek);
				else {
					if (trim(sender.cells(16,row)) != "") system.alert(this,"Kode Rekening "+sender.cells(16,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(16,row,"");
					sender.cells(17,row,"");
				}				
			}
		}		
		if (col == 18) {
			if (sender.cells(18,row) != "" && sender.cells(18,row) != "-") {
				var rek = this.dataRek.get(sender.cells(18,row));				
				if (rek) sender.cells(19,row,rek);
				else {
					if (trim(sender.cells(18,row)) != "") system.alert(this,"Kode Rekening "+sender.cells(18,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(18,row,"");
					sender.cells(19,row,"");
				}				
			}
		}
		sender.onChange.set(this,"doChangeCell");		
	},
	doChangeCell1: function(sender, col, row){		
		if (col == 12) this.sg1.validasi();					
		sender.onChange.set(undefined,undefined);	    
		if (col == 16) {
			if (sender.cells(16,row) != "" && sender.cells(16,row) != "-") {				
				var rek = this.dataRek.get(sender.cells(16,row));				
				if (rek) sender.cells(17,row,rek);
				else {
					if (trim(sender.cells(16,row)) != "") system.alert(this,"Kode Rekening "+sender.cells(16,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(16,row,"");
					sender.cells(17,row,"");
				}				
			}
		}		
		if (col == 18) {
			if (sender.cells(18,row) != "" && sender.cells(18,row) != "-") {
				var rek = this.dataRek.get(sender.cells(18,row));				
				if (rek) sender.cells(19,row,rek);
				else {
					if (trim(sender.cells(18,row)) != "") system.alert(this,"Kode Rekening "+sender.cells(18,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(18,row,"");
					sender.cells(19,row,"");
				}				
			}
		}
		sender.onChange.set(this,"doChangeCell1");		
	},	
	doLoadDepo:	function() {				
		try {					
			var strSQL = "select a.no_depo,a.no_bilyet,a.keterangan,b.nama,b.kode_bankklp,convert(varchar,a.tgl_selesai,103) as tgl_selesai,d.nilai_panjang as nilai, a.jenis "+
						 "from inv_depo2_m a "+
						 "inner join inv_depotutup_d d on a.no_depo=d.no_depo and a.kode_lokasi=d.kode_lokasi "+
						 "inner join inv_bank b on a.bdepo = b.kode_bank "+						 
						 "where d.nilai_panjang <> 0 and d.no_shop='-' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																		
					this.sg2.appendData(["INPROG",line.no_depo,line.no_bilyet,line.keterangan,line.nama,line.kode_bankklp,line.tgl_selesai,floatToNilai(line.nilai),line.jenis]);
				}
			} else this.sg2.clear(1);													
		}
		catch(e) {
			alert(e);
		}
	},
	doLoadDOCRate:	function() {				
		try {					
			if (this.e_jmlhari.getText() != "") {								
				var strSQL = "select b.kode_bank,b.nama,b.kode_bankklp,convert(varchar,a.tanggal,103) as tglberlaku,cast(a.jk1 as varchar) +' - '+cast(a.jk2 as varchar) as jml,a.sat, a.persen1, a.persen2, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat end as maxtempat, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat - isnull(g.tot_depo,0) end as sisa, a.jenis, "+
							 "b.jml_hari as basis,convert(varchar,dateadd(DAY,"+nilaiToFloat(this.e_jmlhari.getText())+",'"+this.dp_d1.getDateString()+"'),103) as jthtempo  "+
							 "from  "+
							 
							 "( "+							 
							 "select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat  "+
							 "from (select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat, "+
						 	 "			 row_number() over(partition by kode_bank,jk1,jk2,jenis  order by tanggal desc) as rn "+
							 "	  from inv_bank_rate where tanggal<='"+this.dp_d1.getDateString()+"') as T "+
							 "where rn = 1  "+    
							 ") a "+
							 
							 "inner join inv_bank b on a.kode_bank=b.kode_bank "+ 
							 "inner join inv_bankklp c on b.kode_bankklp = c.kode_bankklp "+
							 "inner join inv_banknilai_d d on c.kode_bankklp = d.kode_bankklp "+
							 "inner join inv_banknilai_m e on d.no_bukti = e.no_bukti and e.no_flag='-' "+
							 
							 "left join inv_suspen f on c.kode_bankklp=f.kode_bankklp and f.status='SUSPEND' and '"+this.dp_d1.getDateString()+"' between f.tgl_awal and f.tgl_akhir "+
							 
							 "left join ( "+
							 "	select b.kode_bankklp,SUM(a.nilai) as tot_depo "+
							 "	from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank "+
							 "	where progress in ('1','0') group by b.kode_bankklp "+
							 ") g on b.kode_bankklp = g.kode_bankklp "+
							 
							 "where ("+nilaiToFloat(this.e_jmlhari.getText())+" between a.jk1 and a.jk2) and a.jenis='DOC' "+
							 "and  f.no_suspen is null "+
							 "and ((d.maxtempat - isnull(g.tot_depo,0) > 0 and c.jenis <> 'BUMN') or (c.jenis='BUMN')) "+
							 "order by ((a.persen1+persen2) /2) desc ";	
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																								
						this.sg.appendData([line.kode_bank,line.nama,line.kode_bankklp,floatToNilai(line.maxtempat),floatToNilai(line.sisa),line.tglberlaku,line.sat,line.jml,floatToNilai(line.persen1),floatToNilai(line.persen2),"0","0","0","DAKES",floatToNilai(line.basis),line.jthtempo,"-","-","-","-"]);
					}
				} else this.sg.clear(1);						
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}
			else system.alert(this,"Jumlah tidak valid.","Isi dengan jumlah rencana penempatan.");
		}
		catch(e) {
			alert(e);
		}
	},
	doLoadDEPORate:	function() {				
		try {					
			if (this.e_jmlhari.getText() != "") {								
				var strSQL = "select b.kode_bank,b.nama,b.kode_bankklp,convert(varchar,a.tanggal,103) as tglberlaku,cast(a.jk1 as varchar) +' - '+cast(a.jk2 as varchar) as jml,a.sat, a.persen1, a.persen2, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat end as maxtempat, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat - isnull(g.tot_depo,0) end as sisa, a.jenis, "+
							 "b.jml_hari as basis,convert(varchar,dateadd(MONTH,"+nilaiToFloat(this.e_jmlbulan.getText())+",'"+this.dp_d1.getDateString()+"'),103) as jthtempo  "+
							 "from  "+
							 
							 "( "+							 
							 "select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat  "+
							 "from (select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat, "+
						 	 "			 row_number() over(partition by kode_bank,jk1,jk2,jenis  order by tanggal desc) as rn "+
							 "	  from inv_bank_rate where tanggal<='"+this.dp_d1.getDateString()+"') as T "+
							 "where rn = 1  "+    
							 ") a "+
							 
							 "inner join inv_bank b on a.kode_bank=b.kode_bank "+ 
							 "inner join inv_bankklp c on b.kode_bankklp = c.kode_bankklp "+
							 "inner join inv_banknilai_d d on c.kode_bankklp = d.kode_bankklp "+
							 "inner join inv_banknilai_m e on d.no_bukti = e.no_bukti and e.no_flag='-' "+
							 
							 "left join inv_suspen f on c.kode_bankklp=f.kode_bankklp and f.status='SUSPEND' and '"+this.dp_d1.getDateString()+"' between f.tgl_awal and f.tgl_akhir "+
							 
							 "left join ( "+
							 "	select b.kode_bankklp,SUM(a.nilai) as tot_depo "+
							 "	from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank "+
							 "	where progress in ('1','0') group by b.kode_bankklp "+
							 ") g on b.kode_bankklp = g.kode_bankklp "+
							 
							 "where ("+nilaiToFloat(this.e_jmlbulan.getText())+" between a.jk1 and a.jk2) and a.jenis='DEPOSITO' "+
							 "and  f.no_suspen is null "+
							 "and ((d.maxtempat - isnull(g.tot_depo,0) > 0 and c.jenis <> 'BUMN') or (c.jenis='BUMN')) "+
							 "order by ((a.persen1+persen2) /2) desc ";				
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																								
						this.sg1.appendData([line.kode_bank,line.nama,line.kode_bankklp,floatToNilai(line.maxtempat),floatToNilai(line.sisa),line.tglberlaku,line.sat,line.jml,floatToNilai(line.persen1),floatToNilai(line.persen2),"0","0","0","DAKES",floatToNilai(line.basis),line.jthtempo,"-","-","-","-"]);
					}
				} else this.sg1.clear(1);						
				this.pc1.setActivePage(this.pc1.childPage[2]);
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
								//this.nama_report="server_report_saku3_if_rptIfForm";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_suspen='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbAllFalse);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.sg3.clear(1);
			this.sg.clear(1);
			this.sg1.clear(1);
			this.sg2.clear(1);			
			this.doClick();
			this.doLoadDepo();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){												
		var strSQL = "select distinct a.no_shop,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
					 "from inv_shop_m a "+
					 "  inner join inv_depo2_m c on a.no_shop = c.no_shop "+
					 "  inner join glsap b on c.no_depo=b.no_bukti and b.no_doksap ='-' "+
					 "where a.kode_lokasi ='"+this.app._lokasi+"' and a.progress = '0' and a.modul in ('SHOP','SEBAGIAN')";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			this.page = 1;
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_shop,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
				
				var strSQL = "select * from inv_shop_m where no_shop='"+this.e_nb.getText()+"'";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);					
						this.e_jmlhari.setText(floatToNilai(line.jml_hari));					
						this.e_jmlbulan.setText(floatToNilai(line.jml_bulan));	
												
						this.e_nodin.setText(line.nodin);
						this.e_kepada1.setText(line.kepada1);
						this.e_dari1.setText(line.dari1);
						this.e_lamp1.setText(line.lamp1);
						this.e_hal1.setText(line.hal1);
						this.cb_ttd1.setText(line.nikttd1);
						this.e_jab1.setText(line.jab1);						
						this.e_noins.setText(line.noins);						
						this.cb_ttd2.setText(line.nikttd2);						
						this.e_jab2.setText(line.jab2);
						this.cb_ttd3.setText(line.nikttd3);						
						this.e_jab3.setText(line.jab3);
						this.e_just.setText(line.just);
						
					}
				}
				
				var strSQL = "select b.kode_bank,b.nama,b.kode_bankklp,convert(varchar,a.tanggal,103) as tglberlaku,cast(a.jk1 as varchar) +' - '+cast(a.jk2 as varchar) as jml,a.sat, a.persen1, a.persen2, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat end as maxtempat, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat - isnull(g.tot_depo,0) end as sisa, a.jenis, "+							 
							 "y.rate_aju,y.rate_final,y.nilai,yy.bcair,yy.bbunga,yy.status_dana,yy.basis,convert(varchar,y.jth_tempo,103) as jthtempo "+
							 "from  "+
							 
							 "( "+							 
							 "select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat  "+
							 "from (select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat, "+
						 	 "			 row_number() over(partition by kode_bank,jk1,jk2,jenis  order by tanggal desc) as rn "+
							 "	  from inv_bank_rate) as T "+
							 "where rn = 1  "+    
							 ") a "+
							 
							 "inner join inv_bank b on a.kode_bank=b.kode_bank "+ 
							 "inner join inv_bankklp c on b.kode_bankklp = c.kode_bankklp "+
							 "inner join inv_banknilai_d d on c.kode_bankklp = d.kode_bankklp "+
							 "inner join inv_banknilai_m e on d.no_bukti = e.no_bukti and e.no_flag='-' "+
							 
							 "inner join inv_shop_rate y on y.kode_bank=b.kode_bank "+
							 "left join inv_depo2_m yy on y.no_shop=yy.no_shop and yy.jenis='DOC' and y.kode_bank=yy.bdepo and y.kode_bank=yy.bdepo and yy.jenis=y.jenis and yy.jml_hari=y.jml_hari "+
							 
							 "left join ( "+
							 "	select b.kode_bankklp,SUM(a.nilai) as tot_depo "+
							 "	from inv_depo2_m a inner join inv_bank b on a.bsumber=b.kode_bank "+
							 "	where progress = '1' group by b.kode_bankklp "+
							 ") g on b.kode_bankklp = g.kode_bankklp "+
							 
							 "where ("+nilaiToFloat(this.e_jmlhari.getText())+" between a.jk1 and a.jk2) and a.jenis='DOC' "+
							 "      and y.no_shop = '"+this.e_nb.getText()+"' and y.kode_lokasi='"+this.app._lokasi+"' "+							 
							 "order by ((a.persen1+persen2) /2) desc ";				
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																														
						this.sg.appendData([line.kode_bank,line.nama,line.kode_bankklp,floatToNilai(line.maxtempat),floatToNilai(line.sisa),line.tglberlaku,line.sat,line.jml,floatToNilai(line.persen1),floatToNilai(line.persen2),floatToNilai(line.rate_aju),floatToNilai(line.rate_final),floatToNilai(line.nilai),line.status_dana,floatToNilai(line.basis),line.jthtempo,line.bcair,"-",line.bbunga,"-"]);
						this.doChangeCell(this.sg,16,i);
						this.doChangeCell(this.sg,18,i);		
					}
				} else this.sg.clear(1);						
				
				
				var strSQL = "select b.kode_bank,b.nama,b.kode_bankklp,convert(varchar,a.tanggal,103) as tglberlaku,cast(a.jk1 as varchar) +' - '+cast(a.jk2 as varchar) as jml,a.sat, a.persen1, a.persen2, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat end as maxtempat, "+
							 "case c.jenis when 'BUMN' then 0 else d.maxtempat - isnull(g.tot_depo,0) end as sisa, a.jenis, "+							 
							 "y.rate_aju,y.rate_final,y.nilai,yy.bcair,yy.bbunga,yy.status_dana,yy.basis,convert(varchar,y.jth_tempo,103) as jthtempo "+
							 "from  "+
							 
							 "( "+							 
							 "select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat  "+
							 "from (select kode_bank,tanggal,jk1,jk2,persen1,persen2,jenis,sat, "+
						 	 "			 row_number() over(partition by kode_bank,jk1,jk2,jenis  order by tanggal desc) as rn "+
							 "	  from inv_bank_rate) as T "+
							 "where rn = 1  "+    
							 ") a "+
							 
							 "inner join inv_bank b on a.kode_bank=b.kode_bank "+ 
							 "inner join inv_bankklp c on b.kode_bankklp = c.kode_bankklp "+
							 "inner join inv_banknilai_d d on c.kode_bankklp = d.kode_bankklp "+
							 "inner join inv_banknilai_m e on d.no_bukti = e.no_bukti and e.no_flag='-' "+
							 
							 "inner join inv_shop_rate y on y.kode_bank=b.kode_bank "+
							 "left join inv_depo2_m yy on y.no_shop=yy.no_shop and yy.jenis='DEPOSITO' and y.kode_bank=yy.bdepo and yy.jenis=y.jenis and yy.jml_hari=y.jml_hari "+
							 
							 "left join ( "+
							 "	select b.kode_bankklp,SUM(a.nilai) as tot_depo "+
							 "	from inv_depo2_m a inner join inv_bank b on a.bsumber=b.kode_bank "+
							 "	where progress = '1' group by b.kode_bankklp "+
							 ") g on b.kode_bankklp = g.kode_bankklp "+
							 
							 "where ("+nilaiToFloat(this.e_jmlbulan.getText())+" between a.jk1 and a.jk2) and a.jenis='DEPOSITO' "+
							 "      and y.no_shop = '"+this.e_nb.getText()+"' and y.kode_lokasi='"+this.app._lokasi+"' "+							 
							 "order by ((a.persen1+persen2) /2) desc ";		
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																														
						this.sg1.appendData([line.kode_bank,line.nama,line.kode_bankklp,floatToNilai(line.maxtempat),floatToNilai(line.sisa),line.tglberlaku,line.sat,line.jml,floatToNilai(line.persen1),floatToNilai(line.persen2),floatToNilai(line.rate_aju),floatToNilai(line.rate_final),floatToNilai(line.nilai),line.status_dana,floatToNilai(line.basis),line.jthtempo,line.bcair,"-",line.bbunga,"-"]);
						this.doChangeCell1(this.sg1,16,i);
						this.doChangeCell1(this.sg1,18,i);		
					}
				} else this.sg1.clear(1);						
				
				var strSQL = "select a.no_depo,a.no_bilyet,a.keterangan,b.nama,b.kode_bankklp,convert(varchar,a.tgl_selesai,103) as tgl_selesai,d.nilai_panjang as nilai,a.jenis "+
							 "from inv_depo2_m a "+
							 "inner join inv_bank b on a.bdepo = b.kode_bank "+
							 "inner join inv_depotutup_d d on a.no_depo = d.no_depo "+
							 "where d.kode_lokasi='"+this.app._lokasi+"' and d.no_shop='"+this.e_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																		
						this.sg2.appendData(["APP",line.no_depo,line.no_bilyet,line.keterangan,line.nama,line.kode_bankklp,line.tgl_selesai,floatToNilai(line.nilai),line.jenis]);
					}
				} else this.sg2.clear(1);													
				
			}									
		} catch(e) {alert(e);}
	}	
});
