window.app_saku3_transaksi_siswa_fSiswa = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fSiswa.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fSiswa";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Siswa", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.cb_pp = new saiCBBL(this,{bound:[20,13,220,20],caption:"Sekolah", readOnly:true, maxLength:10, tag:2});

		this.pc1 = new pageControl(this,{bound:[10,12,1000,430], childPage:["Filter Data", "Daftar Siswa","Data Siswa","Data Keluarga"]});				
		this.cb_akt = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,30,220,20],caption:"Angkatan",multiSelection:false,tag:2});
		this.cb_kelas = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,31,220,20],caption:"Kelas",multiSelection:false,tag:2});
		this.cb_status = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,32,220,20],caption:"Status Siswa",multiSelection:false,tag:2});
		this.bTampil = new button(this.pc1.childPage[0],{bound:[120,14,100,18],caption:"Tampil Data",click:[this,"doLoad"]});			

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["NIS","ID Bank","Nama","Angkatan","Kelas","Status"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,350,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,220,20],caption:"NIS",maxLength:20,change:[this,"doChange"]});
		this.e_id = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,33,220,20],caption:"ID Bank", maxLength:100, tag:1});								
		this.e_nama = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,410,20],caption:"Nama Lengkap", maxLength:100, tag:1});
		this.e_tmplahir = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,220,20],caption:"Tempat Lahir", maxLength:50, tag:1});
		this.l_tgl = new portalui_label(this.pc1.childPage[2],{bound:[250,13,80,18],caption:"Tgl Lahir", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[2],{bound:[330,13,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});														
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,410,20],caption:"Alamat Siswa", maxLength:200, tag:1});
		this.c_jk = new saiCB(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"Jenis Kelamin",items:["LAKI-LAKI","PEREMPUAN"], readOnly:true,tag:2});
		this.c_agama = new saiCB(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"Agama",items:["ISLAM","KRISTEN","BUDHA","HINDU","KHONGHUCU"], readOnly:true,tag:2});
		this.c_kwn = new saiCB(this.pc1.childPage[2],{bound:[20,17,220,20],caption:"Kewarganegaraan",items:["WNI","WNA"], readOnly:true,tag:2});
		this.e_tlpsiswa = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,18,220,20],caption:"Telp Siswa", maxLength:50, tag:1});								
		this.e_hpsiswa = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,23,220,20],caption:"HP Siswa", maxLength:50, tag:1});
		
		this.e_email = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,19,410,20],caption:"Email Siswa", maxLength:50, tag:1});			
		this.cb_akt2 = new saiCBBL(this.pc1.childPage[2],{bound:[520,19,220,20],caption:"Angkatan", multiSelection:false, maxLength:10, tag:1});				
		
		this.e_asal = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,23,410,20],caption:"Asal Sekolah", maxLength:50, tag:1});
		this.cb_kelas2 = new saiCBBL(this.pc1.childPage[2],{bound:[520,23,220,20],caption:"Kelas", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		
		this.e_ijazah = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,24,410,20],caption:"No. Ijazah", maxLength:50, tag:1});
		this.cb_jur2 = new saiCBBL(this.pc1.childPage[2],{bound:[520,24,220,20],caption:"Jurusan", readOnly:true, tag:1});
		
		this.e_bb = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,20,160,20],caption:"Berat Badan", maxLength:50, tag:1});
		this.cb_tingkat2 = new saiCBBL(this.pc1.childPage[2],{bound:[520,20,220,20],caption:"Tingkat", readOnly:true, tag:1});		
		
		this.e_tb = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,21,160,20],caption:"Tinggi Badan", maxLength:50, tag:1});
		this.c_flag2 = new saiCBBL(this.pc1.childPage[2],{bound:[520,21,220,20],caption:"Status", multiSelection:false, maxLength:10, tag:2});
		
		this.c_darah = new saiCB(this.pc1.childPage[2],{bound:[20,22,160,20],caption:"Gol Darah",items:["A","AB","B","O"], readOnly:true,tag:2});
		this.l_tgl3 = new portalui_label(this.pc1.childPage[2],{bound:[520,22,100,18],caption:"Tgl Masuk", underline:true});
		this.e_tmasuk2 = new portalui_datePicker(this.pc1.childPage[2],{bound:[620,22,98,18]});														
		
		this.e_foto = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,32,320,20],caption:"Foto", readOnly:true, maxLength:100, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[2],{bound:[350,32,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.l_tgl3 = new portalui_label(this.pc1.childPage[2],{bound:[520,32,100,18],caption:"Tgl Lulus", underline:true});
		this.e_tlulus2 = new portalui_datePicker(this.pc1.childPage[2],{bound:[620,32,98,18]});														

		this.e_anakke = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,20,160,20],caption:"Anak Ke-", maxLength:50, tag:1});
		this.e_jmlsaud = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,21,160,20],caption:"Jml Saudara", maxLength:50, tag:1});
		this.e_namaayah = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,400,20],caption:"Nama Ayah", maxLength:50, tag:1});
		this.e_namaibu = new saiLabelEdit(this.pc1.childPage[3],{bound:[500,11,400,20],caption:"Nama Ibu", maxLength:50, tag:1});
		this.c_stsayah = new saiCB(this.pc1.childPage[3],{bound:[20,12,200,20],caption:"Status Ayah",items:["KANDUNG","TIRI"], readOnly:true,tag:2});
		this.c_stsibu = new saiCB(this.pc1.childPage[3],{bound:[500,12,200,20],caption:"Status Ibu",items:["KANDUNG","TIRI"], readOnly:true,tag:2});
		this.e_tmplahirayah = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,13,200,20],caption:"Tmp Lahir Ayah", maxLength:50, tag:1});
		this.l_tgl = new portalui_label(this.pc1.childPage[3],{bound:[240,13,80,18],caption:"Tgl Lahir Ayah", underline:true});
		this.dp_d1ayah = new portalui_datePicker(this.pc1.childPage[3],{bound:[320,13,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});														
		this.e_tmplahiribu = new saiLabelEdit(this.pc1.childPage[3],{bound:[500,13,200,20],caption:"Tmp Lahir Ibu", maxLength:50, tag:1});
		this.l_tgl = new portalui_label(this.pc1.childPage[3],{bound:[720,13,80,18],caption:"Tgl Lahir Ibu", underline:true});
		this.dp_d1ibu = new portalui_datePicker(this.pc1.childPage[3],{bound:[800,13,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});														
		this.e_alamatayah = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,14,400,20],caption:"Alamat Ayah", maxLength:200, tag:1});
		this.e_alamatibu = new saiLabelEdit(this.pc1.childPage[3],{bound:[500,14,400,20],caption:"Alamat Ibu", maxLength:200, tag:1});
		this.c_pddayah = new saiCB(this.pc1.childPage[3],{bound:[20,15,200,20],caption:"Pdd Ayah",items:["D3","S1","S2","S3","SMA"], readOnly:true,tag:2});
		this.c_pddibu = new saiCB(this.pc1.childPage[3],{bound:[500,15,200,20],caption:"Pdd Ibu",items:["D3","S1","S2","S3","SMA"], readOnly:true,tag:2});
		this.c_kerjaayah = new saiCB(this.pc1.childPage[3],{bound:[20,16,200,20],caption:"Pekerjaan Ayah",items:["PNS","Pegawai Swasta","Wiraswasta"], readOnly:true,tag:2});
		this.c_kerjaibu = new saiCB(this.pc1.childPage[3],{bound:[500,16,200,20],caption:"Pekerjaan Ibu",items:["PNS","Pegawai Swasta","Wiraswasta"], readOnly:true,tag:2});
		this.e_hasilayah = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,200,20],caption:"Penghasilan Ayah", maxLength:50, tag:1,tipeText:ttNilai, text:"0"});
		this.e_hasilibu = new saiLabelEdit(this.pc1.childPage[3],{bound:[500,17,200,20],caption:"Penghasilan Ibu", maxLength:50, tag:1,tipeText:ttNilai, text:"0"});
		this.e_hpayah = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,18,200,20],caption:"HP Ayah", maxLength:50, tag:1});
		this.e_hpibu = new saiLabelEdit(this.pc1.childPage[3],{bound:[500,18,200,20],caption:"HP Ibu", maxLength:50, tag:1});
		this.e_emailayah = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,19,400,20],caption:"Email Ayah", maxLength:50, tag:1});	
		this.e_emailibu = new saiLabelEdit(this.pc1.childPage[3],{bound:[500,19,400,20],caption:"Email Ibu", maxLength:50, tag:1});			

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
		this.img = new image(this.pc1.childPage[2],{bound:[700,20,160,180]});		

		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);						

			//this.doLoad();	
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);	

			this.cb_akt.setSQL("select kode_akt, nama from sis_angkat where kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);			
			this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas",true);			
			this.cb_status.setSQL("select kode_ss, nama from sis_siswa_status where kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_ss","nama"],false,["Kode","Nama"],"and","Data Siswa",true);			

			this.c_flag2.setSQL("select kode_ss, nama from sis_siswa_status where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_ss","nama"],false,["Kode","Nama"],"and","Data Status",true);
			this.cb_tingkat2.setSQL("select kode_tingkat, nama from sis_tingkat where kode_lokasi='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);
			this.cb_jur2.setSQL("select kode_jur, nama from sis_jur where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);
			this.cb_kelas2.setSQL("select kode_kelas, nama from sis_kelas where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas",true);
			this.cb_akt2.setSQL("select kode_akt, nama from sis_angkat where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' ",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fSiswa.extend(window.childForm);
window.app_saku3_transaksi_siswa_fSiswa.implement({
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
					sql.add("insert into sis_siswa(nis,id_bank,kode_lokasi,nama,kode_status,kode_pp,kode_kelas,kode_akt,agama,jk,tmplahir,tgllahir,kwn,anakke,jsaudara,berat,tinggi,gol_darah,foto,alamat_siswa,tlp_siswa,hp_siswa,email,asal_sekolah,no_ijazah,ayah,ibu,statusayah,statusibu,tmplahir_ayah,tmplahir_ibu,tgllahir_ayah,tgllahir_ibu,alamat_ayah,alamat_ibu,kerja_ayah,kerja_ibu,pdd_ayah,pdd_ibu,hasil_ayah,hasil_ibu,tlp_ayah,tlp_ibu,email_ayah,email_ibu,tanggal,tgl_lulus) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_id.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_status2.getText()+"','"+this.app._kodePP+"','"+this.cb_kelas2.getText()+"','"+this.cb_akt2.getText()+"','"+this.c_agama.getText()+"','"+this.c_jk.getText()+"','"+this.e_tmplahir.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_kwn.getText()+"','"+this.e_anakke.getText()+"','"+this.e_jmlsaud.getText()+"','"+this.e_bb.getText()+"','"+
							this.e_tb.getText()+"','"+this.c_darah.getText()+"','"+this.e_foto.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tlpsiswa.getText()+"','"+this.e_hpsiswa.getText()+"','"+this.e_email.getText()+"','"+this.e_asal.getText()+"','"+this.e_ijazah.getText()+"','"+this.e_namaayah.getText()+"','"+this.e_namaibu.getText()+"','"+this.c_stsayah.getText()+"','"+this.c_stsibu.getText()+"','"+this.e_tmplahirayah.getText()+"','"+this.e_tmplahiribu.getText()+"','"+
							this.dp_d1ayah.getDateString()+"','"+this.dp_d1ibu.getDateString()+"','"+this.e_alamatayah.getText()+"','"+this.e_alamatibu.getText()+"','"+this.c_kerjaayah.getText()+"','"+this.c_kerjaibu.getText()+"','"+this.c_pddayah.getText()+"','"+this.c_pddibu.getText()+"',"+nilaiToFloat(this.e_hasilayah.getText())+","+nilaiToFloat(this.e_hasilibu.getText())+",'"+this.e_hpayah.getText()+"','"+this.e_hpibu.getText()+"','"+this.e_emailayah.getText()+"','"+this.e_emailibu.getText()+"','"+
							this.e_tmasuk2.getDateString()+"','"+this.e_tlulus2.getDateString()+"')");
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
					sql.add("delete from sis_siswa where nis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._lokasi+"' ");						
					sql.add("insert into sis_siswa(nis,id_bank,kode_lokasi,nama,flag_aktif,kode_pp,kode_kelas,kode_akt,agama,jk,tmplahir,tgllahir,kwn,anakke,jsaudara,berat,tinggi,gol_darah,foto,alamat_siswa,tlp_siswa,hp_siswa,email,asal_sekolah,no_ijazah,ayah,ibu,statusayah,statusibu,tmplahir_ayah,tmplahir_ibu,tgllahir_ayah,tgllahir_ibu,alamat_ayah,alamat_ibu,kerja_ayah,kerja_ibu,pdd_ayah,pdd_ibu,hasil_ayah,hasil_ibu,tlp_ayah,tlp_ibu,email_ayah,email_ibu,tanggal,tgl_lulus) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_id.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_flag2.getText()+"','"+this.app._kodePP+"','"+this.cb_kelas2.getText()+"','"+this.cb_akt2.getText()+"','"+this.c_agama.getText()+"','"+this.c_jk.getText()+"','"+this.e_tmplahir.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_kwn.getText()+"','"+this.e_anakke.getText()+"','"+this.e_jmlsaud.getText()+"','"+this.e_bb.getText()+"','"+
							this.e_tb.getText()+"','"+this.c_darah.getText()+"','"+this.e_foto.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tlpsiswa.getText()+"','"+this.e_hpsiswa.getText()+"','"+this.e_email.getText()+"','"+this.e_asal.getText()+"','"+this.e_ijazah.getText()+"','"+this.e_namaayah.getText()+"','"+this.e_namaibu.getText()+"','"+this.c_stsayah.getText()+"','"+this.c_stsibu.getText()+"','"+this.e_tmplahirayah.getText()+"','"+this.e_tmplahiribu.getText()+"','"+
							this.dp_d1ayah.getDateString()+"','"+this.dp_d1ibu.getDateString()+"','"+this.e_alamatayah.getText()+"','"+this.e_alamatibu.getText()+"','"+this.c_kerjaayah.getText()+"','"+this.c_kerjaibu.getText()+"','"+this.c_pddayah.getText()+"','"+this.c_pddibu.getText()+"',"+nilaiToFloat(this.e_hasilayah.getText())+","+nilaiToFloat(this.e_hasilibu.getText())+",'"+this.e_hpayah.getText()+"','"+this.e_hpibu.getText()+"','"+this.e_emailayah.getText()+"','"+this.e_emailibu.getText()+"','"+
							this.e_tmasuk2.getDateString()+"','"+this.e_tlulus2.getDateString()+"')");

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
					sql.add("delete from sis_siswa where nis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._lokasi+"' ");			
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
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :		
				var data = this.dbLib.getDataProvider("select nis from sis_siswa where id_bank ='"+this.e_id.getText()+"' and nis<>'"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						system.alert(this,"Transaksi tidak valid.","ID Bank Duplikasi dengan NIS Lain : "+line.nis);
						return false;						
					}
					else this.simpan();					
				}
				break;		
			case "ubah" :
				var data = this.dbLib.getDataProvider("select nis from sis_siswa where id_bank ='"+this.e_id.getText()+"' and nis <> '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						system.alert(this,"Transaksi tidak valid.","ID Bank Duplikasi dengan NIS Lain : "+line.nis);
						return false;						
					}
					else this.ubah();													
				}		
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{				
			if (sender == this.cb_kelas2 && this.cb_kelas2.getText()!="" && this.cb_pp.getText()!=""){
				var data = this.dbLib.getDataProvider("select kode_tingkat,kode_jur from sis_kelas where flag_aktif='1' and kode_kelas='"+this.cb_kelas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.cb_tingkat.setText(line.kode_tingkat);	
						this.cb_jur.setText(line.kode_jur);											
					}					
				}				
			}

			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from sis_siswa where nis ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_id.setText(line.id_bank);							
						this.e_nama.setText(line.nama);																 
						this.cb_status.setText(line.kode_status);	
						this.e_tmplahir.setText(line.tmplahir);	
						this.dp_d1.setText(line.tgllahir);
						this.e_alamat.setText(line.alamat_siswa);	
						this.c_jk.setText(line.jk);	
						this.c_agama.setText(line.agama);
						this.c_kwn.setText(line.kwn);
						this.e_bb.setText(line.berat);
						this.e_tb.setText(line.tinggi);
						this.c_darah.setText(line.gol_darah);	
						this.e_foto.setText(line.foto);
						this.img.setImage(this.uploader.param4+line.foto);
						this.fileBfr = line.foto;
						this.e_tlpsiswa.setText(line.tlp_siswa);
						this.e_hpsiswa.setText(line.hp_siswa);
						this.e_email.setText(line.email);	
						this.e_asal.setText(line.asal_sekolah);
						this.e_ijazah.setText(line.no_ijazah);
						this.e_anakke.setText(line.anakke);
						this.e_jmlsaud.setText(line.jsaudara);
						this.e_namaayah.setText(line.ayah);
						this.e_namaibu.setText(line.ibu);
						this.c_stsayah.setText(line.statusayah);
						this.e_tmplahirayah.setText(line.tmplahir_ayah);
						this.dp_d1ayah.setText(line.tgllahir_ayah);	
						this.e_alamatayah.setText(line.alamat_ayah);
						this.c_kerjaayah.setText(line.kerja_ayah);
						this.c_pddayah.setText(line.pdd_ayah);	
						this.e_hasilayah.setText(line.hasil_ayah);	
						this.e_hpayah.setText(line.tlp_ayah);
						this.e_emailayah.setText(line.email_ayah);
						this.c_stsibu.setText(line.statusibu);
						this.e_tmplahiribu.setText(line.tmplahir_ibu);
						this.dp_d1ibu.setText(line.tgllahir_ibu);	
						this.e_alamatibu.setText(line.alamat_ibu);
						this.c_kerjaibu.setText(line.kerja_ibu);
						this.c_pddibu.setText(line.pdd_ibu);	
						this.e_hasilibu.setText(line.hasil_ibu);	
						this.e_hpibu.setText(line.tlp_ibu);
						this.e_emailibu.setText(line.email_ibu);	

						this.cb_pp2.setText(line.kode_pp);	
						this.cb_kelas2.setText(line.kode_kelas);
						this.cb_akt2.setText(line.kode_akt);						
						this.c_flag2.setText(line.flag_aktif);						
						this.e_tmasuk2.setText(line.tanggal);
						this.e_tlulus2.setText(line.tgl_lulus);

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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));						
			}
		} catch(e) {alert(e);}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){								
		var strSQL = "select a.nis,a.id_bank,a.nama,b.nama as nama_akt,c.nama as nama_kelas,d.nama as nama_sts "+
					 "from sis_siswa a "+
					 "inner join sis_angkat b on a.kode_akt=b.kode_akt and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join sis_siswa_status d on a.flag_aktif=d.kode_ss and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp = '"+this.app._kodePP+"' and a.kode_kelas = '"+ this.cb_kelas.getText()+"' and a.flag_aktif = '"+ this.cb_status.getText()+"' and a.kode_akt = '"+ this.cb_akt.getText()+"' ";						
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);	
		this.pc1.setActivePage(this.pc1.childPage[1]);			
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.nis,line.id_bank,line.nama,line.nama_akt,line.nama_kelas,line.nama_sts]); 
		}
		this.sg1.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
