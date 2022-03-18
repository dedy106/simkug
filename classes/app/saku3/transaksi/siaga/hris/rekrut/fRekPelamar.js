window.app_saku3_transaksi_siaga_hris_rekrut_fRekPelamar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_rekrut_fRekPelamar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_rekrut_fRekPelamar";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pelamar dan Keluarga", 0);	
		this.maximize();
		uses("saiCBBL;saiCB;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		try {
			
		    this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"NIP (ID Pelamar)",maxLength:10, readOnly:true, btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		    this.i_gen = new portalui_imageButton(this,{bound:[245,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doGenerate"]});
			this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:145, tag:9});		
			
			this.pc1 = new pageControl(this,{bound:[20,12,1000, 490], childPage:["Data Pelamar","Data Keluarga"]}); 									    
			this.e_tempat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,400,20],caption:"Tempat Lahir", maxLength:50, tag:9});								
			this.l_tgl = new label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tanggal Lahir", underline:true});
			this.dp_d1 = new datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDate"]});			
			this.e_tgllahir = new saiEdit(this.pc1.childPage[0],{bound:[120,13,80,20],tag:9,text:"",maxLength:6,exit:[this,"doExit"]});		
			this.l_tgl2 = new label(this.pc1.childPage[0],{bound:[520,13,100,18],caption:"Tgl Pernikahan", underline:true});
			this.dp_d2 = new datePicker(this.pc1.childPage[0],{bound:[620,13,98,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDate2"]});			
			this.e_tglnikah = new saiEdit(this.pc1.childPage[0],{bound:[620,13,80,20],tag:9,text:"",maxLength:6,exit:[this,"doExit2"]});					
			this.c_nikah = new saiCB(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Status Pajak",readOnly:true,tag:9}); 
			this.e_alamat2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,400,20],caption:"Alamat Tinggal", maxLength:200, tag:9});		
			this.e_ktp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,400,20],caption:"No KTP", maxLength:16, tag:9});		
			this.cb_kota2 = new saiCBBL(this.pc1.childPage[0],{bound:[520,14,220,20],caption:"Kota", multiSelection:false, maxLength:3, tag:9,change:[this,"doChange"]});
			this.cb_agama = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Agama", multiSelection:false, maxLength:10, tag:9, readOnly:true});			
			this.cb_prop2 = new saiCBBL(this.pc1.childPage[0],{bound:[520,15,220,20],caption:"Propinsi", readOnly:true, maxLength:2, tag:9});
			this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,400,20],caption:"Alamat KTP", maxLength:200, tag:9});		
			this.e_kodepos2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,16,200,20],caption:"Kodepos",  maxLength:5, tag:9});					
			this.cb_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Kota", multiSelection:false, maxLength:3, tag:9,change:[this,"doChange"]});
			this.e_npwp = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,17,400,20],caption:"NPWP", maxLength:50, tag:9});		
			this.cb_prop = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Propinsi", readOnly:true, maxLength:2, tag:9});			
			this.e_jamsos = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,18,400,20],caption:"No BPJS TK", maxLength:50, tag:9});					
			this.e_kodepos = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Kodepos",  maxLength:5, tag:9});					
			this.e_bpjs = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,19,400,20],caption:"No BPJS Kes", maxLength:50, tag:9});		
			this.e_telp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,400,20],caption:"No Telpon", maxLength:50, tag:9});				
			this.e_jiwas = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,20,400,20],caption:"No DPLK Jiwasraya", maxLength:50, tag:9});		
			this.e_hp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,400,20],caption:"No HP", maxLength:20, tag:9});		
			this.cb_kotalamar = new saiCBBL(this.pc1.childPage[0],{bound:[520,21,220,20],caption:"Kota Lamaran", multiSelection:false, maxLength:3, tag:9});
			this.c_sex = new saiCB(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"Gender",items:["L","P"], readOnly:true,tag:9});
			this.cb_bank = new saiCBBL(this.pc1.childPage[0],{bound:[520,22,220,20],caption:"Bank", multiSelection:false, maxLength:3, tag:9});
			this.e_mail = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,23,400,20],caption:"Email", maxLength:100, tag:9});		
			this.e_cabang = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,23,400,20],caption:"Cabang", maxLength:50, tag:9});					
			this.c_gd = new saiCB(this.pc1.childPage[0],{bound:[20,24,200,20],caption:"Gol Darah",items:["A","B","AB","O"],tag:9, readOnly:true});			
			this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,24,400,20],caption:"No Rekening", maxLength:50, tag:9});			
			this.e_hobi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,25,400,20],caption:"Hobi", maxLength:100, tag:9});		
			this.c_gaji = new saiCB(this.pc1.childPage[0],{bound:[520,25,200,20],caption:"Status Gaji",items:["","BULANAN","HARIAN"], tag:9, readOnly:true});			
			this.cb_didik = new saiCBBL(this.pc1.childPage[0],{bound:[20,26,220,20],caption:"Pendidikan", multiSelection:false, maxLength:3, tag:9});
			this.e_lamaran = new saiCBBL(this.pc1.childPage[0],{bound:[520,26,220,20],caption:"Asal Lamaran", maxLength:50, tag:9, readOnly:true,
				multiSelection:false,
				sql:["select kode_media, nama from gr_rekrut_media where kode_lokasi = '"+this.app._lokasi+"' union select '','' ",["kode_media","nama"],false, ["Kode","Nama"],"and","Daftar Media Rekruitasi",true]
			});
			this.cb_jur = new saiCBBL(this.pc1.childPage[0],{bound:[20,27,220,20],caption:"Jurusan", multiSelection:false, maxLength:3, tag:9});
			this.e_iq = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,27,200,20],caption:"IQ", maxLength:50, tag:9});										
			this.e_univ = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,28,400,20],caption:"Perguruan Tinggi", maxLength:50, tag:9});		
			this.e_suku = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,28,200,20],caption:"Suku", maxLength:50, tag:9});		
			
			this.e_ipk = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,29,200,20],caption:"IPK", tipeText:ttNilai, text:"0" , maxLength:50, tag:9});		
			this.e_ayah = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,30,400,20],caption:"Nama Ayah", maxLength:50, tag:9});		
			this.e_ibu = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,31,400,20],caption:"Nama Ibu", maxLength:50, tag:9});		
			
			this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,995,this.pc1.height-33],colCount:13,tag:9,
		            colTitle:["Nama","Tmp Lahir","Tgl Lahir","Kd Status","Status Keluarga","Gender","Ayah","Ibu","No KTP",  "Status Hidup","Status Bekerja","Tertanggung Askes","Status Anak"],
					colWidth:[[12,11,10,9,  8,7,6,5,4,3,2,1,0],[100,100,100,100,   100,150,150,80,200,70,80,120,200]],
					columnReadOnly:[true,[3,4,5, 9,10,11,12],[]],
					buttonStyle:[[2,3,5,  9,10,11,12],[bsDate,bsEllips,bsAuto ,bsAuto,bsAuto,bsAuto,bsAuto]], 
					colFormat:[[2],[cfDate]],
					picklist:[[5,  9,10,11,12],[new portalui_arrayMap({items:["L","P"]}),  
					new portalui_arrayMap({items:["Y","T"]}),new portalui_arrayMap({items:["Y","T"]}),
					new portalui_arrayMap({items:["Y","T"]}),new portalui_arrayMap({items:["Y","T"]})
					]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
			this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPager"]});

			this.rearrangeChild(10, 23);
			this.pc1.childPage[0].rearrangeChild(10, 22);
						
			setTipeButton(tbAllFalse);
			this.maximize();		
			this.setTabChildIndex();
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_prop.setSQL("select kode_prov, nama from gr_prov union select '','' ",["kode_prov","nama"],false,["Kode","Nama"],"where","Data Propinsi",true);	
			this.cb_kota.setSQL("select kode_kota, nama from gr_kota union select '',''",["kode_kota","nama"],false,["Kode","Nama"],"where","Data Kota",true);	
			this.cb_didik.setSQL("select kode_strata, nama from gr_strata where kode_lokasi='"+this.app._lokasi+"' union select '',''",["kode_strata","nama"],false,["Kode","Nama"],"and","Data Pendidikan",true);			
			this.cb_jur.setSQL("select kode_jur, nama from gr_jur where kode_lokasi='"+this.app._lokasi+"' union select '',''",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);			
			this.cb_agama.setSQL("select sts_agama, nama from gr_status_agama where kode_lokasi='"+this.app._lokasi+"' union select '',''",["sts_agama","nama"],false,["Kode","Nama"],"and","Data Agama",true);						

			this.cb_prop2.setSQL("select kode_prov, nama from gr_prov union select '','' ",["kode_prov","nama"],false,["Kode","Nama"],"where","Data Propinsi",true);	
			this.cb_kota2.setSQL("select kode_kota, nama from gr_kota union select '',''",["kode_kota","nama"],false,["Kode","Nama"],"where","Data Kota",true);	
			
			this.cb_kotalamar.setSQL("select kode_lokkantor, nama from gr_lokkantor union select '','' ",["kode_lokkantor","nama"],false,["Kode","Nama"],"where","Data Kota",true);	
			this.cb_bank.setSQL("select sts_bank, nama from gr_status_bank where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' union select '',''",["sts_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);									

			var data = this.dbLib.getDataProvider("select substring(cast (year(getdate()) as varchar),3,2) + cast (month(getdate()) as varchar) as periode ",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];		
				this.thnBulan = line.periode;
			}

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

			this.doGenerate();
			this.c_sex.setText("");
			this.c_gd.setText("");
			this.c_nikah.setText("");
			this.c_gaji.setText("");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_rekrut_fRekPelamar.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_rekrut_fRekPelamar.implement({
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
					sql.add("insert into gr_rekrut_pelamar(nip,kode_prov,no_ktp,nama,tempat,tgl_lahir,alamat,kode_kota,kodepos,no_telp,no_hp,sex,email,gol_darah,hobi,kode_strata,jurusan,univ,ipk,flag_terima,flag_progress,kode_lokasi,kode_jur,sts_agama,ayah,ibu,sts_pajak,   tgl_nikah,alamat2,npwp,jamsostek,jiwasraya,kode_kota2,kode_bank,cabang,no_rek,flag_gaji,iq,suku,asal_lamaran,  tgl_input,no_bpjs,kode_kota3,kode_prov2,kodepos2) values "+
							"	('"+this.cb_kode.getText()+"','"+this.cb_prop.getText()+"','"+this.e_ktp.getText()+"','"+this.e_nama.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_alamat.getText()+"','"+this.cb_kota.getText()+"','"+this.e_kodepos.getText()+"','"+this.e_telp.getText()+"','"+this.e_hp.getText()+"','"+this.c_sex.getText()+"','"+this.e_mail.getText()+"','"+this.c_gd.getText()+"','"+this.e_hobi.getText()+"','"+this.cb_didik.getText()+"','-','"+this.e_univ.getText()+"',"+parseNilai(this.e_ipk.getText())+",'0','0','"+this.app._lokasi+"','"+this.cb_jur.getText()+"','"+this.cb_agama.getText()+"','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"','"+this.c_nikah.getText()+"',   '"+
							this.dp_d2.getDateString()+"','"+this.e_alamat2.getText()+"','"+this.e_npwp.getText()+"','"+this.e_jamsos.getText()+"','"+this.e_jiwas.getText()+"','"+this.cb_kotalamar.getText()+"','"+this.cb_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.c_gaji.getText()+"','"+this.e_iq.getText()+"','"+this.e_suku.getText()+"','"+this.e_lamaran.getText()+"',getdate(),'"+this.e_bpjs.getText()+"','"+this.cb_kota2.getText()+"','"+this.cb_prop2.getText()+"','"+this.e_kodepos2.getText()+"')");

					//pelamarnya dimasukan otomtis		
					sql.add("insert into gr_rekrut_keluarga(nip,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi,ayah,ibu,nik2, flag_hidup,flag_kerja,flag_tanggung,flag_anak) values "+  
							"('"+this.cb_kode.getText()+"',99,'"+this.e_nama.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','11','"+this.c_sex.getText()+"','-','"+this.app._lokasi+"','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"','"+this.e_ktp.getText()+"',   'Y','Y','Y','T')");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(2,i) == "-") var tglLahir = "1900-01-01";
								else var tglLahir = this.sg.getCellDateValue(2,i);
								sql.add("insert into gr_rekrut_keluarga(nip,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi,ayah,ibu,nik2, flag_hidup,flag_kerja,flag_tanggung,flag_anak) values "+  
										"('"+this.cb_kode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+tglLahir+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"','-','"+this.app._lokasi+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"'  ,'"+this.sg.cells(9,i)+"','"+this.sg.cells(10,i)+"','"+this.sg.cells(11,i)+"','"+this.sg.cells(12,i)+"')");
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
					var sql = new server_util_arrayList();
					sql.add(" update gr_rekrut_pelamar set kode_prov='"+this.cb_prop.getText()+"',no_ktp='"+this.e_ktp.getText()+"',nama='"+this.e_nama.getText()+"',tempat='"+this.e_tempat.getText()+"',tgl_lahir='"+this.dp_d1.getDateString()+"',alamat='"+this.e_alamat.getText()+"',kode_kota='"+this.cb_kota.getText()+"',kodepos='"+this.e_kodepos.getText()+"',no_telp='"+this.e_telp.getText()+"',no_hp='"+this.e_hp.getText()+"',sex='"+this.c_sex.getText()+"',email='"+this.e_mail.getText()+"',gol_darah='"+this.c_gd.getText()+"',hobi='"+this.e_hobi.getText()+"',kode_strata='"+this.cb_didik.getText()+"',univ='"+this.e_univ.getText()+"',ipk ="+parseNilai(this.e_ipk.getText())+",kode_jur='"+this.cb_jur.getText()+"',sts_agama='"+this.cb_agama.getText()+"',ayah='"+this.e_ayah.getText()+"',ibu='"+this.e_ibu.getText()+"',sts_pajak='"+this.c_nikah.getText()+"', "+
							" tgl_nikah='"+this.dp_d2.getDateString()+"',alamat2='"+this.e_alamat2.getText()+"',npwp='"+this.e_npwp.getText()+"',jamsostek='"+this.e_jamsos.getText()+"',jiwasraya='"+this.e_jiwas.getText()+"',kode_kota2='"+this.cb_kotalamar.getText()+"',kode_bank='"+this.cb_bank.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',flag_gaji='"+this.c_gaji.getText()+"',iq='"+this.e_iq.getText()+"',suku='"+this.e_suku.getText()+"',asal_lamaran='"+this.e_lamaran.getText()+"',no_bpjs='"+this.e_bpjs.getText()+"',kode_kota3='"+this.cb_kota2.getText()+"',kode_prov2='"+this.cb_prop2.getText()+"',kodepos2='"+this.e_kodepos2.getText()+"' "+
							" where nip='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							
					sql.add("delete from gr_rekrut_keluarga where nip = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					//pelamarnya dimasukan otomtis		
					sql.add("insert into gr_rekrut_keluarga(nip,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi,ayah,ibu, flag_hidup,flag_kerja,flag_tanggung,flag_anak) values "+  
							"('"+this.cb_kode.getText()+"',99,'"+this.e_nama.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','11','"+this.c_sex.getText()+"','-','"+this.app._lokasi+"','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"'  ,'Y','Y','Y','T')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								if (this.sg.cells(2,i) == "-") var tglLahir = "1900-01-01";
								else var tglLahir = this.sg.getCellDateValue(2,i);
								sql.add("insert into gr_rekrut_keluarga(nip,no_urut,nama,tempat,tgl_lahir,sts_kel,sex,institusi,kode_lokasi,ayah,ibu,nik2, flag_hidup,flag_kerja,flag_tanggung,flag_anak) values "+  
										"('"+this.cb_kode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+tglLahir+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"','-','"+this.app._lokasi+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"'  ,'"+this.sg.cells(9,i)+"','"+this.sg.cells(10,i)+"','"+this.sg.cells(11,i)+"','"+this.sg.cells(12,i)+"')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_rekrut_pelamar where nip = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from gr_rekrut_keluarga where nip = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
				if (this.e_tgllahir.getText() == "") this.dp_d1.setText("01/01/1900");
				if (this.e_tglnikah.getText() == "") this.dp_d2.setText("01/01/1900");
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				if (this.e_tgllahir.getText() == "") this.dp_d1.setText("01/01/1900");
				if (this.e_tglnikah.getText() == "") this.dp_d2.setText("01/01/1900");
				this.ubah();
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
	doSelectDate2: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_tglnikah.setText(d+"/"+m+"/"+y);				
		if (this.e_tglnikah.getText() == "01/01/1900" || this.e_tglnikah.getText() == "1/01/1900") this.e_tglnikah.setText("");
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
			this.dp_d1.setText(tglFormat);
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				this.standarLib.clearByTag(this, new Array("1"),undefined);
				var data = this.dbLib.getDataProvider(
						   "select a.kode_prov,b.nama as nama_prov,a.no_ktp,a.nama,a.tempat,a.tgl_lahir,a.alamat,a.kode_kota,a.kodepos,a.no_telp,a.no_hp,a.sex,a.email,a.gol_darah,a.hobi,a.kode_strata,a.jurusan,a.univ,a.ipk,a.kode_jur,a.sts_agama,a.ayah,a.ibu,a.sts_pajak, "+
						   "tgl_nikah,alamat2,npwp,jamsostek,jiwasraya,kode_kota2,kode_bank,cabang,no_rek,flag_gaji,iq,suku,asal_lamaran,kode_kota3,kode_prov2,kodepos2 "+
				           "from gr_rekrut_pelamar a "+
						   "left join gr_prov b on a.kode_prov=b.kode_prov "+
						   "left join gr_kota c on a.kode_kota=c.kode_kota and a.kode_lokasi=c.kode_lokasi "+
						   "where a.nip='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_prop.setText(line.kode_prov,line.nama_prov);
						this.e_nama.setText(line.nama);
						this.e_tempat.setText(line.tempat);
						this.dp_d1.setText(line.tgl_lahir);
						this.c_nikah.setText(line.sts_pajak);
						this.e_ktp.setText(line.no_ktp);
						this.cb_agama.setText(line.sts_agama);
						this.e_alamat.setText(line.alamat);
						this.e_ayah.setText(line.ayah);
						this.e_ibu.setText(line.ibu);
						this.cb_kota.setText(line.kode_kota);
						this.e_kodepos.setText(line.kodepos);
						this.e_telp.setText(line.no_telp);
						this.e_hp.setText(line.no_hp);
						this.c_sex.setText(line.sex);
						this.e_mail.setText(line.email);
						this.c_gd.setText(line.gol_darah);
						this.e_hobi.setText(line.hobi);
						this.cb_didik.setText(line.kode_strata);
						this.cb_jur.setText(line.kode_jur);
						this.e_univ.setText(line.univ);
						this.e_ipk.setText(floatToNilai(line.ipk));
						this.cb_kota2.setText(line.kode_kota3);
						this.cb_prop2.setText(line.kode_prov2);
						this.e_kodepos2.setText(line.kodepos2);

						this.dp_d2.setText(line.tgl_nikah);
						this.e_alamat2.setText(line.alamat2);
						this.e_npwp.setText(line.npwp);
						this.e_jamsos.setText(line.jamsostek);
						this.e_bpjs.setText(line.no_bpjs);
						this.e_jiwas.setText(line.jiwasraya);

						this.cb_kotalamar.setText(line.kode_kota2);
						this.cb_bank.setText(line.kode_bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.c_gaji.setText(line.flag_gaji);
						this.e_iq.setText(line.iq);
						this.e_suku.setText(line.suku);
						this.e_lamaran.setText(line.asal_lamaran);
						
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}			

				//pelamar tidak di load
				var data = this.dbLib.getDataProvider("select a.nama,a.tempat,case when a.tgl_lahir<>'1900-01-01' then convert(varchar,a.tgl_lahir,103) else '-' end as tgl_lahir,a.sts_kel,b.nama as nama_sts,a.sex,a.institusi,a.ayah,a.ibu,a.nik2,  a.flag_hidup,a.flag_kerja,a.flag_tanggung,a.flag_anak "+
				                                      "from gr_rekrut_keluarga a inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi "+
													  "where a.nip = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.sts_kel<>'11' order by no_urut ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];				
						if (line.tgl_lahir == "01/01/1900") var tglLahir = "-";
						else var tglLahir = line.tgl_lahir;			
						this.sg.appendData([line.nama,line.tempat,tglLahir,line.sts_kel,line.nama_sts,line.sex,line.ayah,line.ibu,line.nik2, line.flag_hidup,line.flag_kerja,line.flag_tanggung,line.flag_anak ]);
					}
				} else this.sg.clear(1);
			}

			if (sender == this.cb_kota && this.cb_kota.getText() != ""){
				var data = this.dbLib.getDataProvider(
							"select kode_prov from gr_kota where kode_kota='"+this.cb_kota.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_prop.setText(line.kode_prov);
					}
				}
			}	
			if (sender == this.cb_kota2 && this.cb_kota2.getText() != ""){
				var data = this.dbLib.getDataProvider(
							"select kode_prov from gr_kota where kode_kota='"+this.cb_kota2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_prop2.setText(line.kode_prov);
					}
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Pelamar",sender,undefined, 
											  "select nip, nama  from gr_rekrut_pelamar where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nip) from gr_rekrut_pelamar where kode_lokasi='"+this.app._lokasi+"'",
											  ["nip","nama"],"and",["NIP","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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
	},
	doGenerate:function(sender){
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_rekrut_pelamar","nip","P"+this.thnBulan,"000"));
		this.e_nama.setFocus();
	}
});
