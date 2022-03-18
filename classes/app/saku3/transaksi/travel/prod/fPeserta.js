window.app_saku3_transaksi_travel_prod_fPeserta = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_prod_fPeserta.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_prod_fPeserta";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jamaah", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,520], childPage:["Daftar Jamaah","Data Jamaah"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:16,tag:9,
		            colTitle:["No Jamaah","ID Jamaah","Nama","Jenis Kelamin","Status","Alamat","Kode Pos","No. Telp","No. HP","Email","Pekerjaan","Rekening","No. Passport","Kantor Migrasi","Status Pemesanan","Emergency Call"],
					colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[200,100,150,120,120,150,150,100,100,80,200,100,100,200,150,80]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Jamaah",maxLength:20,change:[this,"doChange"]});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		this.e_id = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,250,20],caption:"No KTP", multiSelection:false, maxLength:16, tag:2});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,24,250,20],caption:"Nama",tag:2,mustCheck:false});		
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,29,250,20],caption:"Tempat Lahir", maxLength:50, tag:1});					
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[290,29,100,18],caption:"Tgl Lahir", underline:true});	
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[390,29,100,18]});
		this.c_jk = new saiCB(this.pc1.childPage[1],{bound:[20,23,200,20],caption:"Jenis Kelamin",items:["Laki-laki","Perempuan"], readOnly:true,tag:2});	
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Status",items:["Menikah","Belum Menikah"], readOnly:true,tag:2});
		this.e_ibu = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,31,250,20],caption:"Nama Ibu",tag:2,mustCheck:false});		
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,520,20],caption:"Alamat", maxLength:200, tag:1});					
		this.e_kp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Kode Pos", maxLength:50, tag:1});				
		this.e_telp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,27,250,20],caption:"No Telepon", maxLength:50, tag:1});			
		this.e_hp = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,27,250,20],caption:"No HP", maxLength:50, tag:1});			
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,250,20],caption:"Email", maxLength:50, tag:1});					
		this.cb_kerja = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,16,270,20],caption:"Pekerjaan",multiSelection:false,tag:1,change:[this,"doChange"]});		
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,250,20],caption:"Bank", maxLength:50, tag:1});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,17,250,20],caption:"No Rekening", maxLength:50, tag:1});
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,35,250,20],caption:"Cabang", maxLength:50, tag:1});
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,35,250,20],caption:"Nama Rekening", maxLength:50, tag:1});
		this.e_nopass = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,250,20],caption:"No Passpord", maxLength:50, tag:1});
		this.e_issued = new portalui_label(this.pc1.childPage[1],{bound:[20,25,100,20],caption:"Issued", maxLength:50,underline:true ,tag:1});
		this.dp_issued = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,25,100,18]});
		this.l_ex_pass = new portalui_label(this.pc1.childPage[1],{bound:[290,25,100,18],caption:"Expired", underline:true});
		this.dp_ex_pass = new portalui_datePicker(this.pc1.childPage[1],{bound:[390,25,100,18]});
		this.e_ki = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,250,20],caption:"Kantor Imigrasi", maxLength:50, tag:1});
		this.e_ec_telp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,22,250,20],caption:"Telp Emergency", maxLength:50, tag:1});
		this.e_ec_hp = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,22,250,20],caption:"HP Emergency", maxLength:50, tag:1});
		this.c_sp = new saiCB(this.pc1.childPage[1],{bound:[20,14,250,20],caption:"Status Pemesanan",items:["Belum Pernah","Pernah"], readOnly:true,tag:2});
		this.e_th_haj = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Th Haji Terakhir", tag:9});
		this.e_th_um = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,30,200,20],caption:"Umroh Terakhir", maxLength:50, tag:9})
		this.e_foto = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,32,370,20],caption:"Foto", readOnly:true, maxLength:100, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[410,32,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.img = new image(this.pc1.childPage[1],{bound:[700,20,160,180]});
		setTipeButton(tbAllFalse);
	
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_prod_fPeserta.extend(window.childForm);
window.app_saku3_transaksi_travel_prod_fPeserta.implement({
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
					sql.add("insert into dgw_peserta(no_peserta,kode_lokasi,id_peserta,nama,jk,status,alamat,kode_pos,telp,hp,email,pekerjaan,bank,norek,nopass,kantor_mig,sp,ec_telp,ec_hp,issued,ex_pass,tempat,tgl_lahir,th_haji,th_umroh,ibu,foto) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_id.getText()+"','"+this.e_nama.getText()+"','"+this.c_jk.getText()+"','"+this.c_status.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kp.getText()+"','"+this.e_telp.getText()+"','"+this.e_hp.getText()+"','"+this.e_email.getText()+"','"+this.cb_kerja.getText()+"','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_nopass.getText()+"','"+this.e_ki.getText()+"','"+this.c_sp.getText()+"','"+this.e_ec_telp.getText()+"','"+this.e_ec_hp.getText()+"','"+this.dp_issued.getDateString()+"','"+this.dp_ex_pass.getDateString()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_th_haj.getText()+"','"+this.e_th_um.getText()+"','"+this.e_ibu.getText()+"','"+this.e_foto.getText()+"')");
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
					sql.add("delete from dgw_peserta where no_peserta = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into dgw_peserta(no_peserta,kode_lokasi,id_peserta,nama,jk,status,alamat,kode_pos,telp,hp,email,pekerjaan,bank,norek,nopass,kantor_mig,sp,ec_telp,ec_hp,issued,ex_pass,tempat,tgl_lahir,th_haji,th_umroh,ibu,foto) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_id.getText()+"','"+this.e_nama.getText()+"','"+this.c_jk.getText()+"','"+this.c_status.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kp.getText()+"','"+this.e_telp.getText()+"','"+this.e_hp.getText()+"','"+this.e_email.getText()+"','"+this.cb_kerja.getText()+"','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_nopass.getText()+"','"+this.e_ki.getText()+"','"+this.c_sp.getText()+"','"+this.e_ec_telp.getText()+"','"+this.e_ec_hp.getText()+"','"+this.dp_issued.getDateString()+"','"+this.dp_ex_pass.getDateString()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_th_haj.getText()+"','"+this.e_th_um.getText()+"','"+this.e_ibu.getText()+"','"+this.e_foto.getText()+"')");
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
					sql.add("delete from dgw_peserta where no_peserta = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1","9","2"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
					this.pc1.setActivePage(this.pc1.childPage[0]);
				}
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
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.stsSimpan = 1;
			var data = this.dbLib.getDataProvider("select substring(cast(year(getdate()) as varchar),3,2) as tahun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.tahun = line.tahun;
			}
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dgw_peserta","no_peserta",this.tahun,"00000"));
			setTipeButton(tbSimpan);
		}						
		this.cb_kerja.setSQL("select id_pekerjaan, nama from dgw_pekerjaan where kode_lokasi = '"+this.app._lokasi+"'",["id_pekerjaan","nama"],false,["ID Pekerjaan","Nama"],"and","Data Pekerjaan",true);										
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kerja && this.cb_kerja.getText()!="") {			
				var data = this.dbLib.getDataProvider("select id_pekerjaan,nama from dgw_pekerjaan where id_pekerjaan='"+this.cb_kerja.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){	
					var line = data.rs.rows[0];	
				}
			}

			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select nama,id_peserta,jk,status,alamat,kode_pos,telp,hp,email,pekerjaan,bank,norek,nopass,kantor_mig,sp,ec_telp,ec_hp,issued,ex_pass,tempat,tgl_lahir,th_haji,th_umroh,cabang,namarek,ibu, foto from dgw_peserta where no_peserta ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_id.setText(line.id_peserta);
						this.e_nama.setText(line.nama);
						this.c_jk.setText(line.jk);
						this.c_status.setText(line.status);
						this.e_alamat.setText(line.alamat);
						this.e_kp.setText(line.kode_pos);				
						this.e_telp.setText(line.telp);
						this.e_hp.setText(line.hp);				
						this.e_email.setText(line.email);
						this.cb_kerja.setText(line.pekerjaan);						
						this.e_nopass.setText(line.nopass);
						this.e_ki.setText(line.kantor_mig);	
						this.c_sp.setText(line.sp);	
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_namarek.setText(line.namarek);
						this.e_tempat.setText(line.tempat);
						this.dp_d1.setText(line.tgl_lahir);
						this.e_norek.setText(line.norek);
						this.e_ec_telp.setText(line.ec_telp);
						this.e_ec_hp.setText(line.ec_hp);
						this.dp_issued.setText(line.issued);
						this.dp_ex_pass.setText(line.ex_pass);
						this.e_ibu.setText(line.ibu);
						this.e_foto.setText(line.foto);
						this.img.setImage(this.uploader.param4+line.foto);
						this.fileBfr = line.foto;			
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
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_foto.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}																
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							system.info(this,"Data Sukses Tersimpan",".");							
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
		try {			
			var strSQL = "select no_peserta,id_peserta,nama,jk,status,alamat,kode_pos,telp,hp,email,pekerjaan,bank,norek,nopass,kantor_mig,sp,ec_telp,ec_hp from dgw_peserta where kode_lokasi='"+this.app._lokasi+"' order by no_peserta ";								
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
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
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];								
			this.sg1.appendData([line.no_peserta,line.id_peserta,line.nama,line.jk,line.status,line.alamat,line.kode_pos,line.telp,line.hp,line.email,line.pekerjaan,line.bank+" - "+line.norek,line.nopass,line.kantor_mig,line.sp,line.ec_telp+" , "+line.ec_hp]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));					
			}
		} catch(e) 
		{
			alert(e);}
	}
});