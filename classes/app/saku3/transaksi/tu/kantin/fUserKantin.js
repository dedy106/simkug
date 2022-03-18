window.app_saku3_transaksi_tu_kantin_fUserKantin = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kantin_fUserKantin.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kantin_fUserKantin";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form User Kantin", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["List Kasir","Data Kasir"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:2,tag:9,
		            colTitle:["ID Kasir","Nama"],
					colWidth:[[1,0],[300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_nik = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"ID Kasir ", maxLength:100,change:[this,"doChange"]});
		this.e_pass = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Password ", maxLength:100});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Nama ", maxLength:100});
		this.c_menu = new portalui_saiCB(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Akses Menu",items:["ADM_KTN"],tag:2,readOnly:true, change:[this,"doChange"]});
		this.e_foto = new saiLabelEdit(this.pc1.childPage[1], {bound:[20,11,200,20], caption:"Foto"});
		this.u_foto = new uploader(this.pc1.childPage[1], {bound:[230,11,80,20],param3: "object", param4 :"server/media/",param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"} );
		this.iFoto = new image(this.pc1.childPage[1], {bound:[330, this.e_foto.top, 200,220]});	
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbSimpan);
		
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
window.app_saku3_transaksi_tu_kantin_fUserKantin.extend(window.childForm);
window.app_saku3_transaksi_tu_kantin_fUserKantin.implement({
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
					sql.add("insert into ktu_user(kode_lokasi, nik,nama,pass,menu,foto) values "+
							"('"+this.app._lokasi+"','"+this.e_nik.getText()+"','"+this.e_nama.getText()+"','"+this.e_pass.getText()+"','"+this.c_menu.getText()+"','"+this.e_foto.getText()+"')");										
					sql.add("insert into lab_hakakses(kode_lokasi, nik,nama,pass,kode_menu,status_admin,klp_akses) values "+
							"('"+this.app._lokasi+"','"+this.e_nik.getText()+"','"+this.e_nama.getText()+"','"+this.e_pass.getText()+"','"+this.c_menu.getText()+"','U','A')");										

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
					sql.add("delete from ktu_user where nik = '"+this.e_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from lab_hakakses where nik = '"+this.e_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into ktu_user(kode_lokasi, nik,nama,pass,menu,foto) values "+
							"('"+this.app._lokasi+"','"+this.e_nik.getText()+"','"+this.e_nama.getText()+"','"+this.e_pass.getText()+"','"+this.c_menu.getText()+"','"+this.e_foto.getText()+"')");										
					sql.add("insert into lab_hakakses(kode_lokasi, nik,nama,pass,kode_menu,status_admin,klp_akses) values "+
							"('"+this.app._lokasi+"','"+this.e_nik.getText()+"','"+this.e_nama.getText()+"','"+this.e_pass.getText()+"','"+this.c_menu.getText()+"','U','A')");										
				
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
					sql.add("delete from ktu_user where nik = '"+this.e_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from lab_hakakses where nik = '"+this.e_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
			if (sender == this.e_nik && this.e_nik.getText() != ""){
				var data = this.dbLib.getDataProvider("select nik,nama,menu,pass,foto from ktu_user where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.e_nik.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_nama.setText(line.nama);
						this.e_pass.setText(line.pass);
						this.c_menu.setText(line.menu);
						this.e_foto.setText(line.foto);
						this.iFoto.setImage("server/media/"+trim(line.foto));
						setTipeButton(tbUbahHapus);
					}
					else setTipeButton(tbSimpan);
				}
				else setTipeButton(tbSimpan);
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
				this.e_nik.setText(this.sg1.cells(0,row));	
				
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
							this.fileUtil.copyFileTo(this.rootDir+"/server/tmp/"+this.fileDest.tmpfile, this.rootDir+ "/server/media/"+this.fileDest.filedest, false);							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nik.getText()+")");							
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
		var strSQL = "select a.nik,a.nama "+
		             "from ktu_user a  "+
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
			this.sg1.appendData([line.nik,line.nama]); 
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
