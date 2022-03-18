window.app_saku3_transaksi_spro_fKaryawanTelU = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spro_fKaryawanTelU.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spro_fKaryawanTelU";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
		uses("saiGrid",true);		
		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,10,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Karyawan","Data Karyawan","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:9,
		            colTitle:["NIK","Nama","Band","Jabatan","PP","Status","No Telpon","No HP","Email","Alamat"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[250,150,100,100,100,150,100,70,200,70]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"NIK",maxLength:10,change:[this,"doChange"]});		
		this.cb_lokbaru = new saiCBBL(this.pc1.childPage[1],{bound:[520,10,220,20],caption:"Lokasi Baru", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});			
		this.e_foto = new saiLabelEdit(this.pc1.childPage[1], {bound:[520,11,200,20], caption:"Foto"});
		this.u_foto = new uploader(this.pc1.childPage[1], {bound:[720,11,80,20],param3: "object", param4 :"server/media/",param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"} )
		this.c_band = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Band",tag:2,mustCheck:false});		

		this.e_jab = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,400,20],caption:"Jabatan", maxLength:50, tag:1});	

		this.cb_jab1 = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Jabatan 1", multiSelection:false, maxLength:10, tag:2});	
		this.cb_jab2 = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Jabatan 2", multiSelection:false, maxLength:10, tag:2});	

		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,24,200,20],caption:"Status",items:["ORGANIK","NON"], readOnly:true,tag:2});
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,400,20],caption:"No Telepon", maxLength:50, tag:1});	
		this.e_hp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,400,20],caption:"No HandPhone", maxLength:50, tag:1});	
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,400,20],caption:"Email", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,400,20],caption:"Alamat", maxLength:50, tag:1});	
		this.e_kota = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,400,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_pos = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"KodePos", maxLength:5, tag:1});	
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,400,20],caption:"NPWP", maxLength:50, tag:1});			
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,22,400,20],caption:"Bank", maxLength:50, tag:1});	
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,22,400,20],caption:"Cabang", maxLength:50, tag:1});	
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,24,400,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,24,400,20],caption:"Nama Rekening", maxLength:50, tag:1});					
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_ppbaru = new saiCBBL(this.pc1.childPage[1],{bound:[520,15,220,20],caption:"PP Baru", multiSelection:false, maxLength:10, tag:2});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,26,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});
		this.c_status2 = new saiCB(this.pc1.childPage[1],{bound:[230,26,190,20],caption:"Status SPPD",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2, labelWidth:90});
		this.c_panjar = new saiCB(this.pc1.childPage[1],{bound:[20,27,200,20],caption:"Diijinkan Panjar",items:["1. YA","0. TIDAK"], readOnly:true,tag:2});
		this.cb_unit = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Unit", multiSelection:false, maxLength:10, tag:2});	

		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"NIK",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		this.iFoto = new image(this.pc1.childPage[1], {bound:[620, this.c_band.top, 200,220]});
		
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
			this.doLoad();	
			
			this.cb_unit.setSQL("select kode_unit,nama from sp_unit where kode_lokasi='"+this.app._lokasi+"'",["kode_unit","nama"],false,["Kode","Nama"],"and","Data Unit",true);			

			this.cb_lokasi.setSQL("select kode_lokasi,nama from lokasi where flag_konsol='0' and kode_lokasi='"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);			
			this.cb_lokbaru.setSQL("select kode_lokasi,nama from lokasi where flag_konsol='0' and kode_lokasi='"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);			
			this.c_band.items.clear();
			var data = this.dbLib.getDataProvider("select kode_band as band from sp_grade order by kode_band",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_band.addItem(i,line.band);
				}
			}
			this.cb_lokasi.setText(this.app._lokasi);

			this.cb_jab1.setSQL("select kode_jab,nama from sp_jab where kode_lokasi='"+this.app._lokasi+"'",["kode_jab","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);			
			this.cb_jab2.setSQL("select kode_jab,nama from sp_jab where kode_lokasi='"+this.app._lokasi+"'",["kode_jab","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spro_fKaryawanTelU.extend(window.childForm);
window.app_saku3_transaksi_spro_fKaryawanTelU.implement({
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
					sql.add("insert into karyawan(nik,kode_lokasi,nama,alamat,jabatan,no_telp,email,kode_pp,npwp,bank,cabang,no_rek,nama_rek,status,grade,kota,kode_pos,no_hp,flag_aktif, foto,sts_pj,  kode_jab,kode_jab2, kode_unit, flag_sppd) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_jab.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.cb_pp.getText()+"','"+this.e_npwp.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.c_jenis.getText()+"','"+this.c_band.getText()+"','"+this.e_kota.getText()+"','"+this.e_pos.getText()+"','"+this.e_hp.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.e_foto.getText()+"','"+this.c_panjar.getText().substr(0,1)+"',  '"+this.cb_jab1.getText()+"','"+this.cb_jab2.getText()+"','"+this.cb_unit.getText()+"','"+this.c_status2.getText().substr(0,1)+"')");					
					sql.add("insert into karyawan_pp(nik,kode_lokasi,kode_pp) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"')");
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
					sql.add("delete from karyawan where nik = '"+this.cb_kode.getText()+"'");
					sql.add("delete from karyawan_pp where nik = '"+this.cb_kode.getText()+"'");

					sql.add("insert into karyawan(nik,kode_lokasi,nama,alamat,jabatan,no_telp,email,kode_pp,npwp,bank,cabang,no_rek,nama_rek,status,grade,kota,kode_pos,no_hp,flag_aktif, foto,sts_pj,   kode_jab,kode_jab2, kode_unit,flag_sppd) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_jab.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.cb_pp.getText()+"','"+this.e_npwp.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.c_jenis.getText()+"','"+this.c_band.getText()+"','"+this.e_kota.getText()+"','"+this.e_pos.getText()+"','"+this.e_hp.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.e_foto.getText()+"','"+this.c_panjar.getText().substr(0,1)+"',  '"+this.cb_jab1.getText()+"','"+this.cb_jab2.getText()+"','"+this.cb_unit.getText()+"','"+this.c_status2.getText().substr(0,1)+"')");					
					sql.add("insert into karyawan_pp(nik,kode_lokasi,kode_pp) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"')");
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
					sql.add("delete from karyawan where nik = '"+this.cb_kode.getText()+"'");
					sql.add("delete from karyawan_pp where nik = '"+this.cb_kode.getText()+"'");
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
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_pp && this.cb_pp.getText() != "") {	
				this.cb_ppbaru.setText(this.cb_pp.getText());
			}
			if (sender == this.cb_lokbaru && this.cb_lokbaru.getText() != "") {	
				this.cb_ppbaru.setText("","");
				this.cb_ppbaru.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.cb_lokbaru.getText()+"' ",["kode_pp","nama"],false,["Kode","Nama"],"where","Data PP",true);
			}
			if (sender == this.cb_lokasi && this.cb_lokasi.getText() != "") {	
				this.cb_pp.setText("","");
				this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.cb_lokasi.getText()+"' ",["kode_pp","nama"],false,["Kode","Nama"],"where","Data PP",true);
				this.doLoad();
			}
	
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * "+
				             "from karyawan "+
						     "where nik ='"+this.cb_kode.getText()+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_jab.setText(line.jabatan);
						
						this.cb_jab1.setText(line.kode_jab);
						this.cb_jab2.setText(line.kode_jab2);
						this.cb_unit.setText(line.kode_unit);

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
						
						this.cb_lokbaru.setText(line.kode_lokasi);						
						this.cb_pp.setText(line.kode_pp);						
						this.cb_ppbaru.setText(line.kode_pp);	
						this.e_foto.setText(trim(line.foto));
						this.iFoto.setImage("server/media/"+trim(line.foto));
						
						if (line.flag_aktif == "0") this.c_status.setText("0. NONAKTIF");
						else this.c_status.setText("1. AKTIF");

						if (line.flag_sppd == "0") this.c_status2.setText("0. NONAKTIF");
						else this.c_status2.setText("1. AKTIF");

						if (line.sts_pj == "0") this.c_panjar.setText("0. TIDAK");
						else this.c_panjar.setText("1. YA");
						
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
							this.fileUtil.copyFileTo(this.rootDir+"/server/tmp/"+this.fileDest.tmpfile, this.rootDir+ "/server/media/"+this.fileDest.filedest, false);
							
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
					 "where a.status<>'CLIENT' and "+filter+"  order by a.nik";		
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
					 "where a.status<>'CLIENT' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.nik";		
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
				this.iFoto.setImage(sender.param2+data.tmpfile);//,this.rootDir+"/"+sender.param2+urldecode(data));			
				this.iFoto.setProportional(true);
				this.e_foto.setText(trim(data.filedest) );
			}else system.alert(this,"Error upload","");
		}catch(e){
			system.alert(this,"Error upload",e);
		}
	}
});