window.app_saku3_transaksi_piutang_fAppMedRec = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_piutang_fAppMedRec.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_piutang_fAppMedRec";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Billing : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Approve","List Approve"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bill","Tanggal","Deskripsi","Total BP","Tot Kunjungan","Total CS"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,310,80,100]],colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Billing",click:[this,"doLoad3"]});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.cb_vendor = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Mitra",tag:2,multiSelection:false});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,14,220,20],caption:"Total BP", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_batch = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"No Batch",tag:1,multiSelection:false,change:[this,"doChange"]});
		this.e_kunj = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,15,220,20],caption:"Tot. Kunjungan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});								
		this.e_cs = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,220,20],caption:"Tot. Cost Sharing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bValid = new button(this.pc2.childPage[0],{bound:[660,17,80,18],caption:"Validasi",click:[this,"doValid"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,325], childPage:["Detail Billing","Data Anggaran"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:35,tag:9,
					colTitle:["NIK","Nama","Loker","Band","Nikes","Nama Pasien","Dokter","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai Kunj","Nilai CS",
							  "Jasa Dokter","KB-KIA","Jasa Dokter Gigi","Jasa Dokter Spe.","UGD","Tindakan Medis","Obat/Bhn Obat","Alkes","Pem. Penunjang","Kamar","Kamar Operasi","Ruang Perwtn Khusus","Kacamata dan Alat Rehab","Biaya Adm Lainnya","PPH","Kunj UMUM","Kunj GIGI","Kunj KBKIA","MATKES","CS",
							  "Kode Keg","No Rujuk"],
					colWidth:[[34,33,32,31,30, 29,28,27,26,25,24,23,22,21,20,19,18,17,16,15, 14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
							  [80,80,  80,80,80,80,80, 80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,    80,80,70,70,70,70,70,100,70,70,100,100,70]],
					colFormat:[[32,31,30, 13,14, 29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai]],
					readOnly:true, defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
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
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Mitra",true);
			this.cb_batch.setSQL("select no_batch,keterangan from yk_harian_m where progress='0' and kode_lokasi='"+this.app._lokasi+"'",["no_batch","keterangan"],false,["Bukti","Deskripsi"],"and","Data Batch",true);
			this.flagGarFree = "0"; this.ppBPCC = "-";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','PPBPCC') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;							
					if (line.kode_spro == "PPBPCC") this.ppBPCC = line.flag;							
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_piutang_fAppMedRec.extend(window.childForm);
window.app_saku3_transaksi_piutang_fAppMedRec.implement({	
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
			this.doHitungGar();					
			if (this.flagGarFree == "0") {
				for (var i=0;i < this.sg2.getRowCount();i++){							
					if (nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
						var k =i+1;
						system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
						return false;						
					}							
				}
			}
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update yk_harian_m set no_app='"+this.e_nb.getText()+"',progress='1' where no_batch = '"+this.cb_batch.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into yk_bill_m(no_bill,kode_lokasi,tanggal,periode,tgl_input,nik_user,no_dokumen,keterangan,kode_vendor,nilai,kunj,cs,pph,jenis,progress,no_kasres,no_batch,no_hutang,modul) values "+ 
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_batch.getText()+"','"+this.e_ket.getText()+"','"+this.cb_vendor.getText()+"',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_kunj.getText())+","+nilaiToFloat(this.e_cs.getText())+",0,'MEDREC','0','-','-','-','MEDREC')");					
					sql.add("insert into yk_billkunj_m(no_bill,kode_lokasi,tanggal,periode,keterangan,tgl_input,nik_user,total_kunj,total_cs,jenis,progress,no_batch,no_hutang,modul) values "+ 
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"',"+nilaiToFloat(this.e_kunj.getText())+","+nilaiToFloat(this.e_cs.getText())+",'MEDREC','0','-','-','MEDREC')");
										
					sql.add("insert into yk_bill_d (no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,jenis,periode,no_hutang,no_piutang,no_selesai,no_tak) "+
							"select '"+this.e_nb.getText()+"',no_urut,kode_lokasi,'"+this.cb_vendor.getText()+"','"+this.cb_batch.getText()+"',nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,'MEDREC','"+this.e_periode.getText()+"',no_hutang,no_piutang,no_selesai,no_tak "+
							"from yk_bill_tmp where no_bill='"+this.app._userLog+"' and kode_lokasi ='"+this.app._lokasi+"'");							
					sql.add("insert into yk_billkunj_d (no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,jenis,periode,no_kas,no_piutang,no_tak,no_selesai) "+
								"select '"+this.e_nb.getText()+"',no_urut,kode_lokasi,'"+this.cb_batch.getText()+"',nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,'MEDREC','"+this.e_periode.getText()+"',no_kas,no_piutang,no_tak,no_selesai "+
								"from yk_billkunj_tmp where no_bill='"+this.app._userLog+"' and kode_lokasi ='"+this.app._lokasi+"'");
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(7,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(7,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(7,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
									"	('"+this.e_nb.getText()+"','BILL','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
							}
						}
					}
					sql.add("delete from yk_bill_tmp where no_bill='"+this.app._userLog+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from yk_billkunj_tmp where no_bill='"+this.app._userLog+"' and kode_lokasi ='"+this.app._lokasi+"'");
										
					setTipeButton(tbAllFalse);					
					this.status = "SIMPAN";
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
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.sg1.clear(1); this.sg3.clear(1); 
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :																		
				this.preView = "1";												
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total BP tidak boleh nol atau kurang.");
					return false;						
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :					
				this.status = "SIMPAN";
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from yk_bill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
				sql.add("delete from yk_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
				sql.add("delete from yk_billkunj_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
				sql.add("delete from yk_billkunj_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");					
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update yk_harian_m set no_app='-',progress='0' where no_app = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();						
		if (sender == this.cb_batch && this.cb_batch.getText()!="") {
			var data = this.dbLib.getDataProvider("select nilai,kunj,cs from yk_harian_m where no_batch='"+this.cb_batch.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					this.e_total.setText(floatToNilai(line.nilai));						
					this.e_kunj.setText(floatToNilai(line.kunj));						
					this.e_cs.setText(floatToNilai(line.cs));						
				}
			}
			if (this.stsSimpan == 1) {
				var data = this.dbLib.getDataProvider("select a.nik,a.nama,a.hr_area as loker,a.band_posisi as band,a.nik_kes as nikkes,a.nama_pasien as pasien,a.nama_dokter1 as dokter, "+
							"convert(varchar,a.tgl_berobat1,111) as tgl_masuk, "+
							"convert(varchar,a.tgl_berobat2,111) as tgl_keluar, "+
							"a.diagnosa_kerja as icdx,substring(kode_produk,1,2) as kode_biaya,0 as kunj,0 as cs, "+
							"a.n1 as n1,a.n4 as n2,a.n2 as n3,a.n3 as n4,a.n5 as n5,a.n6 as n6,a.n9 as n7,a.n10 as n8, "+
							"a.n11 as n9,0 as n10,a.n12 as n11,a.n13 as n12,a.n14 as n13,a.n19 as n14,a.n20 as n15,0 as pph,a.umum,a.gigi,a.kbia,a.matkes,a.n22 as cs, "+
							"a.kode_keg,a.no_rujukan as no_rujuk "+
							"from yk_harian_d a "+
							"where no_batch='"+this.cb_batch.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;					
					this.sg1.clear();				
					this.selectPage(undefined, 1);
					this.sgn.setTotalPage(Math.ceil(this.dataJU.rs.rows.length / 20));
					this.sgn.rearrange();
					this.sgn.activePage = 0;					
				} else this.sg1.clear(1);																	
			}
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); this.sg1.clear(1);  this.sg2.clear(1); 
				this.e_total.setText("0");
				this.e_kunj.setText("0");
				this.e_cs.setText("0");				
				this.cb_batch.setSQL("select no_batch,keterangan from yk_harian_m where progress='0' and kode_lokasi='"+this.app._lokasi+"'",["no_batch","keterangan"],false,["Bukti","Deskripsi"],"and","Data Batch",true);
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'yk_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'0000'));
			this.cb_vendor.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},								
	selectPage: function(sender,page){
		try {
			var start = (page - 1) * 20;
			var finish = start + 20;			
			finish = (finish > this.dataJU.rs.rows.length ? this.dataJU.rs.rows.length : finish);
			this.sg1.clear();
			for (var i=start; i < finish;i++){
				line = this.dataJU.rs.rows[i];
				this.sg1.appendData([line.nik,line.nama,line.loker,line.band,line.nikkes,line.pasien,line.dokter,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_biaya,0,0,  	
									 floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4),floatToNilai(line.n5),floatToNilai(line.n6),floatToNilai(line.n7),floatToNilai(line.n8),floatToNilai(line.n9),floatToNilai(line.n11),floatToNilai(line.n12),floatToNilai(line.n13),floatToNilai(line.n14),floatToNilai(line.n15),floatToNilai(line.pph),
									 floatToNilai(line.umum),floatToNilai(line.gigi),floatToNilai(line.kbia),floatToNilai(line.matkes),floatToNilai(line.cs),line.kode_keg,line.no_rujuk]);
			}
			this.sg1.setNoUrut(start);
		}
		catch(e) {
			alert(e);
		}
	},	
	doValid: function(){
		try {
			this.status = "VALIDASI";			
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();												
			sql.add("delete from yk_bill_tmp where no_bill='"+this.app._userLog+"' and kode_lokasi ='"+this.app._lokasi+"'");
			sql.add("delete from yk_billkunj_tmp where no_bill='"+this.app._userLog+"' and kode_lokasi ='"+this.app._lokasi+"'");				
			this.dbLib.execQuerySync(sql);			
			
			var line;
			var nilai = pph = 0;
			var kode_biaya = "";
			for (var i=0; i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];						       
				for (var j=1; j < 16;j++){		
					if (j ==10) continue;
					if (j == 1) { 					
						pph = parseFloat(line.pph);
					} 
					else {
						pph = 0;
					}
					nilai = Math.round(parseFloat(line["n"+j]));
					kode_biaya = line.kode_biaya+(j<10?"0":"")+j;
					if ((parseFloat(line["n"+j]) + pph) != 0) {					                                 
						sql.add("insert into yk_bill_tmp(no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,jenis,periode,no_hutang,no_piutang,no_selesai,no_tak) values "+
								"('"+this.app._userLog+"',"+i+",'"+this.app._lokasi+"','"+this.cb_vendor.getText()+"','"+this.cb_batch.getText()+"','"+line.nik+"','"+line.nama+"','"+line.loker+"','"+line.tgl_masuk+"','"+line.tgl_keluar+"','"+line.icdx+"','"+line.band+"','"+line.nikkes+"','"+line.pasien+"','"+line.dokter+"','"+kode_biaya+"','"+line.kode_keg+"','"+line.no_rujuk+"',"+nilai+","+pph+",'MEDREC','"+this.e_periode.getText()+"','-','-','-','-')");
					}
				}
				if (parseFloat(line.umum) != 0 || parseFloat(line.gigi) != 0 || parseFloat(line.kbia) != 0 || parseFloat(line.matkes) != 0 || parseFloat(line.cs) != 0) {
					sql.add("insert into yk_billkunj_tmp(no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,jenis,periode,no_kas,no_piutang,no_tak,no_selesai) values "+
							"('"+this.app._userLog+"',"+i+",'"+this.app._lokasi+"','"+this.cb_batch.getText()+"','"+line.nik+"','"+line.nama+"','"+line.loker+"','"+line.tgl_masuk+"','"+line.band+"','"+line.nikkes+"','"+line.pasien+"','"+line.dokter+"','"+line.kode_biaya+"','"+line.kode_keg+"','"+line.no_rujuk+"',"+line.umum+","+line.gigi+","+line.kbia+","+line.matkes+","+line.cs+",'MEDREC','"+this.e_periode.getText()+"','-','-','-','-')");
				}								
			}				
			this.dbLib.execArraySQL(sql);								
			this.doHitungGar();								
		}
		catch(e) {
			alert(e);
		}
	},
	doHitungGar: function(){
		this.sg2.clear();
		var strSQL = "select case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end as kode_akun,"+
					 "d.nama as nama_akun, '"+this.ppBPCC+"' as kode_pp,e.nama as nama_pp,case b.jenis when 'PEGAWAI' then c.kode_drkbp else c.kode_drkcc end as kode_drk,"+
					 "f.nama as nama_drk,"+
					 "sum(a.nilai) as nilai "+
					 "from yk_bill_tmp a "+
					 "inner join yk_loker bb on a.loker = bb.loker "+
					 "inner join cust b on bb.kode_cust = b.kode_cust and b.sts_gar='1' "+
					 "inner join yk_produk c on a.kode_produk=c.kode_produk "+
					 "inner join masakun d on (case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end) = d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					 "inner join pp e on e.kode_pp='"+this.ppBPCC+"' and e.kode_lokasi='"+this.app._lokasi+"' "+
					 "inner join drk f on f.kode_drk=(case b.jenis when 'PEGAWAI' then c.kode_drkbp else c.kode_drkcc end) and f.kode_lokasi='"+this.app._lokasi+"' and f.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					 "where a.loker<>'-' and b.jenis in ('PEGAWAI','PENSIUN') and a.no_bill = '"+this.app._userLog+"' "+
					 "group by f.nama,e.nama,d.nama,case b.jenis when 'PEGAWAI' then c.akun_bp else c.akun_cc end,case b.jenis when 'PEGAWAI' then c.kode_drkbp else c.kode_drkcc end "+
					 "order by d.kode_akun";				
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,"0",floatToNilai(line.nilai),"0"]);
			}
		} else this.sg2.clear(1);									
				
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(7,i));
				this.sg2.cells(8,i,floatToNilai(sls));
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.status == "SIMPAN") {
								if (this.preView == "1") {								
									this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
									this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.dataJU5 = {rs:{rows:[]}};
			this.sg1.clear(1); this.sg3.clear(1); this.sg2.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																						
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kunj,a.cs "+
		             "from yk_bill_m a "+					 					 
					 "where modul='INV' and jenis='MEDREC' and progress ='0' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
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
			this.sg3.appendData([line.no_bill,line.tgl,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.kunj),floatToNilai(line.cs)]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.keterangan,a.tanggal,a.nilai,a.kunj,a.cs,a.kode_vendor,a.no_dokumen from yk_bill_m a "+							 
							 "where a.no_bill = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.cb_batch.setSQL("select no_batch,keterangan from yk_harian_m where no_batch='"+line.no_dokumen+"' and kode_lokasi='"+this.app._lokasi+"'",["no_batch","keterangan"],false,["Bukti","Deskripsi"],"and","Data Batch",true);
						this.dp_d1.setText(line.tanggal);
						this.cb_vendor.setText(line.kode_vendor);
						this.cb_batch.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);												
						this.e_total.setText(floatToNilai(line.nilai));
						this.e_kunj.setText(floatToNilai(line.kunj));
						this.e_cs.setText(floatToNilai(line.cs));
					}
				}												
				var data = this.dbLib.getDataProvider("select a.nik,a.nama,a.hr_area as loker,a.band_posisi as band,a.nik_kes as nikkes,a.nama_pasien as pasien,a.nama_dokter1 as dokter, "+
						"convert(varchar,a.tgl_berobat1,111) as tgl_masuk, "+
						"convert(varchar,a.tgl_berobat2,111) as tgl_keluar, "+
						"a.diagnosa_kerja as icdx,substring(kode_produk,1,2) as kode_biaya,0 as kunj,0 as cs, "+
						"a.n1 as n1,a.n4 as n2,a.n2 as n3,a.n3 as n4,a.n5 as n5,a.n6 as n6,a.n9 as n7,a.n10 as n8, "+
						"a.n11 as n9,0 as n10,a.n12 as n11,a.n13 as n12,a.n14 as n13,a.n19 as n14,a.n20 as n15,0 as pph,a.umum,a.gigi,a.kbia,a.matkes,a.n22 as cs, "+
						"a.kode_keg,a.no_rujukan as no_rujuk "+
						"from yk_harian_d a "+
						"where no_batch='"+this.cb_batch.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;					
					this.sg1.clear();				
					this.selectPage(undefined, 1);
					this.sgn.setTotalPage(Math.ceil(this.dataJU.rs.rows.length / 20));
					this.sgn.rearrange();
					this.sgn.activePage = 0;					
				} else this.sg1.clear(1);													
				this.doValid();
				this.pc1.setActivePage(this.pc1.childPage[0]);												
			}									
		} catch(e) {alert(e);}
	}	
});