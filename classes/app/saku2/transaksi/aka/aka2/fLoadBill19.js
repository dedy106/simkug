window.app_saku2_transaksi_aka_aka2_fLoadBill19 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fLoadBill19.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_aka2_fLoadBill19";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Tagihan : Proses", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("util_dbLib",true);		
				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bill", readOnly:true});					
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Deskripsi", maxLength:150});					
		this.e_total = new saiLabelEdit(this,{bound:[820,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bValid = new button(this,{bound:[720,15,80,18],caption:"Validasi",click:[this,"doValid"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,1000,400], childPage:["Billing Mhs","List Error"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:14,tag:9,
				colTitle:["NIM","Thn Akademik","UP3","SDP2","BPP Pkt","BPP Non","SKS","Perpus","Denda","U Status","Asuransi","Total","Beasiswa","Net Tagihan"],
				colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
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
		
		
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbAllFalse);				
		
		this.status = "";
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);


				
	}
};
window.app_saku2_transaksi_aka_aka2_fLoadBill19.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_aka2_fLoadBill19.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();		
			var tagih = tot = 0;
			for (var i=0;i < this.sg1.getRowCount();i++){
				tagih = nilaiToFloat(this.sg1.cells(2,i)) + nilaiToFloat(this.sg1.cells(3,i)) + nilaiToFloat(this.sg1.cells(4,i)) + nilaiToFloat(this.sg1.cells(5,i)) + nilaiToFloat(this.sg1.cells(6,i)) + nilaiToFloat(this.sg1.cells(7,i)) + nilaiToFloat(this.sg1.cells(8,i)) + nilaiToFloat(this.sg1.cells(9,i)) + nilaiToFloat(this.sg1.cells(10,i)) ;
				this.sg1.cells(11,i,floatToNilai(tagih));
				
				tagih = tagih - nilaiToFloat(this.sg1.cells(12,i));
				this.sg1.cells(13,i,floatToNilai(tagih));
				
				tot += tagih;
			}
			this.e_total.setText(floatToNilai(tot));
			
			this.status = "LOAD";
			this.nbTmp = this.app._userLog;
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();												
			sql.add("delete from aka_bill_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");		
			this.dbLib.execQuerySync(sql);	
			
			this.status = "LOAD";
			for (var i=0;i < this.sg1.getRowCount();i++){
				if (nilaiToFloat(this.sg1.cells(2,i)) != 0) {
					sql.add("insert into aka_bill_tmp (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka) values "+
							"('"+this.nbTmp+"','"+this.app._lokasi+"','-','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','UP3','-','-','-',"+nilaiToFloat(this.sg1.cells(2,i))+",'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','-','D','-','"+this.sg1.cells(1,i)+"')");
				}
				if (nilaiToFloat(this.sg1.cells(3,i)) != 0) {
					sql.add("insert into aka_bill_tmp (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka) values "+
							"('"+this.nbTmp+"','"+this.app._lokasi+"','-','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','SDP2','-','-','-',"+nilaiToFloat(this.sg1.cells(3,i))+",'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','-','D','-','"+this.sg1.cells(1,i)+"')");
				}								
				if (nilaiToFloat(this.sg1.cells(4,i)) != 0) {
					sql.add("insert into aka_bill_tmp (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka) values "+
							"('"+this.nbTmp+"','"+this.app._lokasi+"','-','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','BPPP','-','-','-',"+nilaiToFloat(this.sg1.cells(4,i))+",'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','-','D','-','"+this.sg1.cells(1,i)+"')");
				}
				if (nilaiToFloat(this.sg1.cells(5,i)) != 0) {
					sql.add("insert into aka_bill_tmp (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka) values "+
							"('"+this.nbTmp+"','"+this.app._lokasi+"','-','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','BPPNP','-','-','-',"+nilaiToFloat(this.sg1.cells(5,i))+",'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','-','D','-','"+this.sg1.cells(1,i)+"')");
				}
				if (nilaiToFloat(this.sg1.cells(6,i)) != 0) {
					sql.add("insert into aka_bill_tmp (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka) values "+
							"('"+this.nbTmp+"','"+this.app._lokasi+"','-','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','SKS','-','-','-',"+nilaiToFloat(this.sg1.cells(6,i))+",'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','-','D','-','"+this.sg1.cells(1,i)+"')");
				}
				if (nilaiToFloat(this.sg1.cells(7,i)) != 0) {
					sql.add("insert into aka_bill_tmp (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka) values "+
							"('"+this.nbTmp+"','"+this.app._lokasi+"','-','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','PERPUS','-','-','-',"+nilaiToFloat(this.sg1.cells(7,i))+",'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','-','D','-','"+this.sg1.cells(1,i)+"')");
				}
				if (nilaiToFloat(this.sg1.cells(8,i)) != 0) {
					sql.add("insert into aka_bill_tmp (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka) values "+
							"('"+this.nbTmp+"','"+this.app._lokasi+"','-','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','DENDA','-','-','-',"+nilaiToFloat(this.sg1.cells(8,i))+",'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','-','D','-','"+this.sg1.cells(1,i)+"')");
				}
				if (nilaiToFloat(this.sg1.cells(9,i)) != 0) {
					sql.add("insert into aka_bill_tmp (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka) values "+
							"('"+this.nbTmp+"','"+this.app._lokasi+"','-','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','USTATUS','-','-','-',"+nilaiToFloat(this.sg1.cells(9,i))+",'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','-','D','-','"+this.sg1.cells(1,i)+"')");
				}
				if (nilaiToFloat(this.sg1.cells(10,i)) != 0) {
					sql.add("insert into aka_bill_tmp (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka) values "+
							"('"+this.nbTmp+"','"+this.app._lokasi+"','-','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','ASUR','-','-','-',"+nilaiToFloat(this.sg1.cells(10,i))+",'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','-','D','-','"+this.sg1.cells(1,i)+"')");
				}							
				if (nilaiToFloat(this.sg1.cells(12,i)) != 0) {
					sql.add("insert into aka_bill_tmp (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka) values "+
							"('"+this.nbTmp+"','"+this.app._lokasi+"','-','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','BEA','-','-','-',"+nilaiToFloat(this.sg1.cells(12,i))+",'"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','-','C','-','"+this.sg1.cells(1,i)+"')");
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
		
		//cek 1 bill per nik tidak boleh double param yg sama
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
		
		var strSQL = "select distinct a.nim from aka_bill_tmp a left join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi and b.flag_status='AKTIF' where a.nilai <> 0 and b.nim is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				//temu = true; ---> yg tidak aktif tetap diloloskan [just info]
				line = data.rs.rows[i];							
				this.sg2.appendData([line.nim,"NIM","NIM berstatus NONAKTIF"]);
			}
		}

		//cek tahun akademik
		var strSQL = "select distinct a.tahunaka from aka_bill_tmp a left join aka_tahunaka b on a.tahunaka=b.tahunaka and a.kode_lokasi=b.kode_lokasi where a.nilai <> 0 and b.tahunaka is null and a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true;
				line = data.rs.rows[i];							
				this.sg2.appendData([line.tahunaka,"Thn Akademik","Tahun Akademik tidak terdaftar"]);
			}
		}

		this.pc1.setActivePage(this.pc1.childPage[1]);
		if (temu) {
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'0000'));					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into aka_bill_m(no_bill,no_dokumen,kode_lokasi,periode,tanggal,keterangan,kode_pp,kode_drk,jenis,posted,nik_user,tgl_input) values "+ 
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','-','BLOAD','F','"+this.app._userLog+"',getdate())");
										
					//data billing mhs yg AKTIF		
					sql.add("insert into aka_bill_d (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka,modul,kode_drk) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.e_nb.getText()+"'+'|'+a.nim,a.nim,a.periode,a.kode_produk,a.akun_piutang,a.akun_pdpt,a.akun_pdd,a.nilai,'-',a.periode_sisih,a.kode_pp,a.dc,a.kode_akt,a.tahunaka,'BILLOAD','-' "+
						    "from aka_bill_tmp a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi and b.flag_status='AKTIF' "+
							"where a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.kode_produk <> 'BEA'");
					
					//data billing mhs yg TIDAK AKTIF		
					sql.add("insert into aka_bill_h (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka,modul,kode_drk) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.e_nb.getText()+"'+'|'+a.nim,a.nim,a.periode,a.kode_produk,a.akun_piutang,a.akun_pdpt,a.akun_pdd,a.nilai,'-',a.periode_sisih,a.kode_pp,a.dc,a.kode_akt,a.tahunaka,'BILLOAD','-' "+
						    "from aka_bill_tmp a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi and b.flag_status <> 'AKTIF' "+
							"where a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.kode_produk <> 'BEA'");												

					//data beasiswa mhs
					sql.add("insert into aka_bill_bea (no_bill,kode_lokasi,no_inv,nim,flag_status,periode,kode_produk,nilai,no_rekon,no_tak,pakai) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.e_nb.getText()+"'+'|'+a.nim,a.nim,b.flag_status,a.periode,a.kode_produk,a.nilai,'-','-',0 "+
						    "from aka_bill_tmp a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.kode_produk = 'BEA'");		

					//update kelengkapan data billing 		
					sql.add("update a set a.kode_akt=b.kode_akt,a.kode_pp=b.kode_jur,a.kode_jalur=b.kode_jalur "+
							"from aka_bill_d a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"and a.kode_produk in ('BPPP','BPPNP','UP3','SDP2','SKS','DENDA','USTATUS','PERPUS','ASUR') ");
		
					//---------------------------------------------------------------------------------------------------------------------------------------		
					/*  jurnal (akun,drk)
						BPP   --> drk utk maba lihat angkatan maba+jalur/kelas
						BPP   --> drk utk mala hanya lihat jalur/kelas (angkatan diabaikan)
						BPPNP --> drk utk mala hanya lihat jalur/kelas (angkatan diabaikan)

						selain BPP dan BPPNP akun,drk disamakan (abaikan)
					*/

					sql.add("update a set a.akun_piutang=b.akun_piutang, a.akun_pdpt=b.akun_pdpt, a.akun_pdd=b.akun_pdd, a.kode_drk=b.kode_drk "+
							"from aka_bill_d a inner join aka_produk b on a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi and a.kode_akt='"+this.AktMABA+"' and a.kode_jalur=b.kode_jalur and b.kode_akt='MABA' "+
							"where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"and b.kode_produk in ('BPPP') ");

					sql.add("update a set a.akun_piutang=b.akun_piutang, a.akun_pdpt=b.akun_pdpt, a.akun_pdd=b.akun_pdd, a.kode_drk=b.kode_drk "+
							"from aka_bill_d a inner join aka_produk b on a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi and a.kode_akt<>'"+this.AktMABA+"' and a.kode_jalur=b.kode_jalur and b.kode_akt='MALA' "+
							"where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"and b.kode_produk in ('BPPP','BPPNP') ");

					sql.add("update a set a.akun_piutang=b.akun_piutang, a.akun_pdpt=b.akun_pdpt, a.akun_pdd=b.akun_pdd, a.kode_drk=b.kode_drk "+
							"from aka_bill_d a inner join aka_produk b on a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"and b.kode_produk in ('UP3','SDP2','SKS','ASUR','PERPUS','DENDA','USTATUS') ");
					
					//setting periode awal amortisasi sesuai tahun akademik				
					sql.add("update a set a.periode_susut=b.periode "+
							"from aka_bill_d a inner join ( "+
							"	select kode_lokasi,tahunaka,min(periode) as periode "+
							"   from aka_tahunaka "+
							"   where kode_lokasi='"+this.app._lokasi+"' "+
							"   group by kode_lokasi,tahunaka "+
							"   ) b on a.tahunaka=b.tahunaka and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_produk in ('BPPP','BPPNP') and a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");

					//jurnal		
					sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.dp_d1.getDateString()+"',0,a.akun_piutang,'"+this.e_ket.getText()+"','D',sum(a.nilai),b.kode_jur,'-','BLOAD',a.kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_bill_d a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi  "+									
							"where a.kode_produk in ('UP3','SDP2','BPPP','BPPNP','SKS','PERPUS','DENDA','USTATUS','ASUR') and a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by a.kode_lokasi,a.akun_piutang,a.kode_produk,b.kode_jur");
					
					sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"',kode_lokasi,'"+this.dp_d1.getDateString()+"',1,akun_pdpt,'"+this.e_ket.getText()+"','C',sum(nilai),kode_pp,kode_drk,'BLOAD',kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_bill_d "+
							"where kode_produk in ('UP3','SDP2','SKS','DENDA','USTATUS') and no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,akun_pdpt,kode_produk,kode_pp,kode_drk");
							
					sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.dp_d1.getDateString()+"',1,a.akun_pdpt,'"+this.e_ket.getText()+"','C',sum(a.nilai),c.kode_pp,a.kode_drk,'BLOAD',a.kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_bill_d a "+
							"inner join (select distinct kode_produk,kode_lokasi,kode_pp from aka_produk where kode_produk in ('PERPUS','ASUR')) c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi "+
							"where a.kode_produk in ('PERPUS','ASUR') and a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by a.kode_lokasi,a.akun_pdpt,a.kode_produk,c.kode_pp,a.kode_drk");
														
					sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"',kode_lokasi,'"+this.dp_d1.getDateString()+"',3,akun_pdd,'"+this.e_ket.getText()+"','C',sum(nilai),kode_pp,'-','BLOAD',kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from aka_bill_d "+
							"where kode_produk in ('BPPP','BPPNP') and no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,akun_pdd,kode_produk,kode_pp");
												
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_bill,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,sum(nilai) "+
							"from aka_bill_j where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"group by no_bill,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,dc");
												
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
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");

		var strSQL = "select '20'+substring(tahunaka,1,2) as akt_maba from aka_tahunaka where periode = '"+this.e_periode.getText()+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){							
				this.AktMABA = 	line.akt_maba;		
			}
		}
	},		
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'0000'));
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
								this.nama_report="server_report_saku2_kopeg_aka_rptAkBillJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
