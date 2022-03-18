window.app_hris_transaksi_adm_fAppE = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_adm_fAppE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_adm_fAppE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Adm Personalia: Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Approve", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.c_modul = new saiLabelEdit(this,{bound:[20,20,200,20],caption:"Jenis", readOnly:true,change:[this,"doChange"]});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,330],caption:"Data Pengajuan Absensi"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,895,280],colCount:9,tag:9,
				colTitle:["Status","Catatan","No Absen","Tanggal","Keterangan","Loker","Karyawan","Status Absen","NIK"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[0,220,200,200,220,70,120,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,305,899,25],buttonStyle:2,grid:this.sg});

		this.p2 = new portalui_panel(this,{bound:[20,189,900,330],caption:"Data Pengajuan Lembur Sukarela", visible:false});
		this.sg2 = new saiGrid(this.p2,{bound:[0,20,895,280],colCount:10,tag:9,
				colTitle:["Status","Catatan","No Lembur","Tanggal","Loker","Karyawan","Tugas","Dilaporkan Kepada","Jam","PerHtng Jam Kerja"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,80,200,200,220,220,70,120,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
				defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,305,899,25],buttonStyle:2,grid:this.sg2});

		this.p3 = new portalui_panel(this,{bound:[20,189,900,330],caption:"Data Pengajuan Cuti", visible:false});
		this.sg3 = new saiGrid(this.p3,{bound:[0,20,895,280],colCount:11,tag:9,
				colTitle:["Status","Catatan","No Cuti","Tanggal","Loker","Karyawan","Status Cuti","Alasan Cuti","Alamat Cuti","Tgl Mulai","Tgl Selesai"],
				colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[80,80,200,200,220,220,200,70,120,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],
				defaultRow:1,autoAppend:false});
		this.sgn3 = new portalui_sgNavigator(this.p3,{bound:[0,305,899,25],buttonStyle:2,grid:this.sg3});

		this.p4 = new portalui_panel(this,{bound:[20,189,900,330],caption:"Data Pengajuan SPPD", visible:false});
		this.sg4 = new saiGrid(this.p4,{bound:[0,20,895,280],colCount:10,tag:9,
				colTitle:["Status","Catatan","No SPPD","Tanggal","Loker","Karyawan","Status SPPD","Keterangan","Nilai Transport","Uang Harian"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,200,220,220,200,70,120,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
				defaultRow:1,autoAppend:false});
		this.sgn4 = new portalui_sgNavigator(this.p4,{bound:[0,305,899,25],buttonStyle:2,grid:this.sg4});

		this.p5 = new portalui_panel(this,{bound:[20,189,900,330],caption:"Data Pengajuan Surat Keterangan", visible:false});
		this.sg5 = new saiGrid(this.p5,{bound:[0,20,895,280],colCount:8,tag:9,
				colTitle:["Status","Catatan","No Surat","Tanggal","Departemen","Karyawan","Untuk Keperluan","Ditujukan Kepada"],
				colWidth:[[7,6,5,4,3,2,1,0],[200,220,220,200,70,120,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				defaultRow:1,autoAppend:false});
		this.sgn5 = new portalui_sgNavigator(this.p5,{bound:[0,305,899,25],buttonStyle:2,grid:this.sg5});
		
		this.p6 = new portalui_panel(this,{bound:[20,189,900,330],caption:"Data Pengajuan Ijin", visible:false});
		this.sg6 = new saiGrid(this.p6,{bound:[0,20,895,280],colCount:8,tag:9,
				colTitle:["Status","Catatan","No Ijin","Tanggal","Departemen","Karyawan","Approved","Keterangan"],
				colWidth:[[7,6,5,4,3,2,1,0],[200,220,220,200,70,120,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				defaultRow:1,autoAppend:false});
		this.sgn6 = new portalui_sgNavigator(this.p6,{bound:[0,305,899,25],buttonStyle:2,grid:this.sg6});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.e_nb.setSQL("select no_app, keterangan from gr_app_m where modul in ('ABSEN','LEMBUR','CUTI','SPPD','SURAT','IJIN') and kode_lokasi='"+this.app._lokasi+"'",["no_app","keterangan"],false,["No App","Keterangan"],"and","Data Approve",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_adm_fAppE.extend(window.childForm);
window.app_hris_transaksi_adm_fAppE.implement({
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
																			
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
					this.sg.clear(1);
					this.sg2.clear(1);
					this.sg3.clear(1);
					this.sg4.clear(1);
					this.sg5.clear(1);
					this.sg6.clear(1);
					setTipeButton(tbHapus);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				if (this.c_modul.getText() == "ABSEN" && this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){														
							sql.add("update gr_absen set progress='1' where no_absen='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
				}				
				if (this.c_modul.getText() == "LEMBUR" && this.sg2.getRowValidCount() > 0){
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){									
							sql.add("update gr_lembur set progress='1' where no_lembur='"+this.sg2.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
				}				
				if (this.c_modul.getText() == "CUTI" && this.sg3.getRowValidCount() > 0){
					for (var i=0;i < this.sg3.getRowCount();i++){
						if (this.sg3.rowValid(i)){														
							sql.add("update gr_cuti set progress='1' where no_cuti='"+this.sg3.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
				}				
				if (this.c_modul.getText() == "SPPD" && this.sg4.getRowValidCount() > 0){
					for (var i=0;i < this.sg4.getRowCount();i++){
						if (this.sg4.rowValid(i)){							
							sql.add("update gr_spj_m set progress='1' where no_spj='"+this.sg4.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}
				}
				if (this.c_modul.getText() == "SURAT" && this.sg5.getRowValidCount() > 0){					
					for (var i=0;i < this.sg5.getRowCount();i++){
						if (this.sg5.rowValid(i)){														
							sql.add("update gr_surat set progress='1' where no_surat='"+this.sg5.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
				}
				if (this.c_modul.getText() == "IJIN" && this.sg6.getRowValidCount() > 0){
					for (var i=0;i < this.sg6.getRowCount();i++){
						if (this.sg6.rowValid(i)){														
							sql.add("update gr_ijin_m set progress='1' where no_ijin='"+this.sg6.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
				}
				sql.add("delete from gr_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
				sql.add("delete from gr_app_d where no_app='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");				
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
	},
	doChange:function(sender){
		if (sender == this.e_nb) {
			this.e_ket.setFocus();
			this.sg.clear(1);
			this.sg2.clear(1);
			this.sg3.clear(1);
			this.sg4.clear(1);
			this.sg5.clear(1);						
			this.sg6.clear(1);						
			var data = this.dbLib.getDataProvider(
					   "select a.tanggal,a.periode,a.nik_app,b.nama as nama_app,a.keterangan,a.modul from gr_app_m a "+
					   "       inner join gr_karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_app='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);
					this.e_periode.setText(line.periode);
					this.e_ket.setText(line.keterangan);					
					this.c_modul.setText(line.modul);					
					this.cb_app.setText(line.nik_app,line.nama_app);
				} 
			}
			
			if (this.c_modul.getText() == "ABSEN") {
				this.sg.setTag("1");
				this.sg2.setTag("9");
				this.sg3.setTag("9");
				this.sg4.setTag("9");
				this.sg5.setTag("9");
				this.sg6.setTag("9");
				this.p1.setVisible(true);
				this.p2.setVisible(false);
				this.p3.setVisible(false);
				this.p4.setVisible(false);
				this.p5.setVisible(false);
				this.p6.setVisible(false);
			}
			if (this.c_modul.getText() == "LEMBUR") {
				this.sg.setTag("9");
				this.sg2.setTag("1");
				this.sg3.setTag("9");
				this.sg4.setTag("9");
				this.sg5.setTag("9");
				this.sg6.setTag("9");
				this.p1.setVisible(false);
				this.p2.setVisible(true);
				this.p3.setVisible(false);
				this.p4.setVisible(false);
				this.p5.setVisible(false);
				this.p6.setVisible(false);
			}
			if (this.c_modul.getText() == "CUTI") {
				this.sg.setTag("9");
				this.sg2.setTag("9");
				this.sg3.setTag("1");
				this.sg4.setTag("9");
				this.sg5.setTag("9");
				this.sg6.setTag("9");
				this.p1.setVisible(false);
				this.p2.setVisible(false);
				this.p3.setVisible(true);
				this.p4.setVisible(false);
				this.p5.setVisible(false);
				this.p6.setVisible(false);
			}
			if (this.c_modul.getText() == "SPPD") {
				this.sg.setTag("9");
				this.sg2.setTag("9");
				this.sg3.setTag("9");
				this.sg4.setTag("1");
				this.sg5.setTag("9");
				this.sg6.setTag("9");
				this.p1.setVisible(false);
				this.p2.setVisible(false);
				this.p3.setVisible(false);
				this.p4.setVisible(true);
				this.p5.setVisible(false);
				this.p6.setVisible(false);
			}
			if (this.c_modul.getText() == "SURAT") {
				this.sg.setTag("9");
				this.sg2.setTag("9");
				this.sg3.setTag("9");
				this.sg4.setTag("9");
				this.sg5.setTag("1");
				this.sg6.setTag("9");
				this.p1.setVisible(false);
				this.p2.setVisible(false);
				this.p3.setVisible(false);
				this.p4.setVisible(false);
				this.p5.setVisible(true);
				this.p6.setVisible(false);
			}
			if (this.c_modul.getText() == "IJIN") {
				this.sg.setTag("9");
				this.sg2.setTag("9");
				this.sg3.setTag("9");
				this.sg4.setTag("9");
				this.sg5.setTag("9");
				this.sg6.setTag("1");
				this.p1.setVisible(false);
				this.p2.setVisible(false);
				this.p3.setVisible(false);
				this.p4.setVisible(false);
				this.p5.setVisible(false);
				this.p6.setVisible(true);
			}			
			this.doTampilClick();			
		}
	},
	doTampilClick:function(sender){
		if (this.c_modul.getText() == "ABSEN") {
			if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
				var data = this.dbLib.getDataProvider("select a.no_absen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,a.sts_absen+' - '+d.nama as absen,a.nik_buat as nik,f.status,f.catatan "+
					"from gr_absen a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
					"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					"                inner join gr_status_absen d on a.sts_absen=d.sts_absen and a.kode_lokasi=d.kode_lokasi "+					
					"				 inner join gr_app_d f on f.no_bukti=a.no_absen and a.kode_lokasi=f.kode_lokasi "+
					"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.status,line.catatan,line.no_absen,line.tanggal,line.keterangan,line.loker,line.karyawan,line.absen,line.nik]);
					}
				} else this.sg.clear(1);
			}
			else {
				system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
			}
		}
		if (this.c_modul.getText() == "LEMBUR") {
			if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
				var data = this.dbLib.getDataProvider("select a.no_lembur,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,a.tugas,a.keterangan,a.jam,a.jam_kerja,f.status,f.catatan "+
					"from gr_lembur a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
					"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					"				 inner join gr_app_d f on f.no_bukti=a.no_lembur and a.kode_lokasi=f.kode_lokasi "+
					"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.status,line.catatan,line.no_lembur,line.tanggal,line.loker,line.karyawan,line.tugas,line.keterangan,line.jam,line.jam_kerja]);
					}
				} else this.sg2.clear(1);
			}
			else {
				system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
			}
		}
		if (this.c_modul.getText() == "CUTI") {
			if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
				var data = this.dbLib.getDataProvider("select a.no_cuti,convert(varchar,a.tanggal,103) as tanggal,a.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,a.sts_cuti+' - '+d.nama as cuti,a.alasan,a.alamat,convert(varchar,a.tgl_mulai,103) as mulai,convert(varchar,a.tgl_selesai,103) as selesai,f.status,f.catatan "+
					"from gr_cuti a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
					"               inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					"               inner join gr_status_cuti d on a.sts_cuti=d.sts_cuti and a.kode_lokasi=d.kode_lokasi "+
					"				 inner join gr_app_d f on f.no_bukti=a.no_cuti and a.kode_lokasi=f.kode_lokasi "+
					"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.status,line.catatan,line.no_cuti,line.tanggal,line.loker,line.karyawan,line.cuti,line.alasan,line.alamat,line.mulai,line.selesai]);
					}
				} else this.sg3.clear(1);
			}
			else {
				system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
			}
		}
		if (this.c_modul.getText() == "SPPD") {
			if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
				var data = this.dbLib.getDataProvider("select a.no_spj,convert(varchar,a.tanggal,103) as tanggal,a.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,'-' as spj,a.keterangan,a.transport,a.harian,f.status,f.catatan  "+
					"from gr_spj_m a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
					"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					"				 inner join gr_app_d f on f.no_bukti=a.no_spj and a.kode_lokasi=f.kode_lokasi "+
					"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.status,line.catatan,line.no_spj,line.tanggal,line.loker,line.karyawan,line.spj,line.keterangan,floatToNilai(line.transport),floatToNilai(line.harian)]);
					}
				} else this.sg4.clear(1);
			}
			else {
				system.alert(this,"Data tidak valid.","Jenis dan Periode harus diisi.");
			}
		}
		if (this.c_modul.getText() == "SURAT") {
			if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
				var data = this.dbLib.getDataProvider("select a.no_surat,convert(varchar,a.tanggal,103) as tanggal,a.kode_dept+' - '+b.nama as dept,a.nik_buat+' - '+c.nama as karyawan,a.nik_app+' - '+d.nama as app,a.keterangan,f.status,f.catatan "+
					"from gr_surat a inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+
					"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					"                inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+
					"				 inner join gr_app_d f on f.no_bukti=a.no_surat and a.kode_lokasi=f.kode_lokasi "+
					"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg5.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg5.appendData([line.status,line.catatan,line.no_surat,line.tanggal,line.dept,line.karyawan,line.keterangan,line.app]);
					}
				} else this.sg5.clear(1);
			}
			else {
				system.alert(this,"Data tidak valid.","Nik Approve,Jenis dan Periode harus diisi.");
			}
		}
		if (this.c_modul.getText() == "IJIN") {
			if (this.e_periode.getText() != "" && this.e_nb.getText() != "") {
				var data = this.dbLib.getDataProvider("select a.no_ijin,convert(varchar,a.tanggal,103) as tanggal,a.kode_dept+' - '+b.nama as dept,a.nik_buat+' - '+c.nama as karyawan,a.nik_app+' - '+d.nama as app,a.keterangan,f.status,f.catatan "+
					"from gr_ijin_m a inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+
					"                 inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					"                 inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+
					"				  inner join gr_app_d f on f.no_bukti=a.no_ijin and a.kode_lokasi=f.kode_lokasi "+
					"where f.no_app = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg6.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg6.appendData([line.status,line.catatan,line.no_ijin,line.tanggal,line.dept,line.karyawan,line.app,line.keterangan]);
					}
				} else this.sg6.clear(1);
			}
			else {
				system.alert(this,"Data tidak valid.","Nik Approve,Jenis dan Periode harus diisi.");
			}
		}		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});