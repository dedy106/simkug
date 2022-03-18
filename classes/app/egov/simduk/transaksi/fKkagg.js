window.app_egov_simduk_transaksi_fKkagg = function(owner)
{
	if (owner)
	{
		window.app_egov_simduk_transaksi_fKkagg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_egov_simduk_transaksi_fKkagg";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kartu Keluarga Anggota: Input/Koreksi", 0);	
		
		uses("portalui_saiCB;portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.cb_kode = new portalui_saiCBB(this,{bound:[20,10,300,20],caption:"No KK",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],maxLength:50,});				
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,11,280,20],caption:"No Dokumen", maxLength:100, readOnly: true});		
		this.e_tanggal = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tanggal Datang", tag:1, readOnly:true});		
		this.e_alamat = new portalui_saiLabelEdit(this,{bound:[20,13,500,20],caption:"Alamat KK", readOnly:true, tag:1});		
		this.e_rt = new portalui_saiLabelEdit(this,{bound:[20,14,150,20],caption:"RT",maxLength:10,tipeText:ttAngka,readOnly:true,tag:1});		
		this.e_rw = new portalui_saiLabelEdit(this,{bound:[220,14,80,20],caption:"RW",maxLength:10,labelWidth:40,tipeText:ttAngka,readOnly:true,tag:1});		
		this.e_kodepos = new portalui_saiLabelEdit(this,{bound:[420,14,100,20],caption:"Kode Pos",maxLength:5,labelWidth:50,tipeText:ttAngka,readOnly:true,tag:1});		
		this.e_telp = new portalui_saiLabelEdit(this,{bound:[20,15,280,20],caption:"No Telepon", maxLength:50, readOnly:true,tag:1});		
		this.e_alamat2 = new portalui_saiLabelEdit(this,{bound:[20,16,500,20],caption:"Alamat Domisili", maxLength:250, readOnly:true, tag:1});		
		this.cb_prop = new portalui_saiCBBL(this,{bound:[20,17,180,20],caption:"Propinsi",btnClick:[this,"doBtnClick"],tag:1, readOnly: true});				
		this.cb_kota = new portalui_saiCBBL(this,{bound:[570,17,180,20],caption:"Kota/Kab.",btnClick:[this,"doBtnClick"],tag:1, readOnly: true});						
		this.cb_kec = new portalui_saiCBBL(this,{bound:[20,18,180,20],caption:"Kecamatan",btnClick:[this,"doBtnClick"],tag:1, readOnly: true});						
		this.cb_kel = new portalui_saiCBBL(this,{bound:[570,18,180,20],caption:"Kelurahan",btnClick:[this,"doBtnClick"],tag:1, readOnly: true});				
		
		this.cb_akte = new portalui_saiCBB(this,{bound:[20,21,300,20],caption:"No Akta Lahir",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],tag:1});		
		this.cb_hubkel = new portalui_saiCBBL(this,{bound:[20,22,180,20],caption:"Hubungan Keluarga",btnClick:[this,"doBtnClick"],tag:2});						
		this.e_tempat = new portalui_saiLabelEdit(this,{bound:[570,22,300,20],caption:"Tempat Lahir", tag:3, readOnly:true});		
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,23,300,20],caption:"Nama", tag:3, readOnly:true});		
		this.e_jk = new portalui_saiLabelEdit(this,{bound:[770,23,100,20],labelWidth:50,caption:"L/P", tag:3, readOnly:true});		
	    this.e_tgllahir = new portalui_saiLabelEdit(this,{bound:[570,23,180,20],caption:"Tanggal Lahir", tag:3, readOnly:true});		
		this.e_ayah = new portalui_saiLabelEdit(this,{bound:[20,25,300,20],caption:"Nama Ayah", tag:3, readOnly:true});		
		this.e_ibu = new portalui_saiLabelEdit(this,{bound:[570,25,300,20],caption:"Nama Ibu", tag:3, readOnly:true});				
		this.cb_agama = new portalui_saiCBBL(this,{bound:[20,26,180,20],caption:"Agama",btnClick:[this,"doBtnClick"],tag:1});				
		this.e_goldar = new portalui_saiLabelEdit(this,{bound:[570,26,180,20],caption:"Gol. Darah | Rhesus", tag:3, readOnly:true});				
		this.cb_pddk = new portalui_saiCBBL(this,{bound:[20,27,180,20],caption:"Tk. Pendidikan",btnClick:[this,"doBtnClick"],tag:1});				
		this.e_pddk = new portalui_saiLabelEdit(this,{bound:[570,27,300,20],caption:"Ket. Pendidikan", tag:3});		
		this.cb_kerja = new portalui_saiCBBL(this,{bound:[20,28,180,20],caption:"Pekerjaan",btnClick:[this,"doBtnClick"],tag:1});				
		this.e_kerja = new portalui_saiLabelEdit(this,{bound:[570,28,300,20],caption:"Ket. Pekerjaan", tag:3});		
		this.cb_wn = new portalui_saiCBBL(this,{bound:[20,29,180,20],caption:"Kewarganegaraan",btnClick:[this,"doBtnClick"],tag:1});				
		this.cb_status = new portalui_saiCB(this,{bound:[570,29,180,20],caption:"Status Perkawinan",items:["KAWIN","TIDAK"],tag:2});		
		this.e_paspor = new portalui_saiLabelEdit(this,{bound:[20,30,300,20],caption:"No Paspor", tag:3});		
		this.cb_kb = new portalui_saiCBBL(this,{bound:[570,30,180,20],caption:"Akseptor KB",btnClick:[this,"doBtnClick"],tag:1});				
		this.e_kitas = new portalui_saiLabelEdit(this,{bound:[20,31,300,20],caption:"No KITAS/KITAP", tag:3});			
		this.cb_lain = new portalui_saiCBBL(this,{bound:[570,31,180,20],caption:"Jenis Kelainan",btnClick:[this,"doBtnClick"],tag:1});
		this.e_npwp = new portalui_saiLabelEdit(this,{bound:[20,32,300,20],caption:"No NPWP", tag:3});		
		this.e_telp2 = new portalui_saiLabelEdit(this,{bound:[570,32,300,20],caption:"No Telp. Pribadi", tag:3, maxLength:50});									  
	
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
window.app_egov_simduk_transaksi_fKkagg.extend(window.portalui_childForm);
window.app_egov_simduk_transaksi_fKkagg.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,3])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var data = this.dbLib.getDataProvider("select max(no_urut) as nu from egov_kk_d where no_kk ='"+this.cb_kode.getText()+"'");
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line;
						line = data.rs.rows[0];												
						this.nu = line.nu;
					}
					this.nu++;
					sql.add("insert into egov_kk_d (no_kk, nik, no_urut, status, kode_hubkel, no_paspor, no_kitas, no_akte, no_wafat, no_pindah, tgl_datang, kode_kb, kode_kelainan, kode_agama, kode_pendidikan, kode_pekerjaan, ket_pekerjaan, kode_wn, npwp, no_telepon, ket_pendidikan, sts_aktif) values "+
							"                      ('"+this.cb_kode.getText()+"', '-', "+this.nu+", '"+this.cb_status.getText()+"', '"+this.cb_hubkel.getText()+"', '"+this.e_paspor.getText()+"', '"+this.e_kitas.getText()+"', '"+this.cb_akte.getText()+"', '-', '-', '"+this.e_tanggal.getText()+"', '"+this.cb_kb.getText()+"', '"+this.cb_lain.getText()+"', '"+this.cb_agama.getText()+"', '"+this.cb_pddk.getText()+"', '"+this.cb_kerja.getText()+"', '"+this.e_kerja.getText()+"', '"+this.cb_wn.getText()+"', '"+this.e_npwp.getText()+"', '"+this.e_telp2.getText()+"', '"+this.e_pddk.getText()+"', '1')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,3])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update egov_kk_d set kode_hubkel = '"+this.cb_hubkel.getText()+"',status='"+this.cb_status.getText()+"', no_paspor='"+this.e_paspor.getText()+"', no_kitas='"+this.e_kitas.getText()+"', tgl_datang='"+this.e_tanggal.getText()+"', kode_kb='"+this.cb_kb.getText()+"', kode_kelainan='"+this.cb_lain.getText()+"', kode_agama='"+this.cb_agama.getText()+"', kode_pendidikan='"+this.cb_pddk.getText()+"', kode_pekerjaan='"+this.cb_kerja.getText()+"', ket_pekerjaan='"+this.e_kerja.getText()+"', kode_wn='"+this.cb_wn.getText()+"', npwp='"+this.e_npwp.getText()+"', no_telepon='"+this.e_telp.getText()+"', ket_pendidikan='"+this.e_pddk.getText()+"' where no_kk='"+this.cb_kode.getText()+"' and no_akte='"+this.cb_akte.getText()+"'");
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
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from egov_kk_d where no_kk = '"+this.cb_kode.getText()+"' and no_akte='"+this.cb_akte.getText()+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1","3"),this.cb_kode);
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
			if (sender == this.cb_akte) {
				if (this.cb_akte.getText() != ""){
					var data = this.dbLib.getDataProvider("select a.nama,date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir,a.tempat,a.nama_ayah,a.nama_ibu,a.gender,concat(a.gol_darah,' | ',a.rhesus) as goldar,ifnull(b.kode_hubkel,'-') as kode_hubkel,ifnull(b.nama_hubkel,'-') as nama_hubkel, "+
							   "       ifnull(b.npwp,'') as npwp,ifnull(b.telp2,'') as telp2,ifnull(b.no_paspor,'') as no_paspor,ifnull(b.no_kitas,'') as no_kitas,"+
							   "       ifnull(b.kode_agama,'') as kode_agama,ifnull(b.nama_agama,'') as nama_agama, "+
							   "       ifnull(b.kode_pendidikan,'') as kode_pendidikan,ifnull(b.nama_pddk,'') as nama_pddk,ifnull(b.kode_pekerjaan,'') as kode_pekerjaan,ifnull(b.nama_kerja,'') as nama_kerja,ifnull(b.ket_pendidikan,'') as ket_pendidikan,ifnull(b.ket_pekerjaan,'') as ket_pekerjaan, "+
							   "       ifnull(b.kode_wn,'') as kode_wn,ifnull(b.nama_wn,'') as nama_wn,ifnull(b.kode_kb,'') as kode_kb,ifnull(b.nama_kb,'') as nama_kb,ifnull(b.kode_kelainan,'') as kode_kelainan,ifnull(b.nama_kelainan,'') as nama_kelainan "+							   
					           " from egov_akte a left outer join "+
							   "      (select x.no_akte,x.kode_hubkel,y.nama as nama_hubkel, "+
							   "       x.npwp,x.no_telepon as telp2,x.no_paspor,x.no_kitas,"+
							   "       x.kode_agama,aa.nama as nama_agama, "+
							   "       x.kode_pendidikan,bb.nama as nama_pddk,x.kode_pekerjaan,cc.nama as nama_kerja,x.ket_pendidikan,x.ket_pekerjaan, "+
							   "       x.kode_wn,dd.nama as nama_wn,x.kode_kb,ee.nama as nama_kb,x.kode_kelainan,ff.nama as nama_kelainan "+
							   "       from egov_kk_d x inner join egov_hubkel y on x.kode_hubkel=y.kode_hubkel "+
							   "                        inner join egov_agama aa on x.kode_agama=aa.kode_agama "+  
							   "                        inner join egov_pendidikan bb on x.kode_pendidikan=bb.kode_pendidikan "+  
							   "                        inner join egov_pekerjaan cc on x.kode_pekerjaan=cc.kode_pekerjaan "+  
							   "                        inner join egov_wn dd on x.kode_wn=dd.kode_wn "+  
							   "                        inner join egov_kb ee on x.kode_kb=ee.kode_kb "+  
							   "                        inner join egov_kelainan ff on x.kode_kelainan=ff.kode_kelainan "+  
							   "      )b on a.no_akte=b.no_akte "+
						       " where a.no_akte ='"+this.cb_akte.getText()+"'");
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.e_nama.setText(line.nama);
							this.e_tempat.setText(line.tempat);
							this.e_tgllahir.setText(line.tgl_lahir);
							this.e_jk.setText(line.gender);
							this.e_ayah.setText(line.nama_ayah);
							this.e_ibu.setText(line.nama_ibu);
							this.e_goldar.setText(line.goldar);
							
							if (line.kode_hubkel == "-") setTipeButton(tbSimpan);
							else {
							    this.cb_hubkel.setText(line.kode_hubkel,line.nama_hubkel);
								this.cb_agama.setText(line.kode_agama,line.nama_agama);
								this.cb_agama.setText(line.kode_agama,line.nama_agama);
								this.cb_pddk.setText(line.kode_pendidikan,line.nama_pddk);
								this.e_pddk.setText(line.ket_pendidikan);
								this.cb_kerja.setText(line.kode_pekerjaan,line.nama_kerja);
								this.e_kerja.setText(line.ket_pekerjaan);
								this.cb_wn.setText(line.kode_wn,line.nama_wn);
								this.cb_kb.setText(line.kode_kb,line.nama_kb);
								this.cb_lain.setText(line.kode_kelainan,line.nama_kelainan);
								this.e_paspor.setText(line.no_paspor);
								this.e_kitas.setText(line.no_kitas);
								this.e_npwp.setText(line.npwp);
								this.e_telp2.setText(line.telp2);
								setTipeButton(tbUbahHapus);
							}
						}
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEnter: function(sender, event){
		if ((sender == this.e_alamat2) && (this.e_alamat2.getText() == "")) this.e_alamat2.setText(this.e_alamat.getText());
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
				this.standarLib.clearByTag(this, new Array("1","3"),undefined);
			}
			if (sender == this.cb_akte) {   
			    this.standarLib.showListData(this, "Daftar Nomor Akta",sender,undefined, 
											  "select a.no_akte, a.nama  from egov_akte a left outer join egov_kk_d b on a.no_akte=b.no_akte where (b.kode_hubkel <> 'HK0' and b.no_kk='"+this.cb_kode.getText()+"') or b.kode_hubkel is null",
											  "select count(a.no_akte)   from egov_akte a left outer join egov_kk_d b on a.no_akte=b.no_akte where (b.kode_hubkel <> 'HK0' and b.no_kk='"+this.cb_kode.getText()+"') or b.kode_hubkel is null",
											  ["no_akte","nama"],"and",["No Akta","Nama"],false);				
				this.standarLib.clearByTag(this, new Array("3"),undefined);
			}
			if (sender == this.cb_hubkel) {   
			    this.standarLib.showListData(this, "Daftar Hubungan Keluarga",sender,undefined, 
											  "select kode_hubkel, nama  from egov_hubkel where kode_hubkel <> 'HK0'",
											  "select count(kode_hubkel) from egov_hubkel where kode_hubkel <> 'HK0'",
											  ["kode_hubkel","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_lain) {   
			    this.standarLib.showListData(this, "Daftar Kelainan",sender,undefined, 
											  "select kode_kelainan, nama  from egov_kelainan",
											  "select count(kode_kelainan) from egov_kelainan",
											  ["kode_kelainan","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_kb) {   
			    this.standarLib.showListData(this, "Daftar Akseptor KB",sender,undefined, 
											  "select kode_kb, nama  from egov_kb",
											  "select count(kode_kb) from egov_kb ",
											  ["kode_kb","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_wn) {   
			    this.standarLib.showListData(this, "Daftar Kewarganegaraan",sender,undefined, 
											  "select kode_wn, nama  from egov_wn",
											  "select count(kode_wn) from egov_wn ",
											  ["kode_wn","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_kerja) {   
			    this.standarLib.showListData(this, "Daftar Jenis Pekerjaan",sender,undefined, 
											  "select kode_pekerjaan, nama  from egov_pekerjaan ",
											  "select count(kode_pekerjaan) from egov_pekerjaan ",
											  ["kode_pekerjaan","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_pddk) {   
			    this.standarLib.showListData(this, "Daftar Tingkat Pendidikan",sender,undefined, 
											  "select kode_pendidikan, nama  from egov_pendidikan ",
											  "select count(kode_pendidikan) from egov_pendidikan ",
											  ["kode_pendidikan","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_agama) {   
			    this.standarLib.showListData(this, "Daftar Agama",sender,undefined, 
											  "select kode_agama, nama  from egov_agama ",
											  "select count(kode_agama) from egov_agama ",
											  ["kode_agama","nama"],"and",["Kode","Nama"],false);				
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