window.app_saku3_transaksi_klinik_fPeserta = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_klinik_fPeserta.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_klinik_fPeserta";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Peserta", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;uploader;util_file;image");
		uses("saiGrid",true);				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Peserta","Data Peserta","Filter"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:14,tag:9,
		            colTitle:["No Peserta","Mitra","ID Peserta","Nama","Nama Ayah","Nama Ibu","Tmp Lahir","Tgl Lahir","Sex","Gol Darah","Alamat","No HP","No Telpon","Pekerjaan"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,80,80,300,80,60,70,100,150,150,200,80,150,80]],
					readOnly:true, 
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,180,20],caption:"No Peserta",readOnly:true,maxLength:10,change:[this,"doChange"]});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[205,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		this.cb_mitra = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Mitra", multiSelection:false, maxLength:10, tag:2});		
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,24,180,20],caption:"Jenis ID",tag:2,mustCheck:false});
		this.e_id = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"ID Peserta", maxLength:50, tag:1});					
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Nama", maxLength:50, tag:1});					
		this.e_ayah = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Nama Ayah", maxLength:50, tag:1});					
		this.e_ibu = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Nama Ibu", maxLength:50, tag:1});					
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"Tempat Lahir", maxLength:50, tag:1});					
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tgl Lahir", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18]}); 
		this.c_jk = new saiCB(this.pc1.childPage[1],{bound:[20,23,180,20],caption:"Sex",items:["L","P"], readOnly:true,tag:2});
		this.cb_agama = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Agama", multiSelection:false, maxLength:10, tag:2});		
		this.cb_goldar = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Golongan Darah", multiSelection:false, maxLength:10, tag:2});				
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Alamat", maxLength:200, tag:1});			
		this.e_hp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,300,20],caption:"No HP", maxLength:50, tag:1});			
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,300,20],caption:"No Telpon", maxLength:50, tag:1});			
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,300,20],caption:"Email", maxLength:50, tag:1});					
		this.e_kerja = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,300,20],caption:"Pekerjaan", maxLength:50, tag:1});					
		this.e_foto = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,400,20],caption:"Foto", readOnly:true, maxLength:100, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[430,15,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.img = new image(this.pc1.childPage[1],{bound:[550,20,160,180]});			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();
			this.cb_mitra.setSQL("select kode_mitra, nama from kli_mitra where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);
			this.cb_goldar.setSQL("select kode_goldar, nama from kli_goldar ",["kode_goldar","nama"],false,["Kode","Nama"],"and","Data GolDar",true);
			this.cb_agama.setSQL("select kode_agama, nama from kli_agama ",["kode_agama","nama"],false,["Kode","Nama"],"and","Data Agama",true);
			
			var data = this.dbLib.getDataProvider("select substring(cast(year(getdate()) as varchar),3,2) as tahun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.tahun = line.tahun;
			}
			this.c_jenis.items.clear();
			var data = this.dbLib.getDataProvider("select distinct jenis_id as jenis from kli_peserta where kode_lokasi='"+this.app._lokasi+"' order by jenis_id",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_jenis.addItem(i,line.jenis);
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_klinik_fPeserta.extend(window.childForm);
window.app_saku3_transaksi_klinik_fPeserta.implement({
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
					sql.add("insert into kli_peserta(no_peserta,kode_lokasi,jenis_id,id_peserta,kode_mitra,nama,ayah,ibu,tempat,tgl_lahir,jk,kode_agama,kode_goldar,alamat,no_hp,no_tel,email,kerja,foto) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.c_jenis.getText()+"','"+this.e_id.getText()+"','"+this.cb_mitra.getText()+"','"+this.e_nama.getText()+"','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jk.getText()+"','"+this.cb_agama.getText()+"','"+this.cb_goldar.getText()+"','"+this.e_alamat.getText()+"','"+this.e_hp.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.e_kerja.getText()+"','"+this.e_foto.getText()+"')");
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
					sql.add("delete from kli_peserta where no_peserta = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					sql.add("insert into kli_peserta(no_peserta,kode_lokasi,jenis_id,id_peserta,kode_mitra,nama,ayah,ibu,tempat,tgl_lahir,jk,kode_agama,kode_goldar,alamat,no_hp,no_tel,email,kerja,foto) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.c_jenis.getText()+"','"+this.e_id.getText()+"','"+this.cb_mitra.getText()+"','"+this.e_nama.getText()+"','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jk.getText()+"','"+this.cb_agama.getText()+"','"+this.cb_goldar.getText()+"','"+this.e_alamat.getText()+"','"+this.e_hp.getText()+"','"+this.e_tel.getText()+"','"+this.e_email.getText()+"','"+this.e_kerja.getText()+"','"+this.e_foto.getText()+"')");
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
					sql.add("delete from kli_peserta where no_peserta = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kli_peserta","no_peserta",this.app._lokasi+"-"+this.tahun+".","00000"));
			this.cb_mitra.setFocus();
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select nama from kli_peserta where no_peserta ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));					
				this.e_id.setText(this.sg1.cells(2,row));
				this.e_nama.setText(this.sg1.cells(3,row));
				this.e_ayah.setText(this.sg1.cells(4,row));
				this.e_ibu.setText(this.sg1.cells(5,row));
				this.e_tempat.setText(this.sg1.cells(6,row));				
				this.dp_d1.setText(this.sg1.cells(7,row));
				this.c_jk.setText(this.sg1.cells(8,row));				
				this.cb_goldar.setText(this.sg1.cells(9,row));
				this.e_alamat.setText(this.sg1.cells(10,row));
				this.e_hp.setText(this.sg1.cells(11,row));
				this.e_tel.setText(this.sg1.cells(12,row));				
				this.e_kerja.setText(this.sg1.cells(13,row));
				
				var strSQL = "select jenis_id,kode_agama,kode_mitra,email,foto from kli_peserta where no_peserta='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.jenis_id);
						this.cb_agama.setText(line.kode_agama);
						this.cb_mitra.setText(line.kode_mitra);
						this.e_email.setText(line.email);
						this.e_foto.setText(line.foto);
						this.img.setImage(this.uploader.param4+line.foto);
						this.fileBfr = line.foto;
					}
				}								
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						/*
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
						*/
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
	doLoad:function(sender){						
		var strSQL = "select a.no_peserta,a.id_peserta,a.kode_mitra+' - '+b.nama as mitra,a.nama,a.ayah,a.ibu,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.jk,a.kode_goldar,a.alamat,a.no_hp,a.no_tel,a.kerja "+
		             "from kli_peserta a inner join kli_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"'";
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
			this.sg1.appendData([line.no_peserta,line.mitra,line.id_peserta,line.nama,line.ayah,line.ibu,line.tempat,line.tgl_lahir,line.jk,line.kode_goldar,line.alamat,line.no_hp,line.no_tel,line.kerja]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});