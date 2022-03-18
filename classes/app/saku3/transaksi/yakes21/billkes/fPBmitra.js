window.app_saku3_transaksi_yakes21_billkes_fPBmitra = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_billkes_fPBmitra.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_billkes_fPBmitra";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","PB Hutang Mitra / IF", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data PB","List PB"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Hutang","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,200,80,100]],
					readOnly:true,
					colFormat:[[3,4],[cfNilai,cfButton]],					
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Uraian", maxLength:150});									
		this.e_bruto = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Total Tagihan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.c_dana = new saiCB(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"Pendanaan", items:["PUSAT","IFUND"], readOnly:true,tag:1,change:[this,"doChange"]});						
		this.e_pajak = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Pajak", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.cb_hutang = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"No Hutang",tag:1,multiSelection:false,change:[this,"doChange"]}); 		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Net Tagihan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,315], childPage:["Data PB","Data Rekening","Otorisasi","File Dok","Cattn. Verf."]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,					
					colTitle:["No PB","B. Trans","Nilai Net BP","Nilai Net CC","Total","Pajak"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,100,120]],
					columnReadOnly:[true,[1,2,3,4,5],[0]],
					colFormat:[[2,3,4,5],[cfNilai,cfNilai,cfNilai,cfNilai]],															
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,					
		            colTitle:["B. Trans","Kd Mitra","Nama Mitra","Bank","No Rekening","Nama Rekening","Net BP","Net CC","Total","Pajak"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,70,100,100,150,120,200,200,70,80]],
					colHide:[[1],[true]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					buttonStyle:[[0],[bsAuto]],colFormat:[[6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai]],										
					nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		

		this.cb_if = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,10,220,20],caption:"Pemegang IF",tag:9,readOnly:true,multiSelection:false,change:[this,"doChange"],visible:true}); 		
		this.e_saldoif = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"Saldo IF", tag:9, tipeText:ttNilai, text:"0", readOnly:true,visible:true});

		this.cb_buat = new saiCBBL(this.pc1.childPage[2],{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});								
		this.cb_ver = new saiCBBL(this.pc1.childPage[2],{bound:[20,17,220,20],caption:"NIK Fiatur", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"NIK Menyetujui", multiSelection:false, maxLength:10, tag:2});										
		
		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[3],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

		this.sgctt = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
					colTitle:["Catatan"],
					colWidth:[[0],[100]],					
					readOnly:true,autoAppend:false,defaultRow:1});
				

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
					
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

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
								
			this.c_dana.setText("PUSAT");
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.isiCBnik();

			this.cb_buat.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ver.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_buat.setText(this.app._userLog);
			this.doLoadCtt(this.e_nb.getText());

			this.ppBBCC = "";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPBPCC') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPBPCC") this.ppBBCC = line.flag;											
				}
			}

			this.akunHutIF = "-";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('SAPHIF') ",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "SAPHIF") this.akunHutIF = line.flag;											
				}
			}

			this.c_dana.setText("PUSAT");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_billkes_fPBmitra.extend(window.childForm);
window.app_saku3_transaksi_yakes21_billkes_fPBmitra.implement({	
	isiCbHutang: function() {
		//dokumen = blm PB
		if (this.c_dana.getText() == "PUSAT") var filter = " kode_lokasi <> kode_loktuj and ";
		else var filter = " kode_lokasi = kode_loktuj and ";
		this.cb_hutang.setSQL("select no_hutang,keterangan from yk_hutang_m where "+filter+" progress='1' and posted='T' and periode<='"+this.e_periode.getText()+"' and no_dokumen='-' and kode_lokasi='"+this.app._lokasi+"' and modul='HUTKES'",
			["no_hutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Akru",true);
	},
	isiCBnik: function() {
		try {			
			// this.cb_if.setSQL("select a.nik, a.nama from karyawan a "+
			// 				"inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+								
			// 				"where b.kode_lokasi='"+this.app._lokasi+"'",
			// ["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			

			this.cb_if.setSQL("select distinct a.nik, a.nama from karyawan a "+
							  "inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+								
							  "inner join karyawan_pp c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi  "+
							  "inner join karyawan_pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
							  "where d.nik='"+this.app._userLog+"' and d.kode_lokasi='"+this.app._lokasi+"'",
				["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			

			//ut default sesuai karyawan PP pemegang IF dan yg login					
			var strSQL = "select distinct a.nik,b.no_kas from karyawan a "+
						"		inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+
						"		inner join karyawan_pp c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi  "+
						"where c.kode_pp='"+this.app._kodePP+"' and c.kode_lokasi='"+this.app._lokasi+"'";							  
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.noKasOpen = line.no_kas;
					this.cb_if.setText(line.nik);
					this.nikIF = this.cb_if.getText();
				}
				else {
					this.noKasOpen = "-";
					this.cb_if.setText("");
					this.nikIF = "";
				}
			}		
		}
		catch(e){
			alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
					"select kode_jenis, nama  from pbh_dok_ver  ", 
					"select count(*) from pbh_dok_ver ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {								
						sql.add("delete from yk_rekon_m where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_rekon_d where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update yk_hutang_m set no_dokumen='-',progress='1' where no_hutang='"+this.cb_hutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
						sql.add("update yk_hutang_d set no_pb='-',progress='0' where no_hutang='"+this.cb_hutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("delete from pbh_pb_j where no_pb in (select no_pb from pbh_pb_m where no_hutang='"+this.cb_hutang.getText()+"') ");						
						sql.add("delete from pbh_rek where no_bukti in (select no_pb from pbh_pb_m where no_hutang='"+this.cb_hutang.getText()+"')");																								
						sql.add("delete from pbh_pb_m where no_hutang = '"+this.cb_hutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								

						sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
						sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					}					
					
					sql.add("update yk_hutang_m set no_dokumen='"+this.e_nb.getText()+"',progress='2' where no_hutang='"+this.cb_hutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					
					//tidak untuk diproteksi di closing ,hanya utk link
					sql.add("insert into yk_rekon_m(no_rekon,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user,no_app,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_hutang.getText()+"','"+this.e_ket.getText()+"','"+this.ppBBCC+"','HUTKES','"+this.c_dana.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','Z',getdate(),'"+this.app._userLog+"','"+this.cb_ver.getText()+"','Z')");	

					if (this.c_dana.getText() == "PUSAT") {
						for (var i = 0; i < this.sg1.rows.getLength();i++) {
							if (this.sg.rowValid(i)) {								
								sql.add("insert into yk_rekon_d(no_rekon,kode_lokasi,periode,no_hutang,bank_trans,no_kas,modul,nilai_bp,nilai_cc,pajak) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_hutang.getText()+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(0,i)+"','HUTKES',"+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+","+nilaiToFloat(this.sg1.cells(5,i))+")");

								sql.add("update yk_hutang_d set no_pb='"+this.sg1.cells(0,i)+"',progress='1' where bank_trans='"+this.sg1.cells(1,i)+"' and no_hutang='"+this.cb_hutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									

								sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_buat,no_hutang,no_spb,no_ver,akun_hutang,nik_ver,bank_trans,no_nota,no_kas) values  "+
										"('"+this.sg1.cells(0,i)+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.sg1.cells(4,i))+",'PBHKES','0','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_hutang.getText()+"','-','-','-','"+this.cb_ver.getText()+"','"+this.sg1.cells(1,i)+"','-','-')");	

								sql.add("insert into pbh_rek(no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai,kode_vendor,nu,bank_trans) "+
										"select '"+this.sg1.cells(0,i)+"',a.kode_lokasi,'PBHKES',e.nama_rek,e.no_rek,e.bank+' '+e.cabang,b.nama,a.nilai_bp+a.nilai_cc+a.pajak,a.pajak,a.nilai_bp+a.nilai_cc+a.pajak,a.kode_vendor,1,e.bank_trans "+
										"from yk_hutang_d a "+
										"inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
										"inner join vendor_rek e on b.kode_vendor=e.kode_vendor and b.kode_lokasi=e.kode_lokasi and e.status='1' "+
										"where a.no_hutang='"+this.cb_hutang.getText()+"' and a.bank_trans='"+this.sg1.cells(1,i)+"'");

								sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs)  "+									
										"select '"+this.sg1.cells(0,i)+"','"+this.cb_hutang.getText()+"','"+this.dp_d1.getDateString()+"',1,case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end as kode_akun, "+
										"case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end as ket,'D' as dc,  "+
										"sum(a.nilai) as nilai,'"+this.ppBBCC+"','-',a.kode_lokasi,'PBHKES',  "+ 
										"case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end as jenis,'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1  "+
										"from yk_bill_d a "+
										"			inner join yk_loker ff on a.loker=ff.loker "+
										"			inner join cust f on ff.kode_cust=f.kode_cust "+						
										"			inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
										"			inner join vendor_rek e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi and e.status='1' "+
										"			inner join vendor_klp bb on bb.kode_klpvendor=b.kode_klpvendor and bb.kode_lokasi=b.kode_lokasi  "+									
										"			inner join yk_bill_m d on a.no_bill=d.no_bill and a.kode_lokasi=d.kode_lokasi  "+							
										"where d.no_hutang ='"+this.cb_hutang.getText()+"' and e.bank_trans='"+this.sg1.cells(1,i)+"' and d.kode_lokasi='"+this.app._lokasi+"' and (a.nilai+a.pph) <> 0 "+
										"group by case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end, "+
										"         case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end, "+
										"         case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end,a.kode_lokasi "+

										"union all "+

										"select '"+this.sg1.cells(0,i)+"','"+this.cb_hutang.getText()+"','"+this.dp_d1.getDateString()+"',999,b.akun_pph,'HUTANG PPH '+b.nama as ket,'C' as dc, "+
										"sum(a.pph) as nilai,'"+this.ppBBCC+"','-',a.kode_lokasi,'PBHKES','PAJAK' as jenis,'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
										"from yk_bill_d a "+							
										"	   		inner join yk_bill_m d on a.no_bill=d.no_bill and a.kode_lokasi=d.kode_lokasi "+
										"     		inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
										"			inner join vendor_rek e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi and e.status='1' "+
										"where d.no_hutang ='"+this.cb_hutang.getText()+"' and e.bank_trans='"+this.sg1.cells(1,i)+"' and d.kode_lokasi='"+this.app._lokasi+"' and a.pph <> 0 "+
										"group by b.akun_pph,b.nama,a.kode_lokasi ");										
							}						
						}
					}
					//IFUND
					else {
						//satu baris utk ifund
						sql.add("insert into yk_rekon_d(no_rekon,kode_lokasi,periode,no_hutang,bank_trans,no_kas,modul,nilai_bp,nilai_cc,pajak) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_hutang.getText()+"','NONBT','"+this.e_nb.getText()+"','HUTKES',"+nilaiToFloat(this.sg1.cells(2,0))+","+nilaiToFloat(this.sg1.cells(3,0))+","+nilaiToFloat(this.sg1.cells(5,0))+")");
								
						sql.add("update yk_hutang_d set no_pb='"+this.e_nb.getText()+"',no_kas='"+this.e_nb.getText()+"',progress='2' where no_hutang='"+this.cb_hutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	

						//akun diisi akun HUTIF utk muncul di reimburse, krn akun hutang bisa HUTPENSIUN dan HUTPEGAWAI (dua akun)
						sql.add("insert into if_aju_m(no_aju,kode_lokasi,periode,tgl_input,user_input,tanggal,tgl_kuitansi,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,sts_pajak,npajak,no_app,progress,nik_app,no_reim,no_kasopen,posted,nik_setuju, nilai_dpp,persen, nik_if,form) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','IFAJU','"+this.akunHutIF+"','"+this.ppBBCC+"','-','"+
								this.e_ket.getText()+"',"+nilaiToFloat(this.e_bruto.getText())+",'NON',"+nilaiToFloat(this.e_pajak.getText())+",'-','0','"+this.cb_app.getText()+"','-','"+this.noKasOpen+"','X','"+this.cb_app.getText()+"', "+nilaiToFloat(this.e_bruto.getText())+",0,'"+this.cb_if.getText()+"','RESTITUSI')");
											
						sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
								"('"+this.e_nb.getText()+"','"+this.cb_hutang.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',99999,'"+this.e_periode.getText()+"','"+this.akunHutIF+"','"+this.ppBBCC+"','-','C','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'HUTIF')");

						sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis)  "+
								"select '"+this.e_nb.getText()+"','"+this.cb_hutang.getText()+"',a.kode_lokasi,'"+this.dp_d1.getDateString()+"',1,'"+this.e_periode.getText()+"', case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end as kode_akun, '"+this.ppBBCC+"','-','D', "+
								"case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end as ket, "+
								"sum(a.nilai) as nilai, "+ 
								"case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end as jenis "+
								"from yk_bill_d a "+
								"			inner join yk_loker ff on a.loker=ff.loker "+
								"			inner join cust f on ff.kode_cust=f.kode_cust "+						
								"			inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+								
								"			inner join vendor_klp bb on bb.kode_klpvendor=b.kode_klpvendor and bb.kode_lokasi=b.kode_lokasi  "+									
								"			inner join yk_bill_m d on a.no_bill=d.no_bill and a.kode_lokasi=d.kode_lokasi  "+							
								"where d.no_hutang ='"+this.cb_hutang.getText()+"' and d.kode_lokasi='"+this.app._lokasi+"' and (a.nilai+a.pph) <> 0 "+
								"group by case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end, "+
								"         case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end, "+
								"         case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end,a.kode_lokasi "+

								"union all "+
								"select '"+this.e_nb.getText()+"','"+this.cb_hutang.getText()+"',a.kode_lokasi,'"+this.dp_d1.getDateString()+"',999,'"+this.e_periode.getText()+"',b.akun_pph,'"+this.ppBBCC+"','-','C' as dc,'HUTANG PPH '+b.nama as ket,  "+
								"sum(a.pph) as nilai,'PAJAK' as jenis "+
								"from yk_bill_d a "+							
								"	   		inner join yk_bill_m d on a.no_bill=d.no_bill and a.kode_lokasi=d.kode_lokasi "+
								"     		inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+								
								"where d.no_hutang ='"+this.cb_hutang.getText()+"' and d.kode_lokasi='"+this.app._lokasi+"' and a.pph <> 0 "+
								"group by b.akun_pph,b.nama,a.kode_lokasi "
						);								
					}

									
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','PBHKES','"+this.e_nb.getText()+"')");															
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
					setTipeButton(tbAllFalse);
					this.sg.clear(1);
					this.sg1.clear(1);
					this.sg3.clear(1);
					this.sgUpld.clear(1);
					this.sgFile.clear(1);		
					if (this.stsSimpan==1) {
						this.isiCBnik();						
					}

				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";
				this.sg.validasi();
				
				if (this.c_dana.getText() == "IFUND" && nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldoif.getText()) ) {
					system.alert(this,"Nilai tidak valid.","Nilai melebihi Saldo IF.");
					return false;
				}

				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai PB tidak valid.","Nilai tidak boleh nol atau kurang.");
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

					sql.add("delete from yk_rekon_m where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_rekon_d where no_rekon = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_hutang_m set no_dokumen='-',progress='1' where no_hutang='"+this.cb_hutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					sql.add("update yk_hutang_d set no_pb='-',progress='0' where no_hutang='"+this.cb_hutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
					sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("delete from pbh_pb_j where no_pb in (select no_pb from pbh_pb_m where no_hutang='"+this.cb_hutang.getText()+"') ");						
					sql.add("delete from pbh_rek where no_bukti in (select no_pb from pbh_pb_m where no_hutang='"+this.cb_hutang.getText()+"')");																								
					sql.add("delete from pbh_pb_m where no_hutang = '"+this.cb_hutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								

					sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
				
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				}
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			
			if (this.stsSimpan == 1) {				
				this.doClick();						
			}
		}
		catch(e){
			alert(e);
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1);				
				this.sg3.clear(1);		
				this.sgUpld.clear(1);
				this.sgFile.clear(1);				
				this.e_nilai.setText("0");							
			}				
			this.stsSimpan = 1; 
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_rekon_m","no_rekon",this.app._lokasi+"-MB"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},			
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "INPROG") this.sg.cells(0,row,"PROSES");
		else this.sg.cells(0,row,"INPROG");		
	},		
	doChange: function(sender) {
		try {
			if (sender == this.c_dana && this.c_dana.getText()!="") {
				this.isiCbHutang();

				if (this.c_dana.getText() == "PUSAT") {
					this.cb_if.hide();
					this.e_saldoif.hide();
				}
				else {
					this.cb_if.show();
					this.e_saldoif.show();
				}
			}

			if (sender == this.cb_hutang && this.cb_hutang.getText()!="") {
				if (this.stsSimpan == 1) {
					if (this.c_dana.getText() == "PUSAT") {
						var strSQL = "select e.bank_trans,sum(a.nilai_bp) as bp,sum(a.nilai_cc) as cc,sum(a.nilai_bp+a.nilai_cc) as total, sum(a.pajak+a.pajak_bp) as pajak "+
									"from yk_hutang_d a "+							 
									"	inner join vendor_rek e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi and e.status='1' "+
									"where a.no_hutang ='"+this.cb_hutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' group by e.bank_trans";							
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg1.clear();								
							for (var i in data.rs.rows){
								line = data.rs.rows[i];	
								var j = parseFloat(i)+1;
								var noPB = this.cb_hutang.getText()+"/"+j;						
								this.sg1.appendData([noPB,line.bank_trans,floatToNilai(line.bp),floatToNilai(line.cc),floatToNilai(line.total),floatToNilai(line.pajak)]);
							}
						}
					}
					else {						
						var strSQL = "select sum(a.nilai_bp) as bp,sum(a.nilai_cc) as cc,sum(a.nilai_bp+a.nilai_cc) as total, sum(a.pajak+a.pajak_bp) as pajak "+
									"from yk_hutang_d a "+							 									
									"where a.no_hutang ='"+this.cb_hutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";							
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg1.clear();								
							for (var i in data.rs.rows){
								line = data.rs.rows[i];	
								var noPB = this.cb_hutang.getText();						
								this.sg1.appendData([noPB,"NONBT",floatToNilai(line.bp),floatToNilai(line.cc),floatToNilai(line.total),floatToNilai(line.pajak)]);								
							}
						}
					}
				}

				var strSQL = "select e.bank_trans,a.kode_vendor,b.nama,e.bank+'  '+e.cabang as bank,e.no_rek,e.nama_rek,a.nilai_bp,a.nilai_cc,a.nilai_bp+a.nilai_cc as total,a.pajak+a.pajak_bp as pajak "+
							 "from yk_hutang_d a "+
							 "	inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+							 
							 "	inner join vendor_rek e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi and e.status='1' "+
							 "where a.no_hutang ='"+this.cb_hutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by e.bank_trans";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.bank_trans,line.kode_vendor,line.nama,line.bank,line.no_rek,line.nama_rek,floatToNilai(line.nilai_bp),floatToNilai(line.nilai_cc),floatToNilai(line.total),floatToNilai(line.pajak)]);
					}
				}
			}

			if (sender == this.cb_if && this.cb_if.getText()!="") {
				var strSQL = "select a.nik_app,a.no_kas,a.nilai - isnull(b.pakai,0) as saldo  "+
							"from if_nik a "+

							"		left join  ("+						
							"			 select a.nik_if,a.kode_lokasi,sum(a.nilai-a.npajak) as pakai "+
							"			 from if_aju_m a "+
							"			 left join if_reim_m b on a.no_reim=b.no_reim and a.kode_lokasi=b.kode_lokasi and b.no_kas <> '-' "+
							"			 where b.no_reim is null and a.nik_if='"+this.cb_if.getText()+"' and a.no_kasopen='"+this.noKasOpen+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju<>'"+this.e_nb.getText()+"' "+
							"			 group by a.nik_if,a.kode_lokasi "+												
							"		) b on a.nik = b.nik_if and a.kode_lokasi=b.kode_lokasi "+

							"where a.jenis='OPERASIONAL' and a.nik ='"+this.cb_if.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'";						   

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						if (this.stsSimpan == 1) {							
							//this.cb_app.setText(line.nik_app);							
						}
						this.nikIF = this.cb_if.getText();
						this.noKasOpen = line.no_kas;
						this.e_saldoif.setText(floatToNilai(line.saldo));											
					}
				}
			}

		}
		catch(e) {
			alert(e);
		}
	},
	doNilaiChange: function(){
		try{
			var bruto = pajak = tot = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){
					tot += nilaiToFloat(this.sg.cells(8,i));	
					pajak += nilaiToFloat(this.sg.cells(9,i));					
				}			
			}	
			bruto = tot+pajak;
			this.e_bruto.setText(floatToNilai(bruto));								
			this.e_pajak.setText(floatToNilai(pajak));								
			this.e_nilai.setText(floatToNilai(tot));								
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}

							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanForm";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbAllFalse);
			this.sg.clear(1); this.sg3.clear(1); this.sg1.clear(1);
			this.sgUpld.clear(1);
			this.sgFile.clear(1);					
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.isiCBnik();					
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){					
		var strSQL = "select a.no_rekon,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.nilai "+
					"from yk_rekon_m a "+
					"	 left join ( "+
					"			select distinct no_dokumen from pbh_pb_m "+
					"			where kode_lokasi ='"+this.app._lokasi+"' and periode='"+this.e_periode.getText()+"' and progress not in ('0','V') "+
					"	 ) b on a.no_rekon=b.no_dokumen "+		 
					"where b.no_dokumen is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'HUTKES' and a.jenis = 'PUSAT' "+
					
					"union all "+
					"select a.no_rekon,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
					"from yk_rekon_m a "+
					"	 inner join if_aju_m b on a.no_rekon=b.no_aju "+
					"where b.progress in ('0','R') and b.posted='X' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'HUTKES' and a.jenis = 'IFUND' "+

					"order by no_rekon";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/100));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 100;
		var finish = (start + 100 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+100);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_rekon,line.tgl,line.no_dokumen,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) {
				this.doDoubleClick3(this.sg3,0,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;											
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.doLoadCtt(this.e_nb.getText());

				var strSQL = "select a.jenis,a.no_dokumen as no_hutang,a.tanggal,a.keterangan,a.nik_buat,a.nik_setuju as nik_app,a.no_app as nik_ver "+
							 "from yk_rekon_m a "+
							 "where a.no_rekon = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";								 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.cb_hutang.setSQL("select no_hutang,keterangan from yk_hutang_m where no_hutang='"+line.no_hutang+"' and kode_lokasi='"+this.app._lokasi+"' and modul='HUTKES'",["no_hutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Akru",true);	
						this.cb_hutang.setText(line.no_hutang);
						this.c_dana.setText(line.jenis);																
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.cb_app.setText(line.nik_app);
						this.cb_buat.setText(line.nik_buat);
						this.cb_ver.setText(line.nik_ver);																							
					}
				}	

				var strSQL = "select b.no_pb,e.bank_trans,sum(a.nilai_bp) as bp,sum(a.nilai_cc) as cc,sum(a.nilai_bp+a.nilai_cc) as total, sum(a.pajak) as pajak "+
							"from yk_hutang_d a "+							 
							"	inner join vendor_rek e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi and e.status='1' "+
							"	inner join pbh_pb_m b on a.no_hutang=b.no_hutang and a.bank_trans=b.bank_trans "+
							"where a.no_hutang ='"+this.cb_hutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' group by b.no_pb,e.bank_trans";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();								
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																		
						this.sg1.appendData([line.no_pb,line.bank_trans,floatToNilai(line.bp),floatToNilai(line.cc),floatToNilai(line.total),floatToNilai(line.pajak)]);
					}
				}
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(							 
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);

			}									
		} catch(e) {alert(e);}
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal "+
						 "from pbh_ver_m "+
						 "where no_bukti='"+kode+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 350px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select catatan,no_ver, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from pbh_ver_m "+
								  "where no_bukti='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"' "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_ver+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}
});