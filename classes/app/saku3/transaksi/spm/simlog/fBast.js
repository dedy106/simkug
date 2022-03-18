window.app_saku3_transaksi_spm_simlog_fBast = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_simlog_fBast.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_simlog_fBast";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Berita Acara - Akru Hutang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Mitra","Nilai"],
					colWidth:[[5,4,3,2,1,0],[90,200,300,180,80,100]],
					colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"No Dokumen", maxLength:50});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,15,200,20],caption:"Nilai PO", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_po = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"No PO", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});										
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,14,200,20],caption:"Nilai PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Akun Hutang",  multiSelection:false, maxLength:10, tag:2});												
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,200,20],caption:"Total Hutang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,281], childPage:["Data PO","Data Barang"]});
		this.cb_proyek = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Proyek", readOnly:true, tag:1});														
		this.cb_vendor = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Mitra", readOnly:true, tag:1});														
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Bank", readOnly:true});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"No Rekening", readOnly:true});				
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Nama Rekening", readOnly:true});				
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Alamat Penerima", readOnly:true});		
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:12,
					colTitle:["Klp Brg","Kelompok Barang","Jenis","Akun","Item Barang","Merk","Tipe","Spesifikasi","Jumlah","Harga","Total","ID"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[150,100,100,100,150,150,150,250,80,80,150,80]],
					colFormat:[[8,9,10],[cfNilai,cfNilai,cfNilai]],
					colHide:[[2,3,11],[true,true,true]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8,9,10,11],[0]], 	
					buttonStyle:[[0],[bsEllips]], 	
					ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});		

		this.rearrangeChild(10, 23);				
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	

		//detail barang generate utk aset / inventaris [hide]
		this.sg2 = new saiGrid(this,{bound:[1,500,1000,200],colCount:10,tag:9,
					colTitle:["ID","No Tag","Item Barang","Merk","Tipe","Spesifikasi","Harga","Kode Akun","Klp Aset","Jenis"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[60,60,60,80,200,150,150,200,120,40]],
					colFormat:[[6],[cfNilai]],
					readOnly:true,
					autoAppend:false,defaultRow:1,visible:false});
		
					
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
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPNM') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPNM") this.akunPPNM = line.flag;	
				}
			}			
						
			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' "+					
								"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);		
									
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik = '"+this.app._userLog+"' where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);

			this.cb_proyek.setSQL("select kode_proyek,nama from spm_proyek where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' union select '-','-'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_simlog_fBast.extend(window.childForm);
window.app_saku3_transaksi_spm_simlog_fBast.implement({	
	doDetail:function(sender){								
		this.sg2.clear();
		for (var i=0;i < this.sg4.getRowCount();i++){
			//selain jenis = HABISPAKAI --> insert ke fa_asset
			if (this.sg4.cells(0,i) != "-" && this.sg4.cells(2,i) != "B") {								
				var nuAkhir = 0;						
				var formatID = this.app._lokasi+"-IN"+this.e_periode.getText().substr(2,4)+"."; 				
				
				//ambil nu terakhir dr database
				var strSQL = "select isnull(max(no_fa),0) as no_fa from fa_asset where kode_lokasi='"+this.app._lokasi+"' and no_fa like '"+formatID+"____%'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						nuAkhir = parseFloat(line.no_fa.substr(line.no_fa.length-4,4));						
					}
				}					
				//ambil nu terakhir dr grid
				for (var k=0;k < this.sg2.getRowCount();k++){
					if (this.sg2.rowValid(k)){
						if (formatID == this.sg2.cells(1,k).substr(0,10)) 
							nuAkhir = parseFloat(this.sg2.cells(1,k).substr(this.sg2.cells(1,k).length-4,4));
					}
				}				
				
				for (var j=0;j < nilaiToFloat(this.sg4.cells(8,i));j++){
					var k = nuAkhir+j+1;
					var idx = k.toString();
					if (idx.length == 1) var nu = "000"+idx;
					if (idx.length == 2) var nu = "00"+idx;
					if (idx.length == 3) var nu = "0"+idx;
					if (idx.length == 4) var nu = idx;
						
					var noTag = formatID+nu;
					this.sg2.appendData([this.sg4.cells(11,i),noTag,this.sg4.cells(4,i),this.sg4.cells(5,i),this.sg4.cells(6,i),this.sg4.cells(7,i),this.sg4.cells(9,i),this.sg4.cells(3,i), this.sg4.cells(0,i),this.sg4.cells(2,i)]);
				}												
			}
		}		
	},
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Lokasi",sender,undefined, 
							"select kode_klpfa, nama  from fa_klp where kode_lokasi='"+this.app._lokasi+"' ", 
							"select count(a.kode_klpfa) from (select kode_klpfa from fa_klp where kode_lokasi='"+this.app._lokasi+"' ) a ",
							["kode_klpfa","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {				
				if (col == 0){
					var strSQL = "select a.nama,b.jenis,b.kode_akun "+
								 "from fa_klp a "+
								 "inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun  and a.kode_lokasi=b.kode_lokasi "+
								 "where a.kode_klpfa='"+sender.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";

					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							sender.cells(1,row,line.nama);
							sender.cells(2,row,line.jenis);
							sender.cells(3,row,line.kode_akun);
						}
					}
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	isiCbPO: function() {
		this.cb_po.setSQL("select a.no_po, a.keterangan from log_po_m a "+
			              "where a.pp_pesan='"+this.app._kodePP+"' and a.periode<='"+this.e_periode.getText()+"' and a.no_ba = '-' and a.kode_lokasi='"+this.app._lokasi+"'",["no_po","keterangan"],false,["No PO","Deskripsi"],"and","Data PO",true);		
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
						sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from fa_nilai where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from fa_asset where no_baps='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update log_po_m set no_ba='-' where no_ba='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("update log_po_d set kode_klpfa='-' where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}	
					
					sql.add("insert into hutang_m(no_hutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_vendor,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_hutang,posted,nilai_ppn,modul,no_ref,kode_proyek) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.cb_vendor.getText()+"','IDR',1,'"+this.app._userLog+"','"+this.app._kodePP+"',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_akun.getText()+"','X',0,'LOGBAST','"+this.cb_po.getText()+"','"+this.cb_proyek.getText()+"')");
					
					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_po.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGBAST','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");

					if (this.e_ppn.getText()!="0") {
						sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+this.cb_po.getText()+"','"+this.dp_d1.getDateString()+"',998,'"+this.akunPPNM+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGBAST','PPNM','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					}

					//jurnal aset/barang
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){								
								sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_po.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg4.cells(3,i)+"','"+this.sg4.cells(4,i)+"','D','IDR',1,"+parseNilai(this.sg4.cells(10,i))+","+parseNilai(this.sg4.cells(10,i))+",'"+this.ppPesan+"','-','"+this.app._lokasi+"','LOGBAST','ASET','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
								sql.add("update log_po_d set kode_klpfa='"+this.sg4.cells(0,i)+"' where no_po='"+this.cb_po.getText()+"' and no_urut="+this.sg4.cells(11,i).substr(15,3)+" and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
					}							
					
					//data aset
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,no_baps,kode_lokfa,nik_pnj,no_po,id_pesan,kode_vendor,tgl_baps,kode_unit,jenis,catatan) values "+
										"('"+this.sg2.cells(1,i)+"','-','"+this.app._lokasi+"','"+this.sg2.cells(8,i)+"','-','"+this.sg2.cells(7,i)+"',0,0,'"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"','-',"+nilaiToFloat(this.sg2.cells(6,i))+",1,'-','-','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','2','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','-','-','"+this.cb_po.getText()+"','"+this.sg2.cells(0,i)+"','"+this.cb_vendor.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.sg2.cells(9,i)+"','"+this.sg2.cells(5,i)+"')");																							
							}
						}
					}	
					sql.add("update a set a.nilai_susut=round(a.nilai/c.umur,0), a.kode_klpakun=c.kode_klpakun, a.umur=c.umur, a.persen=c.persen, a.kode_pp=f.kode_pp, a.kode_pp_susut=f.kode_pp  "+
					        "from fa_asset a inner join fa_klp b on a.kode_klpfa=b.kode_klpfa and a.kode_lokasi=b.kode_lokasi "+
							"                inner join fa_klpakun c on b.kode_klpakun=c.kode_klpakun and b.kode_lokasi=c.kode_lokasi "+
							"                inner join log_po_d d on a.id_pesan=d.no_pesan+'-'+cast(d.no_urut as varchar) and a.no_po=d.no_po and a.kode_lokasi=d.kode_lokasi "+
							"                inner join log_po_m e on d.no_po=e.no_po and d.kode_lokasi=e.kode_lokasi "+
							"                inner join log_pesan_m f on f.no_pesan=e.no_pesan and e.kode_lokasi=f.kode_lokasi "+
							"where a.no_baps='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into fa_nilai(no_fa,kode_lokasi,no_bukti,dc,nilai,periode)  "+
							"select no_fa,kode_lokasi,'"+this.e_nb.getText()+"','D',nilai,periode "+
							"from fa_asset where no_baps='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update log_po_m set no_ba='"+this.e_nb.getText()+"' where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");														
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
					this.sg4.clear(1); this.sg3.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.isiCbPO();					
				break;
			case "simpan" :															
			case "ubah" :						
				this.preView = "1";																		
				this.doDetail();
				this.sg4.validasi();					
				for (var i=0;i < this.sg4.getRowCount();i++){
					if (!this.sg4.rowValid(i)){						
						var isKosong = true;					
						for (var j=0;j < this.sg4.getColCount();j++){
							if (this.sg4.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}			
						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong Tab Data Barang.");
							return false;
						}
					}					
					else {
						if (this.sg4.cells(0,i) == "-") {
							system.alert(this,"Transaksi tidak valid.","Kolom kelompok barang tidak valid (-) Tab Data Barang.");
							return false;
						}
					}
				}															
											
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Hutang tidak boleh nol atau kurang.");
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
					sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from fa_nilai where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from fa_asset where no_baps='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update log_po_m set no_ba='-' where no_ba='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					sql.add("update log_po_d set kode_klpfa='-' where no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);

		if (this.stsSimpan == 1) {
			this.isiCbPO();
			this.doClick();		
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();		

		if (sender == this.cb_po && this.cb_po.getText() != "") {
			var strSQL = "select c.alamat,c.kode_pp,a.kode_proyek,b.kode_vendor,b.nama,b.bank+' - '+b.cabang as bank,b.no_rek,b.nama_rek,a.nilai,a.ppn,a.nilai+a.ppn as total "+
						 "from log_po_m a "+
						 "inner join log_pesan_m c on a.no_pesan=c.no_pesan and a.kode_lokasi=c.kode_lokasi "+
						 "inner join vendor b on a.kode_vendor=b.kode_vendor  and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_po='"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.ppPesan = line.kode_pp;
					this.cb_proyek.setText(line.kode_proyek);
					this.cb_vendor.setText(line.kode_vendor,line.nama);
					this.e_bank.setText(line.bank);
					this.e_norek.setText(line.no_rek);
					this.e_namarek.setText(line.nama_rek);	
					this.e_alamat.setText(line.alamat);		
					
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.e_ppn.setText(floatToNilai(line.ppn));
					this.e_total.setText(floatToNilai(line.total));
				}
			}

			var strSQL = "select a.kode_klpfa,a.no_pesan+'-'+cast(a.no_urut as varchar) as no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.harga,a.jumlah * a.harga as total "+
						 "from log_po_d a "+							 
						 "where a.no_po ='"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line2;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line2 = data.rs.rows[i];	
					if (this.stsSimpan == 1) this.sg4.appendData(["-","-","-","-",line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.harga),floatToNilai(line2.total),line2.no_urut]);
					else {
						this.sg4.appendData([line2.kode_klpfa,"-","-","-",line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.harga),floatToNilai(line2.total),line2.no_urut]);
						this.doChangeCell4(this.sg4,0,i);
					}
				}
			} else this.sg4.clear(1);	
			
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg4.clear(1);  this.sg3.clear(1); 
				this.isiCbPO(); 
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hutang_m","no_hutang",this.app._lokasi+"-BA"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
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
								this.nama_report="server_report_saku3_gl_rptJuJurnalBukti";
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
			this.sg4.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.isiCbPO();
			this.stsSimpan=1;
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.kode_vendor+' - '+b.nama as vendor,a.nilai "+
		             "from hutang_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "                left join (select distinct kode_lokasi,no_hutang from yk_pb_m where kode_lokasi='"+this.app._lokasi+"') c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+
					 "where c.no_hutang is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='LOGBAST'";		
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
			this.sg3.appendData([line.no_hutang,line.tgl,line.no_dokumen,line.keterangan,line.vendor,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
												
				var strSQL = "select keterangan,no_dokumen,no_ref,tanggal,kode_vendor,akun_hutang,kode_pp "+
							 "from hutang_m "+							 
							 "where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.cb_po.setSQL("select no_po, keterangan from log_po_m where no_po='"+line.no_ref+"' and kode_lokasi='"+this.app._lokasi+"'",["no_po","keterangan"],false,["No PO","Deskripsi"],"and","Data PO",true);		
						this.cb_po.setText(line.no_ref);
						this.e_dok.setText(line.no_dokumen);												
						this.e_ket.setText(line.keterangan);												
						this.cb_akun.setText(line.akun_hutang);												
					}
				}								
				
				var strSQL = "select b.kode_vendor,b.nama,b.bank+' - '+b.cabang as bank,b.no_rek,b.nama_rek "+
							 "from log_po_m a "+
							 "inner join vendor b on a.kode_vendor=b.kode_vendor  and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_po='"+this.cb_po.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_vendor.setText(line.kode_vendor,line.nama);
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
					}
				}
				

				var strSQL = "select c.alamat,c.kode_pp,a.kode_proyek,b.kode_vendor,b.nama,b.bank+' - '+b.cabang as bank,b.no_rek,b.nama_rek,a.nilai,a.ppn,a.nilai+a.ppn as total "+
						 "from log_po_m a "+
						 "inner join log_pesan_m c on a.no_pesan=c.no_pesan and a.kode_lokasi=c.kode_lokasi "+
						 "inner join vendor b on a.kode_vendor=b.kode_vendor  and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_po='"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				
				
			}									
		} catch(e) {alert(e);}
	}
});