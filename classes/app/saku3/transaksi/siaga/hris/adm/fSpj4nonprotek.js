window.app_saku3_transaksi_siaga_hris_adm_fSpj4nonprotek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fSpj4nonprotek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fSpj4nonprotek";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan SPPD: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[30,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[30,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[130,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Pengajuan SPPD","List Pengajuan SPPD"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		              	colTitle:["No. SPPD","Keterangan","NIK Pembuat","NIK Verifikasi"],
					  	colWidth:[[3,2,1,0],[120,120,450,120]],			
					  	readOnly:true,
						dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});				

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[10,12,202,20],caption:"No SPPD",maxLength:30,readOnly:true,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,16,600,20],caption:"Keterangan", maxLength:100});		
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[10,17,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});		
		this.e_ut = new saiLabelEdit(this.pc1.childPage[0],{bound:[770,17,200,20],caption:"Nilai Transport", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[10,18,220,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:2});
		this.e_uh = new saiLabelEdit(this.pc1.childPage[0],{bound:[770,18,200,20],caption:"Nilai Harian", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,20,990,305], childPage:["Daftar Biaya Transportasi","Daftar Uang Harian","Daftar Tanggal"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[0,5,this.pc2.width-5,this.pc2.height-33],colCount:9,tag:0,		            
					colTitle:["Kode Jns","Jenis Angkutan","Kode Rute","Nama","Tempat Asal","Tempat Tujuan","Tarif","Jumlah","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,140,140,170,70,120,60]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,8],[7]],
					buttonStyle:[[0,2],[bsEllips,bsEllips]], 
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
					colHide:[[3],[true]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[120,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:0,
		            colTitle:["Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,120,120,120,220,80]],
					columnReadOnly:[true,[0,1,4,5,6],[2,3]],
					colFormat:[[2,3,4,5,6],[cfDate,cfDate,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,2,3],[bsEllips,bsDate,bsDate]], 					
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});
		
		this.sg3 = new saiGrid(this.pc2.childPage[2],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:1,tag:9,
		            colTitle:["Tanggal"],
					colWidth:[[0],[100]],						
					autoAppend:true,defaultRow:1});		
					
					
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
	
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.nilai_uh = 0;			
			this.cb_app.setSQL("select nik, nama from gr_karyawan where flag_aktif<>'X' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Verifikasi",true);
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where flag_aktif<>'X' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			this.cb_buat.setText(this.app._userLog);
			this.doChange(this.cb_buat);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from gr_spro where kode_spro in ('UHAR','TRAN') and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "UHAR") this.akunUH = parseFloat(line.flag);
					if (line.kode_spro == "TRAN") this.akunTR = parseFloat(line.flag);
				}
			}				
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fSpj4nonprotek.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fSpj4nonprotek.implement({
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
					if (this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_spj_m","no_spj",this.app._lokasi+"-SPPD"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					
					var tanggal = "";
					var jumlah = k = 0;
					this.sg3.clear(1);

					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){
							jumlah = nilaiToFloat(this.sg2.cells(4,i));							
							for (var j=0;j < jumlah;j++){			
								var data = this.dbLib.getDataProvider("select dateadd(day,"+j+",'"+this.sg2.getCellDateValue(2,i)+"') as tanggal",true);
								if (typeof data == "object" && data.rs.rows[0] != undefined){
									var line = data.rs.rows[0];											
									tanggal = line.tanggal.substr(0,4)+'-'+line.tanggal.substr(5,2)+'-'+line.tanggal.substr(8,2);
									this.sg3.cells(0,k,tanggal);
									this.sg3.appendRow(1);					
									k++;
								}
							}					
						}
					}
					
					sql.add("insert into gr_spj_m(no_spj,kode_lokasi,periode,tanggal,sts_spj,kode_loker,keterangan,nik_buat,nik_app,progress,akun_uhar,akun_tran,transport,harian,tgl_input,nik_user,kode_grade,kode_kelas,kode_so,no_pb) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.kodeLoker+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','0','"+this.akunUH+"','"+this.akunTR+"',"+parseNilai(this.e_ut.getText())+","+parseNilai(this.e_uh.getText())+",getdate(),'"+this.app._userLog+"','"+this.kodegrade+"','"+this.kodekelas+"','-','-')");
												
					if (this.sg.getRowValidCount() > 0){						
						for (var i=0;i < this.sg.getRowCount();i++){							
							if (this.sg.rowValid(i)){																
								sql.add("insert into gr_spj_dt(no_spj,kode_lokasi,no_urut,kode_trans,asal,tujuan,kode_jenis,nilai,jumlah,tarif) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(6,i))+")");
							}
						}
					}					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into gr_spj_dh(no_spj,kode_lokasi,no_urut,sts_spj,tgl_mulai,tgl_selesai,lama,tarif,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.getCellDateValue(2,i)+"','"+this.sg2.getCellDateValue(3,i)+"',"+parseNilai(this.sg2.cells(4,i))+","+parseNilai(this.sg2.cells(5,i))+","+parseNilai(this.sg2.cells(6,i))+")");
							}
						}
					}			
					for (var i=0;i < this.sg3.getRowCount();i++){
						if (this.sg3.rowValid(i)){
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(0,i)+" 08:00:00','I','SPJ', '-')");
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(0,i)+" 17:00:00','O','SPJ', '-')");							
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_spj_m where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_spj_dt where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_spj_dh where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul = 'SPJ'");
										
					var tanggal = "";
					var jumlah = k = 0;
					this.sg3.clear(1);
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){
							jumlah = nilaiToFloat(this.sg2.cells(4,i));							
							for (var j=0;j < jumlah;j++){			
								var data = this.dbLib.getDataProvider("select dateadd(day,"+j+",'"+this.sg2.getCellDateValue(2,i)+"') as tanggal",true);
								if (typeof data == "object" && data.rs.rows[0] != undefined){
									var line = data.rs.rows[0];											
									tanggal = line.tanggal.substr(0,4)+'-'+line.tanggal.substr(5,2)+'-'+line.tanggal.substr(8,2);
									this.sg3.cells(0,k,tanggal);
									this.sg3.appendRow(1);					
									k++;
								}
							}					
						}
					}
										
					sql.add("insert into gr_spj_m(no_spj,kode_lokasi,periode,tanggal,sts_spj,kode_loker,keterangan,nik_buat,nik_app,progress,akun_uhar,akun_tran,transport,harian,tgl_input,nik_user,kode_grade,kode_kelas,kode_so,no_pb) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.kodeLoker+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','0','"+this.akunUH+"','"+this.akunTR+"',"+parseNilai(this.e_ut.getText())+","+parseNilai(this.e_uh.getText())+",getdate(),'"+this.app._userLog+"','"+this.kodegrade+"','"+this.kodekelas+"','-','-')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_spj_dt(no_spj,kode_lokasi,no_urut,kode_trans,asal,tujuan,kode_jenis,nilai,jumlah,tarif) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(6,i))+")");
							}
						}
					}					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into gr_spj_dh(no_spj,kode_lokasi,no_urut,sts_spj,tgl_mulai,tgl_selesai,lama,tarif,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.getCellDateValue(2,i)+"','"+this.sg2.getCellDateValue(3,i)+"',"+parseNilai(this.sg2.cells(4,i))+","+parseNilai(this.sg2.cells(5,i))+","+parseNilai(this.sg2.cells(6,i))+")");
							}
						}
					}					
					for (var i=0;i < this.sg3.getRowCount();i++){
						if (this.sg3.rowValid(i)){
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(0,i)+" 08:00:00','I','SPJ', '-')");
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(0,i)+" 17:00:00','O','SPJ', '-')");							
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_spj_m where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_spj_dt where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_spj_dh where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul = 'SPJ'");
	
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
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg1.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
				break;
			case "simpan" :	
				this.sg.validasi(); 
				this.sg2.validasi();
				//"Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Nilai"],


				if (this.sg2.getRowValidCount() > 0){
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){									
							var d = new Date();
							var d1 = d.strToDate(this.sg2.cells(2,i));
							var d2 = d.strToDate(this.sg2.cells(3,i));
							if (d1 > d2) {							
								var k = i+1;
								system.alert(this,"Tanggal tidak valid.","Tanggal berangkat harus lebih awal dari tanggal tiba. (Baris: "+k+")");
								return false;
							}
	
	
							var data2 = this.dbLib.getDataProvider("select datediff(day,'"+this.sg2.getCellDateValue(2,i)+"','"+this.sg2.getCellDateValue(3,i)+"') as jml ",true);
							if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
								var line2 = data2.rs.rows[0];			
								var jmlHari = line2.jml;															
							}
							
							var strSQL = "";
							var d = new Date();							
							for (var k=0;k <= jmlHari;k++) {
	
								var d1 = d.strToDate(this.sg2.cells(2,i));
								var d2 = d1.DateAdd("d",k);
								var tglCek = d2.getDateStr();
								/*
								
								strSQL = "select isnull(a.awal,'-') as ada_spj "+
										"from ( "+
										"		select min(b.tgl_mulai) as awal,max(b.tgl_selesai) as akhir "+
										"		from gr_spj_m a inner join gr_spj_dh b on a.no_spj=b.no_spj "+
										"		where a.nik_buat = '"+this.cb_buat.getText()+"' "+
										"		and a.no_spj <> '"+this.e_nb.getText()+"' "+
										") a "+
										"where '"+tglCek+"' between a.awal and a.akhir ";							
								
								var data = this.dbLib.getDataProvider(strSQL,true);
								if (typeof data == "object"){
									var line = data.rs.rows[0];							
									if (line != undefined && line.ada_spj != "-"){																				
										system.alert(this,"Transaksi tidak valid.","NIK + Nama sudah dibuat SPJ untuk tanggal '"+tglCek+"'");
										return false;						
									} 
								}
								*/

							}														
						}
					}
				}

				if (nilaiToFloat(this.e_ut.getText()) + nilaiToFloat(this.e_uh.getText() ) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang dari nol.");
					return false;						
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doChange:function(sender){
		if (sender == this.e_nb && this.e_nb.getText()!="" && this.stsSimpan == 0) {
			this.e_ket.setFocus();
			var data = this.dbLib.getDataProvider(
					   "select a.* "+
					   "from gr_spj_m a "+
					   "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);										
					this.cb_buat.setText(line.nik_buat);
					this.cb_app.setText(line.nik_app);
					this.kodegrade = line.kode_grade;
					this.kodekelas = line.kode_kelas;
					//this.kodeso = line.kode_so;	
					this.kodeLoker = line.kode_loker;														
				} 
			}
			
			var data = this.dbLib.getDataProvider(
					   "select a.kode_trans,a.asal+'-'+a.tujuan as nama,a.nilai,a.asal,a.tujuan,a.kode_jenis,a.tarif,a.jumlah,b.nama as nama_jenis "+
			           "from gr_spj_dt a inner join gr_spj_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_jenis,line.nama_jenis,line.kode_trans,line.nama,line.asal,line.tujuan,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);

			var data = this.dbLib.getDataProvider(
					   "select a.sts_spj,b.nama as nama_spj,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.lama,a.tarif,a.nilai "+
			           "from gr_spj_dh a inner join gr_status_spj b on a.sts_spj=b.sts_spj and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.sts_spj,line.nama_spj,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.lama),floatToNilai(line.tarif),floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);		

			var data = this.dbLib.getDataProvider(
					   "select convert(varchar,tanggal,103) as tanggal from gr_absen_harian_d  "+
					   "where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis ='I' and modul = 'SPJ'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.tanggal]);
				}
			} else this.sg3.clear(1);						
		}		
		if (sender == this.cb_buat && this.stsSimpan == 1) {
			this.sg2.clear(1);			
			if (this.cb_buat.getText() != "") {				
				var data2 = this.dbLib.getDataProvider(
							"select a.kode_grade,a.kode_kelas,a.kode_loker, b.kode_klpjab from gr_karyawan a "+
							"inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi "+
							"where a.nik='"+this.cb_buat.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];							
					this.kodegrade = line2.kode_grade;
					this.kodekelas = line2.kode_kelas;
					//this.kodeso = line2.kode_so;
					this.kodeklpjab = line2.kode_klpjab;
					this.kodeLoker = line2.kode_loker;
				} else 
				{
					this.kodegrade = "";
					this.kodekelas = "";
					//this.kodeso = "";
					this.kodeLoker = "";
					this.kodeklpjab = "";
				}
			}
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_spj_m","no_spj",this.app._lokasi+"-SPPD"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();	
		this.stsSimpan = 1;
	},
	doChangeCell: function(sender, col, row) {
		if (col == 0 && this.sg.cells(0,row) != "") {			
			this.sg.cells(2,row,"");
			this.sg.cells(3,row,"");
			this.sg.cells(4,row,"");				
			this.sg.cells(5,row,"");				
			this.sg.cells(6,row,"0");
			this.sg.cells(7,row,"0");
			this.sg.cells(8,row,"0");
		}
		if (col == 2 && this.sg.cells(2,row) != "") {
			var data = this.dbLib.getDataProvider("select nilai,asal,tujuan from gr_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and kode_trans='"+this.sg.cells(2,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];															
				this.sg.cells(4,row,line.asal);
				this.sg.cells(5,row,line.tujuan);				
				this.sg.cells(6,row,floatToNilai(line.nilai));
				this.sg.cells(7,row,"1");				
				this.sg.setCell(8,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) * nilaiToFloat(this.sg.cells(7,row))));				
			}
			this.sg.validasi();
		}
		if (col == 7 && this.sg.cells(7,row) != "") {
			this.sg.setCell(8,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) * nilaiToFloat(this.sg.cells(7,row))));
			this.sg.validasi();
		}
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(8,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(8,i));			
				}
			}
			this.e_ut.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
							this.standarLib.showListDataForSG(this, "Daftar Jenis Angkutan",this.sg, this.sg.row, this.sg.col, 
														"select kode_jenis,nama from gr_spj_jenis where kode_lokasi = '"+this.app._lokasi+"'",
														"select count(kode_jenis) from gr_spj_jenis where kode_lokasi = '"+this.app._lokasi+"'",
														 new Array("kode_jenis","nama"),"and",new Array("Kode","Jenis"),false);					
						break;					
				case 2 :
							this.standarLib.showListDataForSG(this, "Daftar Rute",this.sg, this.sg.row, this.sg.col, 
														"select kode_trans, asal,tujuan from gr_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and kode_lokasi = '"+this.app._lokasi+"'",
														"select count(kode_trans) from gr_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and kode_lokasi = '"+this.app._lokasi+"'",									
														 new Array("kode_trans","asal","tujuan"),"and",new Array("Kode","Asal","Tujuan"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},			
	doEllipsClick2: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
							this.standarLib.showListDataForSG(this, "Daftar Jenis SPPD",this.sg2, this.sg2.row, this.sg2.col, 
														"select sts_spj, nama  from gr_status_spj where kode_lokasi='"+this.app._lokasi+"'",
														"select count(sts_spj) from gr_status_spj where kode_lokasi='"+this.app._lokasi+"'",									
														 new Array("sts_spj","nama"),"and",new Array("Kode","Jenis"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},
	doChangeCell2: function(sender, col, row) {
		if (col == 2 || col == 3 || col == 0) {
			if (col == 0) {
				var data = this.dbLib.getDataProvider("select nilai from gr_spj_harian where kode_grade = '"+this.kodegrade+"' and sts_spj = '"+this.sg2.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"' and kode_klpjab='"+this.kodeklpjab+"' ",true); //and kode_so='"+this.kodeso+"' 
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.nilai_uh = parseFloat(line.nilai);
						
					}
				}
			}
			if (this.sg2.cells(2,row)=="" || this.sg2.cells(3,row)=="") this.sg2.cells(4,row,"0");
			else {
				var data = this.dbLib.getDataProvider("select datediff(day,'"+this.sg2.getCellDateValue(2,row)+"','"+this.sg2.getCellDateValue(3,row)+"')+1 as jumlah",true);			
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					if (parseFloat(line.jumlah) > 0) this.sg2.cells(4,row,floatToNilai(line.jumlah));
					else this.sg2.cells(4,row,"0");
				}		
			}
		}		
		if (col == 4) {
			this.sg2.setCell(5,row,floatToNilai(this.nilai_uh));
			this.sg2.setCell(6,row,floatToNilai(this.nilai_uh * nilaiToFloat(this.sg2.cells(4,row))));
		}
		if (col == 5) {
			this.sg2.setCell(6,row,floatToNilai(nilaiToFloat(this.sg2.getCell(5,row)) * nilaiToFloat(this.sg2.cells(4,row))));
		}


		this.sg2.validasi();
	},	
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(6,i) != ""){
					tot += nilaiToFloat(this.sg2.getCell(6,i));			
				}
			}
			this.e_uh.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},

	doLoad:function(sender){						
		var strSQL = "select distinct a.no_spj,a.keterangan,a.nik_buat,a.nik_app "+
					 "from gr_spj_m a "+
					 "inner join gr_spj_dh b on a.no_spj=b.no_spj "+
					 "inner join gr_spj_dt c on a.no_spj=c.no_spj "+
					 "inner join gr_absen_harian_d d on a.no_spj=d.no_load "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' order by a.no_spj desc";							 
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},

	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_spj,line.keterangan,line.nik_buat,line.nik_app]); 
		}
		this.sg1.setNoUrut(start);
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
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku3_siaga_hris_rptSpj";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nb.getText()+"' ";
								this.filter2 = "1";
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
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbSimpan);
			
		} catch(e) {
			alert(e);
		}
	}
});