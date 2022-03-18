window.app_saku3_transaksi_yakes21_dakem_fReimDakem = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_dakem_fReimDakem.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_dakem_fReimDakem";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Reimburse IF Dakem", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Reimburse","List Reimburse"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,500,80,100]],
					readOnly:true,
					colFormat:[[3,4],[cfNilai,cfButton]],					
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Status",items:["IFREIM","IFCLOSE"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Pemegang IF",tag:2,multiSelection:false,change:[this,"doChange"]}); 								
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Saldo ImprestFund", tag:2, tipeText:ttNilai, text:"0",readOnly:true});
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 								
		this.e_unpos = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Ni. OnProgress", tag:2, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Uraian", maxLength:150});									
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Ni. Reimburse", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,282], childPage:["Reimburse","OnProgress","Otorisasi","Rekening","File Dok"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,					
		            colTitle:["Status","No Pengajuan","Tanggal","Uraian","Nilai","Nikes / Akun","Nama Nikes / PP","Ahli Waris / DRK","File Dok"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[70,150,150,150,100,250,70,100,70]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					buttonStyle:[[0],[bsAuto]],colFormat:[[4,8],[cfNilai,cfButton]],
					colAlign:[[8],[alCenter]],
					click:[this,"doSgBtnClick"],
					picklist:[[0],[new portalui_arrayMap({items:["PROSES","INPROG"]})]], dblClick:[this,"doDoubleClick"],
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		

		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,					
					colTitle:["Status","No Pengajuan","Tanggal","Uraian","Nilai","Nikes / Akun","Nama / PP","Ahli Waris / DRK","File Dok"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[70,150,150,150,100,250,70,100,70]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					buttonStyle:[[0],[bsAuto]],colFormat:[[4,8],[cfNilai,cfButton]],
					colAlign:[[8],[alCenter]],	
					click:[this,"doSgBtnClick"],								
					nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});		
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[2],{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});								
		this.cb_ver = new saiCBBL(this.pc1.childPage[2],{bound:[20,17,220,20],caption:"NIK Verifikator", multiSelection:false, maxLength:10, tag:2});								

		this.e_banktrans = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,450,20],caption:"Bank Transfer",readOnly:true,tag:1});				
		this.e_bank = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,16,450,20],caption:"Bank",readOnly:true,tag:1});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,450,20],caption:"No Rekening", readOnly:true,tag:1});		
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,18,450,20],caption:"Nama Rekening", readOnly:true,tag:1});		

		this.sgUpld = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3],[]],					
					colFormat:[[3],[cfButton]], 
					click:[this,"doSgBtnClickUpld"], colAlign:[[3],[alCenter]],
					readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
					
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
								
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_buat.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ver.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			this.cb_buat.setText(this.app._userLog);

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('SAPHIF')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "SAPHIF") this.akunHutIF = line.flag;								
				}
			}	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_dakem_fReimDakem.extend(window.childForm);
window.app_saku3_transaksi_yakes21_dakem_fReimDakem.implement({	
	doSgBtnClick: function(sender, col, row){
		try{			
			if (col === 8) {
				this.sgUpld.clear();
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a "+
							 "		inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+						
							 "where a.no_bukti = '"+sender.cells(1,row)+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar,"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
				this.pc1.setActivePage(this.pc1.childPage[4]);																		
			}
		}catch(e){
			alert(e);
		}
	},	
	doSgBtnClickUpld: function(sender, col, row){
		try{
			if (col === 3) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},
	isiCBnik: function() {
		try{			
			this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.jenis='DAKEM' "+
							   "where b.flag_aktif='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
			
			var strSQL = "select nik,no_kas from if_nik where flag_aktif='1' and nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"' and jenis='DAKEM'";							  						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.noKasOpen = line.no_kas;				
					this.cb_nik.setText(line.nik);											
				}				
			}	
			
			var strSQL = "select a.kode_pp,a.nik_app,a.nilai - isnull(b.pakai,0) as saldo, a.bank_trans,a.bank,a.no_rek,a.nama_rek,a.akun_if,a.nilai as nilai_if  "+
						"from if_nik a "+

						"		left join  ("+						
						"			 select a.nik_if,a.kode_lokasi,sum(a.nilai-a.npajak) as pakai "+
						"			 from if_aju_m a "+
						"			 left join if_reim_m b on a.no_reim=b.no_reim and a.kode_lokasi=b.kode_lokasi and b.no_kas <> '-' "+
						"			 where b.no_reim is null and a.nik_if='"+this.cb_nik.getText()+"' and a.no_kasopen='"+this.noKasOpen+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"			 group by a.nik_if,a.kode_lokasi "+					
						"		) b on a.nik = b.nik_if and a.kode_lokasi=b.kode_lokasi "+

						"where a.jenis='DAKEM' and a.nik ='"+this.cb_nik.getText()+"' and a.no_kas='"+this.noKasOpen+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.akunIF = line.akun_if; 
					this.nilaiIF = parseFloat(line.nilai_if); 

					this.cb_pp.setText(line.kode_pp);
					this.e_saldo.setText(floatToNilai(line.saldo));								
					this.e_banktrans.setText(line.bank_trans);
					this.e_bank.setText(line.bank);
					this.e_norek.setText(line.no_rek);
					this.e_namarek.setText(line.nama_rek);

					if (this.stsSimpan == 1) this.doLoad();
				}
			}

		}
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){		
		try {
			if (this.cb_nik.getText() != "" && this.e_periode.getText() != "") {
				var data = this.dbLib.getDataProvider(
						"select 'PROSES' as status,a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai-a.npajak as nilai, isnull(f.nikkes,a.kode_akun) as nikkes,isnull(f.nama_nikes,a.kode_pp) as nama_nikes,isnull(f.namaaw,a.kode_drk) as namaaw "+
						"from if_aju_m a "+						
						"	 inner join if_nik e on a.nik_if=e.nik and a.no_kasopen=e.no_kas and e.flag_aktif='1' "+
						"	 left join yk_dakem_d f on a.no_aju=f.kdtrans "+
						"where a.no_kasopen ='"+this.noKasOpen+"' and a.nik_if ='"+this.cb_nik.getText()+"' and a.posted='T' and a.progress = '1'  and a.no_reim='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																	
						this.sg.appendData([line.status.toUpperCase(),line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),line.nikkes,line.nama_nikes,line.namaaw,"File..."]);
					}
				} else this.sg.clear(1);
				
				var data = this.dbLib.getDataProvider(
						"select case progress when '1' then 'ONPRO-PST' else 'ONPRO-APP' end as status,a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai-a.npajak as nilai, isnull(f.nikkes,a.kode_akun) as nikkes,isnull(f.nama_nikes,a.kode_pp) as nama_nikes,isnull(f.namaaw,a.kode_drk) as namaaw  "+
						"from if_aju_m a "+						
						"	 inner join if_nik e on a.nik_if=e.nik and a.no_kasopen=e.no_kas and e.flag_aktif='1' "+
						"	 left join yk_dakem_d f on a.no_aju=f.kdtrans "+
						"where a.no_kasopen ='"+this.noKasOpen+"' and a.nik_if ='"+this.cb_nik.getText()+"' and a.posted<>'T' and a.no_reim='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																	
						this.sg4.appendData([line.status.toUpperCase(),line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),line.nikkes,line.nama_nikes,line.namaaw,"File..."]);
					}
				} else this.sg4.clear(1);

				this.sg.validasi();
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {						
						sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("delete from if_reim_m where no_reim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("update if_aju_m set no_reim='-',progress='1' where no_reim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
						sql.add("update if_nik set flag_aktif='1', no_flag='-' where no_flag='"+this.e_nb.getText()+"' and no_kas='"+this.noKasOpen+"'");
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					}					
					
					if (this.c_status.getText() == "IFREIM") 
						var niFinal = nilaiToFloat(this.e_nilai.getText());
					else var niFinal = nilaiToFloat(this.e_saldo.getText()) * -1;

					sql.add("insert into if_reim_m (no_reim, no_kas, no_dokumen, tanggal, keterangan, kode_curr, kurs, akun_hutang, nik_buat, kode_lokasi, kode_pp, modul, nilai, periode, nik_user, tgl_input, nik_app) values "+
							"('"+this.e_nb.getText()+"', '-', '"+this.noKasOpen+"', '"+this.dp_d1.getDateString()+"', '"+this.e_ket.getText()+"', 'IDR', 1, '"+this.akunHutIF+"', '"+this.cb_nik.getText()+"', '"+this.app._lokasi+"', '"+this.app._kodePP+"', '"+this.c_status.getText()+"', "+niFinal+", '"+this.e_periode.getText()+"', '"+this.app._userLog+"', getdate(), '"+this.cb_app.getText()+"')");

					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "PROSES") {
							sql.add("update if_aju_m set no_reim='"+this.e_nb.getText()+"',progress='2' where no_aju='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}

					sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_buat,no_hutang,no_spb,no_ver,akun_hutang,nik_ver,bank_trans,no_nota,no_kas) values  "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+niFinal+",'"+this.c_status.getText()+"','0','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.cb_buat.getText()+"','"+this.e_nb.getText()+"','-','-','"+this.akunHutIF+"','"+this.cb_ver.getText()+"','"+this.e_banktrans.getText()+"','-','-')");					
					sql.add("insert into pbh_rek(kode_vendor,nu,no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) values "+
							"('"+this.cb_nik.getText()+"',1,'"+this.e_nb.getText()+"','"+this.app._lokasi+"','IFREIM','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.cb_nik.rightLabelCaption+"',"+niFinal+",0,"+niFinal+")");
					
					sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.akunHutIF+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','IFREIM','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
					if (this.c_status.getText() == "IFCLOSE") {
						sql.add("update if_nik set flag_aktif='0', no_flag='"+this.e_nb.getText()+"' where nik='"+this.cb_nik.getText()+"' and flag_aktif='1' and no_kas='"+this.noKasOpen+"'");
						sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',998,'"+this.akunIF+"','"+this.e_ket.getText()+"','C',"+this.nilaiIF+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','IFREIM','AKUNIF','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
					}		
					
					sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) "+
							"select '"+this.e_nb.getText()+"',a.no_gambar,a.nu,a.kode_jenis,a.kode_lokasi,'IFREIM',no_bukti "+
							"from pbh_dok a "+
							"inner join if_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_reim='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");															

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
					this.sg3.clear(1);
					if (this.stsSimpan==1) this.isiCBnik();
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";
				this.sg.validasi();
				
				if (this.c_status.getText() == "IFREIM" && nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai Reimburse tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;
				}
				if (this.c_status.getText() == "IFCLOSE" ) {					
					if (nilaiToFloat(this.e_nilai.getText()) < 0) {
						system.alert(this,"Nilai Penutupan tidak valid.","Nilai tidak boleh kurang dari nol.");
						return false;
					}
					if (nilaiToFloat(this.e_unpos.getText()) > 0) {
						system.alert(this,"Nilai Penutupan tidak valid.","Terdapat data pemakaian On Progress.");
						return false;
					}
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
					sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					sql.add("delete from if_reim_m where no_reim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					sql.add("update if_aju_m set no_reim='-',progress='1' where no_reim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update if_nik set flag_aktif='1', no_flag='-' where no_flag='"+this.e_nb.getText()+"' and no_kas='"+this.noKasOpen+"'");
					sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												

					sql.add("delete from pbh_ver_m where no_bukti = '"+this.e_nb.getText()+"'");
					
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
		if (this.stsSimpan == 1) {
			this.doClick();		
			this.isiCBnik();
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1);				
				this.sg3.clear(1);				
				this.e_nilai.setText("0");
				this.cb_nik.setText("","");
				this.isiCBnik();				
			}				
			this.stsSimpan = 1; 
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"if_reim_m","no_reim",this.app._lokasi+"-IFR"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_nik.setFocus();
			setTipeButton(tbSimpan);
		}		
	},			
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "INPROG") this.sg.cells(0,row,"PROSES");
		else this.sg.cells(0,row,"INPROG");		
	},	
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var tot = tot2 = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != "" && this.sg.cells(0,i) == "PROSES"){
					tot += nilaiToFloat(this.sg.cells(4,i));					
				}
			}			
					
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(4,i) != ""){
					tot2 += nilaiToFloat(this.sg4.cells(4,i));					
				}
			}		

			this.e_nilai.setText(floatToNilai(tot));					
			this.e_unpos.setText(floatToNilai(tot2));					
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
							if (this.c_status.getText() == "IFCLOSE") {
								this.cb_nik.setText("","");
								this.e_saldo.setText("0");
							}
							else {
								if (this.stsSimpan==1) this.isiCBnik();
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
			this.sg.clear(1); this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);						
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																								
		var strSQL = "select a.no_reim,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from if_reim_m a "+
					 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join pbh_pb_m c on a.no_reim=c.no_pb "+		              
					 "where c.progress in ('0','V') and a.nik_buat='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
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
			this.sg3.appendData([line.no_reim,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
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
				
				var strSQL = "select a.keterangan,a.tanggal,a.kode_pp,a.nik_buat,a.modul,b.nik_buat,b.nik_app,b.nik_ver,a.no_dokumen as no_kasopen "+
				             "from if_reim_m a inner join pbh_pb_m b on a.no_reim=b.no_pb and a.kode_lokasi=b.kode_lokasi "+
				             "where a.no_reim = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.cb_nik.setSQL("select a.nik, a.nama from karyawan a where a.nik='"+line.nik_buat+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
						this.cb_nik.setText(line.nik_buat);
						this.noKasOpen = line.no_kasopen;
						this.cb_pp.setText(line.kode_pp);
						this.e_ket.setText(line.keterangan);																				
						this.c_status.setText(line.modul);		
						
						this.cb_buat.setText(line.nik_buat);
						this.cb_app.setText(line.nik_app);
						this.cb_ver.setText(line.nik_ver);
					}
				}																
				var data = this.dbLib.getDataProvider("select 'PROSES' as status,a.no_aju,convert(varchar,a.tanggal,103) as tgl,d.kode_pp+' - '+d.nama as pp,b.kode_akun+' - '+b.nama as akun,c.kode_drk+' - '+c.nama as drk,a.keterangan,a.nilai-a.npajak as nilai  "+
						    "from if_aju_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						    "                inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+					   						    
						    "				 left join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and substring(a.periode,1,4)=c.tahun "+
						    "where a.no_reim='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);					   				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg.appendData([line.status.toUpperCase(),line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),line.akun,line.pp,line.drk,"File..."]);
					}
				} else this.sg.clear(1);	

				var strSQL = "select a.kode_pp,a.nik_app,a.nilai - isnull(b.pakai,0) as saldo, a.bank_trans,a.bank,a.no_rek,a.nama_rek,a.akun_if,a.nilai as nilai_if  "+
							"from if_nik a "+

							"		left join  ("+						
							"			 select a.nik_if,a.kode_lokasi,sum(a.nilai-a.npajak) as pakai "+
							"			 from if_aju_m a "+							
							"			 where a.no_reim <>'"+this.e_nb.getText()+"' and a.nik_if='"+this.cb_nik.getText()+"' and a.no_kasopen='"+this.noKasOpen+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"			 group by a.nik_if,a.kode_lokasi "+					
							"		) b on a.nik = b.nik_if and a.kode_lokasi=b.kode_lokasi "+

							"where a.jenis='DAKEM' and a.nik ='"+this.cb_nik.getText()+"' and a.no_kas='"+this.noKasOpen+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.akunIF = line.akun_if; 
						this.nilaiIF = parseFloat(line.nilai_if); 

						this.cb_pp.setText(line.kode_pp);
						this.e_saldo.setText(floatToNilai(line.saldo));								
						this.e_banktrans.setText(line.bank_trans);
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);

					}
				}
				
				
			}									
		} catch(e) {alert(e);}
	}
});