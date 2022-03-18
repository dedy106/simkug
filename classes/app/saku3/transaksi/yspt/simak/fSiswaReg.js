window.app_saku3_transaksi_yspt_simak_fSiswaReg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_simak_fSiswaReg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_simak_fSiswaReg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pendaftaran Calon Siswa Baru", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.cb_ta = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Tahun Ajaran",multiSelection:false,readOnly:true,tag:2,change:[this,"doChange"]});			
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,17,220,20],caption:"Sekolah", readOnly:true, tag:2,multiSelection:false});
		
		this.pc1 = new pageControl(this,{bound:[1,12,1000,410], childPage:["Daftar Calon Siswa","Data Calon Siswa","Data Orgtua/Wali","Riwayat Kesehatan"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:2,
		            colTitle:["No. Registrasi","Nama","ID Bank"],
					colWidth:[[2,1,0],[150,350,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"ID Registrasi",maxLength:20,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,390,20],caption:"Nama Lengkap", maxLength:100, tag:1});
		this.e_idbank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,390,20],caption:"ID Bank", maxLength:30, tag:1});
		this.e_tmplahir = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Tempat Lahir", maxLength:50, tag:1});
		this.l_tgl = new portalui_label(this.pc1.childPage[1],{bound:[230,13,80,18],caption:"Tgl Lahir", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[310,13,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});														
		this.c_jk = new saiCB(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Jenis Kelamin",items:["LAKI-LAKI","PEREMPUAN"], readOnly:true,tag:2});
		this.c_agama = new saiCB(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Agama",items:["ISLAM","KRISTEN","BUDHA","HINDU","KHONGHUCU"], readOnly:true,tag:2});
		this.c_kwn = new saiCB(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Kewarganegaraan",items:["WNI","WNA"], readOnly:true,tag:2});
		this.e_tlpsiswa = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"Telp Siswa", maxLength:50, tag:1});								
		this.e_hpsiswa = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"HP Siswa", maxLength:50, tag:1});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,390,20],caption:"Alamat Siswa", maxLength:200, tag:1});
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,390,20],caption:"Email Siswa", maxLength:50, tag:1});	
		this.e_asal = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,23,390,20],caption:"Asal Sekolah", maxLength:50, tag:1});
		this.e_ijazah = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,24,390,20],caption:"No. Ijazah", maxLength:50, tag:1});
		this.e_un = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,33,160,20],caption:"Nilai UN Terakhir", maxLength:50, tag:2,tipeText:ttNilai, text:"0"});
		this.e_foto = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,32,300,20],caption:"Foto", readOnly:true, maxLength:100, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[330,32,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		
		this.e_namaayah = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,390,20],caption:"Nama Ayah", maxLength:50, tag:2});
		this.e_alamatayah = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,390,20],caption:"Alamat Ayah", maxLength:200, tag:2});
		this.c_pddayah = new saiCB(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"Pdd Ayah",items:["D3","S1","S2","S3","SMA"], readOnly:true,tag:2});
		this.c_kerjaayah = new saiCB(this.pc1.childPage[2],{bound:[20,27,200,20],caption:"Pekerjaan Ayah",items:["PNS","Pegawai Swasta","Wiraswasta"], readOnly:true,tag:2});
		this.e_hasilayah = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,200,20],caption:"Penghasilan Ayah", maxLength:50, tag:2,tipeText:ttNilai, text:"0"});
		this.e_hpayah = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,200,20],caption:"HP Ayah", maxLength:50, tag:2});
		this.e_emailayah = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,18,390,20],caption:"Email Ayah", maxLength:50, tag:2});	

		this.e_namaibu = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,19,390,20],caption:"Nama Ibu", maxLength:50, tag:2});
		this.e_alamatibu = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,20,390,20],caption:"Alamat Ibu", maxLength:200, tag:2});
		this.c_pddibu = new saiCB(this.pc1.childPage[2],{bound:[20,21,200,20],caption:"Pdd Ibu",items:["D3","S1","S2","S3","SMA"], readOnly:true,tag:2});
		this.c_kerjaibu = new saiCB(this.pc1.childPage[2],{bound:[20,23,200,20],caption:"Pekerjaan Ibu",items:["PNS","Pegawai Swasta","Wiraswasta"], readOnly:true,tag:2});
		this.e_hasilibu = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,24,200,20],caption:"Penghasilan Ibu", maxLength:50, tag:2,tipeText:ttNilai, text:"0"});
		this.e_hpibu = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,25,200,20],caption:"HP Ibu", maxLength:50, tag:2});
		this.e_emailibu = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,26,390,20],caption:"Email Ibu", maxLength:50, tag:2});			

		this.e_namawali = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,19,390,20],caption:"Nama Wali", maxLength:50, tag:2});
		this.e_alamatwali = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,20,390,20],caption:"Alamat Wali", maxLength:200, tag:2});
		this.c_kerjawali = new saiCB(this.pc1.childPage[2],{bound:[20,23,200,20],caption:"Pekerjaan Wali",items:["-","PNS","Pegawai Swasta","Wiraswasta"], readOnly:true,tag:2});
		this.e_hpwali = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,25,200,20],caption:"HP Wali", maxLength:50, tag:2});
		this.e_emailwali = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,26,390,20],caption:"Email Wali", maxLength:50, tag:2});			
		this.e_hub = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,28,390,20],caption:"Hub. dgn Siswa", maxLength:50, tag:2});	

		this.c_darah = new saiCB(this.pc1.childPage[3],{bound:[20,11,160,20],caption:"Gol Darah",items:["A","AB","B","O"], readOnly:true,tag:2});
		this.e_hismed = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,390,20],caption:"Kondisi Kesehatan", maxLength:50, tag:2});
		this.e_hisobat = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,13,390,20],caption:"Dalam Pengobatan", maxLength:50, tag:2});				
		this.e_dokter = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,14,390,20],caption:"Nama Dokter Klg.", maxLength:50, tag:2});
		this.e_tlpdokter = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,200,20],caption:"Telp. Dokter", maxLength:50, tag:2});								

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
		this.img = new image(this.pc1.childPage[1],{bound:[700,20,160,180]});		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();				
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);	
			
			this.doClick();
			this.cb_ta.setSQL("select kode_ta,nama from sis_ta where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_ta","nama"],false,["Kode","Nama"],"and","Data TA",true);
			var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.cb_ta.setText(line3.kode_ta);	
				}
			}
			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_simak_fSiswaReg.extend(window.childForm);
window.app_saku3_transaksi_yspt_simak_fSiswaReg.implement({
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
					sql.add("insert into sis_siswareg(no_reg,kode_ta,kode_pp,tanggal,nama,agama,jk,tmp_lahir,tgl_lahir,kwn,foto,alamat_siswa,tlp_siswa,hp_siswa,email,asal_sek,no_ijazah,nilai_un,nama_ayah,nama_ibu,alamat_ayah,alamat_ibu,kerja_ayah,kerja_ibu,pdd_ayah,pdd_ibu,hasil_ayah,hasil_ibu,hp_ayah,hp_ibu,email_ayah,email_ibu,nama_wali,alamat_wali,kerja_wali,hp_wali,email_wali,hub_wali,gol_darah,kond_kes,kond_obat,dokter_klg,telp_dokter,kode_lokasi,id_bank) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_ta.getText()+"','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nama.getText()+"','"+this.c_agama.getText()+"','"+this.c_jk.getText()+"','"+this.e_tmplahir.getText()+"','"+this.dp_d2.getDateString()+"','"+this.c_kwn.getText()+"','"+this.e_foto.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tlpsiswa.getText()+"','"+this.e_hpsiswa.getText()+"','"+this.e_email.getText()+"','"+this.e_asal.getText()+"','"+this.e_ijazah.getText()+"',"+nilaiToFloat(this.e_un.getText())+",'"+this.e_namaayah.getText()+"','"+this.e_namaibu.getText()+"','"+this.e_alamatayah.getText()+"','"+this.e_alamatibu.getText()+"','"+this.c_kerjaayah.getText()+"','"+this.c_kerjaibu.getText()+"','"+this.c_pddayah.getText()+"','"+this.c_pddibu.getText()+"',"+nilaiToFloat(this.e_hasilayah.getText())+","+nilaiToFloat(this.e_hasilibu.getText())+",'"+this.e_hpayah.getText()+"','"+this.e_hpibu.getText()+"','"+this.e_emailayah.getText()+"','"+this.e_emailibu.getText()+"','"+this.e_namawali.getText()+"','"+this.e_alamatwali.getText()+"','"+this.c_kerjawali.getText()+"','"+this.e_hpwali.getText()+"','"+this.e_emailwali.getText()+"','"+this.e_hub.getText()+"','"+this.c_darah.getText()+"','"+this.e_hismed.getText()+"','"+this.e_hisobat.getText()+"','"+this.e_dokter.getText()+"','"+this.e_tlpdokter.getText()+"','"+this.app._lokasi+"','"+this.e_idbank.getText()+"')");
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
					sql.add("delete from sis_siswareg where no_reg = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' ");			
					sql.add("insert into sis_siswareg(no_reg,kode_ta,kode_pp,tanggal,nama,agama,jk,tmp_lahir,tgl_lahir,kwn,foto,alamat_siswa,tlp_siswa,hp_siswa,email,asal_sek,no_ijazah,nilai_un,nama_ayah,nama_ibu,alamat_ayah,alamat_ibu,kerja_ayah,kerja_ibu,pdd_ayah,pdd_ibu,hasil_ayah,hasil_ibu,hp_ayah,hp_ibu,email_ayah,email_ibu,nama_wali,alamat_wali,kerja_wali,hp_wali,email_wali,hub_wali,gol_darah,kond_kes,kond_obat,dokter_klg,telp_dokter,kode_lokasi,id_bank) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_ta.getText()+"','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nama.getText()+"','"+this.c_agama.getText()+"','"+this.c_jk.getText()+"','"+this.e_tmplahir.getText()+"','"+this.dp_d2.getDateString()+"','"+this.c_kwn.getText()+"','"+this.e_foto.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tlpsiswa.getText()+"','"+this.e_hpsiswa.getText()+"','"+this.e_email.getText()+"','"+this.e_asal.getText()+"','"+this.e_ijazah.getText()+"',"+nilaiToFloat(this.e_un.getText())+",'"+this.e_namaayah.getText()+"','"+this.e_namaibu.getText()+"','"+this.e_alamatayah.getText()+"','"+this.e_alamatibu.getText()+"','"+this.c_kerjaayah.getText()+"','"+this.c_kerjaibu.getText()+"','"+this.c_pddayah.getText()+"','"+this.c_pddibu.getText()+"',"+nilaiToFloat(this.e_hasilayah.getText())+","+nilaiToFloat(this.e_hasilibu.getText())+",'"+this.e_hpayah.getText()+"','"+this.e_hpibu.getText()+"','"+this.e_emailayah.getText()+"','"+this.e_emailibu.getText()+"','"+this.e_namawali.getText()+"','"+this.e_alamatwali.getText()+"','"+this.c_kerjawali.getText()+"','"+this.e_hpwali.getText()+"','"+this.e_emailwali.getText()+"','"+this.e_hub.getText()+"','"+this.c_darah.getText()+"','"+this.e_hismed.getText()+"','"+this.e_hisobat.getText()+"','"+this.e_dokter.getText()+"','"+this.e_tlpdokter.getText()+"','"+this.app._lokasi+"','"+this.e_idbank.getText()+"')");					
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
					sql.add("delete from sis_siswareg where no_reg = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' ");			
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
				
				this.sg1.clear();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.doClick();
				this.doLoad();
	
				break;
			case "simpan" :		
				 this.simpan();					
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
		var period = "";
		if (m < 10) m = "0" + m;			
		this.period = y+""+m;		
	},

	doClick:function(sender){	
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_siswareg","no_reg",this.app._lokasi+"-REG"+this.period.substr(2,4)+".","0000"));
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
	},

	doChange: function(sender){
		try{
			if ((sender == this.cb_ta || this.cb_pp) && this.cb_ta.getText() != "" && this.cb_pp.getText() != "") {	
				var strSQL = "select no_reg, nama,id_bank from sis_siswareg where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' and kode_ta='"+this.cb_ta.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						this.sg1.appendData([line.no_reg,line.nama,line.id_bank]); 						
					}
				} else this.sg1.clear(1);	
			}			
			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from sis_siswareg where no_reg ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);		
						this.e_idbank.setText(line.id_bank);	
						this.e_tmplahir.setText(line.tmp_lahir);	
						this.dp_d2.setText(line.tgl_lahir);
						this.e_alamat.setText(line.alamat_siswa);	
						this.c_jk.setText(line.jk);	
						this.c_agama.setText(line.agama);
						this.c_kwn.setText(line.kwn);	
						this.e_tlpsiswa.setText(line.tlp_siswa);
						this.e_hpsiswa.setText(line.hp_siswa);
						this.e_email.setText(line.email);	
						this.e_asal.setText(line.asal_sek);
						this.e_ijazah.setText(line.no_ijazah);
						this.e_un.setText(line.nilai_un);
						this.e_foto.setText(line.foto);
						this.img.setImage(this.uploader.param4+line.foto);
						this.fileBfr = line.foto;

						this.e_namaayah.setText(line.nama_ayah);
						this.e_namaibu.setText(line.nama_ibu);
						this.e_alamatayah.setText(line.alamat_ayah);
						this.c_kerjaayah.setText(line.kerja_ayah);
						this.c_pddayah.setText(line.pdd_ayah);	
						this.e_hasilayah.setText(line.hasil_ayah);	
						this.e_hpayah.setText(line.hp_ayah);
						this.e_emailayah.setText(line.email_ayah);	
						this.e_alamatibu.setText(line.alamat_ibu);
						this.c_kerjaibu.setText(line.kerja_ibu);
						this.c_pddibu.setText(line.pdd_ibu);	
						this.e_hasilibu.setText(line.hasil_ibu);	
						this.e_hpibu.setText(line.hp_ibu);
						this.e_emailibu.setText(line.email_ibu);
						this.e_namawali.setText(line.nama_wali);
						this.c_kerjawali.setText(line.kerja_wali);
						this.e_alamatwali.setText(line.alamat_wali);
						this.e_hpwali.setText(line.hp_wali);
						this.e_emailwali.setText(line.email_wali);
						this.e_hub.setText(line.hub_wali);

						this.c_darah.setText(line.gol_darah);
						this.e_hismed.setText(line.kond_kes);
						this.e_hisobat.setText(line.kond_obat);
						this.e_dokter.setText(line.dokter_klg);
						this.e_tlpdokter.setText(line.telp_dokter);	

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

	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
			this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},

	doLoad:function(sender){								
		var strSQL = "select no_reg, nama,id_bank from sis_siswareg where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' and kode_ta='"+this.cb_ta.getText()+"' ";		
		
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
			this.sg1.appendData([line.no_reg,line.nama,line.id_bank]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	}, 
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
