window.app_hris_master_fJur = function(owner)
{
	if (owner)
	{
		window.app_hris_master_fJur.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_master_fJur";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kota", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Jurusan",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100});		
		this.cb_klp = new saiCBBL(this,{bound:[20,12,200,20],caption:"Kode Kelompok",maxLength:10,btnClick:[this,"doBtnClick"]});

		this.bTampil = new button(this,{bound:[529,12,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,600,433],caption:"Daftar Kota"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,595,380],tag:9,readOnly:true,colTitle: ["Kode","Nama","Kelompok"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,408,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_master_fJur.extend(window.childForm);
window.app_hris_master_fJur.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_jur(kode_jur,nama,kode_lokasi,kode_klpjur) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_klp.getText()+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update gr_jur set nama = '"+this.e_nama.getText()+"',kode_klpjur='"+this.cb_klp.getText()+"' where kode_jur = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_jur where kode_jur = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
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
				var data = this.dbLib.getDataProvider("select a.nama,a.kode_klpjur,b.nama as nama_prov "+
				           " from gr_jur a "+
						   "inner join gr_klpjur b on a.kode_klpjur=b.kode_klpjur "+
						   "where a.kode_jur ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.cb_klp.setText(line.kode_klpjur,line.nama_prov);
						
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select a.kode_jur,a.nama,b.nama as nama_prov from "+
										"gr_jur a "+
										"inner join gr_klpjur b on a.kode_klpjur=b.kode_klpjur "+
										"where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_jur");
			if (temp instanceof arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Kota",sender,undefined, 
											  "select kode_jur, nama  from gr_jur where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_jur) from gr_jur where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_jur","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_klp) {   
			    this.standarLib.showListData(this, "Daftar Provinsi",sender,undefined, 
											  "select kode_klpjur, nama  from gr_klpjur  ",
											  "select count(kode_klpjur) from gr_klpjur  ",
											  ["kode_klpjur","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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