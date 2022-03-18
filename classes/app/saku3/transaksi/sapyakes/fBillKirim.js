window.app_saku3_transaksi_sapyakes_fBillKirim = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fBillKirim.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fBillKirim";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Billing TAK Kirim: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Kirim","List TAK"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","Modul","No Dokumen","Deskripsi","Lokasi Tujuan","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,160,300,150,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});								
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,10,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,10,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Keterangan", maxLength:150});				
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,17,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bTampil = new button(this.pc2.childPage[0],{bound:[540,17,80,18],caption:"Tampil Data",click:[this,"doTampil"]});							
		this.bJurnal = new button(this.pc2.childPage[0],{bound:[658,17,80,18],caption:"Jurnal",click:[this,"doJurnal"]});					
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,345], childPage:["Data Kirim","Detail Jurnal","Data Billing"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,
				colTitle:["Status","No Jurnal","Modul","Lokasi Tuj","Nilai"],
				colWidth:[[4,3,2,1,0],[100,100,100,150,80]],
				columnReadOnly:[true,[0,1,2,3,4],[]],
				colFormat:[[4],[cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				dblClick:[this,"doDoubleClick"],change:[this,"doChangeCell"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK","Nama DRK","Lokasi Tuj","Atensi","Kode Rek"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[80,80,80,150,80,80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,4,5,6,7,8,9,10],[3]],
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[910,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:16,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Loker","Lok Tagih","Band","NIKKES","Nama Pasien","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai BP","Nilai Kunj","Nilai CS"],
				colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,70,70,70,70,100,70,70,70,100,100,70,100,70]],
				colFormat:[[13,14,15],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager1"]});				
		
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
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPBPCC' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodepp = line.flag;
			} else this.kodepp = '-';			
			
			this.kodeCC = this.kodepp.substr(2,4);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fBillKirim.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fBillKirim.implement({
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
						sql.add("delete from takkirim_m where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from takkirim_j where no_kirim='"+this.e_nb.getText()+"' ");
						sql.add("delete from takkirim_bill where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("delete from yk_bill_tak where no_tak='"+this.e_nb.getText()+"' and kode_lokasal='"+this.app._lokasi+"'");
						sql.add("delete from yk_billkunj_tak where no_tak='"+this.e_nb.getText()+"' and kode_lokasal='"+this.app._lokasi+"'");
						sql.add("delete from yk_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_billkunj_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("update yk_bill_d set no_tak='-' where no_tak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update yk_billkunj_d set no_tak='-' where no_tak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
					}
					
					sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress,no_terima,due_date,no_app) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','BILKIRIM','KIRIM','IDR',1,"+nilaiToFloat(this.e_debet.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','X','-','-','-',getdate(),'"+this.app._userLog+"','"+this.lokTuj+"','0','-','"+this.dp_d1.getDateString()+"','-')");					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != "0"){
								sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.sg2.cells(9,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(8,i)+this.kodeCC+"','"+this.sg2.cells(6,i)+"','"+this.sg2.cells(8,i)+"','BILKIRIM','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");								
								
								if (this.sg2.cells(8,i) != this.app._lokasi && this.sg2.cells(5,i).substr(0,3) == "TAK") {
									sql.add("insert into takkirim_bill(no_kirim,kode_lokasi,periode,keterangan,akun_tak,nilai,nik_buat,nik_setuju,tgl_input,nik_user,kode_loktuj,progress,no_terima,dc,jenis) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','"+this.sg2.cells(8,i)+"','0','-','"+this.sg2.cells(2,i).toUpperCase()+"','"+this.sg2.cells(5,i)+"')");
								}																
							}
						}
					}					
					
					var nobill = nokunj = "";					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "BILL") {					
							nobill += ",'"+this.sg.cells(3,i)+this.sg.cells(1,i)+"'";					
						}
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "KJCS") {					
							nokunj += ",'"+this.sg.cells(3,i)+this.sg.cells(1,i)+"'";					
						}
					}			
					nobill = nobill.substr(1); if (nobill == "") nobill = "''";
					nokunj = nokunj.substr(1); if (nokunj == "") nokunj = "''";
					
					sql.add("update a set no_tak='"+this.e_nb.getText()+"' "+
					        "from yk_bill_d a "+
							"		inner join yk_loker bb on a.loker=bb.loker "+
							"		inner join cust c on bb.kode_cust=c.kode_cust and c.jenis = 'GROUP' "+
							"where c.kode_lokasi+a.no_hutang in ("+nobill+") and a.kode_lokasi ='"+this.app._lokasi+"' and a.no_hutang<>'-' and a.nilai>0 and c.kode_lokasi<>a.kode_lokasi and a.no_tak='-'");					
					sql.add("update a set no_tak='"+this.e_nb.getText()+"' "+
					        "from yk_billkunj_d a "+
							"		inner join yk_loker bb on a.loker=bb.loker "+
							"		inner join cust c on bb.kode_cust=c.kode_cust and c.jenis = 'GROUP' "+
							"where c.kode_lokasi+a.no_hutang in ("+nokunj+") and a.kode_lokasi ='"+this.app._lokasi+"' and a.no_hutang<>'-' and (a.umum+a.gigi+a.kbia+a.matkes+a.cs)>0 and c.kode_lokasi<>a.kode_lokasi and a.no_tak='-' ");	 
															
					
					sql.add("insert into yk_bill_tak (no_tak,no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,jenis,periode,no_hutang,no_piutang,no_selesai,kode_lokasal) "+
							"select '"+this.e_nb.getText()+"',a.no_bill,a.no_urut,b.kode_lokasi,a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker,a.tgl_masuk,a.tgl_keluar,a.icdx,a.band,a.nikkes,a.pasien,a.dokter,a.kode_produk,a.kode_keg,a.no_rujuk,a.nilai,a.pph,'TAKBP',a.periode,a.no_hutang,a.no_piutang,a.no_selesai,a.kode_lokasi "+
							"from yk_bill_d a "+
							"     inner join yk_loker bb on a.loker=bb.loker "+
							"     inner join cust b on bb.kode_cust=b.kode_cust "+
							"where a.no_tak='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.nilai>0");
					sql.add("insert into yk_billkunj_tak (no_tak,no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,jenis,periode,no_kas,no_piutang,no_selesai,no_hutang,kode_lokasal) "+
							"select '"+this.e_nb.getText()+"',a.no_bill,a.no_urut,b.kode_lokasi,a.no_ref,a.nik,a.nama,a.loker,a.tgl_masuk,a.band,a.nikkes,a.pasien,a.dokter,a.kode_produk,a.kode_keg,a.no_rujuk,a.umum,a.gigi,a.kbia,a.matkes,0,'TAKKJ',a.periode,a.no_kas,a.no_piutang,a.no_selesai,a.no_hutang,a.kode_lokasi "+
							"from yk_billkunj_d a "+
							"     inner join yk_loker bb on a.loker=bb.loker "+
							"     inner join cust b on bb.kode_cust=b.kode_cust "+
							"where a.no_tak='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and (a.umum+a.gigi+a.kbia+a.matkes)>0 ");
					sql.add("insert into yk_billkunj_tak (no_tak,no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,jenis,periode,no_kas,no_piutang,no_selesai,no_hutang,kode_lokasal) "+
							"select '"+this.e_nb.getText()+"',a.no_bill,a.no_urut,b.kode_lokasi,a.no_ref,a.nik,a.nama,a.loker,a.tgl_masuk,a.band,a.nikkes,a.pasien,a.dokter,a.kode_produk,a.kode_keg,a.no_rujuk,0,0,0,0,a.cs,'TAKCS',a.periode,a.no_kas,a.no_piutang,a.no_selesai,a.no_hutang,a.kode_lokasi "+
							"from yk_billkunj_d a "+
							"     inner join yk_loker bb on a.loker=bb.loker "+
							"     inner join cust b on bb.kode_cust=b.kode_cust "+
							"where a.no_tak='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.cs>0 ");
										
					//mengurangi 
					sql.add("insert into yk_bill_d (no_bill,no_tak,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,nilai,pph,jenis,periode,no_hutang,no_piutang,no_selesai,kode_lokasal) "+
							"select '"+this.e_nb.getText()+"',no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,tgl_masuk,tgl_keluar,icdx,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,-nilai,-pph,jenis,'"+this.e_periode.getText()+"','"+this.e_nb.getText()+"',no_piutang,no_selesai,kode_lokasi "+
							"from yk_bill_d "+
							"where no_tak='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and nilai>0");
					sql.add("insert into yk_billkunj_d (no_bill,no_tak,no_urut,kode_lokasi,no_ref,nik,nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,umum,gigi,kbia,matkes,cs,jenis,periode,no_kas,no_piutang,no_selesai,no_hutang,kode_lokasal) "+
							"select '"+this.e_nb.getText()+"',no_bill,no_urut,kode_lokasi,no_ref,nik,a.nama,loker,tgl_masuk,band,nikkes,pasien,dokter,kode_produk,kode_keg,no_rujuk,-umum,-gigi,-kbia,-matkes,-cs,jenis,'"+this.e_periode.getText()+"',no_kas,no_piutang,no_selesai,'"+this.e_nb.getText()+"',kode_lokasi "+
							"from yk_billkunj_d a "+							
							"where no_tak='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and (umum+gigi+kbia+matkes+cs)>0 ");
																							
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
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :					
			case "ubah" :					
				this.lokTuj = "";
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {					
						this.lokTuj = this.sg.cells(3,i);
						break;
					}				
				}							
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
						if (this.lokTuj != this.sg.cells(3,i)) {
							system.alert(this,"Transaksi tidak valid.","Approve hanya untuk satu kode lokasi tujuan.");
							return false;
						}
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from takkirim_m where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takkirim_j where no_kirim='"+this.e_nb.getText()+"'");
					sql.add("delete from takkirim_bill where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from yk_bill_tak where no_tak='"+this.e_nb.getText()+"' and kode_lokasal='"+this.app._lokasi+"'");
					sql.add("delete from yk_billkunj_tak where no_tak='"+this.e_nb.getText()+"' and kode_lokasal='"+this.app._lokasi+"'");
					sql.add("delete from yk_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_billkunj_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update yk_bill_d set no_tak='-' where no_tak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_billkunj_d set no_tak='-' where no_tak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
			var strSQL = "select a.no_hutang,'BILL' as modul,c.kode_lokasi,sum(a.nilai) as nilai "+
						 "from yk_bill_d a "+
						 "inner join yk_loker bb on a.loker=bb.loker "+
						 "inner join cust c on bb.kode_cust=c.kode_cust and c.jenis = 'GROUP' "+ 
						 "where a.jenis <> 'AKRU' and a.kode_lokasi ='"+this.app._lokasi+"' and a.periode <='"+this.e_periode.getText()+"' and a.no_hutang<>'-' and a.nilai>0 "+
						 "and c.kode_lokasi<>a.kode_lokasi and a.no_tak='-' "+
						 "group by a.no_hutang,c.kode_lokasi "+						 
						 "union all "+
						 
						 "select a.no_hutang,'KJCS' as modul,c.kode_lokasi,sum(a.umum+a.gigi+a.kbia+a.matkes-a.cs) as nilai "+
						 "from yk_billkunj_d a "+
						 "inner join yk_loker bb on a.loker=bb.loker "+
						 "inner join cust c on bb.kode_cust=c.kode_cust and c.jenis = 'GROUP' "+ 
						 "where a.jenis <> 'AKRU' and a.kode_lokasi ='"+this.app._lokasi+"' and a.periode <='"+this.e_periode.getText()+"' and a.no_hutang<>'-' and (a.umum+a.gigi+a.kbia+a.matkes+a.cs) > 0 "+
						 "and c.kode_lokasi<>a.kode_lokasi and a.no_tak='-' "+
						 "group by a.no_hutang,c.kode_lokasi "+						 
						 
						 "order by a.no_hutang";
						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_hutang,line.modul.toUpperCase(),line.kode_lokasi,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else system.alert(this,"Data tidak valid.","Periode harus diisi.");
	},
	doJurnal:function(sender){		
		try {
			this.lokTuj = "";
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {					
					this.lokTuj = this.sg.cells(3,i);
					break;
				}				
			}			
			var nobill = nokunj = "";					
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "BILL") {					
					nobill += ",'"+this.sg.cells(3,i)+this.sg.cells(1,i)+"'";					
					if (this.lokTuj != this.sg.cells(3,i)) {
						system.alert(this,"Transaksi tidak valid.","Approve hanya untuk satu kode lokasi tujuan.");
						return false;
					}
				}
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(2,i) == "KJCS") {					
					nokunj += ",'"+this.sg.cells(3,i)+this.sg.cells(1,i)+"'";					
					if (this.lokTuj != this.sg.cells(3,i)) {
						system.alert(this,"Transaksi tidak valid.","Approve hanya untuk satu kode lokasi tujuan.");
						return false;
					}
				}
			}			
			nobill = nobill.substr(1); if (nobill == "") nobill = "''";
			nokunj = nokunj.substr(1); if (nokunj == "") nokunj = "''";
			
			var strSQL = /*
						 "select 'TAK PIUTANG PENGOBATAN ' as ket,c.akun_takbp as kode_akun,d.nama as nama_akun,'D' as dc, "+
						 "sum(a.nilai) as nilai,'TAKBILL' as jenis, '-' as kode_drk,'-' as nama_drk,b.kode_lokasi as loktuj "+
						 ",b.kode_sap as atensi, b.kode_rek "+
						 "from yk_bill_d a "+
						 "                 inner join yk_loker bb on a.loker=bb.loker "+
						 "                 inner join cust b on bb.kode_cust=b.kode_cust and b.jenis = 'GROUP' "+
						 "		 	       inner join yk_produk c on a.kode_produk=c.kode_produk "+
						 "		 	       inner join masakun d on c.akun_takbp=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						 "where b.kode_lokasi<>a.kode_lokasi and a.no_tak='-' and a.nilai<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi+a.no_hutang in ("+nobill+") "+
						 "group by b.kode_lokasi,c.akun_takbp,d.nama "+
						 ",b.kode_sap, b.kode_rek "+
						 
						 "union all "+
						 
						 "select 'TAK PIUTANG KUNJUNGAN ' as ket,c.akun_takbp as kode_akun,d.nama as nama_akun,'D' as dc, "+
						 "sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai,'TAKKJ' as jenis, '-' as kode_drk,'-' as nama_drk,b.kode_lokasi as loktuj "+
						 ",b.kode_sap as atensi, b.kode_rek "+ 
						 "from yk_billkunj_d a "+
						 "                 inner join yk_loker bb on a.loker=bb.loker "+
						 "                 inner join cust b on bb.kode_cust=b.kode_cust and b.jenis = 'GROUP' "+
						 "		 	       inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	       inner join masakun d on c.akun_takbp=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+						 
						 "where b.kode_lokasi<>a.kode_lokasi and a.no_tak='-' and (a.umum+a.gigi+a.kbia+a.matkes)<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi+a.no_hutang in ("+nokunj+") "+
						 "group by b.kode_lokasi,c.akun_takbp,d.nama "+
						 ",b.kode_sap, b.kode_rek "+
						 
						 "union all "+						 
						 
						 "select 'TAK COST SHARING ' as ket,c.akun_takbp as kode_akun,d.nama as nama_akun,'C' as dc, "+
						 "sum(a.cs) as nilai,'TAKCS' as jenis, '-' as kode_drk,'-' as nama_drk,b.kode_lokasi as loktuj "+
						 ",b.kode_sap as atensi, b.kode_rek "+
						 "from yk_billkunj_d a "+
						 "                 inner join yk_loker bb on a.loker=bb.loker "+
						 "                 inner join cust b on bb.kode_cust=b.kode_cust and b.jenis = 'GROUP' "+
						 "		 	       inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	       inner join masakun d on c.akun_takbp=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+						 
						 "where b.kode_lokasi<>a.kode_lokasi and a.no_tak='-' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi+a.no_hutang in ("+nokunj+") "+
						 "group by b.kode_lokasi,c.akun_takbp,d.nama "+
						 ",b.kode_sap, b.kode_rek "+
						 */
						 
						 //debet
						 
						 "select 'TAK PIU '+d.nama as ket,c.akun_ap as kode_akun,d.nama as nama_akun,'D' as dc, "+
						 "sum(a.nilai) as nilai,'TAKBILL' as jenis, c.kode_drkbp as kode_drk,e.nama as nama_drk,b.kode_lokasi as loktuj "+
						 ",b.kode_sap as atensi, b.kode_rek "+
						 "from yk_bill_d a "+
						 "                 inner join yk_loker bb on a.loker=bb.loker "+
						 "                 inner join cust b on bb.kode_cust=b.kode_cust and b.jenis = 'GROUP' "+
						 "		 	       inner join yk_produk c on a.kode_produk=c.kode_produk "+
						 "		 	       inner join masakun d on c.akun_ap=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						 "		 	       inner join drk e on c.kode_drkbp=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where b.kode_lokasi<>a.kode_lokasi and a.no_tak='-' and a.nilai<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi+a.no_hutang in ("+nobill+") "+
						 "group by b.kode_lokasi,d.nama,c.akun_ap,d.nama,c.kode_drkbp,e.nama "+
						 ",b.kode_sap, b.kode_rek "+
						 
						 "union all "+						 
						 
						 "select 'TAK PIUKJ '+d.nama as ket,c.akun_pap as kode_akun,d.nama as nama_akun,'D' as dc, "+
						 "sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai,'TAKKJ' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk,b.kode_lokasi as loktuj "+
						 ",b.kode_sap as atensi, b.kode_rek "+
						 "from yk_billkunj_d a "+
						 "                 inner join yk_loker bb on a.loker=bb.loker "+
						 "                 inner join cust b on bb.kode_cust=b.kode_cust and b.jenis = 'GROUP' "+
						 "		 	       inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	       inner join masakun d on c.akun_pap=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						 "		 	       inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where b.kode_lokasi<>a.kode_lokasi and a.no_tak='-' and (a.umum+a.gigi+a.kbia+a.matkes)<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi+a.no_hutang in ("+nokunj+") "+
						 "group by b.kode_lokasi,d.nama,c.akun_pap,d.nama,c.drk_kunj,e.nama "+
						 ",b.kode_sap, b.kode_rek "+
						 
						 "union all "+
						 
						 "select 'TAK COST SHARING ' as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'C' as dc, "+
						 "sum(a.cs) as nilai,'TAKCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk,b.kode_lokasi as loktuj "+
						 ",b.kode_sap as atensi, b.kode_rek "+
						 "from yk_billkunj_d a "+
						 "                 inner join yk_loker bb on a.loker=bb.loker "+
						 "                 inner join cust b on bb.kode_cust=b.kode_cust and b.jenis = 'GROUP' "+
						 "		 	       inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	       inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+						 
						 "		 	       inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where b.kode_lokasi<>a.kode_lokasi and a.no_tak='-' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi+a.no_hutang in ("+nokunj+") "+
						 "group by b.kode_lokasi,c.nama,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
						 ",b.kode_sap, b.kode_rek "+
						 
						 
						 //kredit
						 "union all "+						 
						 
						 "select 'TAK PIU '+d.nama as ket,c.akun_ap as kode_akun,d.nama as nama_akun,'C' as dc, "+
						 "sum(a.nilai) as nilai,'R-BILL' as jenis, c.kode_drkbp as kode_drk,e.nama as nama_drk,a.kode_lokasi as loktuj "+
						 ",b.kode_sap as atensi, b.kode_rek "+
						 "from yk_bill_d a "+
						 "                 inner join yk_loker bb on a.loker=bb.loker "+
						 "                 inner join cust b on bb.kode_cust=b.kode_cust and b.jenis = 'GROUP' "+
						 "		 	       inner join yk_produk c on a.kode_produk=c.kode_produk "+
						 "		 	       inner join masakun d on c.akun_ap=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						 "		 	       inner join drk e on c.kode_drkbp=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where b.kode_lokasi<>a.kode_lokasi and a.no_tak='-' and a.nilai<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi+a.no_hutang in ("+nobill+") "+
						 "group by a.kode_lokasi,d.nama,c.akun_ap,d.nama,c.kode_drkbp,e.nama "+
						 ",b.kode_sap, b.kode_rek "+
						 
						 "union all "+						 
						 
						 "select 'TAK PIUKJ '+d.nama as ket,c.akun_pap as kode_akun,d.nama as nama_akun,'C' as dc, "+
						 "sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai,'R-KJUM' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk,a.kode_lokasi as loktuj "+
						 ",b.kode_sap as atensi, b.kode_rek "+
						 "from yk_billkunj_d a "+
						 "                 inner join yk_loker bb on a.loker=bb.loker "+
						 "                 inner join cust b on bb.kode_cust=b.kode_cust and b.jenis = 'GROUP' "+
						 "		 	       inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	       inner join masakun d on c.akun_pap=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						 "		 	       inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where b.kode_lokasi<>a.kode_lokasi and a.no_tak='-' and (a.umum+a.gigi+a.kbia+a.matkes)<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi+a.no_hutang in ("+nokunj+") "+
						 "group by a.kode_lokasi,d.nama,c.akun_pap,d.nama,c.drk_kunj,e.nama "+
						 ",b.kode_sap, b.kode_rek "+
						 
						 "union all "+
						 
						 "select 'TAK COST SHARING ' as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'D' as dc, "+
						 "sum(a.cs) as nilai,'R-PIUCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk,a.kode_lokasi as loktuj "+
						 ",b.kode_sap as atensi, b.kode_rek "+
						 "from yk_billkunj_d a "+
						 "                 inner join yk_loker bb on a.loker=bb.loker "+
						 "                 inner join cust b on bb.kode_cust=b.kode_cust and b.jenis = 'GROUP' "+
						 "		 	       inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						 "		 	       inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+						 
						 "		 	       inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun='"+this.e_periode.getText().substr(0,4)+"' "+						
						 "where b.kode_lokasi<>a.kode_lokasi and a.no_tak='-' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi+a.no_hutang in ("+nokunj+") "+
						 "group by a.kode_lokasi,c.nama,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
						 ",b.kode_sap, b.kode_rek "+
						 
						 "order by dc desc,kode_akun";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk,line.nama_drk,line.loktuj,line.atensi,line.kode_rek]);
				}
			}
			this.sg2.validasi();								
			this.pc1.setActivePage(this.pc1.childPage[1]);
						
		}
		catch(e) {
			systemAPI.alert("step : "+step+"; error = "+e);
		}
	},	
	doClick:function(sender){
		try {
			if (sender == this.i_gen) {
				if (this.stsSimpan == 0) {									
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
					this.e_debet.setText("0");
					this.e_kredit.setText("0");
					this.bTampil.show();				
					this.bJurnal.show();
				}				
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takkirim_m","no_kirim",this.app._lokasi+"-BLK"+this.e_periode.getText().substr(2,4)+".","0000"));
				this.e_dok.setFocus();
				this.stsSimpan = 1;			
				setTipeButton(tbSimpan);									
			}				
		}
		catch(e) {
			alert(e);
		}
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
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
								this.nama_report="server_report_saku3_gl_rptJuJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_kirim,convert(varchar,a.tanggal,103) as tgl,a.modul,a.no_dokumen,a.keterangan,a.kode_loktuj+' - '+b.nama as lokasi,a.nilai "+
		             "from takkirim_m a inner join lokasi b on a.kode_loktuj=b.kode_lokasi "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'BILKIRIM' and a.posted ='X' and a.no_terima='-' and progress='0' ";		
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
			this.sg3.appendData([line.no_kirim,line.tgl,line.modul,line.no_dokumen,line.keterangan,line.lokasi,floatToNilai(line.nilai)]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));
				this.bTampil.hide();				
				this.bJurnal.hide();
				
				var strSQL = "select keterangan,no_dokumen,tanggal,nik_setuju "+
							 "from takkirim_m "+							 
							 "where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);											
					}
				}												
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.jenis,a.kode_lokasi as kode_loktuj,isnull(a.no_dokumen,'-') as kode_cust,isnull(xx.kode_rek,'-') as kode_rek "+
							"from takkirim_j a inner join takkirim_m bb on a.no_kirim=bb.no_kirim  "+							
							"                  inner join masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='99' "+
							"                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and c.kode_lokasi <> '00' "+
							"				   left join cust xx on a.no_dokumen=xx.kode_cust "+													
							"                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
							"where a.no_kirim = '"+this.e_nb.getText()+"'  order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.jenis,line.kode_drk,line.nama_drk,line.kode_loktuj,line.kode_cust,line.kode_rek]);
					}
				} else this.sg2.clear(1);			
								
				var strSQL = "select a.no_hutang,'BILL' as modul,c.kode_lokasi,sum(a.nilai) as nilai "+
							 "from yk_bill_d a "+
							 //"inner join yk_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
							 "inner join yk_loker bb on a.loker=bb.loker "+
							 "inner join cust c on bb.kode_cust=c.kode_cust and c.jenis = 'GROUP' "+ 
							 "where a.no_tak='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							 "group by a.no_hutang,c.kode_lokasi "+						 
							 "union all "+							 
							 "select a.no_hutang,'KJCS' as modul,c.kode_lokasi,sum(a.umum+a.gigi+a.kbia+a.matkes-a.cs) as nilai "+
							 "from yk_billkunj_d a "+
							 //"inner join yk_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
							 "inner join yk_loker bb on a.loker=bb.loker "+
							 "inner join cust c on bb.kode_cust=c.kode_cust and c.jenis = 'GROUP' "+ 
							 "where a.no_tak='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							 "group by a.no_hutang,c.kode_lokasi "+						 							 
							 "order by a.no_hutang";
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["APP",line.no_hutang,line.modul.toUpperCase(),line.kode_lokasi,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);					
			}									
		} catch(e) {alert(e);}
	},		
	doDoubleClick: function(sender, col , row) {		
		if (this.sg.cells(1,row) != "") {					
			if (this.sg.cells(2,row) == "BILL") {
				var strSQL = "select a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_keluar,103) as tgl_keluar,a.icdx,a.kode_produk,a.nilai,0 as nilai_kunj,0 as nilai_cs "+
			             "from yk_bill_d a "+
						 "inner join yk_loker bb on a.loker=bb.loker "+
						 "inner join cust b on bb.kode_cust=b.kode_cust "+
						 "where a.jenis <> 'AKRU' and a.kode_lokasi ='"+this.app._lokasi+"' and a.periode <='"+this.e_periode.getText()+"' and a.no_hutang='"+this.sg.cells(1,row)+"' and a.nilai>0 "+
						 "and b.kode_lokasi='"+this.sg.cells(3,row)+"' and a.no_tak='-' ";
			}
			else {
				var strSQL = "select '-' as kode_vendor,a.no_ref,a.nik,a.nama,a.loker,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_masuk,103) as tgl_keluar,'-' as icdx,a.kode_produk,0 as nilai,a.umum+a.gigi+a.kbia+a.matkes as nilai_kunj,a.cs as nilai_cs "+
			             "from yk_billkunj_d a "+
						 "inner join yk_loker bb on a.loker=bb.loker "+
						 "inner join cust b on bb.kode_cust=b.kode_cust "+
						 "where a.jenis <> 'AKRU' and a.kode_lokasi ='"+this.app._lokasi+"' and a.periode <='"+this.e_periode.getText()+"' and a.no_hutang='"+this.sg.cells(1,row)+"' and (a.umum+a.gigi+a.kbia+a.matkes+a.cs) > 0 "+
						 "and b.kode_lokasi='"+this.sg.cells(3,row)+"' and a.no_tak='-' ";
			}
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU1 = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData1(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[2]);
		} 
	},	
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];									
			this.sg1.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_produk,floatToNilai(line.nilai),floatToNilai(line.nilai_kunj),floatToNilai(line.nilai_cs)]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	}
});