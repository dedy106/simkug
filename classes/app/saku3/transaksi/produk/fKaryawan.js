window.app_saku3_transaksi_produk_fKaryawan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fKaryawan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["List Karyawan","Entry Data","PP Tambahan","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:9,
		            colTitle:["NIK","Nama","Band","Jabatan","PP","Status","No Telpon","No HP","Email","Alamat"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[250,150,100,100,100,150,100,70,200,70]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"NIK",maxLength:10,change:[this,"doChange"]});		
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"PP Default", multiSelection:false, maxLength:10, tag:2});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});			
		
		this.e_foto = new saiLabelEdit(this.pc1.childPage[1], {bound:[520,11,300,20], caption:"Foto"});
		this.u_foto = new uploader(this.pc1.childPage[1], {bound:[830,11,80,20],param3: "object", param4 :"server/media/",param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"} )
		this.c_band = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Band",tag:2,mustCheck:false});		
		
		this.e_jabatan = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,400,20],caption:"Jabatan", maxLength:50, tag:1});			
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,24,200,20],caption:"Status",items:["ORGANIK","NON"], readOnly:true,tag:2});
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,400,20],caption:"No Telepon", maxLength:50, tag:1});	
		this.e_hp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,400,20],caption:"No HandPhone", maxLength:50, tag:1});	
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,400,20],caption:"Email", maxLength:50, tag:1});	
		
		this.e_ttd = new saiLabelEdit(this.pc1.childPage[1], {bound:[520,17,300,20], caption:"Tanda Tangan"});
		this.u_ttd = new uploader(this.pc1.childPage[1], {bound:[830,17,80,20],param3: "object", param4 :"server/media/",param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish2"], caption:"Browse"} )

		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,400,20],caption:"Alamat", maxLength:50, tag:1});	
		this.e_kota = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,400,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_pos = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"KodePos", maxLength:5, tag:1});	
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,400,20],caption:"NPWP", maxLength:50, tag:1});			
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,22,400,20],caption:"Bank", maxLength:50, tag:1});	
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,23,400,20],caption:"Cabang", maxLength:50, tag:1});	
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,24,400,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,25,400,20],caption:"Nama Rekening", maxLength:50, tag:1});					
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,26,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[300,80]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});	
		this.bPP = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load PP",click:[this,"doLoadPP"]});

		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,10,200,20],caption:"NIK",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[3],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[3].rearrangeChild(10, 23);		
		this.iFoto = new image(this.pc1.childPage[1], {bound:[620, this.c_band.top, 100,100]});
		this.iTtd = new image(this.pc1.childPage[1], {bound:[620, this.e_alamat.top, 100,100]});
		
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
			this.c_band.items.clear();
			var data = this.dbLib.getDataProvider("select distinct grade as band from karyawan order by grade",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_band.addItem(i,line.band);
				}
			}

			this.dataPP = this.app._pp;
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"where","Data PP",true);
			
			this.doLoad();
			this.fileDest="";
			this.fileDest2="";

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fKaryawan.extend(window.childForm);
window.app_saku3_transaksi_produk_fKaryawan.implement({
	doLoadPP : function() {
		var data = this.dbLib.getDataProvider("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows) {
				line = data.rs.rows[i];						
				this.sg.appendData([line.kode_pp,line.nama]);
			}
		} else this.sg.clear(1);
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
					sql.add("insert into karyawan(nik,kode_lokasi,nama,alamat,jabatan,no_telp,email,kode_pp,npwp,bank,cabang,no_rek,nama_rek,status,grade,kota,kode_pos,no_hp,flag_aktif, foto, ttd) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_jabatan.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.cb_pp.getText()+"','"+this.e_npwp.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.c_jenis.getText()+"','"+this.c_band.getText()+"','"+this.e_kota.getText()+"','"+this.e_pos.getText()+"','"+this.e_hp.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.e_foto.getText()+"','"+this.e_ttd.getText()+"')");					
					
					sql.add("insert into karyawan_pp(nik,kode_lokasi,kode_pp) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(0,i) != this.cb_pp.getText()) {
									sql.add("insert into karyawan_pp(nik,kode_lokasi,kode_pp) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
								}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from karyawan_pp where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into karyawan(nik,kode_lokasi,nama,alamat,jabatan,no_telp,email,kode_pp,npwp,bank,cabang,no_rek,nama_rek,status,grade,kota,kode_pos,no_hp,flag_aktif, foto, ttd) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_jabatan.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.cb_pp.getText()+"','"+this.e_npwp.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.c_jenis.getText()+"','"+this.c_band.getText()+"','"+this.e_kota.getText()+"','"+this.e_pos.getText()+"','"+this.e_hp.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.e_foto.getText()+"','"+this.e_ttd.getText()+"')");					
					
					sql.add("insert into karyawan_pp(nik,kode_lokasi,kode_pp) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(0,i) != this.cb_pp.getText()) {
									sql.add("insert into karyawan_pp(nik,kode_lokasi,kode_pp) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
								}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from karyawan_pp where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.doLoad();					
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
	},
	doChange: function(sender){
		try{						
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select nik, kode_lokasi, nama, alamat, jabatan, no_telp, email, kode_pp, npwp, bank, cabang, no_rek, nama_rek, status, grade, kota, kode_pos, no_hp, flag_aktif, foto, ttd "+
				             "from karyawan "+
						     "where nik ='"+this.cb_kode.getText()+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_jabatan.setText(line.jabatan);
						this.e_tel.setText(line.no_telp);
						this.e_email.setText(line.email);
						this.e_npwp.setText(line.npwp);						
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.c_jenis.setText(line.status);
						this.c_band.setText(line.grade);
						this.e_kota.setText(line.kota);
						this.e_pos.setText(line.kode_pos);
						this.e_hp.setText(line.no_hp);
						
						this.cb_pp.setText(line.kode_pp);						
						
						this.e_foto.setText(trim(line.foto));
						this.iFoto.setImage("server/media/"+trim(line.foto));
						this.fileBfr = line.foto;	
						
						this.e_ttd.setText(trim(line.ttd));
						this.iTtd.setImage("server/media/"+trim(line.ttd));
						this.fileBfr2 = line.ttd;	
						
						if (line.flag_aktif == "0") this.c_status.setText("0. NONAKTIF");
						else this.c_status.setText("1. AKTIF");

						var data = this.dbLib.getDataProvider("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];		
								if (line.kode_pp != this.cb_pp.getText())										
									this.sg.appendData([line.kode_pp,line.nama]);
							}
						} else this.sg.clear(1);
						

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
						try {				
							if (result.toLowerCase().search("error") == -1)	{
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_foto.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
									if (this.fileBfr2 != this.e_ttd.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr2);
								}
								this.fileUtil.copyFileTo(this.rootDir+"/server/tmp/"+this.fileDest.tmpfile, this.rootDir+ "/server/media/"+this.fileDest.filedest, false);
								this.fileUtil.copyFileTo(this.rootDir+"/server/tmp/"+this.fileDest2.tmpfile, this.rootDir+ "/server/media/"+this.fileDest2.filedest, false);
								
								this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");														
								this.app._mainForm.bClear.click();
							}else system.info(this,result,"");
						}
						catch(e) {
							alert(e);
						}
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
		if (this.e_kode2.getText() != "") var filter = " a.nik like '%"+this.e_kode2.getText()+"%' ";
		else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' ";
		var strSQL = "select a.nik,a.nama,a.grade as band,a.jabatan,a.status,a.no_telp,a.no_hp,a.email,a.alamat,a.kode_pp+' - '+b.nama as pp "+
		             "from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and "+filter+"  order by a.nik";		
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
		var strSQL = "select a.nik,a.nama,a.grade as band,a.jabatan,a.status,a.no_telp,a.no_hp,a.email,a.alamat,a.kode_pp+' - '+b.nama as pp "+
		             "from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.nik";		
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
			this.sg1.appendData([line.nik,line.nama,line.band,line.jabatan,line.pp,line.status,line.no_telp,line.no_hp,line.email,line.alamat]); 
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
				this.iFoto.setImage(sender.param2+data.tmpfile);		
				this.iFoto.setProportional(true);
				this.e_foto.setText(trim(data.filedest) );
			}else system.alert(this,"Error upload","");
		}catch(e){
			system.alert(this,"Error upload",e);
		}
	},
	doUploadFinish2: function(sender, result, data, filename){
		try{				
			if (result){			
				this.fileDest2 = data;
				this.iTtd.setImage(sender.param2+data.tmpfile);		
				this.iTtd.setProportional(true);
				this.e_ttd.setText(trim(data.filedest) );
			}else system.alert(this,"Error upload","");
		}catch(e){
			system.alert(this,"Error upload",e);
		}
	},
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    			
		if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode PP "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
});