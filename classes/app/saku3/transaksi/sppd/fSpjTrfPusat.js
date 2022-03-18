window.app_saku3_transaksi_sppd_fSpjTrfPusat = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sppd_fSpjTrfPusat.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fSpjTrfPusat";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SPPD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data SPPD","List SPPD"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Modul","No Dokumen","Deskripsi","Progress","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,60,350,180,80,100]],
					colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_nilaiut = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,12,200,20],caption:"Total Transport", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"PP", maxLength:10, tag:7, readOnly:true});
		this.e_nilaiuh = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,13,200,20],caption:"Total U. Harian", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
		this.e_dok = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Surat Perintah", multiSelection:false, maxLength:150,tag:1,change:[this,"doChange"]});	
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,14,200,20],caption:"Total SPPD", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Jumlah Orang", maxLength:50, tipeText:ttNilai, readOnly:true});													

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,305], childPage:["Data SPPD","Data Transport","Uang Harian","Otorisasi"]});
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Tempat", maxLength:50,tag:1});							
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Kegiatan", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18]}); 	
		this.cb_nik = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"NIK SPPD", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});		
		this.e_band = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Band", readOnly:true});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Nama SPPD", maxLength:50});							
		
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[20,255,450,75],caption:"Cttn Approve",tag:9,visible:false});				
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,		            
					colTitle:["Kode Jns","Jenis Angkutan","Kode Rute","Nama","Tempat Asal","Tempat Tujuan","Tarif","Jumlah","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,160,160,170,70,80,60]],
					columnReadOnly:[true,[0,1,2,3,4,5,8,6],[7]],
					buttonStyle:[[0,2],[bsEllips,bsEllips]], 
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Persen","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,100,120,120,120,200,80]],
					columnReadOnly:[true,[0,1,4,7,2,3,5],[6]],
					colFormat:[[2,3,4,5,6,7],[cfDate,cfDate,cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,2,3],[bsEllips,bsDate,bsDate]], 					
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});										
		
		this.cb_atas1 = new saiCBBL(this.pc1.childPage[3],{bound:[20,10,220,20],caption:"NIK Atasan 1", multiSelection:false, readOnly:true, tag:2});	
		this.e_jabatas1 =  new saiLabelEdit(this.pc1.childPage[3],{bound:[20,32,450,20],caption:"Jabatan", maxLength:80, readOnly:true});				
		this.cb_atas2 = new saiCBBL(this.pc1.childPage[3],{bound:[20,54,220,20],caption:"NIK Atasan 2", multiSelection:false, readOnly:true, tag:2});	
		this.e_jabatas2 =  new saiLabelEdit(this.pc1.childPage[3],{bound:[20,76,450,20],caption:"Jabatan", maxLength:80, readOnly:true});	

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);
				
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.e_dok.setSQL("select distinct a.no_spj, a.keterangan "+
							  "from sp_pdaju_m a "+
							  "inner join sp_pdaju_d b on a.no_spj=b.no_spj and a.kode_lokasi=b.kode_lokasi "+
			                  "where b.kode_lokasi='"+this.app._lokasi+"' and nik_buat='"+this.app._userLog+"' and b.kode_pp='"+this.app._kodePP+"' and no_st = '-'",
							  ["no_spj","keterangan"],false,["Surat Perintah", "Keterangan"],"and","Data Surat Perintah",true);									
							  
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);	
			this.cb_nik.setSQL("select nik, nama from karyawan where kode_pp='"+this.app._kodePP+"' and flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_pp.setText(this.app._kodePP);
			this.e_memo.setReadOnly(true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sppd_fSpjTrfPusat.extend(window.childForm);
window.app_saku3_transaksi_sppd_fSpjTrfPusat.implement({	
	doLoadNIK: function(sender) {	
		var data2 = this.dbLib.getDataProvider("select nik_app,nik_app2 from sp_role where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
			var line2 = data2.rs.rows[0];							
			
			this.jenisApp1 = line2.nik_app.toUpperCase();			
			if (this.jenisApp1.toUpperCase() != "LOS") {
				this.cb_atas1.setBtnVisible(false);
				this.cb_atas2.setBtnVisible(false);
				
				this.cb_atas1.setText(line2.nik_app);				
				this.cb_atas2.setText(line2.nik_app2);
			
				//pendelegasian nik atasan
				var data2 = this.dbLib.getDataProvider("select nik_app2 from sp_dlg where nik_log='"+this.cb_atas1.getText()+"' and flag_aktif='1' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas1.setText(line2.nik_app2);
				}			
				var data2 = this.dbLib.getDataProvider("select nik_app2 from sp_dlg where nik_log='"+this.cb_atas2.getText()+"' and flag_aktif='1' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas2.setText(line2.nik_app2);
				}
		
				var data2 = this.dbLib.getDataProvider("select nik,nama,jabatan from karyawan where nik='"+this.cb_atas1.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas1.setText(line2.nik,line2.nama);
					this.e_jabatas1.setText(line2.jabatan);
				} else this.e_jabatas1.setText("-");	
		
				var data2 = this.dbLib.getDataProvider("select nik,nama,jabatan from karyawan where nik='"+this.cb_atas2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas2.setText(line2.nik,line2.nama);
					this.e_jabatas2.setText(line2.jabatan);
				
				} else this.e_jabatas2.setText("");	
			}
			else {
				//atasan nya bebas (LOS/OPEN misal: supir dll)
				this.cb_atas1.setBtnVisible(true);
				this.cb_atas1.setSQL("select nik, nama from karyawan where flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
				
				this.cb_atas2.setBtnVisible(true);
				this.cb_atas2.setSQL("select nik, nama from karyawan where flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);							
			}
			
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

					// if (this.stsSimpan == 0) {
						// var data = this.dbLib.getDataProvider("select sap_user,sap_pwd from hakakses where nik='"+this.app._userLog+"'",true);			
						// if (typeof data == "object"){
						// 	var line = data.rs.rows[0];		
						// 	this.sapUser = line.sap_user;
						// 	this.sapPwd = line.sap_pwd;	
						// }

						var strSQL = "select kode_akun,kode_pp,periode, sum(nilai) as nilai "+
									 "from sp_spj_j "+
									 "where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and dc = 'D' "+
									 "group by kode_akun,kode_pp,periode";
			
						var databudget = this.dbLib.getDataProvider(strSQL,true);
						if (typeof databudget == "object" && databudget.rs.rows[0] != undefined){
							var data = databudget.rs.rows;
							// this.app.services.releaseSAP(data, this.e_periode.getText().substr(0,4), this.sapUser, this.sapPwd, function(data){ alert(data);  });
						}
								
						sql.add("delete from sp_spj_m where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from sp_spj_dt where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from sp_spj_dh where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from sp_spj_j where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
						sql.add("delete from sp_spj_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						//utk yg loncat ke atasan2
						sql.add("delete from sp_spj_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					
						sql.add("delete from sp_glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					// }
					// else{
					// 	// apabila edit, jumlahnya tidak berkurang
					// 	// apabila simpan, jumlahnya berkurang 1
					// 	var jml_baru = this.e_jml.getText() - 1;
					// 	sql.add("update sp_pdaju_d set jumlah="+jml_baru+" where kode_lokasi='"+this.app._lokasi+"' and kode_pp = '"+this.cb_pp.getText()+"' and no_spj='"+this.e_dok.getText()+"' and nik='"+this.app._userLog+"'");	
					// }
					
					
					sql.add("insert into sp_spj_aju_m (no_aju,kode_lokasi,periode,nik_user,tgl_input,progress,no_app1,no_app2,no_app3,tanggal,no_dokumen,tgl_awal,tgl_akhir,kode_bidang,tempat,nik,nama,kode_pp,nik_app, nik_app2, jabatan, jabatan2) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'0','-','-','-','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.app._kodeBidang+"','"+this.e_tempat.getText()+"','"+this.cb_nik.getText()+"','"+this.e_nama.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_atas1.getText()+"','"+this.cb_atas2.getText()+"','"+this.e_jabatas1.getText()+"','"+this.e_jabatas2.getText()+"')");

					//utk yg loncat ke app2
					if (this.cb_atas1.getText() == "-") {
						sql.add("update sp_spj_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nb.getText()+"' and no_flag='-' and form='APPATS' and modul='PDSS' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into sp_spj_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','1','PDSS','APPATS','"+this.e_nb.getText()+"','-','-','X','X')");
						sql.add("update sp_spj_aju_m set no_app1='"+this.e_nb.getText()+"',progress='1' where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
				
				    //approve budget	
					//P - 0 - 1 dst (X = pending sampe app atasan2
					if (this.progSeb == "V" || this.progSeb == "1") var vProg = "1"; else var vProg = "P";
					
					sql.add("insert into sp_spj_m(no_spj, kode_lokasi, kode_loktuj, kode_bidangtuj, modul, progress, periode, tanggal, due_date, kode_pp, no_dokumen, tempat, nik_buat, nama_spj, transport, harian, tgl_input, nik_user,  no_app, no_ver, no_spb, band,posted, no_appsap, nik_appsap, nik_app, nik_app2, jabatan, jabatan2) values "+
					       "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._kodeBidang+"','PDLOCAL','"+vProg+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.cb_pp.getText()+"','"+this.e_dok.getText()+"','"+this.e_tempat.getText()+"','"+this.cb_nik.getText()+"','"+this.e_nama.getText()+"',"+nilaiToFloat(this.e_nilaiut.getText())+","+nilaiToFloat(this.e_nilaiuh.getText())+",getdate(),'"+this.app._userLog+"','"+this.noAppLama+"','"+this.noVerLama+"','-','"+this.e_band.getText()+"','F','-','-', '"+this.cb_atas1.getText()+"', '"+this.cb_atas2.getText()+"', '"+this.e_jabatas1.getText()+"', '"+this.e_jabatas2.getText()+"')")		
						   						
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into sp_spj_dt(no_spj,kode_lokasi,no_urut,kode_trans,asal,tujuan,kode_jenis,nilai,jumlah,tarif) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(6,i))+")");
							}
						}
					}				

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into sp_spj_dh(no_spj,kode_lokasi,no_urut,sts_spj,tgl_mulai,tgl_selesai,lama,tarif,persen,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.getCellDateValue(2,i)+"','"+this.sg2.getCellDateValue(3,i)+"',"+parseNilai(this.sg2.cells(4,i))+","+parseNilai(this.sg2.cells(5,i))+","+parseNilai(this.sg2.cells(6,i))+","+parseNilai(this.sg2.cells(7,i))+")");
							}
						}
					}

					var total = nilaiToFloat(this.e_nilaiut.getText()) + nilaiToFloat(this.e_nilaiuh.getText());
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_pp,periode1,periode2,dc,nilai) values "+
							"('"+this.e_nb.getText()+"','PDAJU','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+total+")");

					
					var totalPD = nilaiToFloat(this.e_total.getText());
					sql.add("insert into sp_spj_j(no_spj,no_ref,kode_lokasi,tanggal,nu,periode,kode_pp,dc,nilai,jenis) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"','"+this.cb_pp.getText()+"','D',"+totalPD+",'PD')");					
					sql.add("insert into sp_spj_j(no_spj,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,nilai,jenis) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+this.e_periode.getText()+"','"+this.akunHutPD+"','"+this.cb_pp.getText()+"','-','C',"+totalPD+",'HUTPD')");
					
					sql.add("insert into sp_glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_spj,nu,kode_lokasi,'SPPD',jenis,no_ref,tanggal,kode_akun,dc,nilai,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"','-','-','-','-','-','-','-', '-','-','-' "+
						    "from sp_spj_j "+
							"where dc='D' and nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_spj='"+this.e_nb.getText()+"'");
					
					sql.add("insert into sp_glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user, kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
							"select no_spj,nu,kode_lokasi,'SPPD',jenis,no_ref,tanggal,kode_akun,dc,nilai,kode_pp,periode,kode_drk,'IDR',1,nilai,getdate(),'"+this.app._userLog+"','-','-','-','"+this.vendorSPJ+"','-','-','-', '"+this.rekSPJ+"','-','T' "+
						    "from sp_spj_j "+
							"where dc='C' and nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_spj='"+this.e_nb.getText()+"'");
					
					
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
					setTipeButton(tbAllFalse);	
					this.progSeb = "";
					this.e_dok.setSQL("select distinct a.no_spj, a.keterangan "+
							  "from sp_pdaju_m a "+
							  "inner join sp_pdaju_d b on a.no_spj=b.no_spj and a.kode_lokasi=b.kode_lokasi "+
			                  "where b.kode_lokasi='"+this.app._lokasi+"' and nik_buat='"+this.app._userLog+"' and b.kode_pp='"+this.app._kodePP+"' and no_st = '-'",
							  ["no_spj","keterangan"],false,["Surat Perintah", "Keterangan"],"and","Data Surat Perintah",true);									
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";					
				var data = this.dbLib.getDataProvider("select no_spj from sp_spj_m where no_spj <> '"+this.e_nb.getText()+"' and nik = '"+this.cb_nik.getText()+"' and no_dokumen = '"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						system.alert(this,"Transaksi tidak valid.","NIK sudah terpakai untuk Surat Perintah dengan no "+line.no_aju+".");
						return false;
					}
				}

				this.sg.validasi();																
				this.sg2.validasi();																
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
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Transportasi.");
							return false;
						}
					}					
				}			
				for (var i=0;i < this.sg2.getRowCount();i++){					
					if (!this.sg2.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg2.getColCount();j++){
							if (this.sg2.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Uang Harian.");
							return false;
						}
					}					
				}				

				if (this.sg2.getRowValidCount() > 0){
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){			
							var strSQL = "select max(a.no_spj) as no_spj "+
										 "from sp_spj_dh a inner join sp_spj_m b on a.no_spj=b.no_spj "+
										 "where a.no_spj <> '"+this.e_nb.getText()+"' and "+
										 "b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' and '"+this.sg2.getCellDateValue(2,i)+"' between ( "+
										 "select MAX(a.tgl_mulai) "+
										 "from sp_spj_dh a inner join sp_spj_m b on a.no_spj=b.no_spj "+
										 "where a.no_spj <> '"+this.e_nb.getText()+"' and "+
										 "b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' "+
										 ") "+
										 "and "+
										 "( "+
										 "select MAX(a.tgl_selesai) "+
										 "from sp_spj_dh a inner join sp_spj_m b on a.no_spj=b.no_spj "+
										 "where a.no_spj <> '"+this.e_nb.getText()+"' and "+
										 "b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' "+
										 ") ";
							var data = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line != undefined && line.no_spj != "-"){		
									system.alert(this,"Transaksi tidak valid.","NIK + Nama sudah dibuat SPJ untuk tanggal '"+this.sg2.cells(2,i)+"' dan '"+this.sg2.cells(3,i)+"' ("+line.no_spj+")");
									return false;						
								} 
							}
								
							var d = new Date();
							var d1 = d.strToDate(this.sg2.cells(2,i));
							var d2 = d.strToDate(this.sg2.cells(3,i));
							if (d1 > d2) {							
								var k = i+1;
								system.alert(this,"Tanggal tidak valid.","Tanggal berangkat harus lebih awal dari tanggal tiba. (Baris: "+k+")");
								return false;
							}							
						}
					}
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total SPPD tidak boleh nol atau kurang dari nol.");
					return false;						
				}				
				else this.simpan();				
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				
				sql.add("delete from sp_spj_m where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from sp_spj_dt where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from sp_spj_dh where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from sp_spj_j where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				
				sql.add("delete from sp_spj_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				//utk yg loncat ke atasan2
				sql.add("delete from sp_spj_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
				
				sql.add("delete from sp_glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
		if (this.stsSimpan == 1) this.doClick();		
	},
	doChange:function(sender){
		try {
			if (sender == this.e_dok && this.e_dok.getText()!="") {
				var data2 = this.dbLib.getDataProvider("select c.tempat, a.jumlah-isnull(b.pakai,0) as sisa "+
							"from sp_pdaju_d a "+
							"	inner join sp_pdaju_m c on a.no_spj=c.no_spj and a.kode_lokasi=c.kode_lokasi "+
							"	left join ( select no_dokumen,kode_pp,kode_lokasi, count(*) as pakai "+
							"				from sp_spj_m where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							" 				group by no_dokumen,kode_pp,kode_lokasi "+
							") b on b.no_dokumen=a.no_spj and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp = '"+this.cb_pp.getText()+"' and a.no_spj='"+this.e_dok.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];			
					this.e_jml.setText(line2.sisa);	
					this.e_tempat.setText(line2.tempat);					
				}
			}

			if (sender == this.cb_nik && this.cb_nik.getText()!="") {
				var data2 = this.dbLib.getDataProvider("select nama, grade from karyawan where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];												 
					this.e_band.setText(line2.grade);					
					if (this.stsSimpan == 1) this.e_nama.setText(line2.nama);
				} 

				this.doLoadNIK();
			}

			if (sender == this.e_nilaiut || sender == this.e_nilaiuh) {
				if (this.e_nilaiut.getText()!="" && this.e_nilaiuh.getText()!="") {
					this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilaiut.getText()) + nilaiToFloat(this.e_nilaiuh.getText())));
				}
			}			
		}
		catch(e) { 
			alert(e);
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {			
					this.progSeb = "0";
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
					this.e_memo.setVisible(false);

					this.e_dok.setSQL("select distinct a.no_spj, a.keterangan "+
							  "from sp_pdaju_m a "+
							  "inner join sp_pdaju_d b on a.no_spj=b.no_spj and a.kode_lokasi=b.kode_lokasi "+
			                  "where b.kode_lokasi='"+this.app._lokasi+"' and nik_buat='"+this.app._userLog+"' and b.kode_pp='"+this.app._kodePP+"' and no_st = '-'",
							  ["no_spj","keterangan"],false,["Surat Perintah", "Keterangan"],"and","Data Surat Perintah",true);									
				}
				this.noAppLama = "-";
				this.noVerLama = "-";

				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sp_spj_m","no_spj",this.app._lokasi+"-PD"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);					
			}		
		}
		catch(e) {
			alert(e);
		}
	},		
	doChangeCell: function(sender, col, row) {
		if (col == 0 && this.sg.cells(0,row) != "") {			
			this.sg.cells(2,row,"");
			this.sg.cells(3,row,"");
			this.sg.cells(4,row,"");				
			this.sg.cells(5,row,"");				
			this.sg.cells(6,row,"0");			
			this.sg.cells(8,row,"0");
		}

		if (col == 2 && this.sg.cells(2,row) != "") {
			var data = this.dbLib.getDataProvider("select tarif,asal,tujuan from sp_trans "+
						"where kode_jenis = '"+this.sg.cells(0,row)+"' and kode_trans='"+this.sg.cells(2,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];																			
				this.sg.cells(4,row,line.asal);
				this.sg.cells(5,row,line.tujuan);								
				this.sg.cells(6,row,floatToNilai(line.tarif));

				if (this.sg.cells(6,row) != "" && this.sg.cells(7,row) != "") {				
					this.sg.setCell(8,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) * nilaiToFloat(this.sg.cells(7,row))));				
				}				
			}
			this.sg.validasi();
		}

		if (col == 7 || col == 6 ) {
			if (this.sg.cells(6,row) != "" && this.sg.cells(7,row) != "") {
				this.sg.setCell(8,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) * nilaiToFloat(this.sg.cells(7,row))));
				this.sg.validasi();
			}
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
			this.e_nilaiut.setText(floatToNilai(tot));
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
														"select kode_jenis,nama from sp_jenis where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_jenis) from sp_jenis where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_jenis","nama"),"and",new Array("Kode","Jenis"),false);					
						break;					
				case 2 :
							this.standarLib.showListDataForSG(this, "Daftar Rute",this.sg, this.sg.row, this.sg.col, 
														"select kode_trans, nama from sp_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' ",
														"select count(kode_trans) from sp_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' ",
														 new Array("kode_trans","nama"),"and",new Array("Kode","Nama"),false);					
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
														"select sts_spj, nama  from sp_status where kode_lokasi='"+this.app._lokasi+"'",
														"select count(sts_spj) from sp_status where kode_lokasi='"+this.app._lokasi+"'",									
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
			if ( this.e_band.getText() != "") {
				if (col == 0) {
					var data = this.dbLib.getDataProvider("select nilai from sp_uhar where kode_band = '"+this.e_band.getText()+"' and sts_spj = '"+this.sg2.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.nilai_uh = parseFloat(line.nilai);							
							this.sg2.setCell(5,row,floatToNilai(line.nilai));							
						}
						else {
							system.alert(this,"Transaksi tidak valid.","Tarif Uang Harian Band/Grade tidak ditemukan.");
							return false;
						}
					}
				}

				if (this.sg2.cells(2,row) == "" || this.sg2.cells(3,row) == "") this.sg2.cells(4,row,"0");
				else {				
					var d = new Date();
					var d1 =  d.strToDate(this.sg2.cells(2, row));
					var d2 = d.strToDate(this.sg2.cells(3, row));
					var jumlah = d2.DateDiff(d1) + 1;
					if (parseFloat(jumlah) > 0) this.sg2.cells(4,row,floatToNilai(jumlah));
					else this.sg2.cells(4,row,"0");				
				}
			}
			else {
				system.alert(this,"Transaksi tidak valid.","Harap pilih NIK SPPD terlebih dahulu.");
				return false;
			}	
		}		
		
		if ((col == 4 || col == 5 || col == 6) && this.sg2.cells(4,row)!="" && this.sg2.cells(5,row)!="" && this.sg2.cells(6,row)!="") {			
			this.sg2.setCell(7,row,floatToNilai( Math.round(nilaiToFloat(this.sg2.cells(5,row)) * nilaiToFloat(this.sg2.cells(4,row)) * nilaiToFloat(this.sg2.cells(6,row))/100 )));
		}		
		this.sg2.validasi();
	},	
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(7,i) != ""){
					tot += nilaiToFloat(this.sg2.getCell(7,i));			
				}
			}
			this.e_nilaiuh.setText(floatToNilai(tot));
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
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_spj_rptSpjForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
			setTipeButton(tbAllFalse);
			this.progSeb = "";
			this.e_memo.setVisible(false);
			this.e_dok.setSQL("select distinct a.no_spj, a.keterangan "+
							  "from sp_pdaju_m a "+
							  "inner join sp_pdaju_d b on a.no_spj=b.no_spj and a.kode_lokasi=b.kode_lokasi "+
			                  "where b.kode_lokasi='"+this.app._lokasi+"' and nik_buat='"+this.app._userLog+"' and b.kode_pp='"+this.app._kodePP+"' and no_st = '-'",
							  ["no_spj","keterangan"],false,["Surat Perintah", "Keterangan"],"and","Data Surat Perintah",true);									
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},





	doLoad3:function(sender){																				
		if (this.app._userStatus == "A") var bidang = ""; else var bidang = " b.kode_bidang = '"+this.app._kodeBidang+"' and "; 		
		var strSQL = "select a.no_spj,convert(varchar,a.tanggal,103) as tgl,modul,a.no_dokumen,a.progress, a.transport+a.harian as nilai "+
		             "from sp_spj_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+				 					 
					 "where a.no_spb ='-' and "+bidang+" a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'PDLOCAL' and a.progress in ('0','R','V','P','C')";		
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
			this.sg3.appendData([line.no_spj,line.tgl,line.modul,line.no_dokumen,line.progress,floatToNilai(line.nilai)]); 
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



				this.progSeb = this.sg3.cells(5,row);
				
				if (this.progSeb == "V") {
					var modulApp = "SPJ_SPB"; 
					var vRelasi = " a.no_ver=b.no_app and ";
				}
				else {
					var modulApp = "SPJ_APP"; 
					var vRelasi = " a.no_app=b.no_app and ";
				}					
				var strSQL = "select a.keterangan,a.no_dokumen,a.modul,a.due_date,a.tanggal,a.nik_perintah,a.nik_app,a.nik_app2,a.akun_uhar,a.kode_pp,a.kode_drk,a.nik_buat,a.jabatan,a.jabatan2,a.nama_spj,a.tempat,a.band,a.nik_bdh,"+
				             "a.no_ver as no_verlama,a.no_app as no_applama,a.progress,isnull(b.no_app,'-') as no_app,isnull(b.catatan,'-') as catatan, "+
				             "a.transport+a.harian as total "+
							 "from sp_spj_m a left join ("+
								 "        select a.kode_lokasi,a.no_app,a.catatan from sp_spj_aju_m a inner join app_m b "+
								 "        on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_appseb='-' and b.modul='"+modulApp+"') b on "+vRelasi+" a.kode_lokasi=b.kode_lokasi "+	
								// "select "+						 
							 "where a.modul='PDLOCAL' and a.no_spj = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.nilaiLama = line.total;										
						this.e_dok.setText(line.no_dokumen);
						this.e_jml.setText("-");						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						this.cb_pp.setText(line.kode_pp);
						this.cb_nik.setText(line.nik_buat);
						this.e_band.setText(line.band);
						this.e_nama.setText(line.nama_spj);
						this.e_tempat.setText(line.tempat);
						this.cb_atas1.setText(line.nik_app);
						this.cb_atas2.setText(line.nik_app2);
						this.e_jabatas1.setText(line.jabatan);
						this.e_jabatas2.setText(line.jabatan2);
						// this.e_memo.setText(line.);
						
						
						this.e_dok.setReadOnly(true);
						this.cb_pp.setReadOnly(true);

						this.e_dok.setSQL("",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
						this.cb_pp.setSQL("",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
						
						this.cb_nik.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

						this.noAppLama = line.no_applama;
						this.noVerLama = line.no_verlama;							
					}
				}								
				var strSQL = "select a.kode_trans,a.asal+'-'+a.tujuan as nama,a.nilai,a.asal,a.tujuan,a.kode_jenis,a.tarif,a.jumlah,b.nama as nama_jenis "+
							 "from sp_spj_dt a inner join sp_jenis b on a.kode_jenis=b.kode_jenis  "+
							 "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){				
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_jenis,line.nama_jenis,line.kode_trans,line.nama,line.asal,line.tujuan,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);			
				this.sg.validasi();		
				
				var strSQL = "select a.sts_spj,b.nama as nama_spj,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.lama,a.tarif,a.persen,a.nilai "+
							 "from sp_spj_dh a inner join sp_status b on a.sts_spj=b.sts_spj "+
							 "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.sts_spj,line.nama_spj,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.lama),floatToNilai(line.tarif),floatToNilai(line.persen),floatToNilai(line.nilai)]);
					}
				} else this.sg2.clear(1);
				this.sg2.validasi();
				
				this.e_memo.setVisible(true);
				var strSQL = "select a.*,isnull(c.catatan,'-') as cat1,isnull(d.catatan,'-') as cat2 "+
				             "from sp_spj_aju_m a  "+		
				             "     left join sp_spj_app_m c on a.no_app1=c.no_app "+		
				             "     left join sp_spj_app_m d on a.no_app2=d.no_app "+					 
							 "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																
						this.cb_atas1.setText(line.nik_app);		
						this.e_jabatas1.setText(line.jabatan);
						
						this.cb_atas2.setText(line.nik_app2);		
						this.e_jabatas2.setText(line.jabatan2);	
						
						this.e_memo.setText(line.cat1);
						if (line.cat2 != "-") this.e_memo.setText(line.cat2);	
								
					}
				}
				
				var data2 = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.cb_atas1.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas1.setText(line2.nik,line2.nama);
				}
				var data2 = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.cb_atas2.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_atas2.setText(line2.nik,line2.nama);
				}
				
				// var akun = this.cb_akun.getText();
				var pp = this.cb_pp.getText();
				var periode = this.e_periode.getText();
				var self = this;
				// this.app.services.getSaldo(akun, pp, periode, function(data) {			
				// 	var nilaiSeb = data + parseFloat(self.nilaiLama);
				// 	self.e_saldo.setText(floatToNilai(nilaiSeb));	
				// });		
			}									
		} catch(e) {alert(e);}
	}		
});