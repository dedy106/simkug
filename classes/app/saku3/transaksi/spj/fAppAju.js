window.app_saku3_transaksi_spj_fAppAju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spj_fAppAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spj_fAppAju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Pengajuan SPPD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data SPPD","List SPPD"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","Modul","No Dokumen","Deskripsi","Progress","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,60,350,180,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_nilaiut = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Nilai Transport", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});										
		this.e_nilaiuh = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Nilai U. Harian", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[570,17,200,20],caption:"Saldo Budget", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,990,348], childPage:["Data SPPD","Data Transport","Uang Harian","Data Pengajuan"]});
		this.e_nbaju = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Aju",readOnly:true});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Kegiatan", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18]}); 		
		this.cb_bdh = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Fiatur", multiSelection:false, maxLength:10, tag:2});								
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"NIK App Budget", multiSelection:false, maxLength:10, tag:2});						
		this.cb_tahu = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"NIK Perintah", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});										
		this.e_jab = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Jabatan", maxLength:50,tag:2});										
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.cb_akun = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Akun", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});								
		this.cb_drk = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});								
		this.cb_nik = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"NIK SPPD", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});						
		this.e_band = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Band/Grade", readOnly:true});							
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Nama SPPD", maxLength:50, readOnly:true});							
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Tempat", maxLength:50,tag:2});								
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,		            
					colTitle:["Kode Jns","Jenis Angkutan","Kode Rute","Nama","Tempat Asal","Tempat Tujuan","Tarif","Jumlah","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,160,160,170,70,80,60]],
					columnReadOnly:[true,[0,1,2,3,4,5,8],[6,7]],
					buttonStyle:[[0,2],[bsEllips,bsEllips]], 
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Persen","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,100,120,120,120,200,80]],
					columnReadOnly:[true,[0,1,4,7,2,3],[5,6]],
					colFormat:[[2,3,4,5,6,7],[cfDate,cfDate,cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,2,3],[bsEllips,bsDate,bsDate]], 					
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});					
				
		this.sg4 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:9,tag:0,
		            colTitle:["No Aju","NIK PD","Tgl Mulai","Tgl Selesai","Keg. Bidang","Kegiatan","Tempat","PP","NIK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[60,150,200,300,100,70,70,200,100]],				
					readOnly:true,
					dblClick:[this,"doDoubleClick4"],autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg4,pager:[this,"doPager4"]});
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
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
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
									
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_tahu.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_bdh.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' and kode_bidang='"+this.app._kodeBidang+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						        "where b.kode_flag = '030' and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun SPPD",true);			
			this.cb_pp.setText(this.app._kodePP);
			
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='NIKMBDH' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_bdh.setText(line.flag);
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spj_fAppAju.extend(window.childForm);
window.app_saku3_transaksi_spj_fAppAju.implement({		
	doLoad4:function(sender){																
		var strSQL = "select a.no_aju as no_bukti,convert(varchar,a.tgl_awal,103) as tglawal,convert(varchar,a.tgl_akhir,103) as tglakhir,b.nama as bidang,a.tempat,a.keterangan,a.nik+' - '+a.nama as nama,c.kode_pp+' - '+c.nama as pp,a.nik "+
		             "from pdss_aju_m a inner join bidang b on a.kode_bidang=b.kode_bidang  "+
		             "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					 "where a.progress='2' and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_bidang='"+this.app._kodeBidang+"' "+					 					 
					 "order by a.no_aju";					 			
					 				 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);
		} else this.sg4.clear(1);							
	},							
	doTampilData4: function(page) {
		this.sg4.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg4.appendData([line.no_bukti,line.nama,line.tglawal,line.tglakhir,line.bidang,line.keterangan,line.tempat,line.pp,line.nik]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},
	doDoubleClick4: function(sender, col , row) {
		try{
			if (this.sg4.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.e_nbaju.setText(this.sg4.cells(0,row));												
				this.dp_d2.setText(this.sg4.cells(2,row));
				this.e_ket.setText(this.sg4.cells(5,row));
				this.e_tempat.setText(this.sg4.cells(6,row));	
				this.cb_nik.setText(this.sg4.cells(8,row));												
			}
		} catch(e) {alert(e);}
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
						sql.add("delete from yk_spj_m where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from yk_spj_dt where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from yk_spj_dh where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update pdss_aju_m set progress='2',no_app3='-' where no_app3='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}													
					
					sql.add("update pdss_aju_m set progress='3',no_app3='"+this.e_nb.getText()+"' where no_aju='"+this.e_nbaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.progSeb == "V" || this.progSeb == "1") var vProg = "1"; else var vProg = "0";
					sql.add("insert into yk_spj_m(no_spj,kode_lokasi,kode_loktuj,kode_bidangtuj,modul,progress,periode,tanggal,due_date,kode_pp,no_dokumen,keterangan,tempat,nik_buat,nama_spj,nik_app,nik_perintah,jabatan,akun_uhar,akun_tran,transport,harian,tgl_input,nik_user,kode_drk,no_app,no_ver,no_spb,band,nik_bdh) values "+
					       "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._kodeBidang+"','PDLOCAL','"+vProg+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.cb_pp.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.e_tempat.getText()+"','"+this.cb_nik.getText()+"','"+this.e_nama.getText()+"','"+this.cb_app.getText()+"','"+this.cb_tahu.getText()+"','"+this.e_jab.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_akun.getText()+"',"+nilaiToFloat(this.e_nilaiut.getText())+","+nilaiToFloat(this.e_nilaiuh.getText())+",getdate(),'"+this.app._userLog+"','"+this.cb_drk.getText()+"','"+this.noAppLama+"','"+this.noVerLama+"','-','"+this.e_band.getText()+"','"+this.cb_bdh.getText()+"')")							
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into yk_spj_dt(no_spj,kode_lokasi,no_urut,kode_trans,asal,tujuan,kode_jenis,nilai,jumlah,tarif) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(6,i))+")");
							}
						}
					}					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into yk_spj_dh(no_spj,kode_lokasi,no_urut,sts_spj,tgl_mulai,tgl_selesai,lama,tarif,persen,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.getCellDateValue(2,i)+"','"+this.sg2.getCellDateValue(3,i)+"',"+parseNilai(this.sg2.cells(4,i))+","+parseNilai(this.sg2.cells(5,i))+","+parseNilai(this.sg2.cells(6,i))+","+parseNilai(this.sg2.cells(7,i))+")");
							}
						}
					}
					var total = nilaiToFloat(this.e_nilaiut.getText()) + nilaiToFloat(this.e_nilaiuh.getText());
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','PDAJU','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+parseNilai(this.e_saldo.getText())+","+total+")");

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
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";				
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
							var strSQL = "select a.no_spj from yk_spj_dh a inner join yk_spj_m b on a.no_spj=b.no_spj where a.no_spj <> '"+this.e_nb.getText()+"' and b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' and a.tgl_mulai between '"+this.sg2.getCellDateValue(2,i)+"' and '"+this.sg2.getCellDateValue(3,i)+"' "+
										 "union "+
										 "select a.no_spj from yk_spj_dh a inner join yk_spj_m b on a.no_spj=b.no_spj where a.no_spj <> '"+this.e_nb.getText()+"' and b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' and a.tgl_selesai between '"+this.sg2.getCellDateValue(2,i)+"' and '"+this.sg2.getCellDateValue(3,i)+"' ";
							var data = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line != undefined){		
									system.alert(this,"Transaksi tidak valid.","NIK + Nama sudah dibuat SPJ untuk tanggal '"+this.sg2.cells(2,i)+"' dan '"+this.sg2.cells(3,i)+"' ");
									return false;						
								} 
							}

							
							var strSQL = "select max(a.no_spj) as no_spj "+
										 "from yk_spj_dh a inner join yk_spj_m b on a.no_spj=b.no_spj "+
										 "where a.no_spj <> '"+this.e_nb.getText()+"' and "+
										 "b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' and '"+this.sg2.getCellDateValue(2,i)+"' between ( "+
										 "select MAX(a.tgl_mulai) "+
										 "from yk_spj_dh a inner join yk_spj_m b on a.no_spj=b.no_spj "+
										 "where a.no_spj <> '"+this.e_nb.getText()+"' and "+
										 "b.nama_spj='"+this.e_nama.getText()+"' and b.nik_buat='"+this.cb_nik.getText()+"' "+
										 ") "+
										 "and "+
										 "( "+
										 "select MAX(a.tgl_selesai) "+
										 "from yk_spj_dh a inner join yk_spj_m b on a.no_spj=b.no_spj "+
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
				if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total SPPD tidak boleh melebihi saldo anggaran.");
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
				sql.add("delete from yk_spj_m where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from yk_spj_dt where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from yk_spj_dh where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update pdss_aju_m set progress='1',no_app3='-' where no_app3='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
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
		if (this.stsSimpan == 1) {
			this.doClick();	
			this.doLoad4();	
		}
	},
	doChange:function(sender){
		if (sender == this.e_nilaiut || this.e_nilaiuh) {
			if (this.e_nilaiut.getText()!="" && this.e_nilaiuh.getText()!="") {
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilaiut.getText()) + nilaiToFloat(this.e_nilaiuh.getText())));
			}
		}		
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();								
		if (sender == this.cb_nik && this.stsSimpan ==1) {
			this.sg2.clear(1);			
			if (this.cb_nik.getText() != "" && this.stsSimpan == 1) {				
				if (this.cb_nik.getText().substr(0,5) == "99999") this.e_nama.setReadOnly(false);
				else this.e_nama.setReadOnly(true);
				var data2 = this.dbLib.getDataProvider("select nama,grade from karyawan where nik='"+this.cb_nik.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];							
					this.kodegrade = line2.grade;
					this.e_band.setText(line2.grade);
					this.e_nama.setText(line2.nama);
				} 
				else {
					this.kodegrade = ""; 
					this.e_band.setText("");
					this.e_nama.setText("");
				}
			}
		}
		if (sender == this.cb_tahu && this.cb_tahu.getText() != "" && this.stsSimpan == 1) {			
			var data2 = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_tahu.getText()+"'",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2 = data2.rs.rows[0];
				this.e_jab.setText(line2.jabatan);
			} else this.e_jab.setText("");				
		}		
		if ((sender == this.cb_pp ||sender == this.e_periode)  && this.cb_pp.getText() !="" && this.e_periode.getText() !="") {
				if (this.e_periode.getText().substr(4,2) == "13") var vPeriode = this.e_periode.getText().substr(0,4) + "12";
				else var vPeriode = this.e_periode.getText();
				this.cb_akun.setSQL("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"       inner join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='"+this.cb_pp.getText()+"' and c.periode = '"+vPeriode+"' "+ 
									"where b.kode_flag in ('030') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);													
		}
		if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="") {
			var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.stsGar = line.status_gar;
				} 
			}
			if (this.stsGar == "1") this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
			else this.cb_drk.setSQL("select '-' as kode_drk, '-' as nama ",["kode_drk","nama"],false,["Kode","Nama"],"where","Data DRK",true);											
		}
		if ((sender == this.cb_pp || sender == this.cb_akun || sender == this.cb_drk || sender == this.e_periode) && this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.cb_drk.getText()!="" && this.e_periode.getText()!="") {
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				var sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.e_saldo.setText(floatToNilai(sls));				
			}
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {			
					this.progSeb = "0";
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
				}
				this.noAppLama = "-";
				this.noVerLama = "-";
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_spj_m","no_spj",this.app._lokasi+"-PD"+this.e_periode.getText().substr(2,4)+".","0000"));						
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
			this.sg.cells(7,row,"0");
			this.sg.cells(8,row,"0");
		}
		if (col == 2 && this.sg.cells(2,row) != "") {
			var data = this.dbLib.getDataProvider("select nilai,asal,tujuan from yk_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and kode_trans='"+this.sg.cells(2,row)+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];																			
				this.sg.cells(4,row,line.asal);
				this.sg.cells(5,row,line.tujuan);				
				this.sg.cells(6,row,floatToNilai(line.nilai));
				this.sg.cells(7,row,"1");				
				this.sg.setCell(8,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) * nilaiToFloat(this.sg.cells(7,row))));				
				this.sg.cells(3,row,line.nama);
			}
			this.sg.validasi();
		}
		if (col == 7 || col == 6 ) {
				if (this.sg.cells(6,row) != "" && this.sg.cells(7,row) != "") this.sg.setCell(8,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) * nilaiToFloat(this.sg.cells(7,row))));
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
														"select kode_jenis,nama from yk_spj_jenis",
														"select count(kode_jenis) from yk_spj_jenis",
														 new Array("kode_jenis","nama"),"where",new Array("Kode","Jenis"),false);					
						break;					
				case 2 :
							this.standarLib.showListDataForSG(this, "Daftar Rute",this.sg, this.sg.row, this.sg.col, 
														"select kode_trans, nama from yk_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and flag_aktif='1' ",
														"select count(kode_trans) from yk_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and flag_aktif='1' ",
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
														"select sts_spj, nama  from yk_status_spj ",
														"select count(sts_spj) from yk_status_spj ",									
														 new Array("sts_spj","nama"),"where",new Array("Kode","Jenis"),false);					
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
				var data = this.dbLib.getDataProvider("select nilai from yk_spj_harian where kode_band = '"+this.kodegrade+"' and sts_spj = '"+this.sg2.cells(0,row)+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.nilai_uh = parseFloat(line.nilai);
						this.sg2.setCell(6,row,"100");
					}
				}
			}
			if (this.sg2.cells(2,row)=="" || this.sg2.cells(3,row)=="") this.sg2.cells(4,row,"0");
			else {				
				var d = new Date();
				var d1 =  d.strToDate(this.sg2.cells(2, row));
				var d2 = d.strToDate(this.sg2.cells(3, row));
				var jumlah = d2.DateDiff(d1) + 1;
				if (parseFloat(jumlah) > 0) this.sg2.cells(4,row,floatToNilai(jumlah));
				else this.sg2.cells(4,row,"0");				
			}
		}		
		if (col == 4 && this.sg2.cells(4,row)!="") {
			this.sg2.setCell(5,row,floatToNilai(this.nilai_uh));
			this.sg2.setCell(7,row,floatToNilai( Math.round(nilaiToFloat(this.sg2.cells(5,row)) * nilaiToFloat(this.sg2.cells(4,row)) * nilaiToFloat(this.sg2.cells(6,row))/100 )));
		}
		if (col == 5 || col == 6 ) {
			if (this.sg2.cells(5,row)!="" && this.sg2.cells(6,row)!="") {
				this.sg2.setCell(7,row,floatToNilai( Math.round(nilaiToFloat(this.sg2.cells(5,row)) * nilaiToFloat(this.sg2.cells(4,row)) * nilaiToFloat(this.sg2.cells(6,row))/100 )));
			}
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
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		if (this.app._userStatus == "A") var bidang = ""; else var bidang = " b.kode_bidang = '"+this.app._kodeBidang+"' and "; 		
		var strSQL = "select a.no_spj,convert(varchar,a.tanggal,103) as tgl,modul,a.no_dokumen,a.keterangan,a.progress,a.transport+a.harian as nilai "+
		             "from yk_spj_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.no_spb ='-' and "+bidang+" a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'PDLOCAL' and a.progress in ('0','R','V')";		
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
			this.sg3.appendData([line.no_spj,line.tgl,line.modul,line.no_dokumen,line.keterangan,line.progress,floatToNilai(line.nilai)]); 
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
				var strSQL = "select c.no_aju,a.keterangan,a.no_dokumen,a.modul,a.due_date,a.tanggal,a.nik_perintah,a.nik_app,a.akun_uhar,a.kode_pp,a.kode_drk,a.nik_buat,a.jabatan,a.nama_spj,a.tempat,a.band,a.nik_bdh,"+
				             "a.no_ver as no_verlama,a.no_app as no_applama,a.progress,isnull(b.no_app,'-') as no_app,isnull(b.catatan,'-') as catatan "+
							 "from yk_spj_m a "+
							 "inner join pdss_aju_m c on a.no_spj=c.no_app3 "
							 "left join ("+
								 "        select a.kode_lokasi,a.no_app,a.catatan from app_d a inner join app_m b "+
								 "        on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_appseb='-' and b.modul='"+modulApp+"') b on "+vRelasi+" a.kode_lokasi=b.kode_lokasi "+							 
							 "where a.modul='PDLOCAL' and a.no_spj = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_nbaju.setText(line.no_aju);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						this.cb_app.setText(line.nik_app);
						this.cb_tahu.setText(line.nik_perintah);						
						this.cb_bdh.setText(line.nik_bdh);						
						this.e_jab.setText(line.jabatan);
						this.cb_pp.setText(line.kode_pp);
						this.cb_akun.setText(line.akun_uhar);
						this.cb_drk.setText(line.kode_drk);
						this.cb_nik.setText(line.nik_buat);
						this.e_band.setText(line.band);
						this.e_nama.setText(line.nama_spj);
						this.e_tempat.setText(line.tempat);
						
						this.noAppLama = line.no_applama;
						this.noVerLama = line.no_verlama;						
					}
				}								
				var strSQL = "select a.kode_trans,a.asal+'-'+a.tujuan as nama,a.nilai,a.asal,a.tujuan,a.kode_jenis,a.tarif,a.jumlah,b.nama as nama_jenis "+
							 "from yk_spj_dt a inner join yk_spj_jenis b on a.kode_jenis=b.kode_jenis  "+
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
							 "from yk_spj_dh a inner join yk_status_spj b on a.sts_spj=b.sts_spj "+
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
			}									
		} catch(e) {alert(e);}
	}		
});