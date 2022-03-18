window.app_saku2_transaksi_kopeg_lab_fLabMhs = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fLabMhs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fLabMhs";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Mahasiswa : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Mahasiswa","Data Mahasiswa","Filter Cari","Upload Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["Kode","Nama","Email","Menu","Foto"],
					colWidth:[[4,3,2,1,0],[100,100,100,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:20,change:[this,"doChange"]});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,500,20],caption:"Nama", maxLength:200, tag:1});	
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,400,20],caption:"Email", maxLength:100, tag:1});	
		this.e_gambar = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,400,20],caption:"Foto", maxLength:100, tag:1});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[420,16,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.c_menu = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Menu",readOnly:true,tag:2});
		this.img = new image(this.pc1.childPage[1],{bound:[20,350,150,200],tag:1});
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,300,20],caption:"Nama",maxLength:50,tag:9});
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		this.c_status2 = new saiCB(this.pc1.childPage[3],{bound:[30,16,200,20],caption:"Status Data",items:["1. TAMBAH","2. HAPUS"], readOnly:true,tag:2});
		this.bUpload = new button(this.pc1.childPage[3],{bound:[250,16,80,18],caption:"Simpan Upload",click:[this,"doUpload"]});
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["Kode","Nama","Email","Menu","Foto"],
					colWidth:[[4,3,2,1,0],[100,100,100,300,100]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
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
		
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fLabMhs.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fLabMhs.implement({
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
	simpan2: function(){			
		try{						
			if (this.sg.getRowValidCount() > 0){
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				
				if (this.c_status2.getText().substr(0,1)=="2")
				{
					sql.add("delete from lab_mhs where nim = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						sql.add("insert into lab_mhs (nim,kode_lokasi,nama,email,foto) values ('"+
							this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"')");
						sql.add("insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values ('"+
							this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(0,i)+"','M','"+this.app._lokasi+"','"+this.sg.cells(3,i)+"','ADMIN')");



					}
				}
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
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
					sql.add("delete from lab_mhs where nim = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from lab_mhs where nim = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
		
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
	doUpload: function(){
		system.confirm(this, "upload", "Apa data sudah benar?","data diform ini apa sudah benar.");
		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
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
			case "upload" :	
				this.simpan2();
				break;
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select a.nim,a.nama,a.email,a.foto,b.kode_klp_menu "+
							"from lab_mhs a "+
							"inner join hakakses b on a.nim=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"where a.nim ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);		
						this.e_email.setText(line.email);
						this.e_gambar.setText(line.foto);	
						this.c_menu.setText(line.kode_klp_menu);	
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
			    this.standarLib.showListData(this, "Daftar Flag Akun",sender,undefined, 
											  "select kode_rkm, nama  from agg_rkm where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_rkm) from agg_rkm where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_rkm","nama"],"where",["Kode","Nama"],false);				
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
			}
		} catch(e) {alert(e);}
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
	doLoad:function(sender){						
		var strSQL = "select a.nim,a.nama,a.email,a.foto,b.kode_klp_menu "+
					"from lab_mhs a "+
					"inner join hakakses b on a.nim=b.nik and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_lokasi='"+this.app._lokasi+"' order by a.nim ";	
		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.e_kode2.getText() != "") var filter = filter+" and a.nim = '"+this.e_kode2.getText()+"' ";
			if (this.e_nama2.getText() != "") var filter = filter+" and a.nama like '%"+this.e_nama2.getText()+"%' ";
			var strSQL = "select a.nim,a.nama,a.email,a.foto,b.kode_klp_menu "+
					"from lab_mhs a "+
					"inner join hakakses b on a.nim=b.nik and a.kode_lokasi=b.kode_lokasi "+filter+" order by a.nim ";	
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
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.nim,line.nama,line.email,line.kode_klp_menu,line.foto]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});