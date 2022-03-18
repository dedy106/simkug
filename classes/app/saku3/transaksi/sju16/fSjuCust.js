window.app_saku3_transaksi_sju16_fSjuCust = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fSjuCust.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fSjuCust";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tertanggung Asuransi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,480], childPage:["List Tertanggung","Entry Data","Data Pendukung","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["Segmen","Kode","Nama","Group","Alamat","PIC"],
					colWidth:[[5,4,3,2,1,0],[200,200,200,200,80,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Nama", maxLength:50, tag:1});
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,300,20],caption:"Inisial", maxLength:50, tag:1});		
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"PP Ttg/Segmen", multiSelection:false, maxLength:10, tag:2});		
		this.cb_tagih = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Cust Tagihan", multiSelection:false, maxLength:10, tag:1});
		this.cb_klp = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Group Ttg", multiSelection:false, maxLength:10, tag:2});		
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Various",items:["VARIOUS","NON"], readOnly:true,tag:2});						
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Alamat", maxLength:150, tag:1});	
		this.c_kateg = new saiCB(this.pc1.childPage[1],{bound:[540,11,200,20],caption:"Risk Category",items:["LOW","MEDIUM","HIGH"], readOnly:true,tag:2});				
		this.e_kota = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Kota", maxLength:50, tag:1});	
		this.l_tgl3 = new portalui_label(this.pc1.childPage[1],{bound:[540,12,100,18],caption:"Tgl Update", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[1],{bound:[640,12,98,18]});						
		this.cb1 = new portalui_checkBox(this.pc1.childPage[1],{bound:[750,12,100,25],caption:"Noted",selected:true});
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No Telepon", maxLength:50, tag:1});	
		this.e_fax = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"No Faximile", maxLength:50, tag:1});	
		this.e_usaha = new saiLabelEdit(this.pc1.childPage[1],{bound:[540,14,400,20],caption:"Bidang Usaha", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,300,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_bo = new saiLabelEdit(this.pc1.childPage[1],{bound:[540,15,400,20],caption:"Beneficial Owner", maxLength:50, tag:1});	
		this.e_ktp = new saiLabelEdit(this.pc1.childPage[1],{bound:[325,15,195,20],caption:"KTP", maxLength:50, tag:1,labelWidth:30});			
		this.e_idLain = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,300,20],caption:"ID Lainnya", maxLength:50, tag:1});		
		this.e_noid = new saiLabelEdit(this.pc1.childPage[1],{bound:[325,18,195,20],caption:"No ID", maxLength:50, tag:1,labelWidth:30});		
		this.e_ktpbo = new saiLabelEdit(this.pc1.childPage[1],{bound:[540,18,400,20],caption:"KTP BO", maxLength:50, tag:1});	
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,500,20],caption:"Contact Person", maxLength:50, tag:1});
		this.c_aktif = new saiCB(this.pc1.childPage[1],{bound:[540,16,200,20],caption:"Status Aktif",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});							
		this.e_dep = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,500,20],caption:"Departemen", maxLength:50, tag:1});	
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,500,20],caption:"Email", maxLength:50, tag:1});	
		this.e_nohp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,500,20],caption:"Hand Phone", maxLength:50, tag:1});	
		this.e_fax2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,500,20],caption:"Faximile PIC", maxLength:50, tag:1});	
		this.e_tempatlhr = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,500,20],caption:"Tempat Lahir", maxLength:50, tag:1});	
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggl Lahir/Berdiri", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18]}); 
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[318,11,100,18],caption:"Tgl Tertangg. Aktif", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[418,11,100,18]});
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,
					    colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload","Download"],
					    colWidth:[[4,3,2,1,0],[70,80,480,200,80]], 
						colFormat:[[3,4],[cfUpload,cfButton]], buttonStyle:[[0],[bsEllips]], 
						click:[this,"doSgDL"], colAlign:[[4],[alCenter]],
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[2],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
			colTitle:["namaFile","status"],
			colWidth:[[1,0],[80,180]],
			readOnly: true,autoAppend:false,defaultRow:1});


		this.c_jnscari = new saiCB(this.pc1.childPage[3],{bound:[20,16,200,20],caption:"Filter",items:["DATA","UPDATE"], readOnly:true,tag:2});						
		this.e_kodec = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,19,200,20],caption:"Kode", maxLength:50, tag:9});	
		this.e_namac = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,20,300,20],caption:"Nama", maxLength:50, tag:9});	
		this.e_ini = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,19,200,20],caption:"Inisial", maxLength:50, tag:9});			
		this.bCari = new button(this.pc1.childPage[3],{bound:[120,14,80,18],caption:"Cari Data",click:[this,"doCari"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();
		try {
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();		
			
			this.cb_klp.setSQL("select kode_klp,nama from sju_cust_klp where kode_lokasi = '"+this.app._lokasi+"'",["kode_klp","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);
			this.cb_pp.setSQL("select kode_pp,nama from pp where kode_lokasi = '"+this.app._lokasi+"' and jenis ='SEGMEN'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_tagih.setSQL("select kode_cust,nama from sju_cust where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fSjuCust.extend(window.childForm);
window.app_saku3_transaksi_sju16_fSjuCust.implement({
	doSgDL: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},
	doCari: function() {		
		if (this.e_kodec.getText() == "") var filter = " ";
		else var filter = " and a.kode_cust like '"+this.e_kodec.getText()+"%' ";
		
		if (this.e_namac.getText() == "") var filter = filter + " ";
		else var filter = filter + " and a.nama like '"+this.e_namac.getText()+"%' ";

		if (this.e_ini.getText() == "") var filter = filter + " ";
		else var filter = filter + " and a.inisial like '"+this.e_ini.getText()+"%' ";

		if (this.c_jnscari.getText() == "DATA") {
			var strSQL = "select a.kode_segmen+' - '+ b.nama as pp, a.kode_cust,a.nama,a.kode_klp+' | '+c.nama as klp,a.alamat,a.pic "+
						"from sju_cust a "+
						"     inner join pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"     inner join sju_cust_klp c on a.kode_klp=c.kode_klp and a.kode_lokasi=c.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.kode_cust";		
		}		
		if (this.c_jnscari.getText() == "UPDATE") {
			var strSQL = "select a.kode_segmen+' - '+ b.nama as pp, a.kode_cust,a.nama,a.kode_klp+' | '+c.nama as klp,a.alamat,a.pic "+
						"from sju_cust a "+
						"     inner join pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"     inner join sju_cust_klp c on a.kode_klp=c.kode_klp and a.kode_lokasi=c.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" and datediff(month,a.tgl_update,getdate()) > 23 order by a.kode_cust";		
		}

		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);	
		this.pc1.setActivePage(this.pc1.childPage[0]);	
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
					if (this.cb_tagih.getText() == "-") var kodeTagih = this.cb_kode.getText();
					else kodeTagih = this.cb_tagih.getText();				
					sql.add("insert into sju_cust(kode_cust,kode_lokasi,nama,kode_klp,jenis,  alamat,kota,no_tel,no_fax,npwp,pic,departemen,email,no_hp,no_fax2,alamat2,kode_tagih,kode_group,kode_segmen,inisial, tempat_lahir,tgl_lahir,tgl_aktif,no_ktp, id_lain,no_id, kategori, tgl_update,  usaha,bo,ktp_bo, flag_aktif) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_klp.getText()+"','"+this.c_jenis.getText()+"', '"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_tel.getText()+"','"+this.e_fax.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_dep.getText()+"','"+this.e_email.getText()+"','"+this.e_nohp.getText()+"','"+this.e_fax2.getText()+"','"+this.e_alamat.getText()+"','"+kodeTagih+"','-','"+this.cb_pp.getText()+"','"+this.e_nama2.getText()+"','"+this.e_tempatlhr.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ktp.getText()+"','"+this.e_idLain.getText()+"','"+this.e_noid.getText()+"','"+this.c_kateg.getText()+"','"+this.dp_d2.getDateString()+"', '"+this.e_usaha.getText()+"','"+this.e_bo.getText()+"','"+this.e_ktpbo.getText()+"','"+this.c_aktif.getText().substr(0,1)+"')");					
					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into sju_cust_dok(kode_cust,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
						}	
					}	

					sql.add("insert into sju_cust_update (kode_cust,kode_lokasi,tgl_update,kategori,tgl_input,nik_user) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.dp_d2.getDateString()+"','"+this.c_kateg.getText()+"',getdate(),'"+this.app._userLog+"')");

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
							
					if (this.cb_tagih.getText() == "-") var kodeTagih = this.cb_kode.getText();
					else kodeTagih = this.cb_tagih.getText();

					// for (var i in this.listFiles.objList) {
					// 	var ketemu = false;
					// 	for (var j=0;j < this.sgUpld.getRowCount();j++){
					// 		ketemu = i == this.sgUpld.cells(2,j);
					// 		if (ketemu) break;
					// 	}
					// 	if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
					// }

					sql.add("delete from sju_cust where kode_cust = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_cust_dok where kode_cust='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.cb1.isSelected()) this.tglUpdate = this.dp_d3.getDateString();					
					sql.add("insert into sju_cust(kode_cust,kode_lokasi,nama,kode_klp,jenis,  alamat,kota,no_tel,no_fax,npwp,pic,departemen,email,no_hp,no_fax2,alamat2,kode_tagih,kode_group,kode_segmen,inisial, tempat_lahir,tgl_lahir,tgl_aktif,no_ktp, id_lain,no_id, kategori, tgl_update,   usaha,bo,ktp_bo, flag_aktif) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_klp.getText()+"','"+this.c_jenis.getText()+"', '"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_tel.getText()+"','"+this.e_fax.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_dep.getText()+"','"+this.e_email.getText()+"','"+this.e_nohp.getText()+"','"+this.e_fax2.getText()+"','"+this.e_alamat.getText()+"','"+kodeTagih+"','-','"+this.cb_pp.getText()+"','"+this.e_nama2.getText()+"','"+this.e_tempatlhr.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ktp.getText()+"','"+this.e_idLain.getText()+"','"+this.e_noid.getText()+"','"+this.c_kateg.getText()+"','"+this.tglUpdate+"', '"+this.e_usaha.getText()+"','"+this.e_bo.getText()+"','"+this.e_ktpbo.getText()+"','"+this.c_aktif.getText().substr(0,1)+"')");					
					// var ix=0;
					// for (var i=0;i < this.sgUpld.getRowCount();i++){
					// 	if (this.sgUpld.rowValid(i)){
					// 		ix++;
					// 		sql.add("insert into sju_cust_dok(kode_cust,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
					// 	}	
					// }

					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}			

							ix++;	
							sql.add("insert into sju_cust_dok(kode_cust,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");																		
						}	
					}	

					if (this.cb1.isSelected()) {
						sql.add("insert into sju_cust_update (kode_cust,kode_lokasi,tgl_update,kategori,tgl_input,nik_user) values "+
								"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.dp_d3.getDateString()+"','"+this.c_kateg.getText()+"',getdate(),'"+this.app._userLog+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sju_cust where kode_cust = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_cust_dok where kode_cust='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					for (var i in this.listFiles.objList) {
						var ketemu = false;
						for (var j=0;j < this.sgUpld.getRowCount();j++){
							ketemu = i == this.sgUpld.cells(2,j);
							if (ketemu) break;
						}
						if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.sgUpld.clear(1); this.sgFile.clear();				
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
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from sju_cust where kode_cust ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.e_nama.setText(line.nama);	
						this.e_nama2.setText(line.inisial);	
						this.e_idLain.setText(line.id_lain);
						this.e_noid.setText(line.no_id);																
						this.cb_klp.setText(line.kode_klp);
						this.cb_pp.setText(line.kode_segmen);
						this.cb_tagih.setText(line.kode_tagih);
						this.c_jenis.setText(line.jenis);						
						this.e_alamat.setText(line.alamat);
						this.e_kota.setText(line.kota);
						this.e_tel.setText(line.no_tel);
						this.e_fax.setText(line.no_fax);
						this.e_npwp.setText(line.npwp);
						this.e_ktp.setText(line.no_ktp);
						this.e_pic.setText(line.pic);
						this.e_dep.setText(line.departemen);
						this.e_email.setText(line.email);
						this.e_nohp.setText(line.no_hp);
						this.e_fax2.setText(line.no_fax2);	
						this.e_tempatlhr.setText(line.tempat_lahir);	
						this.dp_d1.setText(line.tgl_lahir);	
						this.dp_d2.setText(line.tgl_aktif);	
						this.dp_d3.setText(line.tgl_update);
						this.tglUpdate = line.tgl_update;						
						this.c_kateg.setText(line.kategori);

						this.e_usaha.setText(line.usaha);
						this.e_bo.setText(line.bo);
						this.e_ktpbo.setText(line.ktp_bo);

						if (line.flag_aktif == "1") this.c_aktif.setText("1. AKTIF");
						else this.c_aktif.setText("0. NONAKTIF");

						this.sgUpld.clear();
						this.sgFile.clear();													
						var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from sju_cust_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
									"where a.kode_cust = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgUpld.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sgFile.appendData([line.no_gambar,"HAPUS"]);
								this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}, "Download"]);
							}
						} else this.sgUpld.clear(1);

						setTipeButton(tbUbahHapus);
						this.cb1.setSelected(false);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
						this.cb1.setSelected(true);
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
				this.cb_kode.setText(this.sg1.cells(1,row));	
			}
		} catch(e) {alert(e);}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
												  "select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and jenis='TERTANGGUNG'",
												  "select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and jenis='TERTANGGUNG'",
												  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
                this.sgUpld.cells(2,row, data.tmpfile);        
				this.sgUpld.cells(4,row, "DownLoad");            
            }
         }catch(e){
            alert(e+" "+data);
         }
    },

	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{

							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}

							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();

							// this.fileUtil.deleteFiles(this.deletedFiles);
							// this.uploadedFiles = "";
							// this.deletedFiles = "";

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
		var strSQL = "select a.kode_segmen+' - '+ b.nama as pp, a.kode_cust,a.nama,a.kode_klp+' | '+c.nama as klp,a.alamat,a.pic "+
		             "from sju_cust a "+
					 "     inner join pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "     inner join sju_cust_klp c on a.kode_klp=c.kode_klp and a.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_cust";		
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
			this.sg1.appendData([line.pp,line.kode_cust,line.nama,line.klp,line.alamat,line.pic]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
