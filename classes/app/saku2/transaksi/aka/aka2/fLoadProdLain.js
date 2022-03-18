window.app_saku2_transaksi_aka_aka2_fLoadProdLain = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fLoadProdLain.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_aka2_fLoadProdLain";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Produk Lain : Proses", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("util_dbLib",true);		
				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bill", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nbrek = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"No Rekon", readOnly:true});							
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Deskripsi", maxLength:150});					
		this.e_total = new saiLabelEdit(this,{bound:[820,16,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_prod = new saiCBBL(this,{bound:[20,17,220,20],caption:"Jenis Produk", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_bayar = new saiLabelEdit(this,{bound:[820,17,200,20],caption:"Total Pembayaran", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_titip = new saiCBBL(this,{bound:[20,15,220,20],caption:"Akun Pelunasan", multiSelection:false, maxLength:10, tag:2 });
		this.e_bea = new saiLabelEdit(this,{bound:[820,15,200,20],caption:"Total Beasiswa", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bValid = new button(this,{bound:[720,15,80,18],caption:"Validasi",click:[this,"doValid"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,1000,330], childPage:["Billing Mhs","List Error","Delete Data"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
				colTitle:["NIM","Tagihan","Tot Pelunasan","Ni Beasiswa (Incld)"],
				colWidth:[[3,2,1,0],[100,100,100,150]],	
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
				colTitle:["ID Error","Kolom","Deskripsi"],
				colWidth:[[2,1,0],[500,150,150]],				
				readOnly:true, 
				autoAppend:false,defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg2});		
		
		this.cb_nbDel = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"NoBill Delete", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"] });
		this.bValid = new button(this.pc1.childPage[2],{bound:[120,12,98,18],caption:"Del Bukti",click:[this,"doDelete"]});			

		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();

		this.rearrangeChild(10,23);
		this.pc1.childPage[2].rearrangeChild(10, 23);	

		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbAllFalse);				
		
		this.status = "";
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);

		this.cb_prod.setSQL("select kode_produk, nama from aka_produk_lain where kode_lokasi='"+this.app._lokasi+"'",["kode_produk","nama"],false,["Kode","Nama"],"and","Daftar Produk",true);			
		this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);			
		
	}
};
window.app_saku2_transaksi_aka_aka2_fLoadProdLain.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_aka2_fLoadProdLain.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();		

			var tagih = bayar = bea = 0;
			for (var i=0;i < this.sg1.getRowCount();i++){		
				tagih += nilaiToFloat(this.sg1.cells(1,i)) ;
				bayar += nilaiToFloat(this.sg1.cells(2,i)) ;
				bea += nilaiToFloat(this.sg1.cells(3,i)) ;				
			}
			this.e_total.setText(floatToNilai(tagih));
			this.e_bayar.setText(floatToNilai(bayar));
			this.e_bea.setText(floatToNilai(bea));
			
			this.status = "LOAD";
			this.nbTmp = this.app._userLog;
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();												
			sql.add("delete from aka_bill_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");		
			this.dbLib.execQuerySync(sql);	
			
			this.status = "LOAD";
			for (var i=0;i < this.sg1.getRowCount();i++){
				if (nilaiToFloat(this.sg1.cells(1,i)) != 0) {
					sql.add("insert into aka_bill_tmp (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka,bayar,beasiswa) values "+
							"('"+this.nbTmp+"','"+this.app._lokasi+"','-','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.cb_prod.getText()+"','-','-','-',"+nilaiToFloat(this.sg1.cells(1,i))+",'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','-','D','-','"+this.tahunAka+"',"+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+")");
				}						
			}
			this.dbLib.execArraySQL(sql);								
						
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
	doValid: function(sender){
		var temu = false;
		this.sg2.clear();
		
		var strSQL = "select nim+' - '+kode_produk as id_nim from aka_bill_tmp where nilai <> 0 and no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"' group by nim,kode_produk having count(nim+kode_produk) > 1";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true; 
				line = data.rs.rows[i];							
				this.sg2.appendData([line.id_nim,"NIM+Parameter","NIM + Parameter Duplikasi"]);
			}
		}
		
		//wisuda tidak dilihat status mahasiswanya
		if (this.cb_prod.getText() != "WISD") {
			var strSQL = "select distinct a.nim from aka_bill_tmp a left join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi and b.flag_status='AKTIF' where a.nilai <> 0 and b.nim is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;			
				for (var i in data.rs.rows){
					temu = true; 
					line = data.rs.rows[i];							
					this.sg2.appendData([line.nim,"NIM","NIM berstatus NONAKTIF"]);
				}
			}
		}

		if (temu) {
			this.pc1.setActivePage(this.pc1.childPage[1]);
			setTipeButton(tbAllFalse);
			system.alert(this,"Data tidak valid.","Lihat List Error !");			
		}
		else setTipeButton(tbSimpan);					
		
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_bill_m','no_bill',this.app._lokasi+"-PLL"+this.e_periode.getText().substr(2,4)+".",'0000'));					
			this.e_nbrek.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-RPL"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					//----------------- BILLING ------------------
					if (this.e_bayar.getText()!= "0") var nbRek = this.e_nbrek.getText();
					else var nbRek = "-";

					sql.add("insert into aka_bill_m(no_bill,no_dokumen,kode_lokasi,periode,tanggal,keterangan,kode_pp,kode_drk,jenis,posted,nik_user,tgl_input) values "+ 
							"('"+this.e_nb.getText()+"','"+nbRek+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','-','PRODLAIN','F','"+this.app._userLog+"',getdate())");
										
					sql.add("insert into aka_bill_d (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka,modul,kode_drk) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.e_nb.getText()+"'+'|'+a.nim,a.nim,a.periode,a.kode_produk,a.akun_piutang,a.akun_pdpt,a.akun_pdd,a.nilai,'-',a.periode_sisih,a.kode_pp,a.dc,a.kode_akt,a.tahunaka,'PRODLAIN','-' "+
						    "from aka_bill_tmp a "+
							"where a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' ");
							
					sql.add("update a set a.kode_pp=b.kode_jur "+
							"from aka_bill_d a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_produk = '"+this.cb_prod.getText()+"' ");

					sql.add("update a set a.akun_piutang=b.akun_piutang, a.akun_pdpt=b.akun_pdpt, a.kode_drk=b.kode_drk "+
							"from aka_bill_d a inner join aka_produk_lain b on a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi  "+
							"where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					//beasiswa catat sudah di-rekon dan siap utk tak		
					sql.add("insert into aka_bill_bea (no_bill,kode_lokasi,no_inv,nim,flag_status,periode,kode_produk,nilai,no_rekon,no_tak,pakai) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.e_nb.getText()+"'+'|'+a.nim,a.nim,b.flag_status,a.periode,'BEA',a.beasiswa,'"+this.e_nbrek.getText()+"','-',a.beasiswa "+
							"from aka_bill_tmp a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' ");		
				
					//jurnal		
					//if (this.cb_prod.getText() == "WISD" || this.cb_prod.getText() == "BADM") {
					//-- kalo kode pp (ditabel produk)  = PPHMS maka pp pendapatan pakai pp mahasiswa
					//-- kalo kode pp (ditabel produk)  = terisi kode pp, maka pp pendapatan pakai pp default seperti wisuda/admisi	

					if (this.ppJurnal != "PPMHS") {	
						//jurnal per fakultas
						sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
								"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.dp_d1.getDateString()+"',0,a.akun_piutang,'"+this.e_ket.getText()+" - '+c.nama,'D',sum(a.nilai),a.kode_pp,'-','PRODLAIN',a.kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from aka_bill_d a "+
								"inner join aka_jurusan b on a.kode_pp=b.kode_jur and a.kode_lokasi=b.kode_lokasi "+
								"inner join aka_fakultas c on b.kode_fakultas=c.kode_fakultas and a.kode_lokasi=c.kode_lokasi "+									
								"where a.kode_produk = '"+this.cb_prod.getText()+"' and a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
								"group by a.kode_lokasi,a.akun_piutang,a.kode_produk,c.nama,a.kode_pp");					

						sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
								"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.dp_d1.getDateString()+"',1,a.akun_pdpt,'"+this.e_ket.getText()+" - '+c.nama,'C',sum(a.nilai),'"+this.ppJurnal+"','"+this.drkJurnal+"','PRODLAIN',a.kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from aka_bill_d a "+
								"inner join aka_jurusan b on a.kode_pp=b.kode_jur and a.kode_lokasi=b.kode_lokasi "+
								"inner join aka_fakultas c on b.kode_fakultas=c.kode_fakultas and a.kode_lokasi=c.kode_lokasi "+									
								"where a.kode_produk = '"+this.cb_prod.getText()+"' and a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
								"group by a.kode_lokasi,a.akun_pdpt,a.kode_produk,c.nama");					
					}
					else {
						sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
								"select '"+this.e_nb.getText()+"',kode_lokasi,'"+this.dp_d1.getDateString()+"',0,akun_piutang,'"+this.e_ket.getText()+"','D',sum(nilai),kode_pp,'-','PRODLAIN',kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from aka_bill_d "+									
								"where kode_produk = '"+this.cb_prod.getText()+"' and no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
								"group by kode_lokasi,akun_piutang,kode_produk,kode_pp");					
						sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
								"select '"+this.e_nb.getText()+"',kode_lokasi,'"+this.dp_d1.getDateString()+"',1,akun_pdpt,'"+this.e_ket.getText()+"','C',sum(nilai),kode_pp,'"+this.drkJurnal+"','PRODLAIN',kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from aka_bill_d "+									
								"where kode_produk = '"+this.cb_prod.getText()+"' and no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
								"group by kode_lokasi,akun_pdpt,kode_produk,kode_pp");					
					}

					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_bill,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,sum(nilai) "+
							"from aka_bill_j where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"group by no_bill,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,dc");
												

					//----------------- PEMBAYARAN ------------------
					var nilaiBayar = nilaiToFloat(this.e_bayar.getText());

					if (nilaiBayar != 0) {						
						sql.add("insert into aka_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
								"('"+this.e_nbrek.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiBayar+",'F','PRODLAIN','"+this.cb_titip.getText()+"','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
						sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank) "+
								"select '"+this.e_nbrek.getText()+"',nim,'"+this.e_nb.getText()+"'+'|'+nim,periode,(bayar),kode_lokasi,'"+this.cb_titip.getText()+"',akun_piutang,kode_produk,'D','PRODLAIN','-' "+
								"from aka_bill_tmp "+
								"where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"' and bayar<>0");

						sql.add("update a set a.akun_piutang=b.akun_piutang "+
								"from aka_rekon_d a inner join aka_produk_lain b on a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi  "+
								"where a.no_rekon='"+this.e_nbrek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
	
						sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nbrek.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiBayar+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PRODLAIN','TITIP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
							
						if (this.ppJurnal != "PPMHS") {							
							sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
								"select '"+this.e_nbrek.getText()+"','-','"+this.dp_d1.getDateString()+"',1,a.akun_piutang,'"+this.e_ket.getText()+" - '+c.nama,'C',sum(a.nilai),bb.kode_jur,'-','"+this.app._lokasi+"','PRODLAIN',a.kode_produk,'"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from aka_rekon_d a "+
								"	inner join aka_mahasiswa bb on a.nim=bb.nim and a.kode_lokasi=bb.kode_lokasi "+
								"	inner join aka_jurusan b on bb.kode_jur=b.kode_jur and bb.kode_lokasi=b.kode_lokasi "+
								"	inner join aka_fakultas c on b.kode_fakultas=c.kode_fakultas and a.kode_lokasi=c.kode_lokasi "+
								"where a.kode_produk = '"+this.cb_prod.getText()+"' and a.no_rekon='"+this.e_nbrek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nilai<>0 "+
								"group by a.akun_piutang,a.kode_produk,c.nama,bb.kode_jur");
						}		
						else {
							sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+							
								"select '"+this.e_nbrek.getText()+"','-','"+this.dp_d1.getDateString()+"',1,a.akun_piutang,'"+this.e_ket.getText()+"','C',sum(a.nilai),b.kode_jur,'-','"+this.app._lokasi+"','PRODLAIN','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
								"from aka_rekon_d a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_produk = '"+this.cb_prod.getText()+"' and a.no_rekon='"+this.e_nbrek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nilai<>0 "+
								"group by a.akun_piutang,b.kode_jur");			
						}
					}		

					sql.add("delete from aka_bill_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");

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
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbAllFalse);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				}
				break;
			case "simpan" :	
				this.stsSimpan = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);										
				if (nilaiToFloat(this.e_bayar.getText()) <= 0 || nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Tagihan/Total bayar tidak boleh nol atau kurang.");
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(this.app._periode);		
		this.e_nb.setText("");

		var data = this.dbLib.getDataProvider("select tahunaka from aka_tahunaka where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.tahunAka = line.tahunaka;	
		}		

		//utk hapus
		this.cb_nbDel.setSQL("select a.no_bill, a.keterangan from aka_bill_m a left join aka_rekon_m b on a.no_dokumen=b.no_rekon and a.kode_lokasi=b.kode_lokasi and b.posted='T' "+
							 "where a.periode = '"+this.e_periode.getText()+"' and b.no_rekon is null and a.jenis = 'PRODLAIN' and a.posted='F' and a.kode_lokasi='"+this.app._lokasi+"' ",["no_bill","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Billing",true);			
	},		
	doDelete: function(sender){
		if (this.cb_nbDel.getText() != "") {
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();
			sql.add("delete from aka_bill_m where no_bill='"+this.cb_nbDel.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from aka_bill_d where no_bill='"+this.cb_nbDel.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from aka_bill_j where no_bill='"+this.cb_nbDel.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from aka_bill_bea where no_bill='"+this.cb_nbDel.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

			sql.add("delete from aka_rekon_m where no_rekon='"+this.noRekon+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from aka_rekon_d where no_rekon='"+this.noRekon+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from aka_rekon_j where no_rekon='"+this.noRekon+"' and kode_lokasi='"+this.app._lokasi+"'");

			this.dbLib.execArraySQL(sql);
			this.cb_nbDel.setText("","");
		}
	},
	doChange: function(sender){
		if (sender == this.cb_prod && this.cb_prod.getText()!="") {
			var data = this.dbLib.getDataProvider("select kode_pp,kode_drk from aka_produk_lain where kode_produk='"+this.cb_prod.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.ppJurnal = line.kode_pp;	
				this.drkJurnal = line.kode_drk;	
			}
		}
		if (sender == this.cb_nbDel && this.cb_nbDel.getText()!="") {
			var data = this.dbLib.getDataProvider("select no_dokumen from aka_bill_m where no_bill='"+this.cb_nbDel.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.noRekon = line.no_dokumen;					
			}
		}
	},
	doClick: function(sender){		
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_bill_m','no_bill',this.app._lokasi+"-PLL"+this.e_periode.getText().substr(2,4)+".",'0000'));					
			this.e_nbrek.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-RPL"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){						
						if (this.status == "SIMPAN") {
							if (this.stsSimpan=="1") {							
								this.nama_report="server_report_saku3_aka2_rptAkBillJurRekon";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nbrek.getText()+"' ";
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
								this.pc1.hide();							
							}
						}
					}else
						system.info(this, result,"");											
				break;
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
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();			
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, [0,1],undefined);				
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.status = "";
		} catch(e) {
			alert(e);
		}
	}
});
