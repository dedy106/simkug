window.app_saku2_transaksi_aka_aka2_fBatalRekonMulti19 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fBatalRekonMulti19.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fBatalRekonMulti19";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Rekon per Invoice [Multi]", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_bpp = new saiLabelEdit(this,{bound:[800,11,200,20],caption:"Ni. Koreksi BPP", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Rekon",maxLength:30,readOnly:true});		
		this.e_sdp2 = new saiLabelEdit(this,{bound:[800,12,200,20],caption:"Ni. Koreksi SDP2", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nbtak = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"No TAK",maxLength:30,readOnly:true});
		this.e_up3 = new saiLabelEdit(this,{bound:[800,13,200,20],caption:"Ni. Koreksi UP3", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_lokasi = new saiCBBL(this,{bound:[20,14,220,20],caption:"Lokasi Tujuan", multiSelection:false, maxLength:10, tag:2 });
		this.e_sks = new saiLabelEdit(this,{bound:[800,14,200,20],caption:"Ni. Koreksi SKS", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});							
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_asur = new saiLabelEdit(this,{bound:[800,17,200,20],caption:"Ni. Kor. Asuransi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_titip = new saiCBBL(this,{bound:[20,18,220,20],caption:"Akun PDD", multiSelection:false, maxLength:10, tag:2 });
		this.e_perpus = new saiLabelEdit(this,{bound:[800,18,200,20],caption:"Ni. Koreksi Perpus", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_tak = new saiCBBL(this,{bound:[20,19,220,20],caption:"Akun TAK", multiSelection:false, maxLength:10, tag:2 });		
		this.e_denda = new saiLabelEdit(this,{bound:[800,19,200,20],caption:"Ni. Koreksi Denda", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });		
		this.e_status = new saiLabelEdit(this,{bound:[800,16,200,20],caption:"Ni. Kor, UStatus", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.cb_app = new saiCBBL(this,{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_bea = new saiLabelEdit(this,{bound:[800,17,200,20],caption:"Ni. Koreksi Bea", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bLoad = new button(this,{bound:[590,17,80,20],caption:"Refresh Data",click:[this,"doLoad"]});			
		this.bValid = new button(this,{bound:[700,17,80,20],caption:"Valid Data",click:[this,"doValid"]});			

		this.pc2 = new pageControl(this,{bound:[10,10,1000,260], childPage:["Data Invoice","Error Msg","Simulasi Jurnal"]});		
		this.sg2 = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:33,tag:9,
						colTitle:["NIM","ThnAka","Ni. Beasiswa","Tot Rekon",  //3										  
						          "Rekon BPP","Rekon SDP2","Rekon UP3","Rekon SKS","Rekon ASUR","Rekon PERPUS","Rekon DENDA","Rekon USTATUS",  //11
								  "Invoice","Ni TagihLama","Ni BeaLama", //14
								  "Rekon BPPLama","Rekon SDP2Lama","Rekon UP3Lama","Rekon SKSLama","Rek ASURLama","Rek PERPUSLama","Rek DENDALama","Rek USTATUSLama", //22
								  "Akun Piutang","KodePP", //24
								  "Bill BPP","Bill SDP2","Bill UP3","Bill SKS","Bill ASUR","Bill PERPUS","Bill DENDA","Bill USTATUS"],  //32											
						colWidth:[[32,31,30,29,28,27,26,25, 24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100  ,80,80, 100,100,100,100,100,100,100,100, 80,80,180, 100,100,100,100,100,100,100,100, 100,100,50,100]],autoAppend:false,
						colFormat:[[2,3, 4,5,6,7,8,9,10,11, 13,14,15,16,17,18,19,20,21,22,  25,26,27,28,29,30,31,32],[cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
						pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
						dblClick:[this,"doDoubleClick"],						
						readOnly:true, defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		
		
		this.sg3 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:2,tag:9,
						colTitle:["Baris INVALID","Keterangan"],
						colWidth:[[1,0],[400,200]],autoAppend:false,
						readOnly:true, defaultRow:1
		});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg3, pager:[this,"doPage3"]});		

		this.sg4 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,650,this.pc2.height-33],colCount:5,tag:9,
						colTitle:["Kode Akun","DC","No Invoice","Nilai","Kode PP"],
						colWidth:[[4,3,2,1,0],[100,100,250,50,100]],					
						readOnly:true,colFormat:[[3],[cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4});
		
		this.sg5 = new saiGrid(this.pc2.childPage[2],{bound:[61,65,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9, visible:false,
					colTitle:["Kode Akun","DC","Nilai","Kode PP"],
					colWidth:[[3,2,1,0],[100,100,100,100]],					
					readOnly:true,colFormat:[[2],[cfNilai]],autoAppend:true,defaultRow:1});
		
		this.rearrangeChild(10, 23);

		this.e_inv = new saiLabelEdit(this.pc2.childPage[2],{bound:[680,10,250,20],caption:"No Inv Like",tag:9});				
		this.i_jurnal = new portalui_imageButton(this.pc2.childPage[2],{bound:[935,10,20,20],hint:"Lihat Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doJurnal"]});

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
			this.status = "";
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi not in ('"+this.app._lokasi+"','"+this.app._kodeLokasiKonsol+"')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);		
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_tak.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='016' "+
			                    "where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun TAK",true);			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro='KBTTP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_titip.setText(line.flag,line.nama);
			} else this.cb_titip.setText("","");		

			this.cb_tak.setText("3311101");
			this.cb_lokasi.setText("03");

			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");

			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='ARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			var sql = new server_util_arrayList();
			sql.add(
				"select distinct substring(kode_produk,1,3) as kode_produk,akun_piutang from aka_produk "+
				"where kode_produk like 'BPP%' and kode_lokasi ='"+this.app._lokasi+"' "+
				"union "+
				"select distinct kode_produk,akun_piutang from aka_produk "+
				"where kode_produk not like 'BPP%' and kode_lokasi ='"+this.app._lokasi+"' ");												
			this.dbLib.getMultiDataProviderA(sql);

			this.bValid.setEnabled(false);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_aka2_fBatalRekonMulti19.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fBatalRekonMulti19.implement({
	doJurnal: function() {	
		if (this.e_inv.getText() != "") {			
			this.pc2.setActivePage(this.pc2.childPage[2]);																	
			var data = this.dbLib.getDataProvider("select * from aka_batal_rekon_j_tmp where no_inv like '"+this.e_inv.getText()+"' and nilai <>0",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																		
					this.sg4.appendData([line.kode_akun,line.dc,line.no_inv,floatToNilai(line.nilai),line.kode_pp]);
				}
			} 
			else this.sg4.clear(1);			
		}
	},
	doAfterPaste: function(sender,totalRow){
		try {
			this.bValid.setEnabled(false);
			this.sgn2.setTotalPage(sender.getTotalPage());
			this.sgn2.rearrange();	
		} catch(e) {alert(e);}
	},
	doPage2: function(sender,page){
		this.sg2.doSelectPage(page);
	},	
	doLoad: function() {				
		try {
			if (this.cb_titip.getText()== "" || this.cb_tak.getText()== "") {
				system.alert(this,"Akun Titipan dan Akun TAK harap diisi."," ");
				return false;
			}

			this.status = "LOAD";
			uses("server_util_arrayList");	
			var sql = new server_util_arrayList();												
			sql.add("delete from aka_batal_rekon_tmp");
			sql.add("delete from aka_batal_rekon_j_tmp");		
			this.dbLib.execQuerySync(sql);	
			
			this.sg4.clear(1);
			for (var i=0;i < this.sg2.getRowCount();i++){
				for (var j=4;j < 33;j++){					
					this.sg2.cells(j,i,"0");
				}
				sql.add("insert into aka_batal_rekon_tmp (nim,thnaka,ni_bea,tot_rekon, rek_bpp, rek_sdp2, rek_up3, rek_sks, rek_asur, rek_perpus, rek_denda, rek_ustatus) values('"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+","+nilaiToFloat(this.sg2.cells(3,i))+", 0, 0, 0, 0, 0, 0, 0, 0 ) ");			
			}
			this.dbLib.execArraySQL(sql);	
			this.bValid.setEnabled(true);										
		}
		catch(e) {
			alert(e);
		}			
	},

	doValid: function() {			
	try {		
		var sql = "call sp_aka_batalrekon ('"+this.app._lokasi+"')";								
		this.dbLib.execQuerySync(sql);	

		var data = this.dbLib.getDataProvider("select * from aka_batal_rekon_tmp",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;		
			this.sg2.clear();			
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg2.appendData([line.nim,line.thnaka,floatToNilai(line.ni_bea),floatToNilai(line.tot_rekon),								
							floatToNilai(line.rek_bpp),floatToNilai(line.rek_sdp2),floatToNilai(line.rek_up3),floatToNilai(line.rek_sks),floatToNilai(line.rek_asur),floatToNilai(line.rek_perpus),floatToNilai(line.rek_denda),floatToNilai(line.rek_ustatus),
							line.no_inv,floatToNilai(line.bill_lama),floatToNilai(line.bea_lama),floatToNilai(line.rek_bpplama),floatToNilai(line.rek_sdp2lama),floatToNilai(line.rek_up3lama),floatToNilai(line.rek_skslama),floatToNilai(line.rek_asurlama),floatToNilai(line.rek_perpuslama),floatToNilai(line.rek_dendalama),floatToNilai(line.rek_ustatuslama),
							'-',line.kode_pp,
							floatToNilai(line.bill_bpp),floatToNilai(line.bill_sdp2),floatToNilai(line.bill_up3),floatToNilai(line.bill_sks),floatToNilai(line.bill_asur),floatToNilai(line.bill_perpus),floatToNilai(line.bill_denda),floatToNilai(line.bill_ustatus)]);						
			}
		} 
		else this.sg2.clear(1);

		this.inValid = false;
		var data = this.dbLib.getDataProvider("select count(*) as jml_invalid from aka_batal_rekon_tmp where no_inv like 'INVALID%'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				if (line.jml_invalid != 0) this.inValid = true;
			} 
		}

		if (this.inValid == false) {			
			setTipeButton(tbSimpan);
		
			var strSQL = "select  "+
						"sum(rek_bpp - rek_bpplama) as sls_bpp, "+
						"sum(rek_sdp2 - rek_sdp2lama) as sls_sdp2, "+
						"sum(rek_up3 - rek_up3lama) as sls_up3, "+
						"sum(rek_sks - rek_skslama) as sls_sks, "+
						"sum(rek_asur - rek_asurlama) as sls_asur, "+
						"sum(rek_perpus - rek_perpuslama) as sls_perpus, "+
						"sum(rek_denda - rek_dendalama) as sls_denda, "+
						"sum(rek_ustatus - rek_ustatuslama) as sls_ustatus, "+ 
						"sum(ni_bea - bea_lama) as sls_bea "+
						"from aka_batal_rekon_tmp "+
						"where no_inv not like 'INVALID%' ";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_bpp.setText(floatToNilai(line.sls_bpp));
					this.e_sdp2.setText(floatToNilai(line.sls_sdp2));
					this.e_up3.setText(floatToNilai(line.sls_up3));
					this.e_sks.setText(floatToNilai(line.sls_sks));
					this.e_asur.setText(floatToNilai(line.sls_asur));
					this.e_perpus.setText(floatToNilai(line.sls_perpus));
					this.e_denda.setText(floatToNilai(line.sls_denda));
					this.e_status.setText(floatToNilai(line.sls_ustatus));
					this.e_bea.setText(floatToNilai(line.sls_bea));
				} 
			}


		}
		else {
			this.pc2.setActivePage(this.pc2.childPage[1]);	
			this.sg3.clear();
			for (var i=0; i < this.sg2.getRowCount();i++) {
				if (this.sg2.cells(12,i).substr(0,7) == "INVALID") {
					var j = i+1;
					if (this.sg2.cells(12,i) == "INVALID-BILL") var desk = "NIM/THNAKA tidak terdaftar";
					if (this.sg2.cells(12,i) == "INVALID-BEA") var desk = "Kolom Nilai Beasiswa Baru melebihi Total Tagihan Lama";						
					this.sg3.appendData([j,desk]);						
				}
			}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					
					//rekon bayar
					this.nbRekon = "-";
					var totPDD = nilaiToFloat(this.e_bpp.getText()) + nilaiToFloat(this.e_sdp2.getText()) + nilaiToFloat(this.e_up3.getText()) + nilaiToFloat(this.e_sks.getText()) +
								 nilaiToFloat(this.e_asur.getText()) + nilaiToFloat(this.e_perpus.getText()) + nilaiToFloat(this.e_denda.getText()) + nilaiToFloat(this.e_status.getText());

					if (totPDD != 0) {
						this.nbRekon = this.e_nb.getText();						
						sql.add("insert into aka_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+totPDD+",'F','BTLREKON','"+this.cb_titip.getText()+"','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
						
						sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
								"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,kode_akun,'"+this.e_ket.getText()+"',dc,nilai,kode_pp,'-','"+this.app._lokasi+"','BTLREKON','NONTAK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from aka_batal_rekon_j_tmp where kode_akun <> 'TAKBEA' ");

						sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
								"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,'-','"+this.app._lokasi+"','BTLREKON','NONTAK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from aka_batal_rekon_j_tmp where kode_akun <> 'TAKBEA' ");
					}

					//------------- TAK BEA ---------------
					//beasiswa
					if (this.e_bea.getText() != "0") {
						if (nilaiToFloat(this.e_bea.getText()) < 0) {
							var dcPDD = "D";
							var dcTAK = "C";
						}
						else {
							var dcPDD = "C";
							var dcTAK = "D";
						}
						//jurnal tak gelondongan saja
						sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress,no_terima,due_date) values "+
										"('"+this.e_nbtak.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.nbRekon+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','TAKBEA','KIRIM','IDR',1,"+Math.abs(nilaiToFloat(this.e_bea.getText()))+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F','-','"+this.cb_titip.getText()+"','"+this.cb_tak.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','0','-','"+this.dp_d1.getDateString()+"')");		

						sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nbtak.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_tak.getText()+"','"+this.e_ket.getText()+"','"+dcTAK+"',"+Math.abs(nilaiToFloat(this.e_bea.getText()))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKBEA','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");															
						sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nbtak.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','"+dcPDD+"',"+Math.abs(nilaiToFloat(this.e_bea.getText()))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKBEA','PDD','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");																							
					}

					//bpp
					sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
							"select '"+this.e_nb.getText()+"',a.nim,a.no_inv,'"+this.e_periode.getText()+"',abs(a.rek_bpp-a.rek_bpplama),'"+this.app._lokasi+"','"+this.cb_titip.getText()+"',b.akun_piutang,b.kode_produk,case when a.rek_bpp-a.rek_bpplama > 0 then 'D' else 'C' end,'BTLREKON','-' "+
							"from aka_batal_rekon_tmp a inner join aka_bill_d b on a.no_inv=b.no_inv and b.kode_produk like 'BPP%' and b.dc='D' and b.modul='BILLOAD' "+							
							"where a.no_inv not like 'INVALID%' and (a.rek_bpp-a.rek_bpplama)<>0");
					//sdp2
					sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
							"select '"+this.e_nb.getText()+"',a.nim,a.no_inv,'"+this.e_periode.getText()+"',abs(a.rek_sdp2-a.rek_sdp2lama),'"+this.app._lokasi+"','"+this.cb_titip.getText()+"',b.akun_piutang,'SDP2',case when a.rek_sdp2-a.rek_sdp2lama > 0 then 'D' else 'C' end,'BTLREKON','-' "+
							"from aka_batal_rekon_tmp a inner join aka_bill_d b on a.no_inv=b.no_inv and b.kode_produk = 'SDP2' and b.dc='D' and b.modul='BILLOAD' "+							
							"where a.no_inv not like 'INVALID%' and (a.rek_sdp2-a.rek_sdp2lama)<>0");
					//up3
					sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
							"select '"+this.e_nb.getText()+"',a.nim,a.no_inv,'"+this.e_periode.getText()+"',abs(a.rek_up3-a.rek_up3lama),'"+this.app._lokasi+"','"+this.cb_titip.getText()+"',b.akun_piutang,'UP3',case when a.rek_up3-a.rek_up3lama > 0 then 'D' else 'C' end,'BTLREKON','-' "+
							"from aka_batal_rekon_tmp a inner join aka_bill_d b on a.no_inv=b.no_inv and b.kode_produk = 'UP3' and b.dc='D' and b.modul='BILLOAD' "+							
							"where a.no_inv not like 'INVALID%' and (a.rek_up3-a.rek_up3lama)<>0");		
					//sks
					sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
							"select '"+this.e_nb.getText()+"',a.nim,a.no_inv,'"+this.e_periode.getText()+"',abs(a.rek_sks-a.rek_skslama),'"+this.app._lokasi+"','"+this.cb_titip.getText()+"',b.akun_piutang,'SKS',case when a.rek_sks-a.rek_skslama > 0 then 'D' else 'C' end,'BTLREKON','-' "+
							"from aka_batal_rekon_tmp a inner join aka_bill_d b on a.no_inv=b.no_inv and b.kode_produk = 'SKS' and b.dc='D' and b.modul='BILLOAD' "+							
							"where a.no_inv not like 'INVALID%' and (a.rek_sks-a.rek_skslama)<>0");	
					//asur
					sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
							"select '"+this.e_nb.getText()+"',a.nim,a.no_inv,'"+this.e_periode.getText()+"',abs(a.rek_asur-a.rek_asurlama),'"+this.app._lokasi+"','"+this.cb_titip.getText()+"',b.akun_piutang,'ASUR',case when a.rek_asur-a.rek_asurlama > 0 then 'D' else 'C' end,'BTLREKON','-' "+
							"from aka_batal_rekon_tmp a inner join aka_bill_d b on a.no_inv=b.no_inv and b.kode_produk = 'ASUR' and b.dc='D' and b.modul='BILLOAD' "+							
							"where a.no_inv not like 'INVALID%' and (a.rek_asur-a.rek_asurlama)<>0");
					//perpus
					sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
							"select '"+this.e_nb.getText()+"',a.nim,a.no_inv,'"+this.e_periode.getText()+"',abs(a.rek_perpus-a.rek_perpuslama),'"+this.app._lokasi+"','"+this.cb_titip.getText()+"',b.akun_piutang,'PERPUS',case when a.rek_perpus-a.rek_perpuslama > 0 then 'D' else 'C' end,'BTLREKON','-' "+
							"from aka_batal_rekon_tmp a inner join aka_bill_d b on a.no_inv=b.no_inv and b.kode_produk = 'PERPUS' and b.dc='D' and b.modul='BILLOAD' "+							
							"where a.no_inv not like 'INVALID%' and (a.rek_perpus-a.rek_perpuslama)<>0");	
					//denda
					sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
							"select '"+this.e_nb.getText()+"',a.nim,a.no_inv,'"+this.e_periode.getText()+"',abs(a.rek_denda-a.rek_dendalama),'"+this.app._lokasi+"','"+this.cb_titip.getText()+"',b.akun_piutang,'DENDA',case when a.rek_denda-a.rek_dendalama > 0 then 'D' else 'C' end,'BTLREKON','-' "+
							"from aka_batal_rekon_tmp a inner join aka_bill_d b on a.no_inv=b.no_inv and b.kode_produk = 'DENDA' and b.dc='D' and b.modul='BILLOAD' "+							
							"where a.no_inv not like 'INVALID%' and (a.rek_denda-a.rek_dendalama)<>0");	
					//ustatus
					sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank)  "+
							"select '"+this.e_nb.getText()+"',a.nim,a.no_inv,'"+this.e_periode.getText()+"',abs(a.rek_ustatus-a.rek_ustatuslama),'"+this.app._lokasi+"','"+this.cb_titip.getText()+"',b.akun_piutang,'USTATUS',case when a.rek_ustatus-a.rek_ustatuslama > 0 then 'D' else 'C' end,'BTLREKON','-' "+
							"from aka_batal_rekon_tmp a inner join aka_bill_d b on a.no_inv=b.no_inv and b.kode_produk = 'USTATUS' and b.dc='D' and b.modul='BILLOAD' "+							
							"where a.no_inv not like 'INVALID%' and (a.rek_ustatus-a.rek_ustatuslama)<>0");	


					//bea
					//data lama ada nilai bea
					sql.add("insert into aka_bill_bea_h (no_batal,no_bill,kode_lokasi,no_inv,nim,flag_status,periode,kode_produk,nilai,no_rekon,no_tak,pakai) "+
							"select '"+this.e_nbtak.getText()+"',a.no_bill,a.kode_lokasi,a.no_inv,a.nim,a.flag_status,a.periode,a.kode_produk,a.nilai,a.no_rekon,a.no_tak,a.pakai "+
							"from aka_bill_bea a inner join aka_batal_rekon_tmp b on a.no_inv=b.no_inv and b.bea_lama <> 0 "+
							"where a.kode_lokasi='"+this.app._lokasi+"'");		

					sql.add("update a set  a.no_rekon='"+this.e_nbtak.getText()+"',a.pakai=b.ni_bea,no_tak='"+this.e_nbtak.getText()+"' "+
							"from aka_bill_bea a inner join aka_batal_rekon_tmp b on a.no_inv=b.no_inv and b.bea_lama <> 0 "+
							"where a.kode_lokasi='"+this.app._lokasi+"'");	
		
					//data lama tidak ada bea
					//bea baru (di data lama tidak dapat bea)								
					//var perBill = "20"+this.sg2.cells(12,i).substr(6,4);---> dimatiin error diganti pake '20'+substring(no_inv,7,4)
					sql.add("insert into aka_bill_bea (no_bill,kode_lokasi,no_inv,nim,flag_status,periode,kode_produk,nilai,no_rekon,no_tak,pakai) "+
							"select substring(no_inv,1,15),'"+this.app._lokasi+"',no_inv,nim,'AKTIF','20'+substring(no_inv,7,4),'BEA',ni_bea,'"+this.e_nbtak.getText()+"','"+this.e_nbtak.getText()+"',ni_bea "+
							"from aka_batal_rekon_tmp where ni_bea<>0");
					
					this.status = "SIMPAN";
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1); this.sg5.clear(1); 
					setTipeButton(tbSimpan);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);						
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-BRN"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_nbtak.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takkirim_m","no_kirim",this.app._lokasi+"-TK"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){				
					case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){						
							if (this.status == "SIMPAN") {
								if (this.nbRekon != "-") {
									this.nama_report="server_report_saku2_kopeg_aka_rptAkRekonJurnal";
									this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.nbRekon+"' ";
								}
								else {
									this.nama_report="server_report_saku3_tm_rptTakKirim";
									this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kirim='"+this.e_nbtak.getText()+"' ";
								}
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
						}else system.info(this,result,"");
					break;
					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataProd = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataProd.set(line.kode_produk, line.akun_piutang);										
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
			this.standarLib.clearByTag(this, new Array("0","1"),undefined);
			this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1); this.sg5.clear(1); 
			setTipeButton(tbSimpan);
			this.bValid.setEnabled(false);
			this.pc2.setActivePage(this.pc2.childPage[0]);		
			this.status = "";	
		} catch(e) {
			alert(e);
		}
	}
});