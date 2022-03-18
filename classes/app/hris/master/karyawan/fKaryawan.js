window.app_hris_master_karyawan_fKaryawan = function(owner)
{
	if (owner)
	{
		window.app_hris_master_karyawan_fKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_master_karyawan_fKaryawan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan dan Keluarga", 0);	
		this.maximize();
		uses("saiCBBL;saiCB;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;uploader;util_file;image;wysiwyg");
		try {
			this.cb_nip = new saiCBBL(this,{bound:[650,10,200,20],caption:"NIP", multiSelection:false, maxLength:10, rightLabelVisible:false});
			this.i_gen = new portalui_imageButton(this,{bound:[848,10,20,20],hint:"Load Data Pelamar",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoad"]});
			this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
			this.e_nik2 = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"NIK Lainnya", maxLength:20, tag:1});		
			this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:145, tag:1});		
			
			this.pc1 = new pageControl(this,{bound:[20,12,this.width - 95, this.height - 110], childPage:["Data Pribadi","Kedinasan","Data Keluarga","Fungsi Jabatan","Tugas Pokok","Job Desc"]}); 									    
			this.e_tempat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,400,20],caption:"Tempat Lahir", maxLength:50, tag:1});		
			this.c_nikah = new saiCB(this.pc1.childPage[0],{bound:[520,12,180,20],caption:"Status Pernikahan",readOnly:true}); //,items:["TK/00","K0","K1","K2","K3"], 
			this.l_tgl = new label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tanggal Lahir", underline:true});
			this.dp_d1 = new datePicker(this.pc1.childPage[0],{bound:[120,13,100,18],date:new Date().getDateStr()});		
			this.l_tgl2 = new label(this.pc1.childPage[0],{bound:[520,13,100,18],caption:"Tgl Pernikahan", underline:true});
			this.dp_d2 = new datePicker(this.pc1.childPage[0],{bound:[620,13,100,18],date:new Date().getDateStr()});		
			this.e_ktp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,400,20],caption:"No KTP", maxLength:50, tag:1});		
			this.e_mail = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,14,400,20],caption:"Email", maxLength:100, tag:1});					
			this.e_npwp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,400,20],caption:"No NPWP", maxLength:50, tag:1});	
			this.e_foto = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,400,20],caption:"Foto", readOnly:true, maxLength:100, tag:9});		
			this.uploader = new uploader(this.pc1.childPage[0],{bound:[920,15,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
			this.e_jamsos = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,400,20],caption:"No Jamsostek", maxLength:50, tag:1});	
			this.e_jiwas = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,400,20],caption:"No Jiwasraya", maxLength:50, tag:1});	
			this.e_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Kota", multiSelection:false, maxLength:45, tag:1,change:[this,"doLoadKota"], readOnly:true});		
			this.cb_prop = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Propinsi", multiSelection:false, maxLength:2, tag:1, readOnly:true});
			this.cb_agama = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Agama", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			//this.cb_didik = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Tk. Pendidikan", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			this.cb_strata = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Strata", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			this.cb_jur = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Jurusan", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			this.c_sex = new saiCB(this.pc1.childPage[0],{bound:[20,19,180,20],caption:"Gender",items:["L","P"], readOnly:true});
			this.c_gd = new saiCB(this.pc1.childPage[0],{bound:[20,20,180,20],caption:"Gol Darah",items:["A","B","AB","O"], readOnly:true});
			this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,400,20],caption:"Alamat", multiSelection:false, maxLength:150, tag:1});		
			this.e_alamat2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,22,400,20],caption:"Alamat Surat", multiSelection:false, maxLength:150, tag:1});		
			this.e_telp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,23,400,20],caption:"No Telpon", maxLength:50, tag:1});		
			this.e_kodepos = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,24,180,20],caption:"Kodepos", tipeText: ttAngka, maxLength:5, tag:1});		
			this.e_hp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,25,400,20],caption:"No HP", maxLength:20, tag:1});		
			this.e_suku = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,26,400,20],caption:"Suku", maxLength:50, tag:1});		
			this.e_iq = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,27,400,20],caption:"IQ", maxLength:50, tag:1});							
			this.l_tgl3 = new label(this.pc1.childPage[1],{bound:[20,29,100,18],caption:"Tanggal Masuk", underline:true});
			this.dp_d3 = new datePicker(this.pc1.childPage[1],{bound:[120,29,100,18],date:new Date().getDateStr()});		
			this.cb_jab = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Jabatan", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			this.cb_grade = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Grade", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			this.cb_loker = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Loker", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			this.cb_dir = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Direktorat", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			this.cb_dept = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Departemen", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			this.cb_sdm = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Status SDM", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			this.cb_vendor = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Pihak Ketiga", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			//this.e_lembaga = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,23,400,20],caption:"Lembaga", maxLength:100, tag:1});		
			this.e_lamaran = new saiCBBL(this.pc1.childPage[1],{bound:[20,23,200,20],caption:"Asal Lamaran", maxLength:50, tag:1, readOnly:true,
				multiSelection:false,
				sql:["select kode_media, nama from gr_rekrut_media where kode_lokasi = '"+this.app._lokasi+"' ",["kode_media","nama"],false, ["Kode","Nama"],"and","Daftar Media Rekruitasi",true]
			});		
			this.cb_lok = new saiCBBL(this.pc1.childPage[1],{bound:[20,24,200,20],caption:"Kota Lamaran", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			this.cb_bank = new saiCBBL(this.pc1.childPage[1],{bound:[20,25,200,20],caption:"Bank", multiSelection:false, maxLength:10, tag:1, readOnly:true});
			this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,26,400,20],caption:"Cabang", maxLength:50, tag:1});		
			this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,27,400,20],caption:"No Rekening", maxLength:50, tag:1});		
			this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,28,400,20],caption:"Nama Rekening", maxLength:50, tag:1});		
			this.c_gaji = new saiCB(this.pc1.childPage[1],{bound:[20,29,180,20],caption:"Status Gaji",items:["NON","SALES"], readOnly:true});
			this.c_akdhk = new saiCB(this.pc1.childPage[1],{bound:[20,30,180,20],caption:"Status AKDHK",items:["AKDHK","NON"], readOnly:true});
			
			this.sg = new saiGrid(this.pc1.childPage[2],{bound:[5,10,920,320],colCount:18,tag:2,
		            colTitle:["Nama","Tmp Lahir","Tgl Lahir","Kd Status","Nama Status","Gender","Institusi","No Telpon","NIK","Alamat",
					          "Kota","Kode Pos","Kode Prov","Nama Provinsi","Status Hidup","Status Bekerja","Tertanggung Askes","Status Anak"],
					colWidth:[[17,16,15,14,13,12,11,10, 9,8,7,6,5,4,3,2,1,0],
					[ 80,100,80,80,100,60,60,100,   150,70,80,100,70,100,70,80,90,150]],
					columnReadOnly:[true,[3,4,5,12,13,14,15,16,17],[0,1,2,6,7,8,9,10,11]],
					buttonStyle:[[2,3,5,12,14,15,16,17],[bsDate,bsEllips,bsAuto,bsEllips,bsAuto,bsAuto,bsAuto,bsAuto]], 
					colFormat:[[2],[cfDate]],
					picklist:[[5,14,15,16,17],[new portalui_arrayMap({items:["L","P"]}),
						      new portalui_arrayMap({items:["Y","T"]}),new portalui_arrayMap({items:["Y","T"]}),
							  new portalui_arrayMap({items:["Y","T"]}),new portalui_arrayMap({items:["Y","T"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
			this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[10,290,920,25],buttonStyle:2,grid:this.sg});
			
			this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[5,10,920,320],colCount:1,tag:3,
		            colTitle:["Fungsi Jabatan"],
					colWidth:[[0],[600]],
					defaultRow:1,
					autoAppend:true});
			this.sgn2 = new sgNavigator(this.pc1.childPage[3],{bound:[10,350,915,25],buttonStyle:2,grid:this.sg2});
			
			this.sg3 = new saiGrid(this.pc1.childPage[4],{bound:[5,10,920,320],colCount:1,tag:3,
		            colTitle:["Tugas Pokok"],
					colWidth:[[0],[600]],
					defaultRow:1,
					autoAppend:true});
			this.sgn3 = new sgNavigator(this.pc1.childPage[4],{bound:[10,350,915,25],buttonStyle:2,grid:this.sg3});
					
			this.mDesk = new wysiwyg(this.pc1.childPage[5],{bound:[1,10,this.pc1.width-25,this.pc1.height-125], withForm:false});
			this.mDesk.display();
			this.mDesk.enable();
		
			this.rearrangeChild(10, 25);
			this.pc1.childPage[0].rearrangeChild(10, 22);
			this.pc1.childPage[1].rearrangeChild(10, 22);
			this.pc1.childPage[2].rearrangeChild(10, 22);
			this.pc1.childPage[3].rearrangeChild(10, 22);
			this.pc1.childPage[4].rearrangeChild(10, 22);
			
			this.img = new image(this.pc1.childPage[0],{bound:[550,140,160,180]});			
			
			setTipeButton(tbAllFalse);
			this.maximize();		
			this.setTabChildIndex();
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_nip.setSQL("select nip, nama from gr_rekrut_pelamar where kode_lokasi='"+this.app._lokasi+"' ",["nip","nama"],false,["NIP","Nama"],"and","Data Pelamar",true);
			this.e_kota.setSQL("select kode_kota, nama from gr_kota",["kode_kota","nama"],false,["Kode","Nama"],"where","Data Kota",true);			
			this.cb_prop.setSQL("select kode_prov, nama from gr_prov",["kode_prov","nama"],false,["Kode","Nama"],"where","Data Propinsi",true);			
			this.cb_agama.setSQL("select sts_agama, nama from gr_status_agama where kode_lokasi='"+this.app._lokasi+"'",["sts_agama","nama"],false,["Kode","Nama"],"and","Data Agama",true);			
			//this.cb_didik.setSQL("select sts_didik, nama from gr_status_didik where kode_lokasi='"+this.app._lokasi+"'",["sts_didik","nama"],false,["Kode","Nama"],"and","Data Tk Pendidikan",true);			
			this.cb_strata.setSQL("select kode_strata, nama from gr_strata where kode_lokasi='"+this.app._lokasi+"'",["kode_strata","nama"],false,["Kode","Nama"],"and","Data Strata",true);			
			this.cb_jur.setSQL("select a.kode_jur, a.nama,a.kode_klpjur,b.nama as klp from gr_jur a inner join gr_klpjur b on a.kode_klpjur=b.kode_klpjur where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_jur","a.nama","a.kode_klpjur","b.klp"],false,["Kode Jurusan","Nama Jurusan","Klp Jurusan","Kelompok"],"and","Data Jurusan",true);			

			this.cb_jab.setSQL("select a.kode_jab, a.nama,b.nama as nama_klp from gr_jab a "+
							"inner join gr_klpjab b on a.kode_klpjab=b.kode_klpjab and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_jab","a.nama","b.nama_klp"],false,["Kode","Nama","Kelompok Jabatan"],"and","Data Jabatan",true);						
			this.cb_grade.setSQL("select kode_grade, nama from gr_grade where kode_lokasi='"+this.app._lokasi+"'",["kode_grade","nama"],false,["Kode","Nama"],"and","Data Grade",true);						
			this.cb_loker.setSQL("select kode_loker, nama from gr_loker where kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Loker",true);						
			this.cb_dir.setSQL("select kode_dir, nama from gr_dir where kode_lokasi='"+this.app._lokasi+"'",["kode_dir","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);						
			this.cb_dept.setSQL("select kode_dept, nama from gr_dept where kode_lokasi='"+this.app._lokasi+"'",["kode_dept","nama"],false,["Kode","Nama"],"and","Data Departemen",true);						
			this.cb_sdm.setSQL("select sts_sdm, nama from gr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",["sts_sdm","nama"],false,["Kode","Nama"],"and","Data Status SDM",true);						
			this.cb_vendor.setSQL("select kode_vendor, nama from gr_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Pihak Ketiga",true);						
			this.cb_bank.setSQL("select sts_bank, nama from gr_status_bank where kode_lokasi='"+this.app._lokasi+"'",["sts_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);									
			this.cb_lok.setSQL("select kode_kota, nama from gr_kota",["kode_kota","nama"],false,["Kode","Nama"],"where","Data Kota",true);

			this.c_nikah.items.clear();
			var data = this.dbLib.getDataProvider(
						"select sts_pajak from gr_status_pajak where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_nikah.addItem(i,line.sts_pajak);
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_master_karyawan_fKaryawan.extend(window.childForm);
window.app_hris_master_karyawan_fKaryawan.implement({
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
					sql.add("insert into gr_karyawan(nik,nip,kode_jab,kode_vendor,kode_loker,kode_dir,kode_grade,kode_dept,sts_agama,sts_sdm,sts_bank,npwp,lembaga,cabang,no_rek,nama_rek,tgl_masuk,nik2,suku,asal_lamaran,foto,kode_prov,no_ktp,nama,tempat,tgl_lahir,alamat,kota,kodepos,no_telp,no_hp,sex,email,gol_darah,kode_lokasi,sts_pajak,tgl_nikah,nik_user,tgl_input,flag_gaji,no_jamsos,no_jiwas,jobdesk,kode_kota,alamat2,kode_strata,kode_jur,flag_akdhk,iq,kota_lamaran) values "+//this.e_lembaga.getText()
						    "	('"+this.cb_kode.getText()+"','"+this.cb_nip.getText()+"','"+this.cb_jab.getText()+"','"+this.cb_vendor.getText()+"','"+this.cb_loker.getText()+"','"+this.cb_dir.getText()+"','"+this.cb_grade.getText()+"','"+this.cb_dept.getText()+"','"+this.cb_agama.getText()+"','"+this.cb_sdm.getText()+"','"+this.cb_bank.getText()+"','"+this.e_npwp.getText()+"','-','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.dp_d3.getDateString()+"','"+this.e_nik2.getText()+"','"+this.e_suku.getText()+"','"+this.e_lamaran.getText()+"','"+this.e_foto.getText()+"','"+this.cb_prop.getText()+"','"+this.e_ktp.getText()+"','"+this.e_nama.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_kodepos.getText()+"','"+this.e_telp.getText()+"','"+this.e_hp.getText()+"','"+this.c_sex.getText()+"','"+this.e_mail.getText()+"','"+this.c_gd.getText()+"','"+this.app._lokasi+"','"+this.c_nikah.getText()+"','"+this.dp_d2.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.c_gaji.getText()+"','"+this.e_jamsos.getText()+"','"+this.e_jiwas.getText()+"','"+urlencode(this.mDesk.getCode())+"','"+this.e_kota.getText()+"','"+this.e_alamat2.getText()+"','"+this.cb_strata.getText()+"','"+this.cb_jur.getText()+"','"+this.c_akdhk.getText()+"','"+this.e_iq.getText()+"','"+this.cb_lok.getText()+"')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_keluarga(nik,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi,no_telp,nik2,alamat,kota,kodepos,kode_prov,flag_hidup,flag_kerja,flag_tanggung,flag_anak) values "+  
										"('"+this.cb_kode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.getCellDateValue(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(6,i)+"','"+this.app._lokasi+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"','"+this.sg.cells(9,i)+"','"+this.sg.cells(10,i)+"','"+this.sg.cells(11,i)+"','"+this.sg.cells(12,i)+"','"+this.sg.cells(14,i)+"','"+this.sg.cells(15,i)+"','"+this.sg.cells(16,i)+"','"+this.sg.cells(17,i)+"')");
							}
						}						
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into gr_karyawan_fungsi(nik,kode_fungsi, nama, kode_lokasi) values "+  
										"('"+this.cb_kode.getText()+"','"+i+"','"+this.sg2.cells(0,i)+"','"+this.app._lokasi+"')");
							}
						}						
					}
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){
								sql.add("insert into gr_karyawan_tugas(nik,kode_tugas,nama, kode_lokasi) values "+  
										"('"+this.cb_kode.getText()+"','"+i+"','"+this.sg3.cells(0,i)+"','"+this.app._lokasi+"')");
							}
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();//,lembaga='"+this.e_lembaga.getText()+"'
					sql.add("update gr_karyawan set flag_gaji='"+this.c_gaji.getText()+"',nip='"+this.cb_nip.getText()+"',kode_jab='"+this.cb_jab.getText()+"',kode_vendor='"+this.cb_vendor.getText()+"',kode_loker='"+this.cb_loker.getText()+"',kode_dir='"+this.cb_dir.getText()+"',kode_grade='"+this.cb_grade.getText()+"',kode_dept='"+this.cb_dept.getText()+"',sts_agama='"+this.cb_agama.getText()+"',sts_sdm='"+this.cb_sdm.getText()+"',sts_bank='"+this.cb_bank.getText()+"',npwp='"+this.e_npwp.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+"',tgl_masuk='"+this.dp_d3.getDateString()+"',nik2='"+this.e_nik2.getText()+"',suku='"+this.e_suku.getText()+"',asal_lamaran='"+this.e_lamaran.getText()+"',foto='"+this.e_foto.getText()+"',kode_prov='"+this.cb_prop.getText()+"',no_ktp='"+this.e_ktp.getText()+"',nama='"+this.e_nama.getText()+"',tempat='"+this.e_tempat.getText()+"',tgl_lahir='"+this.dp_d1.getDateString()+"',alamat='"+this.e_alamat.getText()+"',kode_kota='"+this.e_kota.getText()+"',kodepos='"+this.e_kodepos.getText()+"',no_telp='"+this.e_telp.getText()+"',no_hp='"+this.e_hp.getText()+"',sex='"+this.c_sex.getText()+"',email='"+this.e_mail.getText()+"',gol_darah='"+this.c_gd.getText()+"',sts_pajak='"+this.c_nikah.getText()+"',tgl_nikah ='"+this.dp_d2.getDateString()+"',nik_user='"+this.app._userLog+"',tgl_input=getdate() "+
							",no_jamsos='"+this.e_jamsos.getText()+"',no_jiwas='"+this.e_jiwas.getText()+"', jobdesk='"+urlencode(this.mDesk.getCode())+"',alamat2='"+this.e_alamat2.getText()+"',kode_strata='"+this.cb_strata.getText()+"',kode_jur='"+this.cb_jur.getText()+"',flag_akdhk='"+this.c_akdhk.getText()+"',iq='"+this.e_iq.getText()+"',kota_lamaran='"+this.cb_lok.getText()+"' "+ 
						    "where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_keluarga where nik  = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_karyawan_fungsi where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from gr_karyawan_tugas where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_keluarga(nik,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi,no_telp,nik2,alamat,kota,kodepos,kode_prov,flag_hidup,flag_kerja,flag_tanggung,flag_anak) values "+  
										"('"+this.cb_kode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.getCellDateValue(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(6,i)+"','"+this.app._lokasi+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"','"+this.sg.cells(9,i)+"','"+this.sg.cells(10,i)+"','"+this.sg.cells(11,i)+"','"+this.sg.cells(12,i)+"','"+this.sg.cells(14,i)+"','"+this.sg.cells(15,i)+"','"+this.sg.cells(16,i)+"','"+this.sg.cells(17,i)+"')");
							}
						}						
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into gr_karyawan_fungsi(nik,kode_fungsi, nama, kode_lokasi) values "+  
										"('"+this.cb_kode.getText()+"','"+i+"','"+this.sg2.cells(0,i)+"','"+this.app._lokasi+"')");
							}
						}						
					}
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){
								sql.add("insert into gr_karyawan_tugas(nik,kode_tugas,nama, kode_lokasi) values "+  
										"('"+this.cb_kode.getText()+"','"+i+"','"+this.sg3.cells(0,i)+"','"+this.app._lokasi+"')");
							}
						}						
					}
					setTipeButton(tbUbahHapus);
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
					sql.add("delete from gr_karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from gr_keluarga where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from gr_karyawan_fungsi where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from gr_karyawan_tugas where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					this.sg.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				setTipeButton(tbAllFalse);
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
				this.hapus();
				break;				
		}
		return false;
	},
	doLoad: function(sender){
		if (this.cb_nip.getText() != "" ) {
				var data = this.dbLib.getDataProvider(
				           "select a.kode_prov,a.no_ktp,a.nama,a.tempat,a.tgl_lahir,a.alamat,a.kode_kota,a.kodepos,a.no_telp,a.no_hp,a.sex,a.email,a.gol_darah,a.sts_didik "+
				           " from gr_rekrut_pelamar a "+
						   "where a.nip='"+this.cb_nip.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_prop.setText(line.kode_prov);
						this.e_nama.setText(line.nama);
						this.e_tempat.setText(line.tempat);
						this.dp_d1.setText(line.tgl_lahir);
						this.e_ktp.setText(line.no_ktp);
						this.e_alamat.setText(line.alamat);
						this.e_kota.setText(line.kode_kota);
						this.e_kodepos.setText(line.kodepos);
						this.e_telp.setText(line.no_telp);
						this.e_hp.setText(line.no_hp);
						this.c_sex.setText(line.sex);
						this.e_mail.setText(line.email);
						this.c_gd.setText(line.gol_darah);
						//this.cb_didik.setText(line.sts_didik);
					}
				}
				var data = this.dbLib.getDataProvider("select a.nama,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.sts_kel,b.nama as nama_sts,a.sex,a.institusi "+
				                                      "from gr_rekrut_keluarga a inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi "+
													  "where a.nip = '"+this.cb_nip.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.nama,line.tempat,line.tgl_lahir,line.sts_kel,line.nama_sts,line.sex,line.institusi,"-","-","-","-","-","-","-","-","-","-","-"]);
					}
				} else this.sg.clear(1);
		}
	},
	doLoadKota: function(sender){
		if (this.e_kota.getText() != "" ) {
				var data = this.dbLib.getDataProvider(
				           "select a.kode_prov,b.nama as nama_prov "+
				           " from gr_kota a "+
						   "inner join gr_prov b on a.kode_prov=b.kode_prov "+
						   "where a.kode_kota='"+this.e_kota.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_prop.setText(line.kode_prov,line.nama_prov);
					}
				}
				
		}
	},	
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				this.standarLib.clearByTag(this, new Array("1"),undefined);
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
				           " select a.kode_prov,b.nama as nama_prov,a.no_ktp,a.nama,a.tempat,a.tgl_lahir,a.alamat,a.kota,a.kodepos,a.no_telp,a.no_hp,a.sex,a.email,a.gol_darah, "+
						   "        a.nik2,a.npwp,a.suku,a.sts_agama,c.nama as nama_agama,a.kode_strata,d.nama as nama_strata,a.foto,a.sts_pajak,a.tgl_nikah, "+
						   "        a.tgl_masuk,a.kode_jab,a.kode_grade,a.kode_loker,a.kode_dir,a.kode_dept,a.sts_sdm,a.kode_vendor,a.sts_bank,"+
						   "        e.nama as nama_jab,f.nama as nama_grade,g.nama as nama_loker,h.nama as nama_dir,i.nama as nama_dept,j.nama as nama_sdm,k.nama as nama_vendor,l.nama as nama_bank,"+
						   "        a.lembaga,a.asal_lamaran,a.cabang,a.no_rek,a.nama_rek,a.nip,a.flag_gaji,a.no_jamsos,a.no_jiwas, a.jobdesk,a.kode_kota,m.nama as nama_kota,alamat2, "+
						   "        a.kode_jur,n.nama as nama_jur,a.flag_akdhk,a.iq,a.kota_lamaran,o.nama as nama_kotalamaran "+
				           " from gr_karyawan a "+
						   " inner join gr_prov b on a.kode_prov=b.kode_prov "+
						   " inner join gr_status_agama c on a.sts_agama=c.sts_agama and a.kode_lokasi = c.kode_lokasi "+
						   " inner join gr_strata d on a.kode_strata=d.kode_strata and a.kode_lokasi = d.kode_lokasi "+
						   " inner join gr_jab e on a.kode_jab=e.kode_jab and a.kode_lokasi = e.kode_lokasi "+
						   " inner join gr_grade f on a.kode_grade=f.kode_grade and a.kode_lokasi = f.kode_lokasi "+
						   " inner join gr_loker g on a.kode_loker=g.kode_loker and a.kode_lokasi = g.kode_lokasi "+
						   " inner join gr_dir h on a.kode_dir=h.kode_dir and a.kode_lokasi = h.kode_lokasi "+
						   " inner join gr_dept i on a.kode_dept=i.kode_dept and a.kode_lokasi = i.kode_lokasi "+
						   " inner join gr_status_sdm j on a.sts_sdm=j.sts_sdm and a.kode_lokasi = j.kode_lokasi "+
						   " inner join gr_vendor k on a.kode_vendor=k.kode_vendor and a.kode_lokasi = k.kode_lokasi "+
						   " inner join gr_status_bank l on a.sts_bank=l.sts_bank and a.kode_lokasi = l.kode_lokasi "+
						   " inner join gr_kota m on a.kode_kota=m.kode_kota and a.kode_lokasi =m.kode_lokasi "+
						   " inner join gr_jur n on a.kode_jur=n.kode_jur and a.kode_lokasi = n.kode_lokasi "+
						   " left join gr_kota o on a.kota_lamaran=o.kode_kota and a.kode_lokasi =o.kode_lokasi "+
						   " where a.nik='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
						  "select nama from gr_karyawan_fungsi where nik ='"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by kode_fungsi ",
						  "select nama from gr_karyawan_tugas where nik ='"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by kode_tugas "
						  ]}),true);
				if (typeof data == "object"){
					var line = data.result[0].rs.rows[0];							
					if (line != undefined){
						this.cb_prop.setText(line.kode_prov,line.nama_prov);
						this.e_nama.setText(line.nama);
						this.e_tempat.setText(line.tempat);
						this.dp_d1.setText(line.tgl_lahir);
						this.e_ktp.setText(line.no_ktp);
						this.e_alamat.setText(line.alamat);
						this.e_alamat2.setText(line.alamat2);
						this.e_kota.setText(line.kode_kota,line.nama_kota);
						this.e_kodepos.setText(line.kodepos);
						this.e_telp.setText(line.no_telp);
						this.e_hp.setText(line.no_hp);
						this.c_sex.setText(line.sex);
						this.c_gaji.setText(line.flag_gaji);
						this.c_akdhk.setText(line.flag_akdhk);
						this.e_mail.setText(line.email);
						this.c_gd.setText(line.gol_darah);
						this.e_jamsos.setText(line.no_jamsos);
						this.e_jiwas.setText(line.no_jiwas);
						this.e_nik2.setText(line.nik2);
						this.e_npwp.setText(line.npwp);
						this.e_suku.setText(line.suku);
						this.e_foto.setText(line.foto);
						this.mDesk.setCode(urldecode(line.jobdesk));
						this.img.setImage(this.uploader.param4+line.foto);
						this.fileBfr = line.foto;
						this.cb_agama.setText(line.sts_agama,line.nama_agama);
						this.cb_strata.setText(line.kode_strata,line.nama_strata);
						this.c_nikah.setText(line.sts_pajak);
						this.dp_d2.setText(line.tgl_nikah);
						this.cb_jur.setText(line.kode_jur,line.nama_jur);
						this.dp_d3.setText(line.tgl_masuk);
						this.cb_jab.setText(line.kode_jab,line.nama_jab);
						this.cb_grade.setText(line.kode_grade,line.nama_grade);
						this.cb_loker.setText(line.kode_loker,line.nama_loker);
						this.cb_dir.setText(line.kode_dir,line.nama_dir);
						this.cb_dept.setText(line.kode_dept,line.nama_dept);
						this.cb_sdm.setText(line.sts_sdm,line.nama_sdm);
						this.cb_vendor.setText(line.kode_vendor,line.nama_vendor);
						this.cb_bank.setText(line.sts_bank,line.nama_bank);
						this.e_lamaran.setText(line.asal_lamaran);
						this.cb_lok.setText(line.kota_lamaran,line.nama_kotalamaran);
						//this.e_lembaga.setText(line.lembaga);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.cb_nip.setText("-");
						this.e_iq.setText(line.iq);
						var tugas = data.result[1];
						this.sg2.clear();
						for (var i in tugas.rs.rows){
							line = tugas.rs.rows[i];
							this.sg2.appendData([line.nama]);
						}
						tugas = data.result[2];
						this.sg3.clear();
						for (var i in tugas.rs.rows){
							line = tugas.rs.rows[i];
							this.sg3.appendData([line.nama]);
						}
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}			
				var data = this.dbLib.getDataProvider("select a.nama,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.sts_kel,b.nama as nama_sts,a.sex,a.institusi, "+
													  "       a.no_telp,a.nik2,a.alamat,a.kota,a.kodepos,a.kode_prov,a.flag_hidup,a.flag_kerja,a.flag_tanggung,a.flag_anak,c.nama as nama_prov "+
				                                      "from gr_keluarga a inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi "+
													  "                   inner join gr_prov c on a.kode_prov=c.kode_prov "+
													  "where a.nik = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.nama,line.tempat,line.tgl_lahir,line.sts_kel,line.nama_sts,line.sex,line.institusi,line.no_telp,line.nik2,line.alamat,line.kota,line.kodepos,line.kode_prov,line.nama_prov,line.flag_hidup,line.flag_kerja,line.flag_tanggung,line.flag_anak]);
					}
				} else this.sg.clear(1);
				//fungsi jabatan
				var data = this.dbLib.getDataProvider("select a.nama from gr_karyawan_fungsi a "+
													  "where a.nik = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.nama]);
					}
				} else this.sg2.clear(1);
				//tugas pokok
				var data = this.dbLib.getDataProvider("select a.nama from gr_karyawan_tugas a "+
													  "where a.nik = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.nama]);
					}
				} else this.sg3.clear(1);
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 3 :
						this.standarLib.showListDataForSG(this, "Daftar Status Keluarga",this.sg, this.sg.row, this.sg.col, 
														"select sts_kel,nama   from gr_status_kel where kode_lokasi='"+this.app._lokasi+"'",
														"select count(sts_kel) from gr_status_kel where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("sts_kel","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
				case 12 :
						this.standarLib.showListDataForSG(this, "Daftar Provinsi",this.sg, this.sg.row, this.sg.col, 
														"select kode_prov,nama   from gr_prov",
														"select count(kode_prov) from gr_prov",
														 new Array("kode_prov","nama"),"where",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{	
							
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_foto.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}		
							
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							system.info(this,"Data Sukses Tersimpan",".");
							//this.app._mainForm.pesan(2,"Proses Lengkap tersimpan.)");
							//this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert(e);
			}
	    }
		if (sender == this.fileUtil){
			//alert(result);
		}
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_foto.setText(data.filedest);
			this.dataUpload = data;
			this.img.setImage(this.uploader.param2 +this.dataUpload.tmpfile);
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
	}
});
