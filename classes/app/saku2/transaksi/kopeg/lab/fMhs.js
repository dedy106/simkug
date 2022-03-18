window.app_saku2_transaksi_kopeg_lab_fMhs = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fMhs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fMhs";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Mahasiswa : Input-Edit/Load", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;uploader;util_file;image;");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,16,500,20],caption:"Nama", maxLength:200, tag:1});	
		this.e_email = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Email", maxLength:100, tag:1});	
		this.e_gambar = new saiLabelEdit(this,{bound:[20,16,400,20],caption:"Foto", readOnly:true, maxLength:100, tag:1});		
		this.uploader = new uploader(this,{bound:[420,16,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.c_menu = new saiCB(this,{bound:[20,12,200,20],caption:"Menu",readOnly:true,tag:2});
		this.img = new image(this,{bound:[20,350,150,200],tag:1});
					
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.fileUtil = new util_file();
			this.rootDir = this.app._rootDir;
			this.c_menu.items.clear();
			var data = this.dbLib.getDataProvider("select distinct kode_klp from menu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_menu.addItem(i,line.kode_klp);
				}
			}
			this.c_menu.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fMhs.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fMhs.implement({
	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into lab_mhs(nim,kode_lokasi,nama,email,foto) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_email.getText()+"','"+this.e_gambar.getText()+"')");
					
					sql.add("insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values  "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_kode.getText()+"','M','"+this.app._lokasi+"','"+this.c_menu.getText()+"','ADMIN')");										
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update lab_mhs set nama='"+this.e_nama.getText()+"',email='"+this.e_email.getText()+"',foto='"+this.e_gambar.getText()+"' "+
					        "where nim = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update hakakses set nama='"+this.e_nama.getText()+"',kode_klp_menu='"+this.c_menu.getText()+"' "+
					        "where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from lab_mhs where nim = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
			if (this.cb_kode.getText() != ""){
				var strSQL = "select a.nama,b.kode_klp_menu,a.email,a.foto from lab_mhs a inner join hakakses b on a.nim=b.nik and a.kode_lokasi=b.kode_lokasi where a.nim ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.c_menu.setText(line.kode_klp_menu);	
						this.e_email.setText(line.email);		
						this.e_gambar.setText(line.foto);
						this.img.setImage(this.uploader.param4+line.foto);
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
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Mahasiswa",sender,undefined, 
											  "select nim, nama  from lab_mhs where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nim) from lab_mhs where kode_lokasi='"+this.app._lokasi+"'",
											  ["nim","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_gambar.setText(data.filedest);
			this.dataUpload = data;
			this.img.setImage(this.uploader.param2 +this.dataUpload.tmpfile);
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
			} catch(e) {
			alert(e);
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
								if (this.fileBfr != this.e_gambar.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}		
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);

							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.clearLayar();
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

/*

format xls - txt
--------------------------------
     nim    |        nama
--------------------------------
  113       |     abu
  613       |     bahlul   

--------------------------------
*/