window.app_saku2_transaksi_kopeg_gl_fJuAuditPP = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_gl_fJuAuditPP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_gl_fJuAuditPP";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Lintas Periode: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.c_jenis = new saiCB(this,{bound:[20,22,202,20],caption:"Jenis",items:["AUDIT"], readOnly:true,tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.e_debet = new saiLabelEdit(this,{bound:[700,16,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_kredit = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,320], childPage:["Data Item Jurnal","Data Anggaran"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],
					colMaxLength:[[7,5,3,2,0],[10,10,150,1,20]],
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		this.cb2 = new portalui_checkBox(this.sgn,{bound:[740,5,100,25],caption:"JP Sistem",selected:true});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[875,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='JULP' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.juLP = line.flag;
				if (this.juLP=="0") {
					system.alert(this,"Status Lintas Periode masih belum aktif.","Setting di Sistem Prosedur untuk Kode JULP.");
					setTipeButton(tbAllFalse);
				}
			} 
			else {
				system.alert(this,"Status Lintas Periode masih belum ada.","Setting di Sistem Prosedur untuk Kode JULP.");
				setTipeButton(tbAllFalse);
			}
									
			this.flagGarFree = "0"; this.flagDokFree = "0"; this.flagFAGL = "0"; this.ppFA = "-";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('FAGL','FAPP','GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
					if (line.kode_spro == "FAGL") this.flagFAGL = line.flag;			
					if (line.kode_spro == "FAPP") this.ppFA = line.flag;			
				}
			}
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
		
			var data = this.dbLib.getDataProvider("select m.kode_akun, m.nama from masakun m "+
												  " inner join flag_relasi b on b.kode_akun = m.kode_akun and m.kode_lokasi = b.kode_lokasi "+
												  " where b.kode_flag = '999' and m.kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunJP = line.kode_akun;
			} 
			else {
				system.alert(this,"Akun JP masih belum ada","Untuk menandai akun JP di form Relasi Flag Akun (Kode Flag = 999)");
				setTipeButton(tbAllFalse);
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_gl_fJuAuditPP.extend(window.childForm);
window.app_saku2_transaksi_kopeg_gl_fJuAuditPP.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','JU','"+this.c_jenis.getText()+"','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','T','-','-','-',getdate(),'"+this.app._userLog+"')");
					
					if (this.cb2.isSelected()) {
						if ((this.sg.getRowValidCount() > 0) && (parseFloat(this.app._periode.substr(0,4)) - parseFloat(this.e_periode.getText().substr(0,4)) == 1)){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){
									var data3 = this.dbLib.getDataProvider("select modul from masakun where kode_lokasi='"+this.app._lokasi+"' and kode_akun='"+this.sg.cells(0,i)+"'",true);
									if (typeof data3 == "object" && data3.rs.rows[0] != undefined) {
										var line3 = data3.rs.rows[0];
										if (line3.modul == "L") {
											sql.add("insert into jp(no_bukti,tanggal,periode,keterangan,nik_pembuat,kode_lokasi,nilai,tgl_input,nik_user) values"+
													"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','Jurnal JP dari Audit periode "+this.e_periode.getText()+"','"+this.cb_buat.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.e_debet.getText())+",getDate(), '"+this.app._userLog+"')");
											break;
										}
									}
								}
							}
						}	
					}

					var nu = 0, nu2 = 0;	
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){	
								nu++;
								sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+(nu)+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','-','-','-','-','-','-','"+this.app._lokasi+"','JU','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
								sql.add("insert into gldt_h(no_bukti,no_urut,kode_lokasi,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,modul,jenis,periode,kode_curr,kurs,nilai_curr,tgl_input,nik_user) values "+
										"('"+this.e_nb.getText()+"',"+(nu)+",'"+this.app._lokasi+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+",'"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"','-','-','-','-','-','-','"+this.cb_buat.getText()+"','JU','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+",getdate(),'"+this.app._userLog+"')");
									
								if (parseFloat(this.app._periode.substr(0,4)) - parseFloat(this.e_periode.getText().substr(0,4)) == 1) {
									
									//glma
									var data2 = this.dbLib.getDataProvider("select kode_akun from glma where kode_lokasi='"+this.app._lokasi+"' and kode_akun='"+this.sg.cells(0,i)+"' and periode='"+this.app._periode.substr(0,4)+"01'",true);
									if (typeof data2 == "object" && data2.rs.rows[0] != undefined) {
										sql.add("update glma set so_akhir = so_akhir "+(this.sg.cells(2,i) == "D" ? "+":"-")+" "+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+" where kode_lokasi='"+this.app._lokasi+"' and kode_akun='"+this.sg.cells(0,i)+"' and periode='"+this.app._periode.substr(0,4)+"01'");
									}
									else {
										sql.add("insert into glma(kode_akun, kode_lokasi, periode, so_akhir, tgl_input,nik_user)  values "+
												"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.app._periode.substr(0,4)+"01',"+nilaiToFloat(this.sg.cells(4,i))+", getdate(),'"+this.app._userLog+"')");
									}	

									//glma_pp
									var data2 = this.dbLib.getDataProvider("select kode_akun from glma_pp where kode_lokasi='"+this.app._lokasi+"' and kode_akun='"+this.sg.cells(0,i)+"' and kode_pp='"+this.sg.cells(5,i)+"' and periode='"+this.app._periode.substr(0,4)+"01'",true);
									if (typeof data2 == "object" && data2.rs.rows[0] != undefined) {
										sql.add("update glma_pp set so_akhir = so_akhir "+(this.sg.cells(2,i) == "D" ? "+":"-")+" "+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+" where kode_lokasi='"+this.app._lokasi+"' and kode_akun='"+this.sg.cells(0,i)+"' and kode_pp='"+this.sg.cells(5,i)+"' and periode='"+this.app._periode.substr(0,4)+"01'");
									}
									else {
										sql.add("insert into glma_pp(kode_akun, kode_pp, kode_lokasi, periode, so_akhir, tgl_input,nik_user)  values "+
												"('"+this.sg.cells(0,i)+"','"+this.sg.cells(5,i)+"','"+this.app._lokasi+"','"+this.app._periode.substr(0,4)+"01',"+nilaiToFloat(this.sg.cells(4,i))+", getdate(),'"+this.app._userLog+"')");
									}



									if (this.cb2.isSelected()) {
										var data3 = this.dbLib.getDataProvider("select modul from masakun where kode_lokasi='"+this.app._lokasi+"' and kode_akun='"+this.sg.cells(0,i)+"'",true);
										if (typeof data3 == "object" && data3.rs.rows[0] != undefined) {
											var line3 = data3.rs.rows[0];
											if (line3.modul == "L") {											
												data="insert into jp_d(no_bukti, kode_lokasi, kode_akun, dc, nilai) values ";
												dc = (this.sg.cells(2,i)== "D" ? "C" : "D");
												data += "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+dc+"',"+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+")";
												sql.add(data);																															
												data ="insert into gldt_h(no_bukti,no_urut,kode_lokasi,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,modul, jenis, periode, kode_curr, kurs, nilai_curr, tgl_input, nik_user) values ";
												nu2++;
												data += "('"+this.e_nb.getText()+"',"+(nu2)+",'"+this.app._lokasi+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.sg.cells(0,i)+"','"+dc+"',"+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+",'Jurnal Penutup ("+this.e_nb.getText()+")','-','-','-','-','-','-','-','"+this.cb_buat.getText()+"','JP','-','"+this.e_periode.getText().substr(0,4)+"16','IDR',1,"+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+",getdate(),'"+this.app._userLog+"')";
												sql.add(data);
												data ="insert into gldt_h(no_bukti,no_urut,kode_lokasi,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,modul,jenis,periode,kode_curr,kurs,nilai_curr,tgl_input,nik_user) values ";
												nu2++;
												data += "('"+this.e_nb.getText()+"',"+(nu2)+",'"+this.app._lokasi+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunJP+"','"+(dc == "D" ? "C":"D")+"',"+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+",'Jurnal Penutup ("+this.e_nb.getText()+")','-','-','-','-','-','-','-','"+this.cb_buat.getText()+"','JP','-','"+this.e_periode.getText().substr(0,4)+"16','IDR',1,"+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+",getdate(),'"+this.app._userLog+"')";
												sql.add(data);
												
												sql.add("update glma set so_akhir = so_akhir "+(dc == "D" ? "+":"-")+" "+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+" where kode_lokasi = '"+this.app._lokasi+"' and kode_akun = '"+this.sg.cells(0,i)+"' and periode = '"+this.app._periode.substr(0,4)+"01' ");
												sql.add("update glma set so_akhir = so_akhir "+(dc == "D" ? "-":"+")+" "+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+" where kode_lokasi = '"+this.app._lokasi+"' and kode_akun = '"+this.akunJP+"' and periode = '"+this.app._periode.substr(0,4)+"01' ");

												sql.add("update glma_pp set so_akhir = so_akhir "+(dc == "D" ? "+":"-")+" "+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+" where kode_lokasi = '"+this.app._lokasi+"' and kode_akun = '"+this.sg.cells(0,i)+"' and kode_pp = '"+this.sg.cells(5,i)+"' and periode = '"+this.app._periode.substr(0,4)+"01' ");
												sql.add("update glma_pp set so_akhir = so_akhir "+(dc == "D" ? "-":"+")+" "+Math.abs(nilaiToFloat(this.sg.cells(4,i)))+" where kode_lokasi = '"+this.app._lokasi+"' and kode_akun = '"+this.akunJP+"' and kode_pp = '"+this.sg.cells(5,i)+"' and periode = '"+this.app._periode.substr(0,4)+"01' ");

											}
										}
									}
								}								
							}
						}
					}					
			
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
										"	('"+this.e_nb.getText()+"','JU','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
							}
						}
					}	
					if (this.flagFAGL == "1") {
						sql.add("insert into gl_fa_asset (no_fa,kode_lokasi,kode_pp,kode_klpakun,umur,persen,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,progress,tgl_perolehan,periode,tgl_susut,periode_susut,nik_user,tgl_input,kode_akun,kode_pp_susut,nilai_susut,no_ref) "+
							"select case when len(cast(no_urut as varchar)) = 1 then  a.no_ju + '-00'+cast(no_urut as varchar)  "+
							"            when len(cast(no_urut as varchar)) = 2 then  a.no_ju + '-0'+cast(no_urut as varchar)  "+
							"            when len(cast(no_urut as varchar)) = 3 then  a.no_ju + '-'+cast(no_urut as varchar) end "+
							",'"+this.app._lokasi+"',a.kode_pp,b.kode_klpakun,b.umur,b.persen,a.keterangan,'IDR',1,a.nilai,1,b.kode_drk,'2','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),a.kode_akun,'"+this.ppFA+"',case when b.umur = 0 then 0 else round(a.nilai/b.umur,0) end as susut,'"+this.e_nb.getText()+"' "+
							"from ju_j a inner join fa_klpakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_ju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ") ;
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
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				if (this.flagDokFree == "1") {				
					var data = this.dbLib.getDataProvider("select no_ju from ju_m where no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_ju);
							return false;
						} 
					}
				}
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();				
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
				if (this.juLP!="1") {
					system.alert(this,"Status Lintas Periode tidak aktif.","Setting di Sistem Prosedur untuk Kode JULP.");
					setTipeButton(tbAllFalse);
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}				
				if ((parseFloat(this.app._periode.substr(0,4)) - parseFloat(this.e_periode.getText().substr(0,4)) != 0) && (parseFloat(this.app._periode.substr(0,4)) - parseFloat(this.e_periode.getText().substr(0,4)) != 1)) {
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus tahun sebelum atau sama dgn periode aktif sistem.["+this.app._periode.substr(0,4)+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){					
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) == parseFloat(this.e_periode.getText())){					
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh sama dengan periode aktif sistem.["+this.app._periode+"]");
					return false;
				}				
				else  this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		
		if (parseFloat(this.app._periode.substr(0,4)) - parseFloat(this.e_periode.getText().substr(0,4)) == 1) {
			this.e_periode.setText(this.e_periode.getText().substr(0,4)+"15");
		}
		
		this.e_nb.setText("");
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 5) {
			if (this.sg.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}
		if (col == 7) {
			if (this.sg.cells(7,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and b.kode_drk = '"+this.sg.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(8,row,line.nama);
					else {
						if (!isAda) this.sg.cells(8,row,"-");
						else {
							this.sg.cells(7,row,"");
							this.sg.cells(8,row,"");
						}
					}
				}
			}
		}
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					if (this.sg.cells(4,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
						sls = Math.abs(sls); 
						this.sg.setCell(4,row,floatToNilai(sls));
					}
				break;
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
				break;
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(5,i) != "-" && this.sg.cells(7,i)!= "-"){
				
				if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(4,i));
				else nilai = nilaiToFloat(this.sg.cells(4,i)) * -1;
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j) && this.sg.cells(5,i) == this.sg2.cells(2,j) && this.sg.cells(7,i) == this.sg2.cells(4,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),this.sg.cells(5,i),this.sg.cells(6,i),this.sg.cells(7,i),this.sg.cells(8,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(7,idx));
					total = total + nilai;
					this.sg2.setCell(7,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);
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
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
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
								this.pc1.hide();
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.c_jenis.setText("AUDIT");
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});