window.app_saku3_transaksi_yakes21_simlog_fJustApp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_simlog_fJustApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_simlog_fJustApp";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Justifikasi Pengadaan", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Terima", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});		

		this.pc1 = new pageControl(this,{bound:[10,18,1000,435], childPage:["List Data","Just. Kebutuhan","Just. Pengadaan","Cattn Apprv"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Pilih","No Juskeb","Status","Tanggal","PP / Unit","Deskripsi","Nilai","Pembuat","No Terima"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,150,100,350,150,70,80,100,70]],
					readOnly:true,colFormat:[[6,0],[cfNilai,cfButton]],
					click:[this,"doSgBtnClick"], colAlign:[[0],[alCenter]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.bKoreksi = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Koreksi",click:[this,"doLoadKoreksi"]});		

		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Jenis Budget", readOnly:true});						
		this.cb_lokproses = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Lokasi Proses", readOnly:true, maxLength:10, tag:2}); //multiSelection:false,		
		this.e_pplog = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"PP Pelaksana", readOnly:true});		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"No JusKeb", readOnly:true});		
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Tanggal", readOnly:true});		
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"PP / Unit", readOnly:true});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Kegiatan", readOnly:true});
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Mata Anggaran", readOnly:true});
		this.e_drk = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"DRK", readOnly:true});
		this.e_anggaran = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Anggaran", maxLength:200,readOnly:true});					
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai Kebutuhan", readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_penutup = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"Penutup", maxLength:200,readOnly:true});		
		this.e_waktu = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Waktu Penggunaan", maxLength:200,readOnly:true});				
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Dibuat Oleh", readOnly:true});		
		this.e_maksud = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Maksud/Tujuan", maxLength:200,readOnly:true});				
		this.e_periksa = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"Diperiksa Oleh", readOnly:true});		
		this.e_latar = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Latar Belakang", maxLength:200,readOnly:true});		
		this.e_sah = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Disahkan Oleh", readOnly:true});			
		this.e_aspek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Aspek Strategis", maxLength:200,readOnly:true});		
		this.e_appvp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"Disetujui Oleh", readOnly:true});
				
		this.e_nb = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"No JusPeng", readOnly:true,visible:true});								
		this.c_jenis = new saiCB(this.pc1.childPage[2],{bound:[20,10,300,20],caption:"Jenis Pengadaan",items:["TL - PENUNJUKAN LANGSUNG","PL - PEMILIHAN LANGSUNG","IF - IMPREST FUND"], readOnly:true,tag:2});				
		this.e_latar2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,750,20],caption:"Latar Belakang", maxLength:200});		
		this.e_aspek2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,750,20],caption:"Aspek Strategis", maxLength:200});		
		this.e_bisnis2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,750,20],caption:"Aspek Bisnis", maxLength:200});		
		this.e_mekanis2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,750,20],caption:"Mekanisme", maxLength:200});		
		this.e_penutup2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,750,20],caption:"Penutup", maxLength:200});				
		this.cb_app = new saiCBBL(this.pc1.childPage[2],{bound:[20,17,220,20],caption:"Diperiksa Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_sah = new saiCBBL(this.pc1.childPage[2],{bound:[20,18,220,20],caption:"Disahkan Oleh", multiSelection:false, maxLength:10, tag:2});				

		this.sgctt = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
			colTitle:["Catatan"],
			colWidth:[[0],[100]],					
			readOnly:true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		this.e_spek = new saiMemo(this.pc1.childPage[1],{bound:[520,130,450,60],caption:"Spesifikasi",readOnly:true});		
				
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

			this.e_spek.setReadOnly(true);

			this.minCapex = 0;
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('MINCAPEX') ",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "MINCAPEX") this.minCapex = parseFloat(line.value1);			
				}
			}

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.doLoadCtt(this.e_nobukti.getText());

			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_bidang='"+this.app._kodeBidang+"' "+
			                   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);			
			this.cb_sah.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);			
							   
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_simlog_fJustApp.extend(window.childForm);
window.app_saku3_transaksi_yakes21_simlog_fJustApp.implement({		
	doLoadKoreksi: function() {
		try {
			var strSQL = "select a.tanggal,a.no_pesan as no_pb,'JUSPENG' as status,convert(varchar,a.tanggal,103) as tgl,b.kode_pp+' - '+b.nama as pp,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_terima "+
						"from log_pesan_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"                   inner join karyawan c on a.nik_buat=c.nik "+					 
						"					inner join log_justerima_m d on a.no_terima = d.no_terima "+
						"where a.progress ='4' and d.progress in ('0','R','S') and a.periode<='"+this.e_periode.getText()+"' "+ 
						"order by a.tanggal";	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);

	  	}
	  	catch(e) {
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
	mainButtonClick: function(sender, desk){
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
			if (this.stsProg == "INPROG") this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();			
					
					if (this.stsProg != "INPROG") {
						sql.add("delete from log_justerima_m where no_pesan='"+this.e_nobukti.getText()+"'");									
						sql.add("delete from pbh_ver_m where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-'");																	
					}
					
					var prog = "4";																						
					sql.add("update log_pesan_m set progress='"+prog+"',no_terima='"+this.e_nb.getText()+"',lok_proses ='"+this.cb_lokproses.getText()+"' where no_pesan='"+this.e_nobukti.getText()+"' ");					
					sql.add("update pbh_ver_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='JUSLOG' and modul='JUSLOG' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into pbh_ver_m (no_ver,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag) values "+
                        	"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+prog+"','JUSLOG','JUSLOG','"+this.e_nobukti.getText()+"','APPROVE','-')");
															
					sql.add("insert into log_justerima_m(no_terima,no_pesan,kode_lokasi,tgl_input,nik_user,periode,tanggal,jenis, latar,aspek,bisnis,mekanis,penutup,nik_app,no_app,nik_sah,no_sah,progress,no_spph) values "+
						   "('"+this.e_nb.getText()+"','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText().substr(0,2)+"',  '"+this.e_latar2.getText()+"','"+this.e_aspek2.getText()+"','"+this.e_bisnis2.getText()+"','"+this.e_mekanis2.getText()+"','"+this.e_penutup2.getText()+"','"+this.cb_app.getText()+"','-','"+this.cb_sah.getText()+"','-','0','-')"); 							
					
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);										
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1"; 
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);												
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";								
				var data = this.dbLib.getDataProvider("select progress from log_pesan_m where progress <> '4' and no_pesan='"+this.e_nobukti.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																				
						system.alert(this,"Transaksi tidak valid.","No Pengajuan JUSKEB sudah diprogress lain.");
						return false;							
					}
				}				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();			

				if (this.e_jenis.getText() == "CAPEX") var progSeb = "3";
				else var progSeb = "2";

				sql.add("update log_pesan_m set progress='"+progSeb+"',no_terima='-' where no_pesan='"+this.e_nobukti.getText()+"'");					
				sql.add("delete from log_justerima_m where no_pesan='"+this.e_nobukti.getText()+"'");									
				sql.add("delete from pbh_ver_m where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-'");																	
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){
		if (this.e_nobukti.getText()!="") {						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"log_justerima_m","no_terima",this.app._lokasi+"-JA"+this.e_periode.getText().substr(2,4)+".","0000"));									
			this.c_jenis.setFocus();						
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 0) {
				this.doDoubleClick(this.sg,1,row);
			}
		}catch(e){
			alert(e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				
				this.e_nobukti.setText(this.sg.cells(1,row));	
				this.stsProg = this.sg.cells(2,row);
				
				var strSQL = "select convert(varchar,a.tanggal,103) as tgl,a.*,b.nama as lokproses,c.nama as nama_sah,d.nama as pp_log,cc.nama as nama_periksa, ccc.nama as nama_buat,isnull(cccc.nama,'-') as nama_vp "+
							" ,e.nama as nama_akun,f.nama as nama_pp, g.nama as nama_drk "+
							"from log_pesan_m a "+
							"	inner join lokasi b on a.lok_proses=b.kode_lokasi "+
							"	inner join karyawan c on a.nik_sah=c.nik  "+
							"	inner join karyawan cc on a.nik_app=cc.nik  "+
							"	inner join karyawan ccc on a.nik_buat=ccc.nik  "+							
							"	inner join pp d on a.kode_pplog=d.kode_pp and d.kode_lokasi <>'00' "+						 
							"	inner join masakun e on a.kode_akun=e.kode_akun and e.kode_lokasi=a.kode_lokasi "+
							"	inner join pp f on a.kode_pp=f.kode_pp and f.kode_lokasi=a.kode_lokasi "+
							"	inner join drk g on a.kode_drk=g.kode_drk and g.kode_lokasi=a.kode_lokasi and substring(a.periode,1,4) = g.tahun "+
							"	left join karyawan cccc on a.nik_vp=cccc.nik  "+
							"where a.no_pesan = '"+this.e_nobukti.getText()+"' ";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.e_tgl.setText(line.tgl);
						this.e_jenis.setText(line.jenis);												
						this.cb_lokproses.setText(line.lok_proses,line.lokproses);		
						this.e_pplog.setText(line.kode_pplog+" - "+line.pp_log);																						
						this.e_akun.setText(line.kode_akun+" - "+line.nama_akun);																						
						this.e_pp.setText(line.kode_pp+" - "+line.nama_pp);																						
						this.e_drk.setText(line.kode_drk+" - "+line.nama_drk);
						this.e_nilai.setText(floatToNilai(line.nilai));
						
						this.e_sah.setText(line.nik_sah+" - "+line.nama_sah);
						this.e_periksa.setText(line.nik_app+" - "+line.nama_periksa);
						this.e_buat.setText(line.nik_buat+" - "+line.nama_buat);
						this.e_appvp.setText(line.nik_vp+" - "+line.nama_vp);
						
						this.e_ket.setText(line.keterangan);						
						this.e_waktu.setText(line.waktu);
						this.e_spek.setText(line.spek);
						this.e_maksud.setText(line.maksud);
						this.e_latar.setText(line.latar);
						this.e_aspek.setText(line.aspek);
						this.e_anggaran.setText(line.anggaran);
						this.e_penutup.setText(line.penutup);
					}
				}
				
				this.doLoadCtt(this.e_nobukti.getText());				
				this.doClick();	

				if (this.stsProg == "JUSPENG") {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;					
					var strSQL = "select jenis,latar,aspek,bisnis,mekanis,penutup,nik_app,nik_sah from log_justerima_m where no_pesan='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){													
							if (line.jenis == "TL") this.c_jenis.setText("TL - PENUNJUKAN LANGUSNG");
							if (line.jenis == "PL") this.c_jenis.setText("PL - PEMILIHAN LANGSUNG");							
							if (line.jenis == "IF") this.c_jenis.setText("IF - IMPREST FUND");		
							
							this.e_latar2.setText(line.latar);
							this.e_aspek2.setText(line.aspek);
							this.e_bisnis2.setText(line.bisnis);
							this.e_mekanis2.setText(line.mekanis);
							this.e_penutup2.setText(line.penutup);

							this.cb_app.setText(line.nik_app);
							this.cb_sah.setText(line.nik_sah);

						}
					}
				}
				else {					
					if (nilaiToFloat(this.e_nilai.getText()) < this.minCapex) {
						this.c_jenis.setText("IF - IMPREST FUND");
					}
					else this.c_jenis.setText("PL - PEMILIHAN LANGSUNG");

					this.e_latar2.setText(this.e_latar.getText());
					this.e_aspek2.setText(this.e_aspek.getText());
					this.e_penutup2.setText(this.e_penutup.getText());

					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}				
			}
		} catch(e) {alert(e);}
	},		
	doLoad:function(sender){												
		//semua ke pusat dulu ....and a.lok_proses='"+this.app._lokasi+"'					 			 						 					 
		var strSQL = "select a.tanggal,a.no_pesan as no_pb,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,b.kode_pp+' - '+b.nama as pp,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_terima "+
		             "from log_pesan_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join karyawan c on a.nik_buat=c.nik "+					 
					// "where ((a.progress='2' and a.jenis='OPEX') or (a.progress='3' and a.jenis='CAPEX')) "+
					"where  (a.progress='3' and a.jenis='CAPEX') "+  //hanya capex ..opex  langsung proses
					 "and a.periode<='"+this.e_periode.getText()+"' "+ 
					 "order by a.tanggal";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},		
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData(["Pilih",line.no_pb,line.status.toUpperCase(),line.tgl,line.pp,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_terima]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {								
								// this.nama_report = "server_report_saku2_kopeg_sju_rptPrQuo";
								// this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_terima='" + this.e_nb.getText() + "' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc1.hide();															
							}							
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);							
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
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