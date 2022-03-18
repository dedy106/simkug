window.app_saku3_transaksi_dago_fHotel = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fHotel.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fHotel";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Hotel", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Hotel","Data Hotel"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["ID Hotel","Nama Hotel","Alamat","Koordinat"],
					colWidth:[[3,2,1,0],[200,300,200,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"ID Hotel",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama Hotel", maxLength:50, tag:1});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Alamat Hotel", maxLength:50, tag:1});
		this.e_kota = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,300,20],caption:"Kota", maxLength:50, tag:1});		
		this.e_negara = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,300,20],caption:"Negara", maxLength:50, tag:1});		
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,300,20],caption:"PIC", maxLength:50, tag:1});
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,300,20],caption:"Telpon", maxLength:50, tag:1});
		this.e_grade = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,300,20],caption:"Grade", maxLength:50, tag:1});
		this.e_foto = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Foto", readOnly:true, tag:1});
		this.u_foto = new uploader(this.pc1.childPage[1], {bound:[480,18,80,20],param3: "object", param4 :"server/media/",param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"} )
		this.e_kordi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"Koordinat", maxLength:50, tag:1});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.iFoto = new image(this.pc1.childPage[1],{bound:[700,20,160,180]});

		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;		

			this.doLoad();			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fHotel.extend(window.childForm);
window.app_saku3_transaksi_dago_fHotel.implement({
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
					sql.add("insert into dgw_hotel(id_hotel,nama,alamat,kota,negara,pic,no_tel,grade,koordinat,foto,kode_lokasi) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_negara.getText()+"','"+this.e_pic.getText()+"','"+this.e_tel.getText()+"','"+this.e_grade.getText()+"','"+this.e_kordi.getText()+"','"+this.e_foto.getText()+"','"+this.app._lokasi+"')");		
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
					sql.add("delete from dgw_hotel where id_hotel='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					sql.add("insert into dgw_hotel(id_hotel,nama,alamat,kota,negara,pic,no_tel,grade,koordinat,foto,kode_lokasi) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_negara.getText()+"','"+this.e_pic.getText()+"','"+this.e_tel.getText()+"','"+this.e_grade.getText()+"','"+this.e_kordi.getText()+"','"+this.e_foto.getText()+"','"+this.app._lokasi+"')");
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
					sql.add("delete from dgw_hotel where id_hotel='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from dgw_hotel where id_hotel ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);	
						this.e_alamat.setText(line.alamat);	
						this.e_kordi.setText(line.koordinat);	

						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_kota.setText(line.kota);		
						this.e_negara.setText(line.negara);		
						this.e_pic.setText(line.pic);
						this.e_tel.setText(line.no_tel);
						this.e_grade.setText(line.grade);
						this.e_foto.setText(line.foto);
						this.e_kordi.setText(line.koordinat);
												
						this.e_foto.setText(trim(line.foto));
						this.iFoto.setImage("server/media/"+trim(line.foto));
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));									
			}
		} catch(e) {alert(e);}
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
							this.fileUtil.copyFileTo(this.rootDir+"/server/tmp/"+this.fileDest.tmpfile, this.rootDir+ "/server/media/"+this.fileDest.filedest, false);
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
		var strSQL = "select a.id_hotel,a.nama, a.alamat, a.koordinat "+
		             "from dgw_hotel a "+
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
			this.sg1.appendData([line.id_hotel,line.nama,line.alamat,line.koordinat]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
