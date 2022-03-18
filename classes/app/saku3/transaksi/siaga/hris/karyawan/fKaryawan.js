window.app_saku3_transaksi_siaga_hris_karyawan_fKaryawan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_karyawan_fKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_karyawan_fKaryawan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan dan Keluarga", 0);	
		this.maximize();
		uses("saiCBBL;saiCB;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;uploader;util_file;image;wysiwyg");
		try {
			this.l_tgl3 = new label(this,{bound:[20,29,100,18],caption:"Tanggal Masuk", underline:true});
			this.dp_d3 = new datePicker(this,{bound:[120,29,100,18],date:new Date().getDateStr()});	
			
			this.cb_sdm = new saiCBBL(this,{bound:[20,15,220,20],caption:"Status SDM", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
			
			//this.cb_so = new saiCBBL(this,{bound:[20,21,220,20],caption:"Jabatan SO", multiSelection:false, maxLength:10, tag:1, readOnly:true});			
			//this.cb_jab = new saiCBBL(this,{bound:[20,21,220,20],caption:"Jabatan", multiSelection:false, maxLength:10, tag:1, readOnly:true});						
			this.c_lokkantor = new saiCBBL(this,{bound:[20,18,220,20],caption:"Lokasi Kantor", multiSelection:false, maxLength:10, tag:9});
			this.cb_nip = new saiCBBL(this,{bound:[505,10,240,20],caption:"Nomor Induk Pelamar", multiSelection:false, maxLength:10, labelWidth:120, rightLabelVisible:false});
			this.i_gen = new portalui_imageButton(this,{bound:[748,10,20,20],hint:"Load Data Pelamar",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoad"]});						
			this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"ID",maxLength:10,rightLabelVisible:false,multiSelection:false,change:[this,"doChange"]});
			//this.i_gen2 = new portalui_imageButton(this,{bound:[243,10,20,20],hint:"Generate ID",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		

			this.e_nik2 = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"NIK Gratika", maxLength:20, tag:1});		
			//this.i_gentg = new portalui_imageButton(this,{bound:[243,12,20,20],hint:"Generate NIK Gratika",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClickTG"]});			

			this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:145, tag:1});		
			this.e_nik3 = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"NIK TG", maxLength:20, tag:9});		
			
			this.pc1 = new pageControl(this,{bound:[20,12,this.width - 95, this.height - 110], childPage:["Data Pribadi","Data Pelengkap","Data Keluarga","Fungsi Jabatan","Tugas Pokok","Job Desc"]}); 									    
			this.e_tempat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,290,20],caption:"Tempat / Tgl Lahir", maxLength:50, tag:9});	
			this.dp_d1 = new datePicker(this.pc1.childPage[0],{bound:[315,12,98,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDate"]});	
			this.e_tgllahir = new saiEdit(this.pc1.childPage[0],{bound:[315,12,80,20],tag:9,text:"",maxLength:6,exit:[this,"doExit"]});		
			
			this.c_nikah = new saiCB(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Status Pajak",readOnly:true}); //,items:["TK/00","K0","K1","K2","K3"], 			
			this.c_stsnikah = new saiCB(this.pc1.childPage[0],{bound:[20,18,250,20],caption:"Status Pernikahan",items:["BELUM MENIKAH","MENIKAH"], readOnly:true}); 
			this.l_tgl2 = new label(this.pc1.childPage[0],{bound:[20,16,100,18],caption:"Tgl Pernikahan", underline:true});
			this.dp_d2 = new datePicker(this.pc1.childPage[0],{bound:[120,16,98,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDate2"]});	
			this.e_tglnikah = new saiEdit(this.pc1.childPage[0],{bound:[120,16,80,20],tag:9,text:"",maxLength:6,exit:[this,"doExit2"]});		

			this.cb_agama = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Agama", multiSelection:false, maxLength:10, tag:9, readOnly:true});			
			this.c_sex = new saiCB(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Gender",items:["L","P"], readOnly:true});			
			this.c_gd = new saiCB(this.pc1.childPage[0],{bound:[20,20,200,20],caption:"Gol Darah",items:["A","B","AB","O"], readOnly:true,tag:9});
			this.e_mail = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,30,300,20],caption:"Email", maxLength:100, tag:9});											
			this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,500,20],caption:"Alamat KTP", multiSelection:false, maxLength:150, tag:9});	
			this.e_kota2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,28,220,20],caption:"Kota", multiSelection:false, maxLength:45, tag:9,change:[this,"doLoadKota"], readOnly:true});		
			this.cb_prop2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,29,220,20],caption:"Propinsi", multiSelection:false, maxLength:2, tag:9, readOnly:true});	
			this.e_kodepos2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,30,200,20],caption:"Kodepos", maxLength:5, tag:9});		
			this.e_alamat2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,22,500,20],caption:"Alamat Tinggal", multiSelection:false, maxLength:150, tag:9});					
			this.e_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Kota", multiSelection:false, maxLength:45, tag:9,change:[this,"doLoadKota"], readOnly:true});		
			this.cb_prop = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Propinsi", multiSelection:false, maxLength:2, tag:9, readOnly:true});
			this.e_kodepos = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,24,200,20],caption:"Kodepos", maxLength:5, tag:9});		
			this.e_telp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,23,200,20],caption:"No Telpon", maxLength:50, tag:9});		
			this.e_hp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,25,200,20],caption:"No HP", maxLength:20, tag:9});		
			this.cb_strata = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Pendidikan", multiSelection:false, maxLength:10, tag:9, readOnly:true});
			this.cb_jur = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Jurusan", multiSelection:false, maxLength:10, tag:9, readOnly:true});
			this.e_univ = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,26,400,20],caption:"Institusi", maxLength:50, tag:9});		
			this.e_ipk = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,27,200,20],caption:"IPK", tipeText:ttNilai, text:"0" , maxLength:50, tag:9});		
			
			// grid 2							
			this.e_foto = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,31,400,20],caption:"Foto", readOnly:true, maxLength:100, tag:9});		
			this.uploader = new uploader(this.pc1.childPage[1],{bound:[430,31,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});							
			this.e_ktp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,400,20],caption:"No KTP", maxLength:50, tag:9});		
			this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,400,20],caption:"No NPWP", maxLength:50, tag:9});	
			this.e_jamsos = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,400,20],caption:"No BPJS TK", maxLength:50, tag:9});	
			this.e_bpjs = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,400,20],caption:"No BPJS Kes", maxLength:50, tag:9});	
			this.e_jiwas = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,400,20],caption:"No DPLK Jiwasraya", maxLength:50, tag:9});	

			this.e_lamaran = new saiCBBL(this.pc1.childPage[1],{bound:[20,23,220,20],caption:"Asal Lamaran", maxLength:50, tag:9, readOnly:true,
				multiSelection:false,
				sql:["select kode_media, nama from gr_rekrut_media where kode_lokasi = '"+this.app._lokasi+"' union select '','' ",["kode_media","nama"],false, ["Kode","Nama"],"and","Daftar Media Rekruitasi",true]
			});		
			this.cb_lok = new saiCBBL(this.pc1.childPage[1],{bound:[20,24,220,20],caption:"Kota Lamaran", multiSelection:false, maxLength:10, tag:9, readOnly:true});
			this.cb_bank = new saiCBBL(this.pc1.childPage[1],{bound:[20,25,220,20],caption:"Bank", multiSelection:false, maxLength:10, tag:9, readOnly:true});
			this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,26,400,20],caption:"Cabang", maxLength:50, tag:9});		
			this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,27,400,20],caption:"No Rekening", maxLength:50, tag:9});		
			this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,28,400,20],caption:"Nama Rekening", maxLength:50, tag:9});					
			this.c_gaji = new saiCB(this.pc1.childPage[1],{bound:[20,29,200,20],caption:"Status Gaji",items:["BULANAN","HARIAN"], readOnly:true});
			this.e_iq = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,27,200,20],caption:"IQ", maxLength:50, tag:9});										
			this.e_suku = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,26,200,20],caption:"Suku", maxLength:50, tag:9});		
			this.e_ayah = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,27,400,20],caption:"Ayah", maxLength:50, tag:9});		
			this.e_ibu = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,28,400,20],caption:"Ibu", maxLength:50, tag:9});		
			
			// grid 3
			this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:13,tag:9,
		            colTitle:["Nama","Tmp Lahir","Tgl Lahir","Kd Status","Nama Status","Gender","No KTP",
					          "Status Hidup","Status Bekerja","Tertanggung Askes","Status Anak","Nama Ayah","Nama Ibu"],
					colWidth:[[12,11,10, 9,8,7,6,5,4,3,2,1,0],[ 150,150,80,100,100,100,  150,70,100,70,80,100,150]],
					columnReadOnly:[true,[3,4,5,7,8,9,10],[0,1,2,6,11,12]],
					buttonStyle:[[2,3,5,7,8,9,10],[bsDate,bsEllips,bsAuto,bsAuto,bsAuto,bsAuto,bsAuto ]], 
					colFormat:[[2],[cfDate]],
					picklist:[[5,7,8,9,10],[new portalui_arrayMap({items:["L","P"]}),
						      new portalui_arrayMap({items:["Y","T"]}),new portalui_arrayMap({items:["Y","T"]}),
							  new portalui_arrayMap({items:["Y","T"]}),new portalui_arrayMap({items:["Y","T"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
			this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
			
			this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:1,tag:9,
		            colTitle:["Fungsi Jabatan"],
					colWidth:[[0],[600]],
					defaultRow:1,
					autoAppend:true});
			this.sgn2 = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
			
			this.sg3 = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:1,tag:9,
		            colTitle:["Tugas Pokok"],
					colWidth:[[0],[600]],
					defaultRow:1,
					autoAppend:true});
			this.sgn3 = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});
					
			this.mDesk = new wysiwyg(this.pc1.childPage[5],{bound:[1,10,this.pc1.width-25,this.pc1.height-125], withForm:false});
			this.mDesk.display();
			this.mDesk.enable();
		
			this.rearrangeChild(10, 22);
			this.pc1.childPage[0].rearrangeChild(10, 22);
			this.pc1.childPage[1].rearrangeChild(10, 22);
			
			this.img = new image(this.pc1.childPage[1],{bound:[550,30,160,180]});			
			
			setTipeButton(tbSimpan);
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
			this.e_kota.setSQL("select kode_kota, nama from gr_kota union select '','' ",["kode_kota","nama"],false,["Kode","Nama"],"where","Data Kota",true);			
			this.cb_prop.setSQL("select kode_prov, nama from gr_prov union select '','' ",["kode_prov","nama"],false,["Kode","Nama"],"where","Data Propinsi",true);			
			this.cb_agama.setSQL("select sts_agama, nama from gr_status_agama where kode_lokasi='"+this.app._lokasi+"' union select '',''",["sts_agama","nama"],false,["Kode","Nama"],"and","Data Agama",true);						
			this.cb_strata.setSQL("select kode_strata, nama from gr_strata where kode_lokasi='"+this.app._lokasi+"' union select '','' ",["kode_strata","nama"],false,["Kode","Nama"],"and","Data Strata",true);			
			this.cb_jur.setSQL("select a.kode_jur, a.nama,a.kode_klpjur,b.nama as klp from gr_jur a inner join gr_klpjur b on a.kode_klpjur=b.kode_klpjur where a.kode_lokasi='"+this.app._lokasi+"' union select '','','','' ",["a.kode_jur","a.nama","a.kode_klpjur","b.klp"],false,["Kode Jurusan","Nama Jurusan","Klp Jurusan","Kelompok"],"and","Data Jurusan",true);						
			this.e_kota2.setSQL("select kode_kota, nama from gr_kota union select '','' ",["kode_kota","nama"],false,["Kode","Nama"],"where","Data Kota",true);			
			this.cb_prop2.setSQL("select kode_prov, nama from gr_prov union select '','' ",["kode_prov","nama"],false,["Kode","Nama"],"where","Data Propinsi",true);			
			
			//this.cb_so.setSQL("select kode_so, nama from gr_so where getdate() between tgl_awal and tgl_akhir and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_so","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);						
			//this.cb_jab.setSQL("select kode_jab, nama from gr_jab where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_jab","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);						
			
			this.cb_bank.setSQL("select sts_bank, nama from gr_status_bank where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' union select '','' ",["sts_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);									
			this.cb_lok.setSQL("select kode_lokkantor, nama from gr_lokkantor union select '','' ",["kode_lokkantor","nama"],false,["Kode","Nama"],"where","Data Kota",true);

			this.c_nikah.items.clear();
			var data = this.dbLib.getDataProvider(
						"select sts_pajak from gr_status_pajak where kode_lokasi='"+this.app._lokasi+"' union select '' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_nikah.addItem(i,line.sts_pajak);
				}
			}

			var data = this.dbLib.getDataProvider("select a.status_admin,b.sts_sdm from hakakses a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				if (line.status_admin == "A") this.cb_sdm.setSQL("select sts_sdm, nama from gr_status_sdm where kode_lokasi='"+this.app._lokasi+"' union select '','' ",["sts_sdm","nama"],false,["Kode","Nama"],"and","Data Status SDM",true);						
				else this.cb_sdm.setSQL("select sts_sdm, nama from gr_status_sdm where sts_sdm='"+line.sts_sdm+"' and kode_lokasi='"+this.app._lokasi+"' union select '','' ",["sts_sdm","nama"],false,["Kode","Nama"],"and","Data Status SDM",true);						
			}

			this.c_lokkantor.setSQL("select kode_lokkantor, nama from gr_lokkantor where kode_lokasi='"+this.app._lokasi+"' union select '','' ",["kode_lokkantor","nama"],false,["Kode","Nama"],"and","Data Lokasi Kantor",true);						
			
			this.c_nikah.setText("");
			this.c_sex.setText("");
			this.c_gd.setText("");			
			this.c_gaji.setText("");

			this.stsSimpan = 1;
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_karyawan_fKaryawan.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_karyawan_fKaryawan.implement({
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

					sql.add("insert into gr_karyawan(nik,nip,kode_jab,kode_vendor,kode_loker,kode_dir,kode_grade,kode_dept,sts_agama,sts_sdm,sts_bank,npwp,lembaga,cabang,no_rek,nama_rek,tgl_masuk,nik2,suku,asal_lamaran,foto,kode_prov,no_ktp,nama,tempat,tgl_lahir,alamat,kota,kodepos,no_telp,no_hp,sex,email,gol_darah,kode_lokasi,sts_pajak,tgl_nikah,nik_user,tgl_input,flag_gaji,no_jamsos,no_jiwas,jobdesk,kode_kota,alamat2,kode_strata,kode_jur,flag_akdhk,iq,kota_lamaran, lok_kantor, kode_so,ayah,ibu,nik3,no_bpjs,kode_kota2,kode_prov2,kodepos2,sts_nikah,univ) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_nip.getText()+"','-','-','-','-','-','-','"+this.cb_agama.getText()+"','"+this.cb_sdm.getText()+"','"+this.cb_bank.getText()+"','"+this.e_npwp.getText()+"','-','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.dp_d3.getDateString()+"','"+this.e_nik2.getText()+"','"+this.e_suku.getText()+"','"+this.e_lamaran.getText()+"','"+this.e_foto.getText()+"','"+this.cb_prop.getText()+"','"+this.e_ktp.getText()+"','"+this.e_nama.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_kodepos.getText()+"','"+this.e_telp.getText()+"','"+this.e_hp.getText()+"','"+this.c_sex.getText()+"','"+this.e_mail.getText()+"','"+this.c_gd.getText()+"','"+this.app._lokasi+"','"+this.c_nikah.getText()+"','"+this.dp_d2.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.c_gaji.getText()+"','"+this.e_jamsos.getText()+"','"+this.e_jiwas.getText()+"','"+urlencode(this.mDesk.getCode())+"','"+this.e_kota.getText()+"','"+this.e_alamat2.getText()+"','"+this.cb_strata.getText()+"','"+this.cb_jur.getText()+"','-','"+this.e_iq.getText()+"','"+this.cb_lok.getText()+"','"+this.c_lokkantor.getText()+"','-','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"','"+this.e_nik3.getText()+"','"+this.e_bpjs.getText()+"','"+this.e_kota2.getText()+"','"+this.cb_prop2.getText()+"','"+this.e_kodepos2.getText()+"','"+this.c_stsnikah.getText()+"','"+this.e_univ.getText()+"')");
										
					sql.add("insert into gr_keluarga(nik,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi,no_telp,nik2,alamat,kota,kodepos,kode_prov,flag_hidup,flag_kerja,flag_tanggung,flag_anak,ayah,ibu) values "+  
							"('"+this.cb_kode.getText()+"','99','"+this.e_nama.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','0','"+this.c_sex.getText()+"','-','"+this.app._lokasi+"','-','"+this.e_ktp.getText()+"','-','-','-','-','Y','Y','Y','T','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"')");		
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(2,i) == "-") var tglLahir = "1900-01-01";
								else var tglLahir = this.sg.getCellDateValue(2,i);
								sql.add("insert into gr_keluarga(nik,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi,no_telp,nik2,alamat,kota,kodepos,kode_prov,flag_hidup,flag_kerja,flag_tanggung,flag_anak,ayah,ibu) values "+  
										"('"+this.cb_kode.getText()+"','"+i+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+tglLahir+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"','-','"+this.app._lokasi+"','-','"+this.sg.cells(6,i)+"','-','-','-','-','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"','"+this.sg.cells(9,i)+"','"+this.sg.cells(10,i)+"','"+this.sg.cells(11,i)+"','"+this.sg.cells(12,i)+"')");
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

					sql.add("insert into gr_nik_his (nik,nik2,nik2_lama,kode_lokasi,nik_user,tgl_input,sts_sdmlama,sts_sdm) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nik2.getText()+"','"+this.nikTGLama+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.stsSDMLama+"','"+this.cb_sdm.getText()+"')");
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
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					//kode_loker = this.cb_so
					sql.add("update gr_karyawan set nip='"+this.cb_nip.getText()+"',sts_agama='"+this.cb_agama.getText()+"',sts_sdm='"+this.cb_sdm.getText()+"',sts_bank='"+this.cb_bank.getText()+"',npwp='"+this.e_npwp.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+"',tgl_masuk='"+this.dp_d3.getDateString()+"',nik2='"+this.e_nik2.getText()+"',suku='"+this.e_suku.getText()+"',asal_lamaran='"+this.e_lamaran.getText()+"',foto='"+this.e_foto.getText()+"',kode_prov='"+this.cb_prop.getText()+"',no_ktp='"+this.e_ktp.getText()+"',nama='"+this.e_nama.getText()+"',tempat='"+this.e_tempat.getText()+"',tgl_lahir='"+this.dp_d1.getDateString()+"',alamat='"+this.e_alamat.getText()+"',kode_kota='"+this.e_kota.getText()+"',kodepos='"+this.e_kodepos.getText()+"',no_telp='"+this.e_telp.getText()+"',kode_kota2='"+this.e_kota2.getText()+"',kodepos2='"+this.e_kodepos2.getText()+"',kode_prov2='"+this.cb_prop2.getText()+"',no_hp='"+this.e_hp.getText()+"',sex='"+this.c_sex.getText()+"',email='"+this.e_mail.getText()+"',gol_darah='"+this.c_gd.getText()+"',sts_pajak='"+this.c_nikah.getText()+"',tgl_nikah ='"+this.dp_d2.getDateString()+"',nik_user='"+this.app._userLog+"',tgl_input=getdate() "+
							",no_jamsos='"+this.e_jamsos.getText()+"',no_jiwas='"+this.e_jiwas.getText()+"', jobdesk='"+urlencode(this.mDesk.getCode())+"',alamat2='"+this.e_alamat2.getText()+"',kode_strata='"+this.cb_strata.getText()+"',kode_jur='"+this.cb_jur.getText()+"',iq='"+this.e_iq.getText()+"',kota_lamaran='"+this.cb_lok.getText()+"',ayah='"+this.e_ayah.getText()+"',ibu='"+this.e_ibu.getText()+"', flag_gaji='"+this.c_gaji.getText()+"',nik3='"+this.e_nik3.getText()+"',no_bpjs='"+this.e_bpjs.getText()+"',sts_nikah='"+this.c_stsnikah.getText()+"',univ='"+this.e_univ.getText()+"', lok_kantor='"+this.c_lokkantor.getText()+"' "+ 
							"where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("delete from gr_keluarga where nik  = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_karyawan_fungsi where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from gr_karyawan_tugas where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					

					sql.add("insert into gr_keluarga(nik,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi,no_telp,nik2,alamat,kota,kodepos,kode_prov,flag_hidup,flag_kerja,flag_tanggung,flag_anak,ayah,ibu) values "+  
							"('"+this.cb_kode.getText()+"','99','"+this.e_nama.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','0','"+this.c_sex.getText()+"','-','"+this.app._lokasi+"','-','"+this.e_ktp.getText()+"','-','-','-','-','Y','Y','Y','T','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(2,i) == "-") var tglLahir = "1900-01-01";
								else var tglLahir = this.sg.getCellDateValue(2,i);
								sql.add("insert into gr_keluarga(nik,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi,no_telp,nik2,alamat,kota,kodepos,kode_prov,flag_hidup,flag_kerja,flag_tanggung,flag_anak,ayah,ibu) values "+  
										"('"+this.cb_kode.getText()+"','"+i+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+tglLahir+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"','-','"+this.app._lokasi+"','-','"+this.sg.cells(6,i)+"','-','-','-','-','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"','"+this.sg.cells(9,i)+"','"+this.sg.cells(10,i)+"','"+this.sg.cells(11,i)+"','"+this.sg.cells(12,i)+"')");
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

					sql.add("insert into gr_nik_his (nik,nik2,nik2_lama,kode_lokasi,nik_user,tgl_input,sts_sdmlama,sts_sdm) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nik2.getText()+"','"+this.nikTGLama+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.stsSDMLama+"','"+this.cb_sdm.getText()+"')");

					sql.add("update karyawan set nik2='"+this.e_nik2.getText()+"' where nik='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("update hakakses set nik2='"+this.e_nik2.getText()+"' where nik='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
		
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
					this.sg.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.stsSimpan=1;
				break;
			case "simpan" :	
				if (this.e_tgllahir.getText() == "") this.dp_d1.setText("01/01/1900");
				if (this.e_tglnikah.getText() == "") this.dp_d2.setText("01/01/1900");

				var data = this.dbLib.getDataProvider(
							"select nik from gr_karyawan "+
							"where (nik2='"+this.e_nik2.getText()+"' or nik='"+this.e_nik2.getText()+"') and nik<>'"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						system.alert(this,"Transaksi tidak valid.","NIK TG sudah terpakai di NIK ("+line.nik+").");
						return false;						
					} else this.simpan();
				} else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				if (this.e_tgllahir.getText() == "") this.dp_d1.setText("01/01/1900");
				if (this.e_tglnikah.getText() == "") this.dp_d2.setText("01/01/1900");

				var data = this.dbLib.getDataProvider(
							"select nik from gr_karyawan "+
							"where (nik2='"+this.e_nik2.getText()+"' or nik='"+this.e_nik2.getText()+"') and nik<>'"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						system.alert(this,"Transaksi tidak valid.","NIK TG sudah terpakai di NIK ("+line.nik+").");
						return false;
					} 
					else this.ubah();
				}
				else this.ubah();
				
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
		return false;
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_tgllahir.setText(d+"/"+m+"/"+y);	
		if (this.e_tgllahir.getText() == "01/01/1900" || this.e_tgllahir.getText() == "1/01/1900") this.e_tgllahir.setText("");			
	},
	doExit: function(sender) {
		if (sender == this.e_tgllahir && this.e_tgllahir.getText().length==6) {						
			if (nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) < 1 || nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) > 12) {				
				this.e_tgllahir.setText("");
				system.alert(this,"Bulan tidak valid.",this.e_tgllahir.getText().substr(2,2));				
				return false;
			}
			else {
				if (  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 1 || 
					  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 3 ||
					  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 5 ||
					  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 7 ||
					  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 8 ||
					  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 10 ||
					  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 12 ) {
					  var tglMax = 31;
				} 
				if (  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 4 || 
					  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 6 ||
					  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 9 ||
					  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 11 ) {
					  var tglMax = 30;
				}
				if (  nilaiToFloat(this.e_tgllahir.getText().substr(2,2)) == 2) {
					  var tglMax = 28;
					  if (nilaiToFloat(this.e_tgllahir.getText().substr(4,4)) % 4 == 0) var tglMax = 29;
				} 
			}

			if ( nilaiToFloat(this.e_tgllahir.getText().substr(0,2)) < 1 || nilaiToFloat(this.e_tgllahir.getText().substr(0,2)) > tglMax) {
				this.e_tgllahir.setText("");
				system.alert(this,"Tanggal tidak valid.",this.e_tgllahir.getText().substr(0,2));
				return false;
			}
			if ( nilaiToFloat(this.e_tgllahir.getText().substr(4,2)) >= 0 && nilaiToFloat(this.e_tgllahir.getText().substr(4,2)) <= 49 ) {
				var vTahun = "20"+this.e_tgllahir.getText().substr(4,2);
			}
			if ( nilaiToFloat(this.e_tgllahir.getText().substr(4,2)) >= 50 && nilaiToFloat(this.e_tgllahir.getText().substr(4,2)) <= 99 ) {
				var vTahun = "19"+this.e_tgllahir.getText().substr(4,2);
			}
			var tglFormat = this.e_tgllahir.getText().substr(0,2) + "/" +this.e_tgllahir.getText().substr(2,2) + "/"+vTahun;
			this.e_tgllahir.setText(tglFormat);
			this.dp_d1.setText(tglFormat);
		}
	},
	doSelectDate2: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_tglnikah.setText(d+"/"+m+"/"+y);		
		if (this.e_tglnikah.getText() == "01/01/1900" || this.e_tglnikah.getText() == "1/01/1900") this.e_tglnikah.setText("");		
	},
	doExit2: function(sender) {
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
				if (nilaiToFloat(this.e_tglnikah.getText().substr(2,2)) == 2) {
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
			this.dp_d2.setText(tglFormat);
		}
	},
	doLoad: function(sender){
		try {
			if (this.cb_nip.getText() != "" ) {
				var data = this.dbLib.getDataProvider(
						"select a.nama, a.kode_prov,a.no_ktp,a.nama,a.tempat,a.tgl_lahir,a.alamat,a.kode_kota,a.kodepos,a.kode_kota3,a.kodepos2,a.no_telp,a.no_hp,a.sex,a.email,a.gol_darah,a.sts_didik,a.kode_strata,a.kode_jur,a.sts_agama,a.ayah,a.ibu,a.sts_pajak,  "+
						" tgl_nikah,alamat2,npwp,jamsostek,jiwasraya,kode_kota2,kode_bank,cabang,no_rek,flag_gaji,iq,suku,asal_lamaran,ipk,univ,no_bpjs "+
						" from gr_rekrut_pelamar a "+
						"where a.nip='"+this.cb_nip.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_prop.setText(line.kode_prov);
						this.cb_agama.setText(line.sts_agama);
						this.e_nama.setText(line.nama);
						this.e_tempat.setText(line.tempat);
						this.e_ayah.setText(line.ayah);
						this.e_ibu.setText(line.ibu);
						this.c_nikah.setText(line.sts_pajak);
						this.dp_d1.setText(line.tgl_lahir);
						this.e_ktp.setText(line.no_ktp);
						this.e_alamat.setText(line.alamat);
						this.e_kota2.setText(line.kode_kota);
						this.e_kodepos2.setText(line.kodepos);
						this.e_telp.setText(line.no_telp);
						this.e_hp.setText(line.no_hp);
						this.c_sex.setText(line.sex);
						this.e_mail.setText(line.email);
						this.c_gd.setText(line.gol_darah);						
						this.cb_strata.setText(line.kode_strata);
						this.cb_jur.setText(line.kode_jur);
						this.e_namarek.setText(line.nama);
						this.e_univ.setText(line.univ);
						this.e_ipk.setText(line.ipk);

						this.dp_d2.setText(line.tgl_nikah);
						this.e_alamat2.setText(line.alamat2);
						this.e_kota.setText(line.kode_kota3);
						this.e_kodepos.setText(line.kodepos2);
						this.e_npwp.setText(line.npwp);
						this.e_jamsos.setText(line.jamsostek);
						this.e_bpjs.setText(line.no_bpjs);
						this.e_jiwas.setText(line.jiwasraya);
						this.cb_lok.setText(line.kode_kota2);
						this.cb_bank.setText(line.kode_bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.c_gaji.setText(line.flag_gaji);
						this.e_iq.setText(line.iq);
						this.e_suku.setText(line.suku);
						this.e_lamaran.setText(line.asal_lamaran);

					}
				}


				var data = this.dbLib.getDataProvider(
							"select kode_media from gr_rekrut_job_pelamar where nip='"+this.cb_nip.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_lamaran.setText(line.kode_media);					
					}
				}

				var data = this.dbLib.getDataProvider("select a.nama,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.sts_kel,b.nama as nama_sts,a.sex,a.institusi,a.ayah,a.ibu,a.nik2,   a.flag_hidup,a.flag_kerja,a.flag_tanggung,a.flag_anak "+
													"from gr_rekrut_keluarga a inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi "+
													"where a.nip = '"+this.cb_nip.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.sts_Kel<>'11'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];			
						if (line.tgl_lahir == "01/01/1900") var tglLahir = "-";
						else var tglLahir = line.tgl_lahir;							
						this.sg.appendData([line.nama,line.tempat,tglLahir,line.sts_kel,line.nama_sts,line.sex,line.nik2, line.flag_hidup,line.flag_kerja,line.flag_tanggung,line.flag_anak,  line.ayah,line.ibu]);
					}
				} else this.sg.clear(1);
			}
		}
		catch(e) {
			alert(e);
		}
	},
	/*
	doClick:function(sender){	
		try {		
			if (this.cb_sdm.getText()!="") {				
				var AddFormat = "K"+this.dp_d3.getDateString().substr(2,2);
				var AddFormat2 = "G"+this.dp_d3.getDateString().substr(2,2);
				var AddFormat3 = "G00";

				if( this.cb_sdm.getText() == "K" ){
					var data = this.dbLib.getDataProvider(
									"select isnull(max(a.nik),0) as nik from ("+
									"select nik from gr_karyawan where nik like '"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select nik2 from gr_karyawan where nik2 like '"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"' "+
									") a "
						,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.nik == "0") this.cb_kode.setText(AddFormat+"0001");
							else {
								var idx = parseFloat(line.nik.substr(3,4)) + 1;
								idx = idx.toString();
								if (idx.length == 1) var nu = "000"+idx;
								if (idx.length == 2) var nu = "00"+idx;
								if (idx.length == 3) var nu = "0"+idx;
								if (idx.length == 4) var nu = idx;						
								this.cb_kode.setText(AddFormat+nu);						
							}
						} 
					}
				} 
			
				if( this.cb_sdm.getText() != "K" ){
					var data = this.dbLib.getDataProvider(
								"select isnull(max(a.nik),0) as nik from ("+
								"select nik from gr_karyawan where nik like '"+AddFormat2+"%' and kode_lokasi='"+this.app._lokasi+"' "+
								"union "+
								"select nik2 from gr_karyawan where nik2 like '"+AddFormat2+"%' and kode_lokasi='"+this.app._lokasi+"' "+
								" ) a "
						,true);

					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							
							if (this.cb_sdm.getText() == "G"){														
								if (line.nik == "0") this.cb_kode.setText(AddFormat2+"001");
								else {								
									var idx = parseFloat(line.nik.substr(3,3)) + 1;								
									idx = idx.toString();								
									if (idx.length == 1) var nu = "00"+idx;
									if (idx.length == 2) var nu = "0"+idx;
									if (idx.length == 3) var nu = idx;							
									this.cb_kode.setText(AddFormat2+nu);									
								}							
							}				
							if(this.cb_sdm.getText() == "BOD"){
								if (line.nik == "0") this.cb_kode.setText(AddFormat3+"001");
								else {
									var idx = parseFloat(line.nik.substr(3,3)) + 1;
									idx = idx.toString();
									if (idx.length == 1) var nu = "00"+idx;
									if (idx.length == 2) var nu = "0"+idx;
									if (idx.length == 3) var nu = idx;							
									this.cb_kode.setText(AddFormat3+nu);					
								}
							}
							if(this.cb_sdm.getText() == "GK"){
								if (line.nik == "0") this.cb_kode.setText(AddFormat2+"001"+"K");
								else {
									var idx = parseFloat(line.nik.substr(3,3)) + 1;
									idx = idx.toString();
									if (idx.length == 1) var nu = "00"+idx;
									if (idx.length == 2) var nu = "0"+idx;
									if (idx.length == 3) var nu = idx;							
									this.cb_kode.setText(AddFormat2+nu+"K");				
								}
							}						
						} 
					}

				}	
				
				this.e_nik2.setText(this.cb_kode.getText());
				this.nikTGLama = this.e_nik2.getText();
				this.stsSDMLama = this.cb_sdm.getText();	

				this.cb_kode.setSQL("select nik, nama from gr_karyawan where flag_aktif='0' and sts_sdm='"+this.cb_sdm.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIP","Nama"],"and","Data Karyawan",false);			
			}
			else system.alert(this,"Status SDM harus dipilih.","");	
		}
		catch(e) {
			alert(e);
		}			
	},
	
	doClickTG:function(sender){		
		var AddFormat = "K"+this.dp_d3.getDateString().substr(2,2);
		var AddFormat2 = "G"+this.dp_d3.getDateString().substr(2,2);
		var AddFormat3 = "G00";
		if( this.cb_sdm.getText() == "K" ){
			var data = this.dbLib.getDataProvider("select isnull(max(a.nik),0) as nik2 from (select nik from gr_karyawan where nik like '"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"' union select nik2 from gr_karyawan where nik2 like '"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"') a ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.nik2 == "0") this.e_nik2.setText(AddFormat+"0001");
					else {
						var idx = parseFloat(line.nik2.substr(3,4)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "000"+idx;
						if (idx.length == 2) var nu = "00"+idx;
						if (idx.length == 3) var nu = "0"+idx;
						if (idx.length == 4) var nu = idx;						
						this.e_nik2.setText(AddFormat+nu);						
					}
				} 
			}
		} 
		if( this.cb_sdm.getText() != "K" ){
			var data = this.dbLib.getDataProvider("select isnull(max(a.nik),0) as nik2 from (select nik from gr_karyawan where nik like '"+AddFormat2+"%' and kode_lokasi='"+this.app._lokasi+"' union select nik2 from gr_karyawan where nik2 like '"+AddFormat2+"%' and kode_lokasi='"+this.app._lokasi+"') a ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if(this.cb_sdm.getText() == "G"){
						if (line.nik2 == "0") this.e_nik2.setText(AddFormat2+"001");
						else {
							var idx = parseFloat(line.nik2.substr(3,3)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;							
							this.e_nik2.setText(AddFormat2+nu);					
						}
					}
					if(this.cb_sdm.getText() == "BOD"){
						if (line.nik == "0") this.cb_kode.setText(AddFormat3+"001");
						else {
							var idx = parseFloat(line.nik.substr(3,3)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;																		
							this.e_nik2.setText(AddFormat3+nu);					
						}
					}
					if(this.cb_sdm.getText() == "GK"){
						if (line.nik2 == "0") this.e_nik2.setText(AddFormat2+"001"+"K");
						else {
							var idx = parseFloat(line.nik2.substr(3,3)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;							
							this.e_nik2.setText(AddFormat2+nu+"K");				
						}
					}
				} 
			}
		}		
	},	
	*/
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
		if (this.e_kota2.getText() != "" ) {
			var data = this.dbLib.getDataProvider(
						"select a.kode_prov,b.nama as nama_prov "+
						" from gr_kota a "+
						"inner join gr_prov b on a.kode_prov=b.kode_prov "+
						"where a.kode_kota='"+this.e_kota2.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_prop2.setText(line.kode_prov,line.nama_prov);
				}
			}				
		}
	},	
	doChange: function(sender){
		try{					
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){				
				this.standarLib.clearByTag(this, new Array("1"),undefined);
				var strSQL = "select * from gr_karyawan a where a.nik='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						//this.cb_so.setText(line.kode_so);
						//this.cb_jab.setText(line.kode_jab);
						
						this.cb_sdm.setText(line.sts_sdm);
						this.c_lokkantor.setText(line.lok_kantor);
						this.cb_prop.setText(line.kode_prov);
						this.e_nama.setText(line.nama);
						this.e_tempat.setText(line.tempat);
						this.dp_d1.setText(line.tgl_lahir);
						this.e_ktp.setText(line.no_ktp);
						this.e_alamat.setText(line.alamat);
						this.e_kota2.setText(line.kode_kota2);
						this.e_kodepos2.setText(line.kodepos2);
						this.e_alamat2.setText(line.alamat2);
						this.e_kota.setText(line.kode_kota);
						this.e_kodepos.setText(line.kodepos);
						this.e_telp.setText(line.no_telp);
						this.e_hp.setText(line.no_hp);
						this.c_sex.setText(line.sex);
						this.c_gaji.setText(line.flag_gaji);						
						this.e_mail.setText(line.email);
						this.c_gd.setText(line.gol_darah);
						this.e_jamsos.setText(line.no_jamsos);
						this.e_jiwas.setText(line.no_jiwas);
						
						this.e_nik2.setText(line.nik2);
						this.nikTGLama = line.nik2;
						this.stsSDMLama = line.sts_sdm;

						this.e_nik3.setText(line.nik3);

						this.e_npwp.setText(line.npwp);
						this.e_suku.setText(line.suku);
						this.e_ayah.setText(line.ayah);
						this.e_ibu.setText(line.ibu);

						this.e_foto.setText(line.foto);
						this.mDesk.setCode(urldecode(line.jobdesk));
						this.img.setImage(this.uploader.param4+line.foto);
						this.fileBfr = line.foto;
						this.cb_agama.setText(line.sts_agama);
						this.cb_strata.setText(line.kode_strata);
						this.c_nikah.setText(line.sts_pajak);
						this.dp_d2.setText(line.tgl_nikah);
						this.cb_jur.setText(line.kode_jur);
						this.dp_d3.setText(line.tgl_masuk);
					
						this.cb_bank.setText(line.sts_bank);
						this.e_lamaran.setText(line.asal_lamaran);
						this.cb_lok.setText(line.kota_lamaran);						
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.e_univ.setText(line.univ);
						
						this.cb_nip.setText(line.nip);
						
						this.e_iq.setText(line.iq);
						this.e_bpjs.setText(line.no_bpjs);

						this.c_stsnikah.setText(line.sts_nikah);
						
						var data2 = this.dbLib.getDataProvider("select nama from gr_karyawan_fungsi where nik ='"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by kode_fungsi",true);
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sg2.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];		
								this.sg2.appendData([line2.nama]);
							}
						} else this.sg2.clear(1);

						var data3 = this.dbLib.getDataProvider("select nama from gr_karyawan_tugas where nik ='"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by kode_tugas",true);
						if (typeof data3 == "object" && data3.rs.rows[0] != undefined){
							var line3;
							this.sg3.clear();
							for (var i in data3.rs.rows){
								line3 = data3.rs.rows[i];		
								this.sg3.appendData([line3.nama]);
							}
						} else this.sg3.clear(1);



						this.stsSimpan= 0;						
						setTipeButton(tbUbahHapus);
					}
					else{ this.standarLib.clearByTag(this, new Array("1"),undefined);
						  setTipeButton(tbSimpan);
						  this.stsSimpan= 1;
						  this.nikTGLama = "";
						  this.stsSDMLama = "";						  
						  this.sg2.clear(1);
						  this.sg3.clear(1);
					}
				}

				var data = this.dbLib.getDataProvider("select a.nama,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.sts_kel,b.nama as nama_sts,a.sex, "+
													  "       a.nik2,a.flag_hidup,a.flag_kerja,a.flag_tanggung,a.flag_anak,a.ayah,a.ibu "+
				                                      "from gr_keluarga a inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi "+													  
													  "where a.sts_kel<>'0' and  a.nik = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						if (line.tgl_lahir == "01/01/1900") var tglLahir = "-";
						else var tglLahir = line.tgl_lahir;												
						this.sg.appendData([line.nama,line.tempat,tglLahir,line.sts_kel,line.nama_sts,line.sex,line.nik2,line.flag_hidup,line.flag_kerja,line.flag_tanggung,line.flag_anak,line.ayah,line.ibu]);
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

			if (sender == this.cb_sdm && this.cb_sdm.getText()!="") {
				this.cb_kode.setSQL("select nik, nama from gr_karyawan where flag_aktif='0' and sts_sdm='"+this.cb_sdm.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIP","Nama"],"and","Data Karyawan",false);			
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
							
							this.app._mainForm.pesan(2,"Transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert(e);
			}
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
