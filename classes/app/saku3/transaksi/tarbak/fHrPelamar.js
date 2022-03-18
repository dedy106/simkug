window.app_saku3_transaksi_tarbak_fHrPelamar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_fHrPelamar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_fHrPelamar";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;util_file");
		uses("saiGrid",true);		
		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,10,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.pc1 = new pageControl(this,{bound:[20,12,1000,440], childPage:["Daftar Karyawan","Data Karyawan","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:12,tag:9,
		            colTitle:["NIP","Nama","Lowongan","Media","Alamat","Kota","No Telp","No HP","Email","Kode Pos","kode_job","kode_media"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[40,40,100,100,100,150,150,200,150,150,200,70]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"nip",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});			
		this.e_foto = new saiLabelEdit(this.pc1.childPage[1], {bound:[520,11,200,20], caption:"Foto"});
		this.u_foto = new uploader(this.pc1.childPage[1], {bound:[720,11,80,20],param3: "object", param4 :"server/media/",param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"} )
			
		
		this.cb_job = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Lowongan ", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_media = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Media", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_file = new saiLabelEdit(this.pc1.childPage[1], {bound:[20,12,200,20], caption:"File Lamaran"});
		this.u_file = new uploader(this.pc1.childPage[1], {bound:[220,12,80,20],param3: "object", param4 :"server/media/",param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish2"], caption:"Browse"} )	
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,400,20],caption:"No Telepon", maxLength:50, tag:1});	
		this.e_hp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,400,20],caption:"No HandPhone", maxLength:50, tag:1});	
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,400,20],caption:"Email", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,400,20],caption:"Alamat", maxLength:50, tag:1});	
		this.e_kota = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,400,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_pos = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"KodePos", maxLength:5, tag:1});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,26,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"nip",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		this.iFoto = new image(this.pc1.childPage[1], {bound:[620, this.cb_job.top, 200,220]});
		
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
			this.cb_lokasi.setSQL("select kode_lokasi,nama from lokasi where flag_konsol='0'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);	
			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_job.setSQL("select kode_job,nama from hr_job where kode_lokasi='"+this.app._lokasi+"'",["kode_job","nama"],false,["Kode","Nama"],"and","Data Pekerjaan",true);	
			this.cb_media.setSQL("select kode_media,nama from hr_media where kode_lokasi='"+this.app._lokasi+"'",["kode_media","nama"],false,["Kode","Nama"],"and","Data Media",true);	
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_fHrPelamar.extend(window.childForm);
window.app_saku3_transaksi_tarbak_fHrPelamar.implement({
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
					sql.add("insert into hr_pelamar(nip, kode_lokasi, nama, alamat,  no_telp, email, kota, kode_pos, no_hp, flag_aktif, foto,kode_job,kode_media,file_dok ) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.e_kota.getText()+"','"+this.e_pos.getText()+"','"+this.e_hp.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.e_foto.getText()+"','"+this.cb_job.getText()+"','"+this.cb_media.getText()+"','"+this.e_file.getText()+"')");					
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
					sql.add("delete from hr_pelamar where nip = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into hr_pelamar(nip, kode_lokasi, nama, alamat,  no_telp, email, kota, kode_pos, no_hp, flag_aktif, foto,kode_job,kode_media,file_dok ) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.e_kota.getText()+"','"+this.e_pos.getText()+"','"+this.e_hp.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.e_foto.getText()+"','"+this.cb_job.getText()+"','"+this.cb_media.getText()+"','"+this.e_file.getText()+"')");					
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
					sql.add("delete from hr_pelamar where nip = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			
			if (sender == this.cb_lokasi && this.cb_lokasi.getText() != "") {	
				//this.cb_pp.setText("","");
				//this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.cb_lokasi.getText()+"' ",["kode_pp","nama"],false,["Kode","Nama"],"where","Data PP",true);
				this.doLoad();
			}
	
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select nip, kode_lokasi, nama, alamat,  no_telp, email, kota, kode_pos, no_hp, flag_aktif, foto,kode_pos,kode_job,kode_media,file_dok "+
				             "from hr_pelamar "+
						     "where nip ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_telp);
						this.e_email.setText(line.email);
						this.e_kota.setText(line.kota);
						this.e_pos.setText(line.kode_pos);
						this.e_hp.setText(line.no_hp);
						this.cb_job.setText(line.kode_job);
						this.cb_media.setText(line.kode_media);
						this.e_file.setText(line.file_dok);
						this.e_foto.setText(trim(line.foto));
						this.iFoto.setImage("server/media/"+trim(line.foto));
						if (line.flag_aktif == "0") this.c_status.setText("0. NONAKTIF");
						else this.c_status.setText("1. AKTIF");
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
		if (this.e_kode2.getText() != "") var filter = " a.nip like '%"+this.e_kode2.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' ";
		else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' ";
		var strSQL = "select a.nip, a.kode_lokasi, a.nama, a.alamat,  a.no_telp, a.email, a.kota, a.kode_pos, a.no_hp, a.flag_aktif,a.kode_pos, a.foto "+
		             "from hr_pelamar a "+
					 "where "+filter+"  order by a.nip";		
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
		var strSQL = "select a.nip, a.kode_lokasi, a.nama, a.alamat,  a.no_telp, a.email, a.kota, a.kode_pos, a.no_hp, a.flag_aktif,a.kode_pos, a.foto,a.kode_job,a.kode_media,b.nama as nama_media,c.nama as nama_job "+
		             "from hr_pelamar a "+
					 "inner join hr_media b on a.kode_media=b.kode_media and a.kode_lokasi=b.kode_lokasi "+ 
					 "inner join hr_job c on a.kode_job=c.kode_job and a.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.nip";		
		
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
			this.sg1.appendData([line.nip,line.nama,line.nama_job,line.nama_media,line.alamat,line.kota,line.no_telp,line.no_hp,line.email,line.kode_pos,line.kode_job,line.kode_media]); 
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
	},
	doUploadFinish2: function(sender, result, data, filename){
		try{	
			
			if (result){			
				this.fileDest = data;
				this.e_file.setText(trim(data.filedest) );
			}else system.alert(this,"Error upload","");
		}catch(e){
			system.alert(this,"Error upload",e);
		}
	}
	
});