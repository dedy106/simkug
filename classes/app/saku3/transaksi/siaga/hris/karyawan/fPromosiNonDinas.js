window.app_saku3_transaksi_siaga_hris_karyawan_fPromosiNonDinas = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_karyawan_fPromosiNonDinas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_karyawan_fPromosiNonDinas";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Riwayat Non Kedinasan Karyawan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label");
		uses("saiGrid",true);				
		
		this.pc1 = new pageControl(this,{bound:[10,10,1000,550],childPage:["Data Kedinasan","Riwayat Kedinasan"]});
		this.cb_nik = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"ID",maxLength:10,multiSelection:false, change:[this,"doChange"]});
		
		this.e_nik2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"NIK Gratika", tag:1});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,400,20],caption:"Nama", readOnly:true, tag:1});		
		
		this.cb_jabLama = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Jab Eksisting",readOnly:true,tag:1,change:[this,"doChange"]});
		this.e_klpjab = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,300,20],caption:"Kelompok Jabatan", readOnly:true,tag:9});		
		this.cb_dirLama = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Direktorat Eksisting",readOnly:true,tag:1});
		this.cb_deptLama = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Dept Eksisting",readOnly:true,tag:1});
		this.cb_unitLama = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Unit Eksisting",readOnly:true,tag:1});		
		this.e_tglLama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Tgl Berlaku", readOnly:true,tag:9});		

		this.cb_tipe = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Action Type",maxLength:10,multiSelection:false,tag:1,change:[this,"doChange"]});
		this.cb_reason = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Reason For Action",maxLength:10,multiSelection:false,tag:1});
		this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,16,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,16,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		
	//	this.cb_jab = new saiCBBL(this.pc1.childPage[0],{bound:[20,23,220,20],caption:"Jabatan",maxLength:10,multiSelection:false,tag:1,change:[this,"doChange"]});		
		this.cb_jab = new saiCBBL(this.pc1.childPage[0],{bound:[20,23,220,20],caption:"Jabatan",maxLength:10,multiSelection:false,tag:1,change:[this,"doChange"]});		
		this.e_klpjab2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,300,20],caption:"Kelompok Jabatan", readOnly:true,tag:9});		
		this.cb_grade = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Grade",maxLength:10,multiSelection:false,tag:1,change:[this,"doChange"]});
		this.cb_kelas = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Level",maxLength:10,multiSelection:false,tag:1});
		
		this.cb_unit = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"Unit Kerja",maxLength:10,multiSelection:false,tag:1,change:[this,"doChange"]});
		this.cb_dept = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Sub Direktorat",maxLength:10,readOnly:true,tag:1});
		this.cb_dir = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Direktorat",maxLength:10,readOnly:true,tag:1});
		
		this.cb_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Lokasi Kantor",maxLength:10,multiSelection:false,tag:1});
		this.cb_sts = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"Status",maxLength:10,multiSelection:false,tag:1});
		//this.cb_vendor = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Pihak Ketiga",maxLength:10,multiSelection:false,tag:1});

		//field sk ---> no sistem, field no_dok--> no sk manual
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,300,20],caption:"No Surat", maxLength:100, tag:1});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,16,100,18],caption:"Tgl Surat", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,16,98,18]});
		this.e_file = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,450,20],caption:"Path File", readOnly:true, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[0],{bound:[480,19,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc1.childPage[0],{bound:[580,19,80,18],caption:"Lihat File",click:[this,"doLihat"],visible:true});			

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],readOnly:true,colCount:14,tag:9,
				colTitle: ["Tgl Mulai","Tgl Selesai","Action Type","Reason For Action","Jabatan","Lokasi","Grade","Status","Pihak Ketiga","No. Sistem","Flag","No SK","Level","File"],		
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[200,80,100,80,80,200,200,80,200,200,200,200,80,80]],
				readOnly:true,
				dblClick:[this,"doDoubleClick"],
				autoAppend:false,defaultRow:1});
		this.sgn1 =  new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		


		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);					

		setTipeButton(tbSimpan);
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

			
			this.cb_nik.setSQL("select nik, nama, nik2 from gr_karyawan where flag_aktif='0' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","nik2"],false,["ID","Nama","NIK Gratika"],"and","Data Karyawan",true);

			//this.cb_jabLama.setSQL("select kode_so, nama from gr_so where tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_so","nama"],false,["Kode","Nama"],"and","Data Jabatan Lama",true);			
			this.cb_jabLama.setSQL("select a.kode_jab, a.nama, b.nama as nama_klp from gr_jab a inner join gr_klpjab b on a.kode_klpjab=b.kode_klpjab and a.kode_lokasi=b.kode_lokasi where a.flag_aktif = '1' and a.kode_lokasi='"+this.app._lokasi+"' union select '-','-','-' ",["kode_jab","nama","nama_klp"],false,["Kode","Nama","Kelompok"],"and","Data Jabatan Lama",true);
			this.cb_dirLama.setSQL("select kode_dir, nama from gr_dir where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_dir","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);
			this.cb_deptLama.setSQL("select kode_dept, nama from gr_dept where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_dept","nama"],false,["Kode","Nama"],"and","Data Departemen",true);
			this.cb_unitLama.setSQL("select kode_loker, nama from gr_loker where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' union select '-','-'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Unit Kerja",true);

			this.cb_tipe.setSQL("select kode_tipe, nama from gr_action_type where kode_lokasi='"+this.app._lokasi+"'",["kode_tipe","nama"],false,["Kode","Nama"],"and","Data Act Type",true);
			
			//this.cb_jab.setSQL("select kode_so, nama from gr_so where getdate() between tgl_awal and tgl_akhir and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_so","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);
			this.cb_grade.setSQL("select kode_grade, nama from gr_grade where kode_lokasi='"+this.app._lokasi+"'",["kode_grade","nama"],false,["Kode","Nama"],"and","Data Grade",true);						
			this.cb_kota.setSQL("select kode_lokkantor, nama from gr_lokkantor where kode_lokasi='"+this.app._lokasi+"'",["kode_lokkantor","nama"],false,["Kode","Nama"],"and","Data Kota",true);
			this.cb_sts.setSQL("select sts_sdm, nama from gr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",["sts_sdm","nama"],false,["Kode","Nama"],"and","Data Status SDM",true);
			
			//this.cb_vendor.setSQL("select kode_vendor, nama from gr_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			
			//this.cb_jab.setSQL("select kode_jab, nama from gr_jab where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_jab","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);			
			this.cb_jab.setSQL("select a.kode_jab, a.nama, b.nama as nama_klp from gr_jab a inner join gr_klpjab b on a.kode_klpjab=b.kode_klpjab and a.kode_lokasi=b.kode_lokasi where a.flag_aktif = '1' and a.kode_lokasi='"+this.app._lokasi+"' union select '-','-','-' ",["kode_jab","nama","nama_klp"],false,["Kode","Nama","Kelompok"],"and","Data Jabatan Lama",true);
			this.cb_dir.setSQL("select kode_dir, nama from gr_dir where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_dir","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);
			this.cb_dept.setSQL("select kode_dept, nama from gr_dept where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_dept","nama"],false,["Kode","Nama"],"and","Data Departemen",true);
			this.cb_unit.setSQL("select kode_loker, nama from gr_loker where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Unit Kerja",true);


		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_karyawan_fPromosiNonDinas.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_karyawan_fPromosiNonDinas.implement({
	doLihat: function(sender){
		try{			
			if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());						
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					var id = this.standarLib.noBuktiOtomatis(this.dbLib,"gr_dinas","no_sk",this.app._lokasi+"-ID"+this.periode.substr(2,4)+".","0000")
					
					var d = new Date();
					var d1 = d.strToDate(this.dp_d1.getText());
					var d2 = d1.DateSub("d",1);			
					var tglAkhir = d2.getDateStr();
					
					sql.add("update gr_dinas set flag_aktif='0',tgl_akhir='"+tglAkhir+"',flag_seb='"+id+"' where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'");																				

					sql.add("insert into gr_dinas(nik,no_sk,kode_lokasi,kode_loker,kode_grade,kode_vendor,kode_dir,kode_dept,kode_jab,kode_pb,sts_sdm,mk_tahun,mk_bulan,nik_user,tgl_input,flag_aktif,flag_form,  tgl_awal,tgl_akhir,kode_kota,kode_tipe,kode_reason,kode_so,flag_seb, no_dok,kode_kelas, tgl_surat,gambar,nik_tg) values "+
							"('"+this.cb_nik.getText()+"','"+id+"','"+this.app._lokasi+"','"+this.cb_unit.getText()+"','"+this.cb_grade.getText()+"','-','"+this.cb_dir.getText()+"','"+this.cb_dept.getText()+"','"+this.cb_jab.getText()+"','-','"+this.cb_sts.getText()+"',0,0,'"+this.app._userLog+"',getdate(),'1','NONDINAS', '"+this.dp_d1.getDateString()+"','2099-12-31','"+this.cb_kota.getText()+"','"+this.cb_tipe.getText()+"','"+this.cb_reason.getText()+"','-','-','"+this.e_dok.getText()+"','"+this.cb_kelas.getText()+"', '"+this.dp_d2.getDateString()+"','"+this.e_file.getText()+"','"+this.e_nik2.getText()+"')");					

					// if (this.cb_tipe.getText() == "05") vFlagAktif = ", flag_aktif = 'X' ";
					// else vFlagAktif = " ";

					// sql.add("update gr_karyawan set kode_kelas='"+this.cb_kelas.getText()+"', kode_grade='"+this.cb_grade.getText()+"',kode_vendor='-',sts_sdm='"+this.cb_sts.getText()+"',kode_so='-',lok_kantor='"+this.cb_kota.getText()+"' ,kode_dir='"+this.cb_dir.getText()+"',kode_dept='"+this.cb_dept.getText()+"',kode_loker='"+this.cb_unit.getText()+"',kode_jab='"+this.cb_jab.getText()+"' "+vFlagAktif+" "+
					// 		"where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		

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
					
					if (this.cb_tipe.getText() == "05") vFlagAktif = ", flag_aktif = 'X' ";
					else vFlagAktif = " ";

					sql.add("update gr_dinas set nik_tg='"+this.e_nik2.getText()+"',kode_kelas='"+this.cb_kelas.getText()+"',no_dok='"+this.e_dok.getText()+"',kode_grade='"+this.cb_grade.getText()+"',kode_vendor='-',sts_sdm='"+this.cb_sts.getText()+"',kode_so='-',kode_kota='"+this.cb_kota.getText()+"',kode_tipe='"+this.cb_tipe.getText()+"',kode_reason='"+this.cb_reason.getText()+"', kode_dir='"+this.cb_dir.getText()+"',kode_dept='"+this.cb_dept.getText()+"',kode_loker='"+this.cb_unit.getText()+"',kode_jab='"+this.cb_jab.getText()+"',tgl_surat='"+this.dp_d2.getDateString()+"',gambar='"+this.e_file.getText()+"'  "+
							"where no_sk='"+this.no_sk+"' and nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		

					// sql.add("update gr_karyawan set kode_kelas='"+this.cb_kelas.getText()+"',kode_grade='"+this.cb_grade.getText()+"',kode_vendor='-',sts_sdm='"+this.cb_sts.getText()+"',kode_so='-',lok_kantor='"+this.cb_kota.getText()+"',kode_dir='"+this.cb_dir.getText()+"',kode_dept='"+this.cb_dept.getText()+"',kode_loker='"+this.cb_unit.getText()+"',kode_jab='"+this.cb_jab.getText()+"'  "+vFlagAktif+" "+ 
					// 		"where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		

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
					sql.add("update gr_dinas set flag_aktif='1',tgl_akhir='2099-12-31',flag_seb='-' where flag_seb='"+this.no_sk+"' and nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='0'");																				
					
					sql.add("delete from gr_dinas where no_sk = '"+this.no_sk+"' and nik = '"+this.cb_nik.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					
					var strSQL = "select * from gr_dinas where nik='"+ this.cb_nik.getText()+"' and flag_aktif='1' and flag_seb='-' and kode_lokasi='"+this.app._lokasi+"' ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){						
						var line = data.rs.rows[0];							
						if (line != undefined){		
							this.kodeGrade = line.kode_grade;
							this.kodeKelas = line.kode_kelas;
							this.kodeVendor = line.kode_vendor;
							this.stsSdm = line.sts_sdm;
							//this.kodeSo = line.kode_so;
							this.kodeKota = line.kode_kota;						

							this.kodeDir = line.kode_dir;						
							this.kodeDept = line.kode_dept;						
							this.kodeUnit = line.kode_loker;						
							this.kodeJab = line.kode_jab;						
						} 
						
					}	
					// sql.add("update gr_karyawan set kode_kelas='"+this.kodeKelas+"',kode_grade='"+this.kodeGrade+"',kode_vendor='"+this.kodeVendor+"',sts_sdm='"+this.stsSdm+"',kode_so='-',kode_kota='"+this.kodeKota+"', kode_dir='"+this.kodeDir+"',kode_dept='"+this.kodeDept+"',kode_loker='"+this.kodeUnit+"',kode_jab='"+this.kodeJab+"',nik2='"+this.e_nik2.getText()+"' "+
					// 		"where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
								
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_nik);
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :					
				// var strSQL = "select top 1 convert(varchar,tgl_awal,103)  as tgl_mulai "+
				// 		 	 "from gr_dinas "+
				// 			 "where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir and tgl_akhir <> '2099-12-31' ";
				// var data = this.dbLib.getDataProvider(strSQL,true);
				// if (typeof data == "object"){						
				// 	var line = data.rs.rows[0];							
				// 	if (line != undefined){					
				// 		system.alert(this,"Transaksi tidak valid.","Tanggal dalam range riwayat yang lain.");
				// 		return false;
				// 	}
				// 	else this.simpan();
				// }
				// else 
				
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
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = (y+""+m);	
		
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_unit && this.cb_unit.getText()!="") {
				var data = this.dbLib.getDataProvider(
					"select b.kode_dept,b.kode_dir "+
					"from gr_loker a inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_loker='"+ this.cb_unit.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.cb_dept.setText(line.kode_dept);													
						this.cb_dir.setText(line.kode_dir);													
					} 						
				}
			}
			
			if (sender == this.cb_jabLama && this.cb_jabLama.getText()!="") {
				var data = this.dbLib.getDataProvider("select a.*,b.nama as nama_klp from gr_jab a inner join gr_klpjab b on a.kode_klpjab=b.kode_klpjab and a.kode_lokasi=b.kode_lokasi where a.kode_jab='"+ this.cb_jabLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){											
						this.e_klpjab.setText(line.nama_klp);
					} 						
				}
			}

			if (sender == this.cb_jab && this.cb_jab.getText()!="") {
				var data = this.dbLib.getDataProvider("select a.*,b.nama as nama_klp from gr_jab a inner join gr_klpjab b on a.kode_klpjab=b.kode_klpjab and a.kode_lokasi=b.kode_lokasi where a.kode_jab='"+ this.cb_jab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){					
						//var kodeKlpJab = line.kode_klpjab;
						//this.cb_grade.setText(line.kode_grade);			18/03/19	
						this.e_klpjab2.setText(line.nama_klp);									
					} 						
				}	
				//21-11-20 -- ganti this.cb_grade.setSQL("select a.kode_grade, a.nama from gr_grade a inner join gr_klpjab_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi and b.kode_klpjab='"+kodeKlpJab+"' where a.kode_lokasi='"+this.app._lokasi+"'",["kode_grade","nama"],false,["Kode","Nama"],"and","Data Grade",true);						
				this.cb_grade.setSQL("select a.kode_grade, a.nama from gr_grade a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_grade","a.nama"],false,["Kode","Nama"],"and","Data Grade",true);						
			}

			if (sender == this.cb_grade && this.cb_grade.getText()!="") {
				this.cb_kelas.setSQL("select kode_kelas, nama from gr_kelas where kode_grade ='"+this.cb_grade.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas",true);						
			}
			if (sender == this.cb_tipe && this.cb_tipe.getText()!="") {
				this.cb_reason.setSQL("select kode_reason, nama from gr_reason where kode_tipe='"+this.cb_tipe.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_reason","nama"],false,["Kode","Nama"],"and","Data Reason For Action",true);
			}

			if (sender == this.cb_nik){
				if (this.cb_nik.getText() != "") {					
					var data = this.dbLib.getDataProvider("select * from gr_karyawan where nik='"+ this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
					if (typeof data == "object"){						
						var line = data.rs.rows[0];							
						if (line != undefined){					
							this.e_nik2.setText(line.nik2);																		
							this.e_nama.setText(line.nama);																		
							this.cb_sts.setText(line.sts_sdm);	
							this.cb_kota.setText(line.lok_kantor);													
						} 						
					}
					
					var strSQL = "select top 2 convert(varchar,tgl_awal,103)  as tgl_mulai,kode_jab,kode_dir,kode_dept,kode_loker "+
								 "from gr_dinas "+
								 "where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by tgl_awal desc";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){						
						var line = data.rs.rows[0];							
						if (line != undefined){					
							this.cb_jabLama.setText(line.kode_jab);
							this.cb_dirLama.setText(line.kode_dir);
							this.cb_deptLama.setText(line.kode_dept);
							this.cb_unitLama.setText(line.kode_loker);
							
							this.e_tglLama.setText(line.tgl_mulai);							
						} 
						else {							
							this.cb_jabLama.setText("-","-");
							this.cb_dirLama.setText("-","-");
							this.cb_deptLama.setText("-","-");
							this.cb_unitLama.setText("-","-");
							
							this.e_tglLama.setText("-");
						}
					}
					this.doLoad();	
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doLoad: function(sender){			
		var strSQL = "select a.no_dok,a.kode_kelas,a.no_sk,a.tgl_awal,convert(varchar,a.tgl_awal,103) as tgl1,convert(varchar,a.tgl_akhir,103) as tgl2,a.flag_aktif,case when a.gambar = '' then '-' else a.gambar end as gambar "+
					 ",b.kode_tipe+' | '+b.nama as tipe "+
					 ",c.kode_reason+' | '+c.nama as reason "+
					 //",d.kode_so+' | '+d.nama as jabatan "+
					 ",d.kode_jab+' | '+d.nama as jabatan "+
					 ",e.nama as kota "+
					 ",f.kode_grade+' | '+f.nama as grade "+
					 ",g.nama as status_sdm "+
					 ",isnull(h.nama ,'-') as vendor "+
					 "from gr_dinas a "+
					 "		inner join gr_action_type b on a.kode_tipe=b.kode_tipe and a.kode_lokasi=b.kode_lokasi "+
					 "		inner join gr_reason c on a.kode_reason=c.kode_reason and a.kode_lokasi=c.kode_lokasi "+
					 //"		inner join gr_so d on a.kode_so=d.kode_so and a.kode_lokasi=d.kode_lokasi "+
					 "		inner join gr_jab d on a.kode_jab=d.kode_jab and a.kode_lokasi=d.kode_lokasi "+
					 "		inner join gr_lokkantor e on a.kode_kota=e.kode_lokkantor and a.kode_lokasi=e.kode_lokasi "+
					 "		inner join gr_grade f on a.kode_grade=f.kode_grade and a.kode_lokasi=f.kode_lokasi "+
					 "		inner join gr_status_sdm g on a.sts_sdm=g.sts_sdm and a.kode_lokasi=g.kode_lokasi "+
					 "		left join gr_vendor h on a.kode_vendor=h.kode_vendor and a.kode_lokasi=h.kode_lokasi "+
					 "where a.flag_form='NONDINAS' and a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by tgl_awal desc";		

		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	doDoubleClick: function(sender, col , row) {
		try{			
			if (this.sg1.cells(0,row) != "") {		
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				var strSQL = "select * from gr_dinas "+
							 "where no_sk='"+ this.sg1.cells(9,row)+"' and kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.cb_tipe.setText(line.kode_tipe);							
						this.cb_reason.setText(line.kode_reason);							
						//this.cb_jab.setText(line.kode_so);							
						this.cb_jab.setText(line.kode_jab);							
						this.cb_dir.setText(line.kode_dir);							
						this.cb_dept.setText(line.kode_dept);							
						this.cb_unit.setText(line.kode_loker);							

						this.cb_grade.setText(line.kode_grade);							
						this.cb_kelas.setText(line.kode_kelas);							
						this.cb_sts.setText(line.sts_sdm);							
						this.cb_kota.setText(line.kode_kota);							
						//this.cb_vendor.setText(line.kode_vendor);
						this.e_dok.setText(line.no_dok);
						this.no_sk = line.no_sk;	
						
						this.dp_d2.setText(line.tgl_surat);
						this.e_file.setText(line.gambar);
						this.fileBfr = line.gambar;	
					} 
					
				}											
			}
		} catch(e) {alert(e);}
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.tgl1,line.tgl2,line.tipe,line.reason,line.jabatan,line.kota,line.grade,line.status_sdm,line.vendor,line.no_sk,line.flag_aktif,line.no_dok,line.kode_kelas,line.gambar]); 
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
						if (result.toLowerCase().search("error") == -1)					
						{				
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}									
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);

							system.info(this,"Transaksi telah sukses tersimpan (NIK : "+ this.cb_nik.getText()+")","");	
							this.app._mainForm.bClear.click();
							
						}else system.info(this,result,"");
	    			break;
	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});