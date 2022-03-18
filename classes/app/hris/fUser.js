window.app_hris_fUser = function(owner)
{
	if (owner)
	{
		window.app_hris_fUser.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_fUser";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","User Akses", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"User",maxLength:10,btnClick:[this,"doBtnClick"],change:[this,"doChange"]});
		this.e_pass = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Password", password:true,maxLength:10});		
		this.c_status = new saiCB(this,{bound:[20,22,200,20],caption:"Status User",items:["Administrator","User","Loker"],readOnly:true,tag:2});
		this.c_menu = new saiCB(this,{bound:[20,12,200,20],caption:"Menu",readOnly:true});
		this.p1 = new panel(this,{bound:[10,23,560,300],caption:"Daftar Lokasi Kerja"});		
		this.sg = new saiGrid(this.p1,{bound:[1,20,555,250],colCount:2,tag:0,
		            colTitle:["Kode ","Nama "],
					colWidth:[[1,0],[300,70]],
					columnReadOnly:[true,[0],[1]],
					buttonStyle:[[0],[bsEllips]],checkItem:true,
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,270,699,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.c_menu.items.clear();
			var data = this.dbLib.getDataProvider(
						"select distinct kode_klp from menu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_menu.addItem(i,line.kode_klp);
				}
			}		
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_fUser.extend(window.childForm);
window.app_hris_fUser.implement({
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
					var sts_admin="";
					if (this.c_status.getText()=="Administrator") {sts_admin="A"};
					if (this.c_status.getText()=="User") {sts_admin="U"};
					if (this.c_status.getText()=="Loker") {sts_admin="L"};
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values  "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_kode.rightLabelCaption+"','"+this.e_pass.getText()+"','"+sts_admin+"','"+this.app._lokasi+"','"+this.c_menu.getText()+"','ADMIN')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_karyawan_loker(nik,kode_lokasi,kode_loker) values "+
										"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
							}
						}
					}	
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
					var sts_admin="";
					if (this.c_status.getText()=="Administrator") {sts_admin="A"};
					if (this.c_status.getText()=="User") {sts_admin="U"};
					if (this.c_status.getText()=="Loker") {sts_admin="L"};
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_karyawan_loker where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values  "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_kode.rightLabelCaption+"','"+this.e_pass.getText()+"','"+sts_admin+"','"+this.app._lokasi+"','"+this.c_menu.getText()+"','ADMIN')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_karyawan_loker(nik,kode_lokasi,kode_loker) values "+
										"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
							}
						}
					}						setTipeButton(tbAllFalse);
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
					sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_karyawan_loker where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
				var data = this.dbLib.getDataProvider("select a.status_admin,a.kode_klp_menu,a.status_admin,a.pass "+
						   "from hakakses a "+
						   "inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
						   "where a.nik ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				
				if (typeof data == "object"){
					
					var line = data.rs.rows[0];							
					if (line != undefined){
						var sts_admin="";
						if (line.status_admin=="A") {sts_admin="Administrator"};
						if (line.status_admin=="U") {sts_admin="User"};
						if (line.status_admin=="L") {sts_admin="Loker"};
						this.e_pass.setText(line.pass);
						this.c_status.setText(sts_admin);
						this.c_menu.setText(line.kode_klp_menu);
						var data = this.dbLib.getDataProvider("select a.kode_loker,b.nama "+
									"from gr_karyawan_loker a "+
									"inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
									"where a.nik='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg.appendData([line.kode_loker,line.nama]);
							}
						} else this.sg.clear(1);
						setTipeButton(tbUbahHapus);
						
					}
					else{
						setTipeButton(tbSimpan);
						var data = this.dbLib.getDataProvider("select a.kode_loker,b.nama "+
									"from gr_karyawan a "+
									"inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
									"where a.nik='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg.appendData([line.kode_loker,line.nama]);
							}
						} else this.sg.clear(1);
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
				 this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
														"select nik, nama  from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",
														"select count(nik) from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("nik","nama"),"and",new Array("Kode","Nama"),false);			
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
				switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Lokasi Kerja",this.sg, this.sg.row, this.sg.col, 
														"select kode_loker, nama  from gr_loker where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_loker) from gr_loker where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_loker","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
							
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
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