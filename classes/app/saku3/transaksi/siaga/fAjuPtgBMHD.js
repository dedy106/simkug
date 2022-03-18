window.app_saku3_transaksi_siaga_fAjuPtgBMHD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fAjuPtgBMHD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fAjuPtgBMHD";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar Ref BMHD", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pertanggungan","List Pertanggungan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,490,180,80,100]],colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Panjar", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,21,220,20],caption:"NIK Menyetujui", multiSelection:false, maxLength:10, tag:2});
		this.cb_tahu = new saiCBBL(this.pc2.childPage[0],{bound:[430,21,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});										
		this.cb_panjar = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,240,20],caption:"Bukti Panjar", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});
		this.e_kas = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,12,200,20],caption:"Nilai KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.c_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,160,20],caption:"Mt Uang - Kurs", tag:0, readOnly:true, text:"IDR"});				
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[190,19,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});		
		this.e_nilaiCurr = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,19,200,20],caption:"Nilai Curr", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.e_nilaiPJ = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Nilai Panjar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});										
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,18,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,190], childPage:["Item Mata Anggaran","KPA Anggaran","Data BMHD"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Nilai IDR"],
					colWidth:[[5,4,3,2,1,0],[100,100,400,50,200,80]],					
					columnReadOnly:[true,[1,5],[0,2,3,4]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]], 
					colFormat:[[4,5],[cfNilai,cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[4,3,2,1,0],[100,100,100,500,100]],
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
		this.cb_bmhd = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"No Ref BMHD", readOnly:true, rightLabelVisible:false });		
		this.cb_akunhut = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"Akun BMHD", readOnly:true});		
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150, readOnly:true});				
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"Saldo BMHD IDR", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_bmhdcurr = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"Nilai BMHD Curr", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_bmhd = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,200,20],caption:"Nilai BMHD IDR", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});						

		this.rearrangeChild(10, 23);			
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);			
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);				
		this.setTabChildIndex();
		
		//this.dataAkun = this.app._masakun;
				
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;

			var sql = new server_util_arrayList();
			if (this.app._userStatus == "A") {
				sql.add("select a.kode_akun,a.nama "+
						"from masakun a "+
						"where a.kode_lokasi='"+this.app._lokasi+"'  and a.block= '0' ");
			}
			else {
				sql.add("select a.kode_akun,a.nama "+
						"from masakun a "+
						"inner join relakun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"inner join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' and a.block= '0' "+
						"group by a.kode_akun,a.nama ");						
			}
			this.dbLib.getMultiDataProviderA(sql);

			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
												
			this.flagAkunKB = "0"; this.flagGarFree = "0";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('JUAKUNKB','GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "JUAKUNKB") this.flagAkunKB = line.flag;
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
				}
			}						
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"'  "+
							  "where a.tipe='posting' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			this.cb_tahu.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						

			this.c_curr.setText("IDR");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fAjuPtgBMHD.extend(window.childForm);
window.app_saku3_transaksi_siaga_fAjuPtgBMHD.implement({
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
						sql.add("update gr_pb_m set ref2 = '-' where ref2='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gr_panjarptg_m where no_ptg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gr_panjarptg_j where no_ptg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where modul='PJPTG' and no_bukti='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("delete from anggaran_m where no_agg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from anggaran_d where no_agg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from rra_pdrk_m where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from rra_pdrk_d where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("delete from gr_bmhd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("update gr_pb_m set ref2 = '"+this.e_nb.getText()+"' where no_pb='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					
					sql.add("insert into gr_panjarptg_m (no_ptg,no_panjar,no_kas,no_dokumen,tanggal,keterangan,akun_panjar,akun_kas,nik_buat,nik_app,kode_lokasi,kode_pp,kode_curr,kurs,nilai_curr,nilai,nilai_kas,progress,periode,nik_user,tgl_input,no_ver,no_app,no_final,nik_tahu) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_panjar.getText()+"','-','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.akunPJ+"','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_nilaiCurr.getText())+","+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_kas.getText())+",'0','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','-','-','"+this.cb_tahu.getText()+"')");
							
					//akun bmhd		
					sql.add("insert into gr_panjarptg_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akunhut.getText()+"','"+this.e_ket.getText()+"','D','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_bmhdcurr.getText())+","+parseNilai(this.e_bmhd.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJPTG','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");		
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','PJPTG','"+this.app._lokasi+"','"+this.cb_akunhut.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+parseNilai(this.e_bmhd.getText())+")");
		
					//akun beban tambahan jurnal non bmhd		
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("insert into gr_panjarptg_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJPTG','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							}
						}
					}

					//akun panjar (kredit)
					sql.add("insert into gr_panjarptg_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.akunPJ+"','"+this.e_ket.getText()+"','C','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_nilaiPJ.getText())+","+parseNilai(this.e_nilaiPJ.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJPTG','PANJAR','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(3,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(3,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(3,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','PJPTG','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.cb_pp.getText()+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(2,i))+","+nilai+")");
							}
						}
					}
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_bukti,'PJPTG',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.e_periode.getText()+"',case dc when 'D' then 'C' else 'D' end,0,nilai "+
							"from angg_r where no_bukti='"+this.cb_panjar.getText()+"' and modul in ('PJAJU','AJU')");

					
					//-------- modul bmhd		
					//reverse bmhd panjar		
					sql.add("insert into gr_bmhd_d(no_bukti,no_bmhd,no_dokumen,akun_hutang,keterangan,dc,nilai,kode_pp,kode_lokasi,modul,jenis,periode,kode_curr,kurs)  "+
							"select '"+this.e_nb.getText()+"',no_bmhd,no_dokumen,akun_hutang,keterangan,'D',nilai,kode_pp,kode_lokasi,'PJPTG',jenis,'"+this.e_periode.getText()+"',kode_curr,kurs "+
							"from gr_bmhd_d where no_bukti ='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					//bmhd ptg
					sql.add("insert into gr_bmhd_d(no_bukti,no_bmhd,no_dokumen,akun_hutang,keterangan,dc,nilai,kode_pp,kode_lokasi,modul,jenis,periode,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_bmhd.getText()+"','"+this.e_dok.getText()+"','"+this.cb_akunhut.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_bmhd.getText())+",'"+this.app._kodePP+"','"+this.app._lokasi+"','PJPTG','AJUSLS','"+this.e_periode.getText()+"','IDR',1)");

					//rra otomatis
					//insert pdrk, anggaran_d
					if (this.periodePJ != this.e_periode.getText()) {
						sql.add("insert into rra_pdrk_m(no_pdrk,kode_lokasi,keterangan,kode_pp,kode_bidang,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress,modul) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','RRA "+this.e_ket.getText()+"','"+this.app._kodePP+"','-','-','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._userLog+"','RR-OTO','-','"+this.app._userLog+"',getdate(),'0','MULTI')");
						sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) "+
								"select '"+this.e_nb.getText()+"',kode_lokasi,0,kode_akun,kode_pp,kode_drk,periode1,0,nilai,'C','-' "+
								"from angg_r "+
								"where no_bukti ='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D' ");					
						sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) "+
								"select '"+this.e_nb.getText()+"',kode_lokasi,0,kode_akun,kode_pp,kode_drk,'"+this.e_periode.getText()+"',0,nilai,'D','-' "+
								"from angg_r "+
								"where no_bukti ='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and dc ='D' ");
						
						sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','RRA - "+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.app._userLog+"','"+this.app._userLog+"','RR-OTO')");										
						sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) "+		
								"select '"+this.e_nb.getText()+"',kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,1,periode,nilai,nilai,dc,'-','"+this.app._userLog+"',getdate(),'RRA-OTO' "+
								"from rra_pdrk_d "+
								"where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
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
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.c_curr.setText("IDR");
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick();
				break;
			case "simpan" :			
			case "ubah" :	
				this.preView = "1";	
				this.sg.validasi();
				this.dataAkunGar = {rs:{rows:[]}};	
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
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
				this.doHitungGar();				
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
							var line = this.dataAkunGar.rs.rows[j];
							if (line.kode_akun == this.sg2.cells(0,i)) {		
								if (nilaiToFloat(this.sg2.cells(3,i))>0 && nilaiToFloat(this.sg2.cells(2,i)) < nilaiToFloat(this.sg2.cells(3,i))) {
									var k =i+1;
									system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"] , silahkan melakukan RRA dari menu anggaran");
									return false;						
								}							
							}
						}
					}
				}				
				if (this.flagAkunKB == "1") {
					this.dataJU = {rs:{rows:[]}};				
					var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						this.dataJU = data;
					} 						
					var k=0;
					for (var j=0;j < this.sg.getRowCount();j++){
						if (this.sg.rowValid(j)){
							for (var i=0;i<this.dataJU.rs.rows.length;i++){
								line = this.dataJU.rs.rows[i];
								if (line.kode_akun == this.sg.cells(0,j)) {		
									k = j+1;
									system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak diperkenankan.[Baris : "+k+"]");
									return false;						
								}
							}													
						}
					}
				}					
				this.dataJU = {rs:{rows:[]}};				
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag = '002' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
				} 						
				var k=0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j)) {		
								k = j+1;
								system.alert(this,"Transaksi tidak valid.","Akun Panjar tidak diperkenankan.[Baris : "+k+"]");
								return false;						
							}
						}													
					}
				}				
				if (parseFloat(this.periodePJ) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode panjar.["+this.periodePJ+"]");
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
					sql.add("update gr_pb_m set ref2 = '-' where ref2='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_panjarptg_m where no_ptg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_panjarptg_j where no_ptg='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where modul='PJPTG' and no_bukti='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from anggaran_m where no_agg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from anggaran_d where no_agg ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from rra_pdrk_m where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from rra_pdrk_d where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("delete from gr_bmhd_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;	
					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			if (m=="01") this.Aperiode = "A";
			if (m=="02") this.Aperiode = "B";
			if (m=="03") this.Aperiode = "C";
			if (m=="04") this.Aperiode = "D";
			if (m=="05") this.Aperiode = "E";
			if (m=="06") this.Aperiode = "F";
			if (m=="07") this.Aperiode = "G";
			if (m=="08") this.Aperiode = "H";
			if (m=="09") this.Aperiode = "I";
			if (m=="10") this.Aperiode = "J";
			if (m=="11") this.Aperiode = "K";
			if (m=="12") this.Aperiode = "L";			
		}
		else {
			this.e_periode.setText(this.app._periode);		
			if (m=="13") this.Aperiode = "M";			
			if (m=="14") this.Aperiode = "N";			
			if (m=="15") this.Aperiode = "O";			
			if (m=="16") this.Aperiode = "P";						
		}	
		if (this.stsSimpan == 1) this.doClick();
	},	
	doChange:function(sender){		
		if (sender == this.cb_pp && this.cb_pp.getText()!="")
			this.cb_buat.setSQL("select nik, nama from karyawan where  kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Panjar",true);			
		if (sender == this.cb_buat && this.cb_buat.getText()!="" && this.stsSimpan == 1)
			this.cb_panjar.setSQL("select a.no_pb, a.keterangan from gr_pb_m a inner join gr_spb2_m b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi and b.no_kas <>'-' "+
								  "where a.ref2='-' and a.modul in ('PJAJUBMHD') and a.nik_buat='"+this.cb_buat.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_pb","keterangan"],false,["Bukti","Keterangan"],"and","Bukti Panjar",true);			
		
		
		if (sender == this.cb_panjar && this.cb_panjar.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.periode,a.kode_curr,a.kurs,a.nilai_curr,a.ref1 as akun_panjar,a.no_ver "+
			           "from gr_pb_m a where a.no_pb='"+this.cb_panjar.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.periodePJ = line.periode;
					this.c_curr.setText(line.kode_curr);
					this.e_kurs.setText(floatToNilai(line.kurs));
					this.e_nilaiPJ.setText(floatToNilai(line.nilai_curr));
					this.akunPJ = line.akun_panjar;
					this.noVerPJ = line.no_ver;
				} 
			}	

			var data = this.dbLib.getDataProvider(
						"select c.no_bmhd,c.keterangan,c.akun_hutang,c.nilai,c.nilai / c.kurs as nilai_curr  "+
						"from gr_pb_m a  inner join gr_bmhd_d c on a.no_pb=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+						
						"where a.no_pb='"+this.cb_panjar.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.cb_bmhd.setText(line.no_bmhd);		
					this.cb_akunhut.setText(line.akun_hutang);					
					this.e_ket2.setText(line.keterangan);	
					this.e_bmhdcurr.setText(floatToNilai(line.nilai_curr));				
					this.e_bmhd.setText(floatToNilai(line.nilai));				
				} 
			}
			var strSQL = "select sum(case dc when 'D' then nilai else -nilai end) as saldo "+
						 "from gr_bmhd_d where no_bukti <> '"+this.cb_panjar.getText()+"' and no_bmhd='"+this.cb_bmhd.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) {
					this.e_saldo.setText(floatToNilai(line.saldo));					
				}
			}
			
			if (this.stsSimpan == 1) {
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr "+
							"from gr_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						
							"where a.jenis = 'BEBAN' and a.no_pb = '"+this.cb_panjar.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);			
				this.sg.validasi();
			}
		}
		
		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg.validasi();
			}
			else {
				this.e_kurs.setReadOnly(false); this.e_kurs.setText("0"); this.sg.validasi();
			}
		}
		if (sender == this.e_kurs) {
			this.sg.validasi();
			var bmhdIDR = nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.e_bmhdcurr.getText());
			this.e_bmhd.setText(floatToNilai(bmhdIDR));
		}	
		if (sender == this.e_bmhdcurr) {
			var bmhdIDR = nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.e_bmhdcurr.getText());
			this.e_bmhd.setText(floatToNilai(bmhdIDR));
		}
		if (sender == this.e_bmhd) {
			this.sg.validasi();
		}
	},		
	doClick:function(sender){
		if (this.stsSimpan == 0) {
		
		
		}
		this.stsSimpan = 1;
		if (this.e_periode.getText()!= "" ) {							
			var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2)+"/";						
			var data = this.dbLib.getDataProvider("select isnull(max(substring(no_ptg,4,20)),0) as no_ptg from gr_panjarptg_m where no_ptg like '______"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_ptg == "0") this.e_nb.setText("PTG001"+AddFormat+this.cb_pp.getText());
					else {
						var idx = parseFloat(line.no_ptg.substr(0,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText("PTG"+nu+AddFormat+this.cb_pp.getText());
					}
				} 
			}
			this.e_dok.setFocus();
		}		
	},
	doChangeCell: function(sender, col, row){		
		if (col == 2 || col == 4) {			
			if (this.sg.cells(2,row) != "" && this.sg.cells(4,row) != "" && this.e_kurs.getText() != "") {				
				this.sg.cells(5,row,Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(4,row))));
				this.sg.validasi();			
			}
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);					
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}		
		sender.onChange.set(this,"doChangeCell");			
	},	
	doNilaiChange: function(){
		try{
			var totCurr = tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != "" && this.e_kurs.getText() != ""){
					this.sg.cells(5,i,floatToNilai(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(4,i))));					
					if (this.sg.cells(2,i).toUpperCase() == "D") {
						totCurr += nilaiToFloat(this.sg.cells(4,i));
						tot += nilaiToFloat(this.sg.cells(5,i));
					}
					if (this.sg.cells(2,i).toUpperCase() == "C") {
						totCurr -= nilaiToFloat(this.sg.cells(4,i));
						tot -= nilaiToFloat(this.sg.cells(5,i));
					}									
				}
			}			
			
			totCurr = totCurr + nilaiToFloat(this.e_bmhdcurr.getText());							
			var nilaiKas = nilaiToFloat(this.e_nilaiPJ.getText()) - totCurr;
			this.e_nilaiCurr.setText(floatToNilai(totCurr));

			tot = tot + nilaiToFloat(this.e_bmhd.getText());
			this.e_nilai.setText(floatToNilai(tot));
			this.e_kas.setText(floatToNilai(nilaiKas));

		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					this.sg.cells(2,row,"D");
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
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					if (this.app._userStatus=="A")
					{
						var sql="select a.kode_akun,a.nama "+
								"from masakun a "+
								"where a.kode_lokasi='"+this.app._lokasi+"'  and a.block= '0' ";
						var sql2="select count(a.kode_akun) "+
								"from masakun a "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and a.block= '0' ";
					}
					else
					{
						var sql="select a.kode_akun,a.nama "+
								"from masakun a "+
								"inner join relakun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"inner join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' and a.block= '0' "+
								"group by a.kode_akun,a.nama ";
						var sql2="select count(a.kode_akun) from (select a.kode_akun "+
								"from masakun a "+
								"inner join relakun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"inner join karyawan_pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and c.nik='"+this.app._userLog+"' and a.block= '0' "+
								"group by a.kode_akun) a ";	
					}	
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined,sql,sql2,
													["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);					
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
			if (this.sg.rowValid(i) && this.sg.cells(2,i) != "-"){				
				if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(5,i));
				else nilai = nilaiToFloat(this.sg.cells(5,i)) * -1;				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(3,idx));
					total = total + nilai;
					this.sg2.setCell(3,idx,total);
				}
			}
		}
		
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			
			if (this.periodePJ == this.e_periode.getText()) {
				if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg8('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.periodePJ+"','"+this.noVerPJ+"') as gar ",true);//this.cb_panjar.getText() ---> no panjar sudah dinolkan dgn DC
				else var data = this.dbLib.getDataProvider("select fn_cekagg8('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);		    
			}
			else {
				if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg9('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.noVerPJ+"') as gar ",true);			
				else var data = this.dbLib.getDataProvider("select fn_cekagg9('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);		    
			}
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(2,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(3,i));
				this.sg2.cells(4,i,floatToNilai(sls));
			}
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_siaga_rptPanjarPtg";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ptg='"+this.e_nb.getText()+"' ";
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
					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); 
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.c_curr.setText("IDR");
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			if (this.stsSimpan==1) this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_ptg,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai_curr "+
					 "from gr_panjarptg_m a inner join gr_pb_m b on a.no_panjar=b.no_pb and b.modul='PJAJUBMHD' "+
					 "where a.kode_pp='"+this.app._kodePP+"' and a.progress in ('0','R','V') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
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
			this.sg3.appendData([line.no_ptg,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai_curr)]); 
		}
		this.sg3.setNoUrut(start);
		this.page = 0;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
		this.page = page-1;
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;			
				var baris = (this.page * 20) + row; 
				this.e_nb.setText(this.sg3.cells(0,baris));								
				
				var data = this.dbLib.getDataProvider(
						   "select a.no_panjar,a.tanggal,a.periode,a.no_dokumen,a.keterangan,a.nik_buat,a.nik_app,a.kode_curr,a.kurs,a.kode_pp,a.nilai_kas, "+
						   "       aa.nilai_curr as nilai_pj,aa.keterangan as ket_pj,aa.ref1 as akun_panjar,a.nik_tahu "+
						   "from gr_panjarptg_m a "+
						   "    inner join gr_pb_m aa on a.no_panjar=aa.no_pb and a.kode_lokasi=aa.kode_lokasi "+
						   "where a.no_ptg='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.akunPJ = line.akun_panjar;
						this.dp_d1.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);					
						this.cb_pp.setText(line.kode_pp);					
						this.cb_buat.setText(line.nik_buat);					
						this.cb_app.setText(line.nik_app);					
						this.c_curr.setText(line.kode_curr);
						this.e_kurs.setText(floatToNilai(line.kurs));
						this.cb_tahu.setText(line.nik_tahu);
						this.cb_panjar.setSQL("select a.no_pb, a.keterangan from gr_pb_m a inner join gr_spb2_m b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi and b.no_kas <>'-' "+
								  			  "where a.ref2='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_pb","keterangan"],false,["Bukti","Keterangan"],"and","Bukti Panjar",true);			
						
						this.cb_panjar.setText(line.no_panjar,line.ket_pj);					
						this.e_nilaiPJ.setText(floatToNilai(line.nilai_pj));
						this.e_kas.setText(floatToNilai(line.nilai_kas));
					} 
				}		
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr "+
							"from gr_panjarptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							
							"where a.jenis = 'BEBAN' and a.no_ptg = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);			
				this.sg.validasi();
					
						
			}									
		} catch(e) {alert(e);}
	}
});