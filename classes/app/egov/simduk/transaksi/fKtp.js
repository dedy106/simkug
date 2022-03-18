window.app_egov_simduk_transaksi_fKtp = function(owner)
{
	if (owner)
	{
		window.app_egov_simduk_transaksi_fKtp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_egov_simduk_transaksi_fKtp";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kartu Tanda Penduduk: Input/Koreksi", 0);	
		
		uses("portalui_saiCB;portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.cb_kode = new portalui_saiCBB(this,{bound:[20,10,300,20],caption:"No KK",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],maxLength:50,});				
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,11,280,20],caption:"No Dokumen", maxLength:100, readOnly:true});		
		this.e_tanggal = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tanggal Datang", tag:1, readOnly:true});		
		this.e_alamat = new portalui_saiLabelEdit(this,{bound:[20,13,500,20],caption:"Alamat KK", readOnly:true, tag:1});		
		this.e_rt = new portalui_saiLabelEdit(this,{bound:[20,14,150,20],caption:"RT",maxLength:10,tipeText:ttAngka,readOnly:true,tag:1});		
		this.e_rw = new portalui_saiLabelEdit(this,{bound:[220,14,80,20],caption:"RW",maxLength:10,labelWidth:40,tipeText:ttAngka,readOnly:true,tag:1});		
		this.e_kodepos = new portalui_saiLabelEdit(this,{bound:[420,14,100,20],caption:"Kode Pos",maxLength:5,labelWidth:50,tipeText:ttAngka,readOnly:true,tag:1});		
		this.e_telp = new portalui_saiLabelEdit(this,{bound:[20,15,280,20],caption:"No Telepon", maxLength:50, readOnly:true,tag:1});		
		this.e_alamat2 = new portalui_saiLabelEdit(this,{bound:[20,16,500,20],caption:"Alamat Domisili", maxLength:250, tag:1, readOnly:true});		
		this.cb_prop = new portalui_saiCBBL(this,{bound:[20,17,180,20],caption:"Propinsi",btnClick:[this,"doBtnClick"],tag:1, readOnly: true});				
		this.cb_kota = new portalui_saiCBBL(this,{bound:[570,17,180,20],caption:"Kota/Kab.",btnClick:[this,"doBtnClick"],tag:1, readOnly: true});						
		this.cb_kec = new portalui_saiCBBL(this,{bound:[20,18,180,20],caption:"Kecamatan",btnClick:[this,"doBtnClick"],tag:1, readOnly: true});						
		this.cb_kel = new portalui_saiCBBL(this,{bound:[570,18,180,20],caption:"Kelurahan",btnClick:[this,"doBtnClick"],tag:1, readOnly: true});				

		this.cb_ktp = new portalui_saiCBB(this,{bound:[20,19,300,20],caption:"No KTP",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],tag:1,maxLength:50});		
		this.e_dokktp = new portalui_saiLabelEdit(this,{bound:[20,30,280,20],caption:"No Dok KTP", maxLength:50});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,31,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,31,100,18],date:new Date().getDateStr()});
		this.l_tgl2 = new portalui_label(this,{bound:[20,20,100,18],caption:"Tanggal Berlaku", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,20,100,18],date:new Date().getDateStr()});
		this.cb_akte = new portalui_saiCBB(this,{bound:[20,22,300,20],caption:"No Akta Lahir",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],tag:3});		
		this.e_tempat = new portalui_saiLabelEdit(this,{bound:[570,22,300,20],caption:"Tempat Lahir", tag:4, readOnly:true});		
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,23,300,20],caption:"Nama", tag:4, readOnly: true});		
		this.e_jk = new portalui_saiLabelEdit(this,{bound:[770,23,100,20],labelWidth:50,caption:"L/P", tag:4, readOnly:true});		
	    this.e_tgllahir = new portalui_saiLabelEdit(this,{bound:[570,23,180,20],caption:"Tanggal Lahir", tag:4, readOnly:true});		
		this.e_kerja = new portalui_saiLabelEdit(this,{bound:[20,24,300,20],caption:"Pekerjaan", tag:4, readOnly:true});		
		this.e_goldar = new portalui_saiLabelEdit(this,{bound:[570,24,180,20],caption:"Gol. Darah | Rhesus", tag:4, readOnly:true});						
		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_egov_simduk_transaksi_fKtp.extend(window.portalui_childForm);
window.app_egov_simduk_transaksi_fKtp.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,3,4])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into egov_ktp (no_ktp ,no_dok_ktp, nama_ktp, tanggal, tgl_berlaku, gambar, no_akte, tgl_input ,nik_user) values "+
							"                     ('"+this.cb_ktp.getText()+"' ,'"+this.e_dokktp.getText()+"', '-', '"+this.dp_d1.getDateString()+"', '"+this.dp_d2.getDateString()+"','-', '"+this.cb_akte.getText()+"', now() ,'"+this.app._userLog+"')");
					sql.add("update egov_kk_d set nik='"+this.cb_ktp.getText()+"' where no_akte='"+this.cb_akte.getText()+"' and no_kk='"+this.cb_kode.getText()+"' ");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,3,4])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update egov_kk_d set nik='-' where no_akte='"+this.akteLama+"' and no_kk='"+this.cb_kode.getText()+"'");
					sql.add("delete from egov_ktp where no_ktp='"+this.cb_ktp.getText()+"'");
					sql.add("insert into egov_ktp (no_ktp ,no_dok_ktp, nama_ktp, tanggal,tgl_berlaku, gambar, no_akte, tgl_input ,nik_user) values "+
							"                     ('"+this.cb_ktp.getText()+"' ,'"+this.e_dokktp.getText()+"', '-', '"+this.dp_d1.getDateString()+"', '"+this.dp_d2.getDateString()+"','-', '"+this.cb_akte.getText()+"', now() ,'"+this.app._userLog+"')");
					sql.add("update egov_kk_d set nik='"+this.cb_ktp.getText()+"' where no_akte='"+this.cb_akte.getText()+"' and no_kk='"+this.cb_kode.getText()+"' ");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,3,4])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update egov_kk_d set nik='-' where no_akte='"+this.akteLama+"' and no_kk='"+this.cb_kode.getText()+"'");
					sql.add("delete from egov_ktp where no_ktp='"+this.cb_ktp.getText()+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1","3","4"),this.cb_kode);
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
	doLoadData: function(sender){
		try{
			if (sender == this.cb_kode) {
				if (this.cb_kode.getText() != ""){
					var data = this.dbLib.getDataProvider(" select a.no_dok,date_format(a.tgl_datang,'%d/%m/%Y') as tanggal,a.alamat,a.kode_rt,a.kode_rw,a.kode_pos,a.no_telepon,a.alamat_domisili as alamat2,a.kode_kelurahan,b.kode_kecamatan,c.kode_kota,d.kode_propinsi,b.nama as nama_lurah,c.nama as nama_camat,d.nama as nama_kota,e.nama as nama_prop "+
							 "from egov_kk_m a "+
						     "               inner join egov_kelurahan b on a.kode_kelurahan=b.kode_kelurahan "+  
							 "               inner join egov_kecamatan c on b.kode_kecamatan=c.kode_kecamatan "+  
							 "               inner join egov_kota d on c.kode_kota=d.kode_kota "+  
							 "               inner join egov_propinsi e on d.kode_propinsi=e.kode_propinsi "+  
							 "where a.no_kk ='"+this.cb_kode.getText()+"'");
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
						    this.e_dok.setText(line.no_dok);
							this.e_tanggal.setText(line.tanggal);
							this.e_alamat.setText(line.alamat);
							this.e_rt.setText(line.kode_rt);
							this.e_rw.setText(line.kode_rw);
							this.e_kodepos.setText(line.kode_pos);
							this.e_telp.setText(line.no_telepon);
							this.e_alamat2.setText(line.alamat2);
							this.cb_prop.setText(line.kode_propinsi,line.nama_prop);
							this.cb_kota.setText(line.kode_kota,line.nama_kota);
							this.cb_kec.setText(line.kode_kecamatan,line.nama_camat);
							this.cb_kel.setText(line.kode_kelurahan,line.nama_lurah);
						}
					}
				}
			}
			if (sender == this.cb_ktp) {
				if (this.cb_ktp.getText() != ""){
					var data = this.dbLib.getDataProvider("select date_format(a.tgl_berlaku,'%d/%m/%Y') as tanggal,date_format(a.tgl_berlaku,'%d/%m/%Y') as tgl_berlaku,a.no_dok_ktp, "+
					           "           b.no_akte,b.nama,date_format(b.tgl_lahir,'%d/%m/%Y') as tgl_lahir,b.tempat,b.gender,concat(b.gol_darah,' | ',b.rhesus) as goldar,d.nama as nama_kerja "+
							   " from egov_ktp a inner join egov_akte b on a.no_akte=b.no_akte  inner join egov_kk_d c on c.no_akte=b.no_akte inner join egov_pekerjaan d on c.kode_pekerjaan=d.kode_pekerjaan  "+
						       " where a.no_ktp ='"+this.cb_ktp.getText()+"'");
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.e_kerja.setText(line.nama_kerja);
							this.akteLama = line.no_akte;
							this.cb_akte.setText(line.no_akte);
							this.dp_d1.setText(line.tanggal);
							this.dp_d2.setText(line.tgl_berlaku);
							this.e_dokktp.setText(line.no_dok_ktp);
							
							this.e_nama.setText(line.nama);
							this.e_tempat.setText(line.tempat);
							this.e_tgllahir.setText(line.tgl_lahir);
							this.e_jk.setText(line.gender);
							this.e_goldar.setText(line.goldar);
							setTipeButton(tbUbahHapus);
						}
						else{
							setTipeButton(tbSimpan);
						}
					}
				}
			}
			if (sender == this.cb_akte) {
				if (this.cb_akte.getText() != ""){
					var data = this.dbLib.getDataProvider(" select a.nama,date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir,a.tempat,a.gender,concat(a.gol_darah,' | ',a.rhesus) as goldar,c.nama as nama_kerja "+
					           " from egov_akte a inner join egov_kk_d b on a.no_akte=b.no_akte inner join egov_pekerjaan c on b.kode_pekerjaan=c.kode_pekerjaan "+
						       " where a.no_akte ='"+this.cb_akte.getText()+"'");
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
						    this.e_kerja.setText(line.nama_kerja);
							this.e_nama.setText(line.nama);
							this.e_tempat.setText(line.tempat);
							this.e_tgllahir.setText(line.tgl_lahir);
							this.e_jk.setText(line.gender);
							this.e_goldar.setText(line.goldar);
						}
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
				this.standarLib.showListData(this, "Daftar Nomor KK",sender,undefined, 
											  "select a.no_kk, c.nama from egov_kk_m a "+
											  "                       inner join egov_kk_d b on a.no_kk=b.no_kk "+
											  "                       inner join egov_akte c on b.no_akte=c.no_akte where b.kode_hubkel ='HK0' and a.sts_aktif='1'",
											  "select count(a.no_kk)  from egov_kk_m a "+
											  "                       inner join egov_kk_d b on a.no_kk=b.no_kk "+
											  "                       inner join egov_akte c on b.no_akte=c.no_akte where b.kode_hubkel ='HK0' and a.sts_aktif='1'",
											  ["no_kk","nama"],"and",["No KK","Nama Kep. Keluarga"],false);				
				this.standarLib.clearByTag(this, new Array("1","3","4"),undefined);
			}
			if (sender == this.cb_ktp) {   
			    this.standarLib.showListData(this, "Daftar Nomor KTP",sender,undefined, 
											  "select a.no_ktp, b.nama  from egov_ktp a inner join egov_akte b on a.no_akte=b.no_akte inner join egov_kk_d c on b.no_akte=c.no_akte and c.no_kk='"+this.cb_kode.getText()+"'",
											  "select count(a.no_ktp)   from egov_ktp a inner join egov_akte b on a.no_akte=b.no_akte inner join egov_kk_d c on b.no_akte=c.no_akte and c.no_kk='"+this.cb_kode.getText()+"'",
											  ["no_ktp","nama"],"and",["No KTP","Nama"],false);				
				this.standarLib.clearByTag(this, new Array("3","4"),undefined);
			}
			if (sender == this.cb_akte) {   
				if (this.cb_kode.getText() != "") {
				    this.standarLib.showListData(this, "Daftar Nomor Akta Lahir",sender,undefined, 
												  "select a.no_akte, a.nama  from egov_akte a inner join egov_kk_d b on a.no_akte=b.no_akte and b.no_kk='"+this.cb_kode.getText()+"'",
												  "select count(a.no_akte)   from egov_akte a inner join egov_kk_d b on a.no_akte=b.no_akte and b.no_kk='"+this.cb_kode.getText()+"'",
												  ["no_akte","nama"],"and",["No Akta","Nama"],false);				
					this.standarLib.clearByTag(this, new Array("4"),undefined);
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
						if (result.toLowerCase().search("error") == -1)	{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No KK : "+ this.cb_kode.getText()+")");							
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
	}
});