window.app_saku3_transaksi_piutang_fAkruBillTM = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_piutang_fAkruBillTM.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_piutang_fAkruBillTM";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Piutang - Hutang: Input", 0);	
		
		uses("portalui_saiMemo;portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Jurnal","List Jurnal"]});				
		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Lokasi Bayar","NIK Approve"],
					colWidth:[[5,4,3,2,1,0],[150,150,100,310,100,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});
		this.bLoad4 = new portalui_imageButton(this.sgn4,{bound:[this.sgn4.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad4"]});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_lokasi = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,222,20],caption:"Lokasi Bayar", multiSelection:false, maxLength:10, tag:2});				
		this.cb_vendor = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,222,20],caption:"Mitra", multiSelection:false, maxLength:10, tag:2});								
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[780,11,200,20],caption:"Jenis",items:["MITRA","RESYKT","PDPT","AKRU","PDPTREV"], readOnly:true,tag:2});		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,222,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});										
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,10,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});								
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,14,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bTampil = new button(this.pc2.childPage[0],{bound:[550,14,80,18],caption:"Tampil Data",click:[this,"doTampil"]});			
		this.i_appAll = new portalui_imageButton(this.pc2.childPage[0],{bound:[640,14,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.bJurnal = new button(this.pc2.childPage[0],{bound:[668,14,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,300], childPage:["Data BA","Detail BA","Jurnal Akru","Data Anggaran"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,				
				colTitle:["Status","No Tagihan","Tanggal","No Dokumen","Keterangan","Nilai BA","Nilai Tagih"],
				colWidth:[[6,5,4,3,2,1,0],[100,100,300,120,80,120,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
				colFormat:[[5,6],[cfNilai,cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				dblClick:[this,"doDoubleClick"],change:[this,"doChangeCell"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
				colTitle:["Lokasi","Cust","Nama Cust","Jenis","Pegawai","Pensiun","Kunj","CS","Total"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,100,100,80,200,70,70]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12],[]],
				colFormat:[[4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK","Nama DRK","Lokasi"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[60,150,80,80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,4,5,6,7,8],[3]],
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[930,5,100,25],caption:"Preview",selected:true,visible:false});		
		
		this.sg22 = new saiGrid(this.pc1.childPage[3],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,120,80,120,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn22 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg22});
		this.i_budget = new portalui_imageButton(this.sgn22,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.flagGarFree = "0"; this.ppBPCC = "-";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTBP','HUTCC','TAKHUT','GARFREE','PPBPCC') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;							
					if (line.kode_spro == "PPBPCC") this.kodepp = line.flag;							
					if (line.kode_spro == "TAKHUT") this.akunTAKHut = line.flag;							
					if (line.kode_spro == "HUTBP") this.akunHutBP = line.flag;			
					if (line.kode_spro == "HUTCC") this.akunHutCC = line.flag;			
				}
			}
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Mitra",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi in ('"+this.app._kodeLokasiPusat+"','"+this.app._lokasi+"')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Bayar",true);			
			this.cb_lokasi.setText(this.app._lokasi);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_piutang_fAkruBillTM.extend(window.childForm);
window.app_saku3_transaksi_piutang_fAkruBillTM.implement({
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
						sql.add("delete from yk_hutang_m where no_hutang='"+this.e_nb.getText()+"'");
						sql.add("delete from yk_hutang_j where no_hutang='"+this.e_nb.getText()+"'");
						sql.add("delete from yk_hutang_d where no_hutang='"+this.e_nb.getText()+"'");
						sql.add("delete from takterima_m where no_terima='"+this.e_nb.getText()+"'");
						sql.add("delete from takterima_j where no_terima='"+this.e_nb.getText()+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"'");
						sql.add("delete from yk_bill_d where no_hutang = '"+this.e_nb.getText()+"'");
						sql.add("delete from yk_billkunj_d where no_hutang = '"+this.e_nb.getText()+"'");						
						sql.add("update dbtm.dbo.yk_batm_m set progress='0',no_kb='-' where no_kb = '"+this.e_nb.getText()+"'");												
					}
										
					for (var i = 0; i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){
							sql.add("update dbtm.dbo.yk_batm_m set progress='1',no_kb='"+this.e_nb.getText()+"' where no_selesai= '"+this.sg.cells(1,i)+"'");																			
							sql.add("insert into yk_bill_d (no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,jenis,periode,no_hutang,no_piutang,no_selesai,no_tak,kode_lokasal) "+
							        "select '"+this.sg.cells(1,i)+"',a.no_urut,a.kode_lokasi,case when b.kode_vendor is null then a.kode_vendor else '"+this.cb_vendor.getText()+"' end,a.no_ref,a.nik,a.nama,a.loker,a.tgl_masuk,a.tgl_keluar,a.icdx,a.band,a.nikkes,a.pasien,a.dokter,a.kode_produk,a.kode_keg,a.no_rujuk,a.nilai,case when b.kode_vendor is null then a.pph else 0 end as pph,'"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"','-','-','-',a.kode_lokasal "+
									"from dbtm.dbo.yk_bill_d a left join dbtm.dbo.yk_hutang_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi and a.kode_vendor=b.kode_vendor and b.flag='1' "+
									"where a.no_selesai='"+this.sg.cells(1,i)+"'");				
									
							sql.add("insert into yk_billkunj_d (no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,jenis,periode,no_kas,no_piutang,no_tak,no_selesai,no_hutang,kode_lokasal) "+
									"select '"+this.sg.cells(1,i)+"',no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,'"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','-','-','-','-','"+this.e_nb.getText()+"',kode_lokasal "+
									"from dbtm.dbo.yk_billkunj_d where no_selesai='"+this.sg.cells(1,i)+"'");
						}
					}					
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != "0"){
								if (this.c_jenis.getText() == "MITRA" || this.c_jenis.getText() == "PDPT" || this.c_jenis.getText() == "AKRU" || this.c_jenis.getText() == "PDPTREV") {
									if (this.sg2.cells(8,i) == this.app._lokasi) {
										sql.add("insert into yk_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
												"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(8,i)+"1000','"+this.sg2.cells(6,i)+"','"+this.sg2.cells(8,i)+"','HUTKES','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
									}
									else {
										sql.add("insert into takterima_j(no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
												"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(8,i)+"1000','"+this.sg2.cells(6,i)+"','"+this.sg2.cells(8,i)+"','TMTERIMA','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
									}
								}
								else {
									sql.add("insert into yk_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(8,i)+"1000','"+this.sg2.cells(6,i)+"','"+this.sg2.cells(8,i)+"','HUTKES','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");								
								}
							}
						}
					}										
					var nobukti = ""; 
					var totHut = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
							nobukti += ",'"+this.sg.cells(1,i)+"'";
							totHut += nilaiToFloat(this.sg.cells(6,i)); 
						}
					}					
					if (this.c_jenis.getText() == "MITRA" || this.c_jenis.getText() == "PDPT" || this.c_jenis.getText() == "AKRU" || this.c_jenis.getText() == "PDPTREV") {
						sql.add("insert into takterima_m (no_terima,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,kode_lokkirim,no_kirim) "+
								"select no_terima,kode_lokasi,'-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',kode_pp,'TMTERIMA','TMTERIMA',periode,'IDR',1,sum(case dc when 'D' then nilai else 0 end),nik_user,nik_user,getdate(),nik_user,'F','-','-','X','X' "+
								"from takterima_j where no_terima='"+this.e_nb.getText()+"' group by no_terima,kode_lokasi,kode_pp,periode,nik_user");							
												
						if (this.c_jenis.getText() == "MITRA")
							sql.add("insert into yk_hutang_m(no_hutang,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user,kode_loktuj,no_app,progress) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_vendor.getText()+"','"+this.e_ket.getText()+"','"+this.kodepp+"','HUTKES','BILL','IDR',1,"+totHut+",'"+this.app._userLog+"','"+this.cb_app.getText()+"','F',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','-','0')");
						else 				
							sql.add("insert into yk_hutang_m(no_hutang,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user,kode_loktuj,no_app,progress) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_vendor.getText()+"','"+this.e_ket.getText()+"','"+this.kodepp+"','HUTKES','"+this.c_jenis.getText()+"','IDR',1,"+totHut+",'"+this.app._userLog+"','"+this.cb_app.getText()+"','F',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','-','1')");
									
						nobukti = nobukti.substr(1);					
						sql.add("insert into yk_hutang_d(no_hutang,kode_lokasi,no_inv,periode,kode_vendor,bank,cabang,no_rek,nama_rek,nilai_bp,nilai_cc,no_rekon,bank_trans,no_app,no_ver,no_spb,no_kas,progress,kode_loktuj) "+
								"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_nb.getText()+".'+b.kode_vendor,'"+this.e_periode.getText()+"', "+
								"       b.kode_vendor,b.bank,b.cabang,b.no_rek,b.nama_rek,isnull(sum(case when f.jenis <> 'PENSIUN' then a.nilai - a.pph else 0 end),0),isnull(sum(case when f.jenis = 'PENSIUN' then a.nilai - a.pph else 0 end),0),'-',b.bank_trans,'-','-','-','-','0','"+this.cb_lokasi.getText()+"' "+
								" from yk_bill_d a "+
								"    inner join yk_loker ff on a.loker=ff.loker "+							
								"    inner join cust f on ff.kode_cust=f.kode_cust "+
								"    inner join vendor b on a.kode_vendor=b.kode_vendor and b.kode_lokasi='"+this.app._lokasi+"' "+
								" where a.no_bill in ("+nobukti+") and a.kode_vendor='"+this.cb_vendor.getText()+"' "+
								" group by b.nama_rek,b.no_rek,b.bank,b.cabang,b.kode_vendor,b.nama,b.bank_trans");
											
						sql.add("insert into yk_hutang_d(no_hutang,kode_lokasi,no_inv,periode,kode_vendor,bank,cabang,no_rek,nama_rek,nilai_bp,nilai_cc,no_rekon,bank_trans,no_app,no_ver,no_spb,no_kas,progress,kode_loktuj) "+
								"select '"+this.e_nb.getText()+"',b.kode_lokasi,'"+this.e_nb.getText()+".'+b.kode_vendor,'"+this.e_periode.getText()+"', "+
								"       b.kode_vendor,b.bank,b.cabang,b.no_rek,b.nama_rek,isnull(sum(case when f.jenis <> 'PENSIUN' then a.nilai - a.pph else 0 end),0),isnull(sum(case when f.jenis = 'PENSIUN' then a.nilai - a.pph else 0 end),0),'"+this.e_nb.getText()+"',b.bank_trans,'-','-','-','-','0','"+this.cb_lokasi.getText()+"' "+
								" from yk_bill_d a "+
								"    inner join yk_loker ff on a.loker=ff.loker "+							
								"    inner join cust f on ff.kode_cust=f.kode_cust "+
								"    inner join vendor b on a.kode_vendor=b.kode_vendor and b.kode_lokasi=a.kode_lokasi "+							
								" where a.no_bill in ("+nobukti+") and a.kode_vendor<>'"+this.cb_vendor.getText()+"' "+
								" group by b.kode_lokasi,b.nama_rek,b.no_rek,b.bank,b.cabang,b.kode_vendor,b.nama,b.bank_trans");
								
						/*
						cs masih masuk ke uang restitusi yakes
						sql.add("update a set a.nilai_bp = a.nilai_bp-b.cs "+
								"from yk_hutang_d a "+
								"inner join (select '"+this.app._lokasi+"' as kode_lokasi,'"+this.cb_vendor.getText()+"' as kode_vendor,SUM(cs) as cs "+
								"            from yk_billkunj_d where no_hutang='"+this.e_nb.getText()+"' and cs<>0) b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_hutang='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
						*/
						
						
					}		
					else {
						sql.add("insert into yk_hutang_m(no_hutang,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user,kode_loktuj,no_app,progress) "+
								"select no_hutang,kode_lokasi,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_vendor.getText()+"','"+this.e_ket.getText()+"',kode_lokasi+'1000','HUTKES','RESYKT','IDR',1,sum(case dc when 'D' then nilai else 0 end),nik_user,nik_user,'F',getdate(),nik_user,kode_lokasi,no_hutang,'1' "+
								"from yk_hutang_j where no_hutang='"+this.e_nb.getText()+"' group by no_hutang,nik_user,kode_lokasi");
						
						nobukti = nobukti.substr(1);					
						sql.add("insert into yk_hutang_d(no_hutang,kode_lokasi,no_inv,periode,kode_vendor,bank,cabang,no_rek,nama_rek,nilai_bp,nilai_cc,no_rekon,bank_trans,no_app,no_ver,no_spb,no_kas,progress,kode_loktuj) "+
								"select '"+this.e_nb.getText()+"',b.kode_lokasi,'"+this.e_nb.getText()+".'+b.kode_vendor,'"+this.e_periode.getText()+"', "+
								"       b.kode_vendor,b.bank,b.cabang,b.no_rek,b.nama_rek,isnull(sum(case when f.jenis <> 'PENSIUN' then a.nilai - a.pph else 0 end),0),isnull(sum(case when f.jenis = 'PENSIUN' then a.nilai - a.pph else 0 end),0),'-',b.bank_trans,'"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','X',b.kode_lokasi "+
								" from yk_bill_d a "+
								"    inner join yk_loker ff on a.loker=ff.loker "+							
								"    inner join cust f on ff.kode_cust=f.kode_cust "+
								"    inner join vendor b on a.kode_vendor=b.kode_vendor and b.kode_lokasi=a.kode_lokasi "+							
								" where a.no_bill in ("+nobukti+") "+
								" group by b.kode_lokasi,b.nama_rek,b.no_rek,b.bank,b.cabang,b.kode_vendor,b.nama,b.bank_trans");
					}
					
					if (this.sg22.getRowValidCount() > 0){
						for (var i=0;i < this.sg22.getRowCount();i++){
							if (this.sg22.rowValid(i)){
								if (nilaiToFloat(this.sg22.cells(7,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg22.cells(7,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg22.cells(7,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','BILL','"+this.sg22.cells(2,i).substr(0,2)+"','"+this.sg22.cells(0,i)+"','"+this.sg22.cells(2,i)+"','"+this.sg22.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg22.cells(6,i))+","+nilai+")");
							}
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
					this.sg.clear(1);this.sg2.clear(1);this.sg4.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.doClick(this.i_gen);
				break;
			case "simpan" :	
			case "ubah" :	
				this.doHitungGar();														
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg22.getRowCount();i++){							
						if (nilaiToFloat(this.sg22.cells(7,i))>0 && nilaiToFloat(this.sg22.cells(6,i)) < nilaiToFloat(this.sg22.cells(7,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}							
					}
				}				
				if (this.stsSimpan == 0) {
					var data = this.dbLib.getDataProvider("select distinct progress from yk_hutang_d where progress not in ('0','R') and no_hutang='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																				
							system.alert(this,"Transaksi tidak valid.","No Pengajuan HUTKES sudah diprogress lain (yk_hutang_d).");
							return false;							
						}
					}
					var data = this.dbLib.getDataProvider("select kode_lokasi from takterima_m where posted='T' and no_terima='"+this.e_nb.getText()+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																				
							system.alert(this,"Transaksi tidak valid.","TAK Terima di Lokasi Area sudah diposting (Lokasi : "+line.kode_lokasi+")");
							return false;							
						}
					}
				}				
				var data = this.dbLib.getDataProvider("select distinct no_tak from yk_bill_d where no_tak<>'-' and no_hutang='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																				
						system.alert(this,"Transaksi tidak valid.","No Pengajuan HUTKES sudah diprogress lain (yk_bill_d sudah di-TAK).");
						return false;							
					}
				}
				var data = this.dbLib.getDataProvider("select distinct no_tak from yk_billkunj_d where no_tak<>'-' and no_hutang='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																				
						system.alert(this,"Transaksi tidak valid.","No Pengajuan HUTKES sudah diprogress lain (yk_billkunj_d sudah di-TAK).");
						return false;							
					}
				}
				this.preView = "1";
				this.sg2.validasi();
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
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
				var data = this.dbLib.getDataProvider("select kode_lokasi from takterima_m where posted='T' and no_terima='"+this.e_nb.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																				
						system.alert(this,"Transaksi tidak valid.","TAK Terima di Lokasi Area sudah diposting (Lokasi : "+line.kode_lokasi+")");
						return false;							
					}
				}
				var data = this.dbLib.getDataProvider("select distinct progress from yk_hutang_d where progress not in ('0','R') and no_hutang='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																				
						system.alert(this,"Transaksi tidak valid.","No Pengajuan HUTKES sudah diprogress lain (yk_hutang_d).");
						return false;							
					}
				}
				var data = this.dbLib.getDataProvider("select distinct no_tak from yk_bill_d where no_tak<>'-' and no_hutang='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																				
						system.alert(this,"Transaksi tidak valid.","No Pengajuan HUTKES sudah diprogress lain (yk_bill_d sudah di-TAK).");
						return false;							
					}
				}
				var data = this.dbLib.getDataProvider("select distinct no_tak from yk_billkunj_d where no_tak<>'-' and no_hutang='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																				
						system.alert(this,"Transaksi tidak valid.","No Pengajuan HUTKES sudah diprogress lain (yk_billkunj_d sudah di-TAK).");
						return false;							
					}
				}
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_hutang_m where no_hutang='"+this.e_nb.getText()+"'");
					sql.add("delete from yk_hutang_j where no_hutang='"+this.e_nb.getText()+"'");
					sql.add("delete from yk_hutang_d where no_hutang='"+this.e_nb.getText()+"'");
					sql.add("delete from takterima_m where no_terima='"+this.e_nb.getText()+"'");
					sql.add("delete from takterima_j where no_terima='"+this.e_nb.getText()+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"'");
					sql.add("delete from yk_bill_d where no_hutang = '"+this.e_nb.getText()+"'");
					sql.add("delete from yk_billkunj_d where no_hutang = '"+this.e_nb.getText()+"'");						
					sql.add("update dbtm.dbo.yk_batm_m set progress='0',no_kb='-' where no_kb = '"+this.e_nb.getText()+"'");												
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
	doTampil:function(sender){		
		if (this.e_periode.getText() != "") {
			var strSQL = "select no_selesai,convert(varchar,tanggal,103) as tgl,no_dokumen,keterangan,nilai_ba,nilai_tagih "+
			             "from dbtm.dbo.yk_batm_m where progress ='0' and periode<='"+this.e_periode.getText()+"' and modul='"+this.c_jenis.getText()+"' ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_selesai,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai_ba),floatToNilai(line.nilai_tagih)]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else system.alert(this,"Data tidak valid.","Periode harus diisi.");
	},		
	doDoubleClick: function(sender, col , row) {		
		if (this.sg.cells(1,row) != "") {			
			var strSQL = "select zz.jnscust,zz.kode_lokasi,zz.kode_cust,zz.nama_cust,sum(zz.bp) as bp,sum(zz.cc) as cc,sum(zz.kunj) as kunj,sum(zz.cs) as cs,sum(zz.total) as total "+
						 "from ("+
						 "	select z.*, z.bp+z.cc+z.kunj-z.cs as total, x.nama as nama_cust,x.jenis as jnscust "+
						 "	from ( "+
						 "	select e.kode_lokasi,c.kode_cust, "+
						 "	isnull(sum(case when d.jenis <> 'PENSIUN' then a.nilai end),0) as bp, "+
						 "	isnull(sum(case when d.jenis = 'PENSIUN' then a.nilai end),0) as cc, "+
						 "	0 as kunj, 0 as cs "+
						 "	from dbtm.dbo.yk_bill_d a "+
						 "	inner join dbtm.dbo.yk_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
						 "	inner join dbtm.dbo.yk_bareg_m e on b.no_batch=e.no_bareg and e.kode_lokasi=b.kode_lokasi "+ 
						 "	inner join dbtm.dbo.yk_loker c on a.loker = c.loker "+
						 "	inner join dbtm.dbo.cust d on c.kode_cust= d.kode_cust and d.jenis <> 'TMID' "+
						 "	where a.no_selesai = '"+this.sg.cells(1,row)+"' "+
						 "	group by e.kode_lokasi,c.kode_cust "+						 
						 "	union all "+						 
						 "	select e.kode_lokasi,c.kode_cust,"+
						 "	0 as bp, 0 as cc, "+
						 "	isnull(sum(case when d.jenis <> 'PENSIUN' then a.umum+a.gigi+a.kbia+a.matkes else 0 end),0) as kunj, "+
						 "	isnull(sum(case when d.jenis <> 'PENSIUN' then a.cs else 0 end),0) as cs "+
						 "	from dbtm.dbo.yk_billkunj_d a "+
						 "	inner join dbtm.dbo.yk_billkunj_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
						 "	inner join dbtm.dbo.yk_bareg_m e on b.no_batch=e.no_bareg and e.kode_lokasi=b.kode_lokasi "+
						 "	inner join dbtm.dbo.yk_loker c on a.loker = c.loker "+
						 "	inner join dbtm.dbo.cust d on c.kode_cust= d.kode_cust and d.jenis <> 'TMID' "+
						 "	where a.no_selesai = '"+this.sg.cells(1,row)+"' "+
						 "	group by e.kode_lokasi,c.kode_cust "+
						 "	) z inner join dbtm.dbo.cust x on z.kode_cust=x.kode_cust where z.bp+z.cc+z.kunj+z.cs <> 0 "+
						 ")zz group by zz.jnscust,zz.kode_lokasi,zz.kode_cust,zz.nama_cust "+
						 "order by zz.kode_lokasi,zz.jnscust";

			var data = this.dbLib.getDataProvider(strSQL,true);						  
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg1.appendData([line.kode_lokasi,line.kode_cust,line.nama_cust,line.jnscust,floatToNilai(line.bp),floatToNilai(line.cc),floatToNilai(line.kunj),floatToNilai(line.cs),floatToNilai(line.total)]);				
				}
			} else this.sg1.clear(1);				
			this.pc1.setActivePage(this.pc1.childPage[1]);			
		} 
	},		
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1);this.sg2.clear(1);this.sg4.clear(1);
				this.e_debet.setText("0");
				this.e_kredit.setText("0");
				this.bTampil.show();
				this.i_appAll.show();
				this.bJurnal.show();
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_hutang_m","no_hutang",this.app._lokasi+"-PH"+this.e_periode.getText().substr(2,4)+".","000"));
			this.cb_vendor.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}
		if (sender == this.i_appAll) {
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) this.sg.cells(0,i,"APP");
			}
		}
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
   	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg2.clear(1);
			this.sg2.validasi();
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_hutang='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1);this.sg2.clear(1); this.sg4.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.doClick(this.i_gen);
		} catch(e) {
			alert(e);
		}
	},
	doJurnal:function(sender){		
		try {
			if (this.cb_vendor.getText() == "") {
				system.alert(this,"Transaksi tidak valid.","Data Mitra harus dipilih.");
			}
			else {
				var nobukti = "";
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
						nobukti += ",'"+this.sg.cells(1,i)+"'";
					}
				}
				nobukti = nobukti.substr(1);
				if (nobukti == "") nobukti = "''";			
				
				if (this.c_jenis.getText() == "MITRA") {				
					//PIUTANG - TAK (area) 
					var strSQL ="select a.kode_lokasi,d.nama as ket,"+
								"       case f.jenis when 'PENSIUN' then b.akun_cc "+
								"                    when 'PEGAWAI' then b.akun_bp "+
								"                    when 'GROUP' then b.akun_ap "+						
								"       end as kode_akun,d.nama as nama_akun,'D' as dc,"+
								"       sum(a.nilai) as nilai,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end as jenis,g.kode_drk,g.nama as nama_drk "+
								"from dbtm.dbo.yk_bill_d a  "+
								"           inner join yk_loker ff on a.loker=ff.loker "+
								"           inner join cust f on ff.kode_cust=f.kode_cust "+						
								"  			inner join yk_produk b on a.kode_produk=b.kode_produk "+
								"  			inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_cc "+
								"                             			          when 'PEGAWAI' then b.akun_bp "+
								"                             				      when 'GROUP' then b.akun_ap "+					
								"       							  end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
								"  			inner join drk g on (case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end)=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun=b.tahun "+
								"where a.no_selesai in ("+nobukti+") "+						
								"group by a.kode_lokasi,d.nama,case f.jenis when 'PENSIUN' then b.akun_cc "+
								"                             when 'PEGAWAI' then b.akun_bp "+
								"                             when 'GROUP' then b.akun_ap "+						
								"       end,d.nama,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end,g.kode_drk,g.nama "+												
								"union all "+																			
								"select a.kode_lokasi,'TAK PIUTANG BPCC' as ket,"+
								"       case f.jenis when 'PENSIUN' then b.akun_takcc else b.akun_takbp end as kode_akun,d.nama as nama_akun,'C' as dc,"+
								"       sum(a.nilai) as nilai,case f.jenis when 'PENSIUN' then 'TAKCC' else 'TAKBP' end as jenis,g.kode_drk,g.nama as nama_drk "+
								"from dbtm.dbo.yk_bill_d a  "+
								"           inner join yk_loker ff on a.loker=ff.loker "+
								"           inner join cust f on ff.kode_cust=f.kode_cust "+						
								"  			inner join yk_produk b on a.kode_produk=b.kode_produk "+
								"  			inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_takcc else b.akun_takbp end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
								"  			inner join drk g on (case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end)=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun=b.tahun "+
								"where a.no_selesai in ("+nobukti+") "+						
								"group by a.kode_lokasi,case f.jenis when 'PENSIUN' then b.akun_takcc "+
								"         else b.akun_takbp end,d.nama,case f.jenis when 'PENSIUN' then 'TAKCC' else 'TAKBP' end,g.kode_drk,g.nama "+													
								"union all "+													
								
					//dan TAK - HUTANG (pusat)
								"select '"+this.app._lokasi+"'  as kode_lokasi,"+
								"case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end as ket, "+
								"case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end as kode_akun,c.nama as nama_akun,'C' as dc, sum(a.nilai - a.pph) as nilai,  "+
								"case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end as jenis,'-' as kode_drk,'-' as nama_drk "+
								"from dbtm.dbo.yk_bill_d a "+
								"inner join yk_loker ff on a.loker=ff.loker "+
								"inner join cust f on ff.kode_cust=f.kode_cust "+						
								"inner join vendor b on '"+this.cb_vendor.getText()+"'=b.kode_vendor and '"+this.app._lokasi+"'=b.kode_lokasi "+
								"inner join vendor_klp bb on bb.kode_klpvendor=b.kode_klpvendor and bb.kode_lokasi=b.kode_lokasi  "+
								"inner join masakun c on (case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end)=c.kode_akun and b.kode_lokasi=c.kode_lokasi  "+						
								"where a.no_selesai in ("+nobukti+") "+
								"group by case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end, "+
								"         case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end,c.nama, "+
								"         case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end "+							
								"union all "+						
								"select '"+this.app._lokasi+"'  as kode_lokasi,'TAK HUTANG BPCC ' as ket,"+
								"       case f.jenis when 'PENSIUN' then b.akun_takcc else b.akun_takbp end as kode_akun,d.nama as nama_akun,'D' as dc,"+
								"       sum(a.nilai) as nilai,case f.jenis when 'PENSIUN' then 'TAKHUCC' else 'TAKHUBP' end as jenis,g.kode_drk,g.nama as nama_drk "+
								"from dbtm.dbo.yk_bill_d a  "+
								"           inner join yk_loker ff on a.loker=ff.loker "+
								"           inner join cust f on ff.kode_cust=f.kode_cust "+						
								"  			inner join yk_produk b on a.kode_produk=b.kode_produk "+
								"  			inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_takcc else b.akun_takbp end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
								"  			inner join drk g on (case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end)=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun=b.tahun "+
								"where a.no_selesai in ("+nobukti+") "+						
								"group by case f.jenis when 'PENSIUN' then b.akun_takcc "+
								"         else b.akun_takbp end,d.nama,case f.jenis when 'PENSIUN' then 'TAKHUCC' else 'TAKHUBP' end,g.kode_drk,g.nama "+														
								"union all "+													
								
								"select '"+this.app._lokasi+"' as kode_lokasi,"+
								"'TAK PPH' as ket,'"+this.akunTAKHut+"',cc.nama as nama_akun,'C' as dc, "+
								"sum(a.pph) as nilai,'TAKPPH' as jenis,'-' as kode_drk,'-' as nama_drk "+
								"from dbtm.dbo.yk_bill_d a "+															
								"                 inner join masakun cc on '"+this.akunTAKHut+"' = cc.kode_akun and a.kode_lokasi=cc.kode_lokasi "+
								"where a.no_selesai in ("+nobukti+") "+
								"group by cc.nama "+													
								"union all "+																								
								
								"select a.kode_lokasi,"+
								"'TAK PPH' as ket,'"+this.akunTAKHut+"',cc.nama as nama_akun,'D' as dc, "+
								"sum(a.pph) as nilai,'TAKPPH' as jenis,'-' as kode_drk,'-' as nama_drk "+
								"from dbtm.dbo.yk_bill_d a "+															
								"                 inner join masakun cc on '"+this.akunTAKHut+"' = cc.kode_akun and a.kode_lokasi=cc.kode_lokasi "+
								"where a.no_selesai in ("+nobukti+") "+
								"group by a.kode_lokasi,cc.nama "+													
								"union all "+																								
								
								"select a.kode_lokasi,"+
								"'HUTANG PPH' as ket,cc.kode_akun,cc.nama as nama_akun,'C' as dc, "+
								"sum(a.pph) as nilai,'PPH' as jenis,'-' as kode_drk,'-' as nama_drk "+
								"from dbtm.dbo.yk_bill_d a "+							
								"                 inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
								"                 inner join masakun cc on b.akun_pph = cc.kode_akun and b.kode_lokasi=cc.kode_lokasi "+
								"where a.no_selesai in ("+nobukti+") "+
								"group by a.kode_lokasi,cc.kode_akun,cc.nama "+													
								"union all "+																								
								
							
						//KUNJUNGAN	& PDPT					
								"select a.kode_lokasi,'PIU KUNJUNGAN' as ket,case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end as kode_akun,d.nama as nama_akun,'D' as dc, "+
								"sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai,'PIUKUNJ' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
								"from dbtm.dbo.yk_billkunj_d a "+
								"                     inner join yk_loker bb on a.loker=bb.loker "+
								"                     inner join cust b on bb.kode_cust=b.kode_cust "+
								"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
								"		 	          inner join masakun d on (case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end)=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
								"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun=c.tahun "+
								"where a.umum+a.gigi+a.kbia+a.matkes<> 0 and b.jenis <> 'PENSIUN' and a.no_selesai in ("+nobukti+") "+
								"group by  a.kode_lokasi,case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end,d.nama,c.drk_kunj,e.nama "+																							
								"union all "+												
								"select a.kode_lokasi,'PDPT KUNJUNGAN' as ket,c.akun_ku as kode_akun,d.nama as nama_akun,'C' as dc, "+
								"sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai,'PDPTKUNJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
								"from dbtm.dbo.yk_billkunj_d a "+
								"                     inner join yk_loker bb on a.loker=bb.loker "+
								"				      inner join cust b on bb.kode_cust=b.kode_cust "+
								"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
								"		 	          inner join masakun d on c.akun_ku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
								"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun=c.tahun "+
								"where a.umum+a.gigi+a.kbia+a.matkes<> 0 and b.jenis <> 'PENSIUN' and a.no_selesai in ("+nobukti+") "+
								"group by  a.kode_lokasi,c.akun_ku,d.nama,c.drk_kunj,e.nama "+												
								"union all "+						
								
								//CS						
								/* cs masih masuk ke retitusi yakes
								
								"select '"+this.app._lokasi+"' as kode_lokasi,'TTP COST SHARING' as ket,cc.bp_hut as kode_akun,d.nama as nama_akun,'D' as dc, "+
								"sum(a.cs) as nilai,'HUTCS' as jenis,'-' as kode_drk,'-' as nama_drk "+
								"from dbtm.dbo.yk_billkunj_d a "+
								"                     inner join yk_loker bb on a.loker=bb.loker "+
								"					  inner join cust b on bb.kode_cust=b.kode_cust "+							
								"					  inner join vendor c on '"+this.cb_vendor.getText()+"'=c.kode_vendor and '"+this.app._lokasi+"'=c.kode_lokasi "+
								"					  inner join vendor_klp cc on cc.kode_klpvendor=c.kode_klpvendor and cc.kode_lokasi=c.kode_lokasi  "+							
								"		 	          inner join masakun d on cc.bp_hut=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+							
								"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.no_selesai in ("+nobukti+") "+
								"group by  cc.bp_hut,d.nama "+
								*/
								
								"select '"+this.app._lokasi+"' as kode_lokasi,'TTP COST SHARING' as ket,cc.akun_hutcs as kode_akun,d.nama as nama_akun,'D' as dc, "+
								"sum(a.cs) as nilai,'HUTCS' as jenis,'-' as kode_drk,'-' as nama_drk "+
								"from dbtm.dbo.yk_billkunj_d a "+
								"                     inner join yk_loker bb on a.loker=bb.loker "+
								"					  inner join cust b on bb.kode_cust=b.kode_cust "+							
								"		 	          inner join yk_kunj cc on a.kode_produk=cc.kode_produk "+							
								"		 	          inner join masakun d on cc.akun_hutcs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+							
								"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.no_selesai in ("+nobukti+") "+
								"group by  cc.akun_hutcs,d.nama "+
								
								"union all "+						
								"select a.kode_lokasi,'PIUTANG COST SHARING ' as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'C' as dc, "+
								"sum(a.cs) as nilai,'PIUCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
								"from dbtm.dbo.yk_billkunj_d a "+
								"                     inner join yk_loker bb on a.loker=bb.loker "+
								"                     inner join cust b on bb.kode_cust=b.kode_cust "+
								"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
								"		 	          inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
								"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun=c.tahun "+
								"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.no_selesai in ("+nobukti+") "+
								"group by  a.kode_lokasi,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
								
								"order by kode_lokasi,dc desc,kode_akun";
				}
				else {
					if (this.c_jenis.getText() == "PDPTREV") {var dcPiu = "C"; var dcPdpt = "D";} 
					else {var dcPiu = "D"; var dcPdpt = "C";}
			
					//PIUTANG - HUTANG (area) 
					var strSQL ="select a.kode_lokasi,d.nama as ket,"+
								"       case f.jenis when 'PENSIUN' then b.akun_cc "+
								"                    when 'PEGAWAI' then b.akun_bp "+
								"                    when 'GROUP' then b.akun_ap "+						
								"       end as kode_akun,d.nama as nama_akun,'D' as dc,"+
								"       sum(a.nilai) as nilai,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end as jenis,g.kode_drk,g.nama as nama_drk "+
								"from dbtm.dbo.yk_bill_d a  "+
								"           inner join yk_loker ff on a.loker=ff.loker "+
								"           inner join cust f on ff.kode_cust=f.kode_cust "+						
								"  			inner join yk_produk b on a.kode_produk=b.kode_produk "+
								"  			inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_cc "+
								"                             			          when 'PEGAWAI' then b.akun_bp "+
								"                             				      when 'GROUP' then b.akun_ap "+					
								"       							  end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
								"  			inner join drk g on (case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end)=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun=b.tahun "+
								"where a.no_selesai in ("+nobukti+") "+						
								"group by a.kode_lokasi,d.nama,case f.jenis when 'PENSIUN' then b.akun_cc "+
								"                             when 'PEGAWAI' then b.akun_bp "+
								"                             when 'GROUP' then b.akun_ap "+						
								"       end,d.nama,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end,g.kode_drk,g.nama "+												
								"union all "+																			
																
								"select a.kode_lokasi as kode_lokasi,"+
								"case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end as ket, "+
								"case f.jenis when 'PENSIUN' then '"+this.akunHutCC+"' else '"+this.akunHutBP+"' end as kode_akun,c.nama as nama_akun,'C' as dc, sum(a.nilai - a.pph) as nilai,  "+
								"case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end as jenis,'-' as kode_drk,'-' as nama_drk "+
								"from dbtm.dbo.yk_bill_d a "+
								"inner join yk_loker ff on a.loker=ff.loker "+
								"inner join cust f on ff.kode_cust=f.kode_cust "+						
								
								//"inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
								//"inner join vendor_klp bb on bb.kode_klpvendor=b.kode_klpvendor and bb.kode_lokasi=b.kode_lokasi  "+
								
								"inner join masakun c on (case f.jenis when 'PENSIUN' then '"+this.akunHutCC+"' else '"+this.akunHutBP+"' end)=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+						
								"where a.no_selesai in ("+nobukti+") "+
								"group by a.kode_lokasi,case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end, "+
								//"         case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end,"+
								"         c.nama,f.jenis, "+								
								"         case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end "+
								"union all "+													
								
								"select a.kode_lokasi,"+
								"'HUTANG PPH' as ket,cc.kode_akun,cc.nama as nama_akun,'C' as dc, "+
								"sum(a.pph) as nilai,'PPH' as jenis,'-' as kode_drk,'-' as nama_drk "+
								"from dbtm.dbo.yk_bill_d a "+							
								"                 inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
								"                 inner join masakun cc on b.akun_pph = cc.kode_akun and b.kode_lokasi=cc.kode_lokasi "+
								"where a.no_selesai in ("+nobukti+") "+
								"group by a.kode_lokasi,cc.kode_akun,cc.nama "+													
								"union all "+																								
								
								
						//KUNJUNGAN	& PDPT					
								"select a.kode_lokasi,'PIU KUNJUNGAN' as ket,case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end as kode_akun,d.nama as nama_akun,'"+dcPiu+"' as dc, "+
								"abs(sum(a.umum+a.gigi+a.kbia+a.matkes)) as nilai,'PIUKUNJ' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
								"from dbtm.dbo.yk_billkunj_d a "+
								"                     inner join yk_loker bb on a.loker=bb.loker "+
								"                     inner join cust b on bb.kode_cust=b.kode_cust "+
								"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
								"		 	          inner join masakun d on (case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end)=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
								"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun=c.tahun "+
								"where a.umum+a.gigi+a.kbia+a.matkes<> 0 and b.jenis <> 'PENSIUN' and a.no_selesai in ("+nobukti+") "+
								"group by  a.kode_lokasi,case b.jenis when 'PEGAWAI' then c.akun_pku else c.akun_pap end,d.nama,c.drk_kunj,e.nama "+																							
								"union all "+												
								"select a.kode_lokasi,'PDPT KUNJUNGAN' as ket,c.akun_ku as kode_akun,d.nama as nama_akun,'"+dcPdpt+"' as dc, "+
								"abs(sum(a.umum+a.gigi+a.kbia+a.matkes)) as nilai,'PDPTKUNJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
								"from dbtm.dbo.yk_billkunj_d a "+
								"                     inner join yk_loker bb on a.loker=bb.loker "+
								"				      inner join cust b on bb.kode_cust=b.kode_cust "+
								"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
								"		 	          inner join masakun d on c.akun_ku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
								"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun=c.tahun "+
								"where a.umum+a.gigi+a.kbia+a.matkes<> 0 and b.jenis <> 'PENSIUN' and a.no_selesai in ("+nobukti+") "+
								"group by  a.kode_lokasi,c.akun_ku,d.nama,c.drk_kunj,e.nama "+												
								"union all "+						
								
								//CS														
								"select a.kode_lokasi as kode_lokasi,'TTP COST SHARING' as ket,cc.akun_hutcs as kode_akun,d.nama as nama_akun,'"+dcPiu+"' as dc, "+
								"abs(sum(a.cs)) as nilai,'HUTCS' as jenis,'-' as kode_drk,'-' as nama_drk "+
								"from dbtm.dbo.yk_billkunj_d a "+
								"                     inner join yk_loker bb on a.loker=bb.loker "+
								"					  inner join cust b on bb.kode_cust=b.kode_cust "+							
								"		 	          inner join yk_kunj cc on a.kode_produk=cc.kode_produk "+							
								"		 	          inner join masakun d on cc.akun_hutcs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+							
								"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.no_selesai in ("+nobukti+") "+
								"group by  a.kode_lokasi,cc.akun_hutcs,d.nama "+
								
								"union all "+						
								"select a.kode_lokasi,'PIUTANG COST SHARING ' as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'"+dcPdpt+"' as dc, "+
								"abs(sum(a.cs)) as nilai,'PIUCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
								"from dbtm.dbo.yk_billkunj_d a "+
								"                     inner join yk_loker bb on a.loker=bb.loker "+
								"                     inner join cust b on bb.kode_cust=b.kode_cust "+
								"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
								"		 	          inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
								"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun=c.tahun "+
								"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.no_selesai in ("+nobukti+") "+
								"group by  a.kode_lokasi,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
								
								"order by kode_lokasi,dc desc,kode_akun";
				}
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						if (parseFloat(line.nilai) != 0)
							this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk,line.nama_drk,line.kode_lokasi]);
					}
				}
				this.sg2.validasi();								
				this.pc1.setActivePage(this.pc1.childPage[2]);
			}
		}
		catch(e) {
			systemAPI.alert("step : "+step+"; error = "+e);
		}
	},	
	doHitungGar: function(){
		var nobukti = "";
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
				nobukti += ",'"+this.sg.cells(1,i)+"'";
			}
		}
		nobukti = nobukti.substr(1);
		if (nobukti == "") nobukti = "''";			
		
		this.sg22.clear();
		var strSQL = "select case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end as kode_akun,"+
					 "d.nama as nama_akun,g.flag as kode_pp,e.nama as nama_pp,case b.jenis when 'PEGAWAI' then c.kode_drkbp else c.kode_drkcc end as kode_drk,"+
					 "f.nama as nama_drk,"+
					 "sum(a.nilai) as nilai "+
					 "from dbtm.dbo.yk_bill_d a "+
					 "inner join yk_loker bb on a.loker = bb.loker "+
					 "inner join cust b on bb.kode_cust = b.kode_cust and b.sts_gar='1' "+
					 "inner join yk_produk c on a.kode_produk=c.kode_produk "+
					 "inner join masakun d on (case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end) = d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "inner join spro g on g.kode_lokasi=a.kode_lokasi and g.kode_spro='PPBPCC' "+
					 "inner join pp e on e.kode_pp=g.flag and e.kode_lokasi=g.kode_lokasi "+
					 "inner join drk f on f.kode_drk=(case b.jenis when 'PEGAWAI' then c.kode_drkbp else c.kode_drkcc end) and f.kode_lokasi='"+this.app._lokasi+"' and f.tahun='"+this.e_periode.getText().substr(0,4)+"' "+					 
					 "where a.loker<>'-' and b.jenis in ('PEGAWAI','PENSIUN') and a.no_selesai in ("+nobukti+") "+
					 "group by g.flag,f.nama,e.nama,d.nama,case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end,case b.jenis when 'PEGAWAI' then c.kode_drkbp else c.kode_drkcc end "+
					 "order by kode_akun,g.flag";				
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg22.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg22.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,"0",floatToNilai(line.nilai),"0"]);
			}
		} else this.sg22.clear(1);									
				
		var sls = 0;
		for (var i=0;i < this.sg22.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg22.cells(2,i)+"','"+this.sg22.cells(2,i).substr(0,2)+"','"+this.sg22.cells(0,i)+"','"+this.sg22.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg22.cells(2,i)+"','"+this.sg22.cells(2,i).substr(0,2)+"','"+this.sg22.cells(0,i)+"','"+this.sg22.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg22.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg22.cells(7,i));
				this.sg22.cells(8,i,floatToNilai(sls));
			}
		}
		this.pc1.setActivePage(this.pc1.childPage[3]);
	},
	doLoad4:function(sender){																				
		if (this.c_jenis.getText() == "MITRA" || this.c_jenis.getText() == "PDPT" || this.c_jenis.getText() == "AKRU" || this.c_jenis.getText() == "PDPTREV") {
			var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_loktuj+' - '+c.nama as lokbayar,a.nik_setuju+' - '+b.nama as nama "+
						 "from yk_hutang_m a inner join karyawan b on a.nik_setuju=b.nik "+
						 "                   inner join lokasi c on a.kode_loktuj=c.kode_lokasi "+					 
						 "where a.modul = 'HUTKES' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') and a.posted='F' and a.jenis<>'RESYKT'";		
		}
		else {
			var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_loktuj+' - '+c.nama as lokbayar,a.nik_setuju+' - '+b.nama as nama "+
						 "from yk_hutang_m a inner join karyawan b on a.nik_setuju=b.nik "+
						 "                   inner join lokasi c on a.kode_loktuj=c.kode_lokasi "+					 
						 "where a.modul = 'HUTKES' and a.periode='"+this.e_periode.getText()+"'  and a.progress in ('1') and a.posted='F' and a.jenis='RESYKT'";		//and a.kode_lokasi='"+this.app._lokasi+"'
		}
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU4 = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);
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
			this.sg4.appendData([line.no_hutang,line.tgl,line.keterangan,floatToNilai(line.nilai),line.lokbayar,line.nama]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg4.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.bTampil.hide();
				this.i_appAll.hide();
				this.bJurnal.hide();
		
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg4.cells(0,row));								
								
				var strSQL = "select keterangan,tanggal,nik_setuju,no_dokumen "+
							 "from yk_hutang_m "+							 
							 "where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);																		
						this.cb_app.setText(line.nik_setuju);						
						this.cb_vendor.setText(line.no_dokumen);						
					}					
				}					
				var strSQL = "select no_selesai,convert(varchar,tanggal,103) as tgl,no_dokumen,keterangan,nilai_ba,nilai_tagih "+
							 "from dbtm.dbo.yk_batm_m where no_kb ='"+this.e_nb.getText()+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["APP",line.no_selesai,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai_ba),floatToNilai(line.nilai_tagih)]);
					}
				} else this.sg.clear(1);
				
				var strSQL = "select a.no_urut,a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.jenis,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_lokasi "+
							 "from yk_hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							
							 "                   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							 "where a.no_hutang = '"+this.e_nb.getText()+"' "+
							 "union all "+
							 "select a.no_urut,a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.jenis,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_lokasi "+
							 "from takterima_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							
							 "                   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							 "where a.no_terima = '"+this.e_nb.getText()+"' "+
							 "order by no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.jenis,line.kode_drk,line.nama_drk,line.kode_lokasi]);
					}
				} else this.sg2.clear(1);
			
			}									
		} catch(e) {alert(e);}
	}	
});