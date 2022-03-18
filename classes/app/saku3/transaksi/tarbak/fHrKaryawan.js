window.app_saku3_transaksi_tarbak_fHrKaryawan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_fHrKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_fHrKaryawan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
		uses("saiGrid",true);		
		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,12,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"],visible:false});
		this.pc1 = new pageControl(this,{bound:[10,12,1000,480], childPage:["Daftar Karyawan","Data Karyawan","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:10,tag:9,
		            colTitle:["NIK","Nama","Golongan","Jabatan","PP","Status","Lokasi Kerja","Status Pajak","Email","Alamat"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[250,150,100,100,100,150,150,150,200,70]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"NIK",maxLength:10,change:[this,"doChange"]});		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[520,10,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2,visible:false});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});					
		this.e_gelar = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"Gelar Depan", maxLength:50, tag:1});
		this.e_gelar2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[230,20,190,20],caption:"Gelar Belakang", maxLength:50, tag:1})
		this.cb_status = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Status SDM", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_gol = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Golongan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_jab = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Jabatan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[2,12,995,309], childPage:["Kepegawaian","Data Pribadi","Tambahan","Foto   "]});				
		this.cb_unit = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Unit", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2, readonly:true});		
		this.cb_loker = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Lokasi Kerja", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.c_ijht = new saiCB(this.pc2.childPage[0],{bound:[20,22,200,20],caption:"Status IJHT",items:["1. YA","0. TIDAK"], readOnly:true,tag:2});		
		this.c_bpjs = new saiCB(this.pc2.childPage[0],{bound:[20,23,200,20],caption:"Status BPJS",items:["1. YA","0. TIDAK"], readOnly:true,tag:2});		
		this.c_jp = new saiCB(this.pc2.childPage[0],{bound:[20,24,200,20],caption:"Status JP",items:["1. YA","0. TIDAK"], readOnly:true,tag:2});				
		
		this.l_masuk = new portalui_label(this.pc2.childPage[0],{bound:[20,22,100,18],caption:"Tanggal Masuk", underline:true});
		this.dp_masuk = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,22,98,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDatemasuk"]}); 
		this.e_tglmasuk = new saiEdit(this.pc2.childPage[0],{bound:[120,22,80,20],tag:9,text:"",maxLength:6,exit:[this,"doExitmasuk"]});		

		this.e_mkgol = new saiLabelEdit(this.pc2.childPage[0],{bound:[230,22,190,20],caption:"Masa Kerja Gol", maxLength:50, tag:1,tipeText:ttNilai,text:"0"});		
		this.e_sk = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,25,400,20],caption:"No SK Tetap", maxLength:50, tag:1});
		
		this.l_sk = new portalui_label(this.pc2.childPage[0],{bound:[20,21,100,18],caption:"Tgl SK Tetap", underline:true});
		this.dp_sk = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,21,98,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDatesk"]}); 
		this.e_tglsk = new saiEdit(this.pc2.childPage[0],{bound:[120,21,80,20],tag:9,text:"",maxLength:6,exit:[this,"doExitsk"]});		

		this.e_mkytb = new saiLabelEdit(this.pc2.childPage[0],{bound:[230,21,190,20],caption:"Masa Kerja YTB", maxLength:50, tag:1,tipeText:ttNilai,text:"0"});
		this.e_sk2 = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,23,400,20],caption:"No SK Kontrak", maxLength:50, tag:1});
		
		this.l_sk2 = new portalui_label(this.pc2.childPage[0],{bound:[20,21,100,18],caption:"Tgl SK Kontrak", underline:true});
		this.dp_sk2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,21,98,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDatesk2"]}); 
		this.e_tglsk2 = new saiEdit(this.pc2.childPage[0],{bound:[120,21,80,20],tag:9,text:"",maxLength:6,exit:[this,"doExitsk2"]});		

		this.c_jk = new saiCB(this.pc2.childPage[1],{bound:[20,14,200,20],caption:"Jenis Kelamin",items:["L. Laki-Laki","P. Perempuan"], readOnly:true,tag:2});
		this.cb_agama = new saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"Agama", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_tel = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,400,20],caption:"No Telepon", maxLength:50, tag:1});	
		this.e_hp = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,15,400,20],caption:"No HandPhone", maxLength:50, tag:1});	
		this.e_email = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,400,20],caption:"Email", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,17,400,20],caption:"Alamat", maxLength:150, tag:1});	
		this.e_kota = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,19,400,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_pos = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,19,200,20],caption:"KodePos", maxLength:5, tag:1});	
		this.e_kel = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,21,400,20],caption:"Kelurahan", maxLength:50, tag:1});
		this.e_kec = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,21,400,20],caption:"Kecamatan", maxLength:50, tag:1});
		this.e_npwp = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,20,400,20],caption:"No NPWP", maxLength:50, tag:1});
		this.e_ktp = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,20,400,20],caption:"No KTP", maxLength:50, tag:1});
		this.e_bpjs = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,22,400,20],caption:"No BPJS", maxLength:50, tag:1});		
		this.cb_profesi = new saiCBBL(this.pc2.childPage[1],{bound:[20,14,220,20],caption:"Profesi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_strata = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"Strata", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_pajak = new saiCBBL(this.pc2.childPage[1],{bound:[20,14,220,20],caption:"Status Pajak", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		
		this.e_tempat = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,23,200,20],caption:"Tempat Lahir", maxLength:50, tag:1});
		
		this.l_lahir = new portalui_label(this.pc2.childPage[2],{bound:[230,23,100,18],caption:"Tanggal Lahir", underline:true});
		this.dp_lahir = new portalui_datePicker(this.pc2.childPage[2],{bound:[320,23,98,18],date:new Date().getDateStr()}); 		
		this.e_kk = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,25,400,20],caption:"No KK", maxLength:50, tag:1});		
		this.c_nikah = new saiCB(this.pc2.childPage[2],{bound:[20,22,200,20],caption:"Status Menikah",items:["1. YA","0. TIDAK"], readOnly:true,tag:2});
		
		this.l_nikah = new portalui_label(this.pc2.childPage[2],{bound:[230,22,100,18],caption:"Tanggal Nikah", underline:true});
		this.dp_nikah = new portalui_datePicker(this.pc2.childPage[2],{bound:[320,22,98,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDatenikah"]}); 				
		this.e_tglnikah = new saiEdit(this.pc2.childPage[2],{bound:[320,22,80,20],tag:9,text:"",maxLength:6,exit:[this,"doExitnikah"]});		

		this.e_gol = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,27,400,20],caption:"Golongan Darah", maxLength:50, tag:1});
		this.e_ibu = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,24,400,20],caption:"Ibu Kandung", maxLength:50, tag:1})
		this.e_bank = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,22,400,20],caption:"Bank", maxLength:50, tag:1});	
		this.e_cabang = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,23,400,20],caption:"Cabang", maxLength:50, tag:1});	
		this.e_norek = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,24,400,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_namarek = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,25,400,20],caption:"Nama Rekening", maxLength:50, tag:1});	

		this.e_foto = new saiLabelEdit(this.pc2.childPage[3], {bound:[20,11,200,20], caption:"Foto"});
		this.u_foto = new uploader(this.pc2.childPage[3], {bound:[230,11,80,20],param3: "object", param4 :"server/media/",param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"} )		
		this.iFoto = new image(this.pc2.childPage[3], {bound:[120, this.cb_gol.top, 200,220]});

		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"NIK",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
		
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc2.childPage[2].rearrangeChild(10, 23);	
		this.pc2.childPage[3].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;	
			
			this.standarLib = new util_standar();
			
			this.cb_lokasi.setSQL("select kode_lokasi,nama from lokasi where flag_konsol='0'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);	
			this.cb_status.setSQL("select kode_sdm,nama from hr_sdm where kode_lokasi='"+this.app._lokasi+"'",["kode_sdm","nama"],false,["Kode","Nama"],"and","Data Status",true);	
			this.cb_gol.setSQL("select kode_gol,nama from hr_gol where kode_lokasi='"+this.app._lokasi+"'",["kode_gol","nama"],false,["Kode","Nama"],"and","Data Golongan",true);	
			this.cb_jab.setSQL("select kode_jab,nama from hr_jab where kode_lokasi='"+this.app._lokasi+"'",["kode_jab","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);	
			this.cb_loker.setSQL("select kode_loker,nama from hr_loker where kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Lokasi Kerja",true);	
			this.cb_pajak.setSQL("select kode_pajak,nama from hr_pajak where kode_lokasi='"+this.app._lokasi+"'",["kode_pajak","nama"],false,["Kode","Nama"],"and","Data Status Pajak",true);	
			this.cb_unit.setSQL("select kode_unit,nama from hr_unit where kode_lokasi='"+this.app._lokasi+"'",["kode_unit","nama"],false,["Kode","Nama"],"and","Data Unit",true);	
			this.cb_profesi.setSQL("select kode_profesi,nama from hr_profesi where kode_lokasi='"+this.app._lokasi+"'",["kode_profesi","nama"],false,["Kode","Nama"],"and","Data Profesi",true);	
			this.cb_agama.setSQL("select kode_agama,nama from hr_agama where kode_lokasi='"+this.app._lokasi+"'",["kode_agama","nama"],false,["Kode","Nama"],"and","Data Agama",true);	
			this.cb_strata.setSQL("select kode_strata,nama from hr_strata where kode_lokasi='"+this.app._lokasi+"'",["kode_strata","nama"],false,["Kode","Nama"],"and","Data Strata",true);				

			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.cb_lokasi.getText()+"' ",["kode_pp","nama"],false,["Kode","Nama"],"where","Data PP",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_fHrKaryawan.extend(window.childForm);
window.app_saku3_transaksi_tarbak_fHrKaryawan.implement({
	doExitmasuk: function(sender) {
		try {
			if (sender == this.e_tglmasuk && this.e_tglmasuk.getText().length==6) {										
				if (nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) < 1 || nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) > 12) {				
					this.e_tglmasuk.setText("");
					system.alert(this,"Bulan tidak valid.",this.e_tglmasuk.getText().substr(2,2));				
					return false;
				}
				else {
					if (  nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 1 || 
						nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 3 ||
						nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 5 ||
						nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 7 ||
						nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 8 ||
						nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 10 ||
						nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 12 ) {
						var tglMax = 31;
					} 
					if (  nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 4 || 
						nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 6 ||
						nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 9 ||
						nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 11 ) {
						var tglMax = 30;
					}
					if (  nilaiToFloat(this.e_tglmasuk.getText().substr(2,2)) == 2) {
						var tglMax = 28;
						if (nilaiToFloat(this.e_tglmasuk.getText().substr(4,4)) % 4 == 0) var tglMax = 29;
					} 
				}

				if ( nilaiToFloat(this.e_tglmasuk.getText().substr(0,2)) < 1 || nilaiToFloat(this.e_tglmasuk.getText().substr(0,2)) > tglMax) {
					this.e_tglmasuk.setText("");
					system.alert(this,"Tanggal tidak valid.",this.e_tglmasuk.getText().substr(0,2));
					return false;
				}
				if ( nilaiToFloat(this.e_tglmasuk.getText().substr(4,2)) >= 0 && nilaiToFloat(this.e_tglmasuk.getText().substr(4,2)) <= 49 ) {
					var vTahun = "20"+this.e_tglmasuk.getText().substr(4,2);
				}
				if ( nilaiToFloat(this.e_tglmasuk.getText().substr(4,2)) >= 50 && nilaiToFloat(this.e_tglmasuk.getText().substr(4,2)) <= 99 ) {
					var vTahun = "19"+this.e_tglmasuk.getText().substr(4,2);
				}
				var tglFormat = this.e_tglmasuk.getText().substr(0,2) + "/" +this.e_tglmasuk.getText().substr(2,2) + "/"+vTahun;
				this.e_tglmasuk.setText(tglFormat);

				this.dp_masuk.setText(tglFormat);				
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doExitsk: function(sender) {
		try {
			if (sender == this.e_tglsk && this.e_tglsk.getText().length==6) {										
				if (nilaiToFloat(this.e_tglsk.getText().substr(2,2)) < 1 || nilaiToFloat(this.e_tglsk.getText().substr(2,2)) > 12) {				
					this.e_tglsk.setText("");
					system.alert(this,"Bulan tidak valid.",this.e_tglsk.getText().substr(2,2));				
					return false;
				}
				else {
					if (  nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 1 || 
						nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 3 ||
						nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 5 ||
						nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 7 ||
						nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 8 ||
						nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 10 ||
						nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 12 ) {
						var tglMax = 31;
					} 
					if (  nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 4 || 
						nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 6 ||
						nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 9 ||
						nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 11 ) {
						var tglMax = 30;
					}
					if (  nilaiToFloat(this.e_tglsk.getText().substr(2,2)) == 2) {
						var tglMax = 28;
						if (nilaiToFloat(this.e_tglsk.getText().substr(4,4)) % 4 == 0) var tglMax = 29;
					} 
				}

				if ( nilaiToFloat(this.e_tglsk.getText().substr(0,2)) < 1 || nilaiToFloat(this.e_tglsk.getText().substr(0,2)) > tglMax) {
					this.e_tglsk.setText("");
					system.alert(this,"Tanggal tidak valid.",this.e_tglsk.getText().substr(0,2));
					return false;
				}
				if ( nilaiToFloat(this.e_tglsk.getText().substr(4,2)) >= 0 && nilaiToFloat(this.e_tglsk.getText().substr(4,2)) <= 49 ) {
					var vTahun = "20"+this.e_tglsk.getText().substr(4,2);
				}
				if ( nilaiToFloat(this.e_tglsk.getText().substr(4,2)) >= 50 && nilaiToFloat(this.e_tglsk.getText().substr(4,2)) <= 99 ) {
					var vTahun = "19"+this.e_tglsk.getText().substr(4,2);
				}
				var tglFormat = this.e_tglsk.getText().substr(0,2) + "/" +this.e_tglsk.getText().substr(2,2) + "/"+vTahun;
				this.e_tglsk.setText(tglFormat);

				this.dp_sk.setText(tglFormat);				
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doExitsk2: function(sender) {
		try {
			if (sender == this.e_tglsk2 && this.e_tglsk2.getText().length==6) {										
				if (nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) < 1 || nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) > 12) {				
					this.e_tglsk2.setText("");
					system.alert(this,"Bulan tidak valid.",this.e_tglsk2.getText().substr(2,2));				
					return false;
				}
				else {
					if (  nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 1 || 
						nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 3 ||
						nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 5 ||
						nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 7 ||
						nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 8 ||
						nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 10 ||
						nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 12 ) {
						var tglMax = 31;
					} 
					if (  nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 4 || 
						nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 6 ||
						nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 9 ||
						nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 11 ) {
						var tglMax = 30;
					}
					if (  nilaiToFloat(this.e_tglsk2.getText().substr(2,2)) == 2) {
						var tglMax = 28;
						if (nilaiToFloat(this.e_tglsk2.getText().substr(4,4)) % 4 == 0) var tglMax = 29;
					} 
				}

				if ( nilaiToFloat(this.e_tglsk2.getText().substr(0,2)) < 1 || nilaiToFloat(this.e_tglsk2.getText().substr(0,2)) > tglMax) {
					this.e_tglsk2.setText("");
					system.alert(this,"Tanggal tidak valid.",this.e_tglsk2.getText().substr(0,2));
					return false;
				}
				if ( nilaiToFloat(this.e_tglsk2.getText().substr(4,2)) >= 0 && nilaiToFloat(this.e_tglsk2.getText().substr(4,2)) <= 49 ) {
					var vTahun = "20"+this.e_tglsk2.getText().substr(4,2);
				}
				if ( nilaiToFloat(this.e_tglsk2.getText().substr(4,2)) >= 50 && nilaiToFloat(this.e_tglsk2.getText().substr(4,2)) <= 99 ) {
					var vTahun = "19"+this.e_tglsk2.getText().substr(4,2);
				}
				var tglFormat = this.e_tglsk2.getText().substr(0,2) + "/" +this.e_tglsk2.getText().substr(2,2) + "/"+vTahun;
				this.e_tglsk2.setText(tglFormat);

				this.dp_sk2.setText(tglFormat);				
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doExitnikah: function(sender) {
		try {
			if (sender == this.e_tglnikah && this.e_tglnikah.getText().length==6) {										
				if (nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) < 1 || nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) > 12) {				
					this.e_tglnikah.setText("");
					system.alert(this,"Bulan tidak valid.",this.e_tglnikah.getText().substr(2,2));				
					return false;
				}
				else {
					if (  nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 1 || 
						nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 3 ||
						nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 5 ||
						nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 7 ||
						nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 8 ||
						nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 10 ||
						nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 12 ) {
						var tglMax = 31;
					} 
					if (  nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 4 || 
						nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 6 ||
						nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 9 ||
						nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 11 ) {
						var tglMax = 30;
					}
					if (  nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 2) {
						var tglMax = 28;
						if (nilaiToFloat(this.e_tglnikah.getText().substr(4,4)) % 4 == 0) var tglMax = 29;
					} 
				}

				if ( nilaiToFloat(this.e_tglnikah.getText().substr(0,2)) < 1 || nilaiToFloat(this.e_tglnikah.getText().substr(0,2)) > tglMax) {
					this.e_tglnikah.setText("");
					system.alert(this,"Tanggal tidak valid.",this.e_tglnikah.getText().substr(0,2));
					return false;
				}
				if ( nilaiToFloat(this.e_tglnikah.getText().substr(4,2)) >= 0 && nilaiToFloat(this.e_tglnikah.getText().substr(4,2)) <= 49 ) {
					var vTahun = "20"+this.e_tglnikah.getText().substr(4,2);
				}
				if ( nilaiToFloat(this.e_tglnikah.getText().substr(4,2)) >= 50 && nilaiToFloat(this.e_tglnikah.getText().substr(4,2)) <= 99 ) {
					var vTahun = "19"+this.e_tglnikah.getText().substr(4,2);
				}
				var tglFormat = this.e_tglnikah.getText().substr(0,2) + "/" +this.e_tglnikah.getText().substr(2,2) + "/"+vTahun;
				this.e_tglnikah.setText(tglFormat);

				this.dp_nikah.setText(tglFormat);				
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doSelectDatemasuk: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_tglmasuk.setText(d+"/"+m+"/"+y);	
		if (this.e_tglmasuk.getText() == "01/01/1900" || this.e_tglmasuk.getText() == "1/01/1900") this.e_tglmasuk.setText("");			
	},
	doSelectDatesk: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_tglsk.setText(d+"/"+m+"/"+y);	
		if (this.e_tglsk.getText() == "01/01/1900" || this.e_tglsk.getText() == "1/01/1900") this.e_tglsk.setText("");			
	},
	doSelectDatesk2: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_tglsk2.setText(d+"/"+m+"/"+y);	
		if (this.e_tglsk2.getText() == "01/01/1900" || this.e_tglsk2.getText() == "1/01/1900") this.e_tglsk2.setText("");			
	},
	doSelectDatenikah: function(sender, y,m,d){
		
		if (m < 10) m = "0" + m;			
		this.e_tglnikah.setText(d+"/"+m+"/"+y);	
		if (this.e_tglnikah.getText() == "01/01/1900" || this.e_tglnikah.getText() == "1/01/1900") this.e_tglnikah.setText("");		
		
	},

	/*
	doExit: function(sender) {
		try {
			if ((sender == this.e_tglmasuk || sender == this.e_tglsk || sender == this.e_tglsk2 || sender == this.e_tglnikah) && sender.getText().length==6) {										
				if (nilaiToFloat(sender.getText().substr(2,2)) < 1 || nilaiToFloat(sender.getText().substr(2,2)) > 12) {				
					sender.setText("");
					system.alert(this,"Bulan tidak valid.",sender.getText().substr(2,2));				
					return false;
				}
				else {
					if (  nilaiToFloat(sender.getText().substr(2,2)) == 1 || 
						nilaiToFloat(sender.getText().substr(2,2)) == 3 ||
						nilaiToFloat(sender.getText().substr(2,2)) == 5 ||
						nilaiToFloat(sender.getText().substr(2,2)) == 7 ||
						nilaiToFloat(sender.getText().substr(2,2)) == 8 ||
						nilaiToFloat(sender.getText().substr(2,2)) == 10 ||
						nilaiToFloat(sender.getText().substr(2,2)) == 12 ) {
						var tglMax = 31;
					} 
					if (  nilaiToFloat(sender.getText().substr(2,2)) == 4 || 
						nilaiToFloat(sender.getText().substr(2,2)) == 6 ||
						nilaiToFloat(sender.getText().substr(2,2)) == 9 ||
						nilaiToFloat(sender.getText().substr(2,2)) == 11 ) {
						var tglMax = 30;
					}
					if (  nilaiToFloat(sender.getText().substr(2,2)) == 2) {
						var tglMax = 28;
						if (nilaiToFloat(sender.getText().substr(4,4)) % 4 == 0) var tglMax = 29;
					} 
				}

				if ( nilaiToFloat(sender.getText().substr(0,2)) < 1 || nilaiToFloat(sender.getText().substr(0,2)) > tglMax) {
					sender.setText("");
					system.alert(this,"Tanggal tidak valid.",sender.getText().substr(0,2));
					return false;
				}
				if ( nilaiToFloat(sender.getText().substr(4,2)) >= 0 && nilaiToFloat(sender.getText().substr(4,2)) <= 49 ) {
					var vTahun = "20"+sender.getText().substr(4,2);
				}
				if ( nilaiToFloat(sender.getText().substr(4,2)) >= 50 && nilaiToFloat(sender.getText().substr(4,2)) <= 99 ) {
					var vTahun = "19"+sender.getText().substr(4,2);
				}
				var tglFormat = sender.getText().substr(0,2) + "/" +sender.getText().substr(2,2) + "/"+vTahun;
				sender.setText(tglFormat);

				if (sender == this.e_tglmasuk) this.dp_masuk.setText(tglFormat);
				if (sender == this.e_tglsk) this.dp_sk.setText(tglFormat);
				if (sender == this.e_tglsk2) this.dp_sk2.setText(tglFormat);
				if (sender == this.e_tglnikah) this.dp_nikah.setText(tglFormat);
			}
		}
		catch(e) {
			alert(e);
		}
	},
	*/
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into hr_karyawan(nik,kode_lokasi,nama,alamat,no_telp,email,kode_pp,npwp,bank,cabang,no_rek,nama_rek,kota,kode_pos,no_hp,flag_aktif, foto,kode_sdm,kode_gol,kode_jab,kode_loker,kode_pajak,kode_unit,kode_profesi,kode_agama,jk,no_sk,tgl_sk,gelar_depan,gelar_belakang,status_nikah,tgl_nikah,gol_darah,no_kk,kelurahan,kecamatan,ibu_kandung,tempat,tgl_lahir,tgl_masuk,no_ktp,no_bpjs,kode_strata, ijht,bpjs,jp,mk_ytb,mk_gol,tgl_kontrak,no_kontrak) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.cb_pp.getText()+"','"+this.e_npwp.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.e_kota.getText()+"','"+this.e_pos.getText()+"','"+this.e_hp.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.e_foto.getText()+"','"+this.cb_status.getText()+"','"+this.cb_gol.getText()+"','"+this.cb_jab.getText()+"','"+this.cb_loker.getText()+"','"+this.cb_pajak.getText()+"','"+this.cb_unit.getText()+"','"+this.cb_profesi.getText()+"','"+this.cb_agama.getText()+"','"+this.c_jk.getText().substr(0,1)+"','"+
							this.e_sk.getText()+"','"+this.dp_sk.getDateString()+"','"+this.e_gelar.getText()+"','"+this.e_gelar2.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.dp_nikah.getDateString()+"','"+this.e_gol.getText()+"','"+this.e_kk.getText()+"','"+this.e_kel.getText()+"','"+this.e_kec.getText()+"','"+this.e_ibu.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_lahir.getDateString()+"','"+this.dp_masuk.getDateString()+"','"+this.e_ktp.getText()+"','"+this.e_bpjs.getText()+"','"+this.cb_strata.getText()+"', '"+this.c_ijht.getText().substr(0,1)+"','"+this.c_bpjs.getText().substr(0,1)+"','"+this.c_jp.getText().substr(0,1)+"',"+parseNilai(this.e_mkytb.getText())+","+parseNilai(this.e_mkgol.getText())+", '"+this.dp_sk2.getDateString()+"','"+this.e_sk2.getText()+"')");					
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from hr_karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into hr_karyawan(nik,kode_lokasi,nama,alamat,no_telp,email,kode_pp,npwp,bank,cabang,no_rek,nama_rek,kota,kode_pos,no_hp,flag_aktif, foto,kode_sdm,kode_gol,kode_jab,kode_loker,kode_pajak,kode_unit,kode_profesi,kode_agama,jk,no_sk,tgl_sk,gelar_depan,gelar_belakang,status_nikah,tgl_nikah,gol_darah,no_kk,kelurahan,kecamatan,ibu_kandung,tempat,tgl_lahir,tgl_masuk,no_ktp,no_bpjs,kode_strata, ijht,bpjs,jp,mk_ytb,mk_gol,tgl_kontrak,no_kontrak) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.cb_pp.getText()+"','"+this.e_npwp.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.e_kota.getText()+"','"+this.e_pos.getText()+"','"+this.e_hp.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.e_foto.getText()+"','"+this.cb_status.getText()+"','"+this.cb_gol.getText()+"','"+this.cb_jab.getText()+"','"+this.cb_loker.getText()+"','"+this.cb_pajak.getText()+"','"+this.cb_unit.getText()+"','"+this.cb_profesi.getText()+"','"+this.cb_agama.getText()+"','"+this.c_jk.getText().substr(0,1)+"','"+
							this.e_sk.getText()+"','"+this.dp_sk.getDateString()+"','"+this.e_gelar.getText()+"','"+this.e_gelar2.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.dp_nikah.getDateString()+"','"+this.e_gol.getText()+"','"+this.e_kk.getText()+"','"+this.e_kel.getText()+"','"+this.e_kec.getText()+"','"+this.e_ibu.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_lahir.getDateString()+"','"+this.dp_masuk.getDateString()+"','"+this.e_ktp.getText()+"','"+this.e_bpjs.getText()+"','"+this.cb_strata.getText()+"', '"+this.c_ijht.getText().substr(0,1)+"','"+this.c_bpjs.getText().substr(0,1)+"','"+this.c_jp.getText().substr(0,1)+"',"+parseNilai(this.e_mkytb.getText())+","+parseNilai(this.e_mkgol.getText())+", '"+this.dp_sk2.getDateString()+"','"+this.e_sk2.getText()+"')");					
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from hr_karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) {
				
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
				if (this.e_tglmasuk.getText() == "") this.dp_masuk.setText("01/01/1900");
				if (this.e_tglsk.getText() == "") this.dp_sk.setText("01/01/1900");
				if (this.e_tglsk2.getText() == "") this.dp_sk2.setText("01/01/1900");
				if (this.e_tglnikah.getText() == "") this.dp_nikah.setText("01/01/1900");

				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				if (this.e_tglmasuk.getText() == "") this.dp_masuk.setText("01/01/1900");
				if (this.e_tglsk.getText() == "") this.dp_sk.setText("01/01/1900");
				if (this.e_tglsk2.getText() == "") this.dp_sk2.setText("01/01/1900");
				if (this.e_tglnikah.getText() == "") this.dp_nikah.setText("01/01/1900");

				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_status && this.cb_status.getText()!="") {
				if (this.cb_status.getText()!="OFF") this.c_status.setText("1. AKTIF");
				else this.c_status.setText("0. NONAKTIF");
			}			
			if (sender == this.cb_lokasi && this.cb_lokasi.getText() != "") {					
				this.doLoad();			
			}
			if (sender == this.cb_unit && this.cb_unit.getText() != ""){
				var strSQL = "select kode_pp from hr_unit "+
						     "where kode_unit ='"+this.cb_unit.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_pp.setText(line.kode_pp);
					}
				}				
			}
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select nik, kode_lokasi, nama, alamat,  no_telp, email, kode_pp, npwp, bank, cabang, no_rek, nama_rek, grade, kota, kode_pos, no_hp, flag_aktif, foto,kode_sdm,kode_gol,kode_jab,kode_loker,kode_pajak,kode_unit,kode_profesi,kode_agama,jk,tahun_masuk, "+
							 "no_sk,tgl_sk,gelar_depan,gelar_belakang,status_nikah,tgl_nikah,gol_darah,no_kk,kelurahan,kecamatan,ibu_kandung,tempat,tgl_lahir,tgl_masuk,no_ktp,no_bpjs,kode_strata,ijht,bpjs,jp,mk_gol,mk_ytb,tgl_kontrak,no_kontrak "+
				             "from hr_karyawan "+
						     "where nik ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						
						this.e_sk.setText(line.no_sk);	
						this.dp_sk.setText(line.tgl_sk);	
						this.e_gelar.setText(line.gelar_depan);	
						this.e_gelar2.setText(line.gelar_belakang);
						if (line.status_nikah == "0") this.c_nikah.setText("0. TIDAK");
						else this.c_nikah.setText("1. YA");
						
						this.dp_masuk.setText(line.tgl_masuk);	
						this.e_ktp.setText(line.no_ktp);
						this.e_bpjs.setText(line.no_bpjs);
						
						this.e_gol.setText(line.gol_darah);
						this.e_kel.setText(line.kelurahan);
						this.e_kec.setText(line.kecamatan);
						this.e_ibu.setText(line.ibu_kandung);
						this.e_kk.setText(line.no_kk);
						this.e_tempat.setText(line.tempat);
						this.dp_lahir.setText(line.tgl_lahir);
						
						this.e_tel.setText(line.no_telp);
						this.e_email.setText(line.email);
						this.e_npwp.setText(line.npwp);						
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.e_kota.setText(line.kota);
						this.e_pos.setText(line.kode_pos);
						this.e_hp.setText(line.no_hp);
						
						this.cb_status.setText(line.kode_sdm);
						this.cb_gol.setText(line.kode_gol);
						this.cb_jab.setText(line.kode_jab);
						this.cb_loker.setText(line.kode_loker);
						this.cb_pp.setText(line.kode_pp);						
						this.cb_pajak.setText(line.kode_pajak);	
						this.cb_unit.setText(line.kode_unit);	
						this.cb_profesi.setText(line.kode_profesi);	
						this.cb_agama.setText(line.kode_agama);	
						this.cb_strata.setText(line.kode_strata);	
						this.e_foto.setText(trim(line.foto));
						this.iFoto.setImage("server/media/"+trim(line.foto));
						
						if (line.jk == "L")
						{	
							this.c_jk.setText("L. Laki-Laki");
						}
						else 
						{
							this.c_jk.setText("P. Perempuan");
						}
						
						if (line.flag_aktif == "0") 
						{
							this.c_status.setText("0. NONAKTIF");
						}
						else 
						{
							this.c_status.setText("1. AKTIF");
						}
						
						if (line.ijht == "0") this.c_ijht.setText("0. TIDAK");						
						else this.c_ijht.setText("1. YA");
						if (line.bpjs == "0") this.c_bpjs.setText("0. TIDAK");						
						else this.c_bpjs.setText("1. YA");
						if (line.jp == "0") this.c_jp.setText("0. TIDAK");						
						else this.c_jp.setText("1. YA");

						this.e_mkytb.setText(line.mk_ytb);
						this.e_mkgol.setText(line.mk_gol);
						this.e_sk2.setText(line.no_kontrak);
						this.dp_sk2.setText(line.tgl_kontrak);
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");
							this.app._mainForm.bClear.click();
							this.fileUtil.copyFileTo(this.rootDir+"/server/tmp/"+this.fileDest.tmpfile, this.rootDir+ "/server/media/"+this.fileDest.filedest, false);

						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	},
	doCari:function(sender){								
		if (this.e_kode2.getText() != "") var filter = " a.nik like '%"+this.e_kode2.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' ";
		else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' ";
		var strSQL = "select a.nik,a.nama,a.no_telp,a.no_hp,a.email,a.alamat,b.nama as nama_pp,c.nama as nama_gol,d.nama as nama_jab,e.nama as nama_sdm,f.nama as nama_loker,a.kode_pajak "+
		             "from hr_karyawan a "+
					 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  "+
					 "left join hr_gol c on a.kode_gol=c.kode_gol and a.kode_lokasi=c.kode_lokasi "+
					 "left join hr_jab d on a.kode_jab=d.kode_jab and a.kode_lokasi=d.kode_lokasi "+
					 "left join hr_sdm e on a.kode_sdm=e.kode_sdm and a.kode_lokasi=e.kode_lokasi "+
					 "left join hr_loker f on a.kode_loker=f.kode_loker and a.kode_lokasi=f.kode_lokasi "+
					 "where "+filter+"  order by a.tgl_masuk";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doLoad:function(sender){		
		if (this.app._userStatus == "A") 				
			var strSQL = "select a.nik,a.nama,a.no_telp,a.no_hp,a.email,a.alamat,b.nama as nama_pp,c.nama as nama_gol,d.nama as nama_jab,e.nama as nama_sdm,f.nama as nama_loker,a.kode_pajak "+
						"from hr_karyawan a "+
						"inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  "+
						"left join hr_gol c on a.kode_gol=c.kode_gol and a.kode_lokasi=c.kode_lokasi "+
						"left join hr_jab d on a.kode_jab=d.kode_jab and a.kode_lokasi=d.kode_lokasi "+
						"left join hr_sdm e on a.kode_sdm=e.kode_sdm and a.kode_lokasi=e.kode_lokasi "+
						"left join hr_loker f on a.kode_loker=f.kode_loker and a.kode_lokasi=f.kode_lokasi "+
						"where a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.tgl_masuk ";
		else 
			var strSQL = "select a.nik,a.nama,a.no_telp,a.no_hp,a.email,a.alamat,b.nama as nama_pp,c.nama as nama_gol,d.nama as nama_jab,e.nama as nama_sdm,f.nama as nama_loker,a.kode_pajak "+
						"from hr_karyawan a "+
						"inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  "+
						"left join hr_gol c on a.kode_gol=c.kode_gol and a.kode_lokasi=c.kode_lokasi "+
						"left join hr_jab d on a.kode_jab=d.kode_jab and a.kode_lokasi=d.kode_lokasi "+
						"left join hr_sdm e on a.kode_sdm=e.kode_sdm and a.kode_lokasi=e.kode_lokasi "+
						"left join hr_loker f on a.kode_loker=f.kode_loker and a.kode_lokasi=f.kode_lokasi "+
						"where a.kode_lokasi='"+this.cb_lokasi.getText()+"' and a.nik ='"+this.app._userLog+"' order by a.tgl_masuk ";
		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.nik,line.nama,line.nama_gol,line.nama_jab,line.nama_pp,line.nama_sdm,line.nama_loker,line.kode_pajak,line.email,line.alamat]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doUploadFinish: function(sender, result, data, filename){
		try{	
			
			if (result){			
				this.fileDest = data;
				this.iFoto.setImage(sender.param2+data.tmpfile);//,this.rootDir+"/"+sender.param2+urldecode(data));			
				this.iFoto.setProportional(true);
				this.e_foto.setText(trim(data.filedest) );
			}else system.alert(this,"Error upload","");
		}catch(e){
			system.alert(this,"Error upload",e);
		}
	}
});