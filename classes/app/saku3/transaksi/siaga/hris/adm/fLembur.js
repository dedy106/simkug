window.app_saku3_transaksi_siaga_hris_adm_fLembur = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fLembur.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fLembur";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Lembur Sukarela", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;checkBox");
		uses("saiGrid",true);	
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[30,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl = new portalui_label(this,{bound:[30,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[130,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 

		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Lembur","Data Lembur"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["No. Lembur","Tanggal","Keterangan"],
					colWidth:[[2,1,0],[400,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});				

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[10,12,222,20],caption:"No Lembur",maxLength:30, labelWidth:120,readOnly:true,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[235,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_tugas = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,14,470,20],caption:"Tugas", maxLength:100, labelWidth:120});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,15,470,20],caption:"Dilaporkan Kepada", maxLength:100, labelWidth:120});	
		this.c_jh = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,17,220,20],caption:"Jenis Hari", maxLength:100, labelWidth:120, tag:2,readOnly:true});	
		this.c_hari = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,20,220,20],caption:"Hari",readOnly:true, labelWidth:120});				
		this.e_jam = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,16,220,20],caption:"Jam Mulai [0-23]", maxLength:5, tipeText:ttNilai, labelWidth:120});		
		this.e_menit = new saiLabelEdit(this.pc1.childPage[0],{bound:[255,16,220,20],caption:"Menit Mulai [0-59]", maxLength:5, tipeText:ttNilai, labelWidth:120});		
		this.e_jam2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,17,220,20],caption:"Jam Selesai [0-23]", maxLength:5, tipeText:ttNilai, labelWidth:120});		
		this.e_menit2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[255,17,220,20],caption:"Menit Selesai [0-59]", maxLength:5, tipeText:ttNilai, labelWidth:120});		
		this.e_jk = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,18,220,20],caption:"Perhtg. Jam Lembur", tipeText:ttNilai, labelWidth:120, text:"0",readOnly:true});		
		this.i_hitung = new portalui_imageButton(this.pc1.childPage[0],{bound:[235,18,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png", labelWidth:120,click:[this,"doHitung"]});
		
		this.cb_loker = new saiCBBL(this.pc1.childPage[0],{bound:[10,19,240,20],caption:"Unit Kerja", multiSelection:false, labelWidth:120, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[10,16,240,20],caption:"NIK Pembuat", multiSelection:false, labelWidth:120, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[10,17,240,20],caption:"NIK Verifikasi", multiSelection:false, labelWidth:120, maxLength:10, tag:2});
		
		this.cb1 = new portalui_checkBox(this.pc1.childPage[0],{bound:[110,24,100,25],caption:"Preview",selected:true,visible:false});	
		
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

			//this.cb_loker.setSQL("select kode_so, nama from gr_so where getdate() between tgl_awal and tgl_akhir and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_so","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);						
			this.cb_loker.setSQL("select kode_loker, nama from gr_loker where flag_aktif= '1' and kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Unit Kerja",true);						
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Verifikasi",true);			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			var strSQL = "select * from gr_karyawan "+							 
						"where nik = '"+this.app._userLog+"' ";							 					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.cb_loker.setText(line.kode_loker);
					this.cb_buat.setText(line.nik);					
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fLembur.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fLembur.implement({
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
					if(this.stsSimpan == 1) this.doClick(this.i_gen);							
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_lembur(no_lembur,kode_lokasi,periode,tanggal,kode_loker,jam,tugas,nik_buat,nik_app,keterangan,progress,jam_kerja,tgl_input,nik_user,hari,jenis_hari,no_lembur_gaji,menit) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_loker.getText()+"','"+this.e_jam.getText()+"-"+this.e_jam2.getText()+"','"+this.e_tugas.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_ket.getText()+"','0',"+parseNilai(this.e_jk.getText())+",getdate(),'"+this.app._userLog+"','"+this.c_hari.getText()+"','"+this.c_jh.getText()+"','-','"+this.e_menit.getText()+"-"+this.e_menit2.getText()+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_lembur where no_lembur='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into gr_lembur(no_lembur,kode_lokasi,periode,tanggal,kode_loker,jam,tugas,nik_buat,nik_app,keterangan,progress,jam_kerja,tgl_input,nik_user,hari,jenis_hari,no_lembur_gaji,menit) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_loker.getText()+"','"+this.e_jam.getText()+"-"+this.e_jam2.getText()+"','"+this.e_tugas.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_ket.getText()+"','0',"+parseNilai(this.e_jk.getText())+",getdate(),'"+this.app._userLog+"','"+this.c_hari.getText()+"','"+this.c_jh.getText()+"','-','"+this.e_menit.getText()+"-"+this.e_menit2.getText()+"')");
					
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
					sql.add("delete from gr_lembur where no_lembur='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg1.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
				break;
			case "simpan" :					
				if (this.c_jh.getText() == "HK") {
					if (nilaiToFloat(this.e_jam.getText()) > 7 && nilaiToFloat(this.e_jam.getText()) < 18) {
						system.alert(this,"Jam mulai lembur tidak valid.","Jam mulai lembur tidak boleh kurang dari jam 18:00 (HK).");
						return false;						
					}
				}
				if (nilaiToFloat(this.e_jam.getText()) < 0 || nilaiToFloat(this.e_jam2.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Jam lembur tidak boleh kurang dari jam 00.");
					return false;						
				}
				if (nilaiToFloat(this.e_jam.getText()) > 24 || nilaiToFloat(this.e_jam2.getText()) > 24) {
					system.alert(this,"Transaksi tidak valid.","Jam lembur tidak boleh melebihi jam 24.");
					return false;						
				}
				if (nilaiToFloat(this.e_jam.getText()) >= nilaiToFloat(this.e_jam2.getText())) {
					system.alert(this,"Transaksi tidak valid.","Jam mulai tidak boleh melebihi atau sama dengan jam berakhir.");
					return false;						
				}				
				else this.simpan();
				break;	

			case "ubah" :					
				if (this.c_jh.getText() == "HK") {
					if (nilaiToFloat(this.e_jam.getText()) > 7 && nilaiToFloat(this.e_jam.getText()) < 18) {
						system.alert(this,"Jam mulai lembur tidak valid.","Jam mulai lembur tidak boleh kurang dari jam 18:00 (HK).");
						return false;						
					}
				}
				if (nilaiToFloat(this.e_menit.getText()) < 0 || nilaiToFloat(this.e_menit2.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Menit lembur tidak boleh kurang dari 0.");
					return false;						
				}
				if (nilaiToFloat(this.e_menit.getText()) > 59 || nilaiToFloat(this.e_menit2.getText()) > 59) {
					system.alert(this,"Transaksi tidak valid.","Menit lembur tidak boleh melebihi 59.");
					return false;						
				}
				if (nilaiToFloat(this.e_jam.getText()) < 0 || nilaiToFloat(this.e_jam2.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Jam lembur tidak boleh kurang dari jam 0.");
					return false;						
				}
				if (nilaiToFloat(this.e_jam.getText()) > 23 || nilaiToFloat(this.e_jam2.getText()) > 23) {
					system.alert(this,"Transaksi tidak valid.","Jam lembur tidak boleh melebihi jam 23.");
					return false;						
				}
				if (nilaiToFloat(this.e_jam.getText()) >= nilaiToFloat(this.e_jam2.getText())) {
					system.alert(this,"Transaksi tidak valid.","Jam mulai tidak boleh melebihi atau sama dengan jam berakhir.");
					return false;						
				}				
				else this.ubah();
				break;	
			case "hapus" :
				this.hapus();
				break;							
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		var data = this.dbLib.getDataProvider("select nama from gr_libur where '"+this.dp_d1.getDateString()+"' between tgl_mulai and tgl_akhir and tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.c_jh.setText("HL");			
		} 
		else {
			this.c_jh.setText("HK");
			this.e_jam.setText("18");
			this.e_jam2.setText("18");

			this.e_menit.setText("0");
			this.e_menit2.setText("0");
		}
		
		var data = this.dbLib.getDataProvider("select datename(dw,'"+this.dp_d1.getDateString()+"') as day ",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			if (line.day.toUpperCase() == "MONDAY") var namaHari = "SENIN";
			if (line.day.toUpperCase() == "TUESDAY") var namaHari = "SELASA";
			if (line.day.toUpperCase() == "WEDNESDAY") var namaHari = "RABU";
			if (line.day.toUpperCase() == "THURSDAY") var namaHari = "KAMIS";
			if (line.day.toUpperCase() == "FRIDAY") var namaHari = "JUMAT";
			if (line.day.toUpperCase() == "SATURDAY") var namaHari = "SABTU";
			if (line.day.toUpperCase() == "SUNDAY") var namaHari = "MINGGU";			
			this.c_hari.setText(namaHari);			
		} 		
		if (this.stsSimpan == 1) this.doClick(this.i_gen);		
	},
	doChange:function(sender){		
		try{
			if (sender == this.e_nb && this.e_nb.getText()!=""){
				var data = this.dbLib.getDataProvider(
						"select a.tanggal,a.kode_loker,a.jam,a.menit,a.tugas,a.nik_buat,a.nik_app,a.keterangan,a.jam_kerja,a.hari,a.jenis_hari "+					   
						"from gr_lembur a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						"			     inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"			     inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+
						"where a.no_lembur='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.e_tugas.setText(line.tugas);	
						this.dp_d1.setText(line.tanggal);									
						this.e_ket.setText(line.keterangan);
						this.c_hari.setText(line.hari);
						this.c_jh.setText(line.jenis_hari);
						this.e_tugas.setText(line.tugas);					
						
						var jam = line.jam.split("-");
						this.e_jam.setText(jam[0]);
						this.e_jam2.setText(jam[1]);

						var menit = line.menit.split("-");
						this.e_menit.setText(menit[0]);
						this.e_menit2.setText(menit[1]);

						this.e_jk.setText(floatToNilai(line.jam_kerja));
						this.cb_loker.setText(line.kode_loker);					
						this.cb_buat.setText(line.nik_buat);
						this.cb_app.setText(line.nik_app);
					} 
				}
			}

			if (sender == this.cb_loker) {
				if (this.cb_loker.getText()!="") {
					this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_loker ='"+this.cb_loker.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
				}
			}	
		}
		catch(e) {
			alert(e);
		}
	},
	doHitung:function(sender){
		if (nilaiToFloat(this.e_jam.getText()) < 0 || nilaiToFloat(this.e_jam.getText()) > 23) {
			system.alert(this,"Inputan Range Jam 0-23","");
			this.e_jam.setText("0");						
		}
		if (nilaiToFloat(this.e_jam2.getText()) < 0 || nilaiToFloat(this.e_jam2.getText()) > 23) {
			system.alert(this,"Inputan Range Jam 0-23","");
			this.e_jam2.setText("0");						
		}	
		if (nilaiToFloat(this.e_menit.getText()) < 0 || nilaiToFloat(this.e_menit.getText()) > 59) {
			system.alert(this,"Inputan Range Jam 0-59","");
			this.e_menit.setText("0");
			return false;
		}
		if (nilaiToFloat(this.e_menit2.getText()) < 0 || nilaiToFloat(this.e_menit2.getText()) > 59) {
			system.alert(this,"Inputan Range Jam 0-59","");
			this.e_menit2.setText("0");
			return false;
		}
		
		if (nilaiToFloat(this.e_jam2.getText()) > nilaiToFloat(this.e_jam.getText())) {			
			var data = this.dbLib.getDataProvider("select round(cast (datediff(minute,'1977-06-15 "+this.e_jam.getText()+":"+this.e_menit.getText()+"','1977-06-15 "+this.e_jam2.getText()+":"+this.e_menit2.getText()+"') as float) / 60,2) -  "+
												 "round(round(cast (datediff(minute,'1977-06-15 "+this.e_jam.getText()+":"+this.e_menit.getText()+"','1977-06-15 "+this.e_jam2.getText()+":"+this.e_menit2.getText()+"') as float) / 60,2) / 6,0,1) as lama",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																
					this.e_jk.setText(floatToNilai(line.lama));
				} 
			}
			
		}
		else this.e_jk.setText("0");
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_lembur","no_lembur",this.app._lokasi+"-LBR"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_tugas.setFocus();
		this.stsSimpan = 1;
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
		var strSQL = "select a.no_lembur,a.keterangan,a.tugas,convert(varchar,a.tanggal,103) as tanggal "+
					 "from gr_lembur a "+
					 "where a.progress='0' and  a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_lembur desc";		
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
			this.sg1.appendData([line.no_lembur,line.tanggal,line.keterangan,line.tugas]); 
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
								this.nama_report="server_report_hris_rptLembur";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_lembur='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});
