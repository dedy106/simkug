window.app_saku3_transaksi_uin_fUser = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fUser.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fUser";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","User Akses", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"User",maxLength:10,btnClick:[this,"doBtnClick"],change:[this,"doChange"]});
		this.e_pass = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Password", password:true,maxLength:10});		
		this.c_status = new saiCB(this,{bound:[20,22,200,20],caption:"Status User",items:["Administrator","User","PP","Verifikator"],readOnly:true,tag:2});
		this.c_menu = new saiCB(this,{bound:[20,12,200,20],caption:"Menu",readOnly:true});
		this.e_path = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Path Dashboard", maxLength:20});				

		this.pc1 = new pageControl(this,{bound:[5,10,1000,360], childPage:["PP/Unit","Ref Data DEPKEU"]});						
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:2,tag:0,
				colTitle:["Kode ","Nama "],
				colWidth:[[1,0],[500,100]],
				columnReadOnly:[true,[1],[0]],
				buttonStyle:[[0],[bsEllips]],checkItem:true,defaultRow:1,													
				change:[this,"doChangeCells"],ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPage1"]});		
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load PP/Unit",click:[this,"doLoad"]});				

		this.cb_satker = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Kode Satker",maxLength:20,multiSelection:false,change:[this,"doChange"]});		
		this.cb_prog = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Kode Program",maxLength:20,multiSelection:false,change:[this,"doChange"]});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,274],colCount:2,tag:0,
				colTitle:["KdKeg","Nama Kegiatan"],
				colWidth:[[1,0],[500,100]],
				columnReadOnly:[true,[1],[0]],
				buttonStyle:[[0],[bsEllips]],checkItem:true,defaultRow:1,														
				change:[this,"doChangeCell1"],ellipsClick:[this,"doEllipsClick1"],autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Kegiatan",click:[this,"doLoad1"]});					

		this.rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 23);

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
			
			var sql = new server_util_arrayList();			
			sql.add("select kode_pp,nama from pp where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif='1' ");	
			sql.add("select kdgiat, nmgiat from uin_giat");	
			this.dbLib.getMultiDataProviderA(sql);

			this.cb_satker.setSQL("select kdsatker, nmsatker from uin_satker",["kdsatker","nmsatker"],false,["Kode","Nama"],"and","Data Satker",true);			
			this.cb_prog.setSQL("select kdprogram, nmprogram from uin_program",["kdprogram","nmprogram"],false,["Kode","Nama"],"and","Data Program",true);							
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fUser.extend(window.childForm);
window.app_saku3_transaksi_uin_fUser.implement({
	doLoad: function() {
		var data = this.dbLib.getDataProvider("select a.kode_pp,a.nama from pp a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_pp,line.nama]);
			}
		} else this.sg.clear(1);
	},
	doLoad1: function() {
		if (this.cb_satker.getText()!="" && this.cb_prog.getText()!="") {
			var data = this.dbLib.getDataProvider("select kdgiat, nmgiat from uin_giat where kddept='"+this.kddept+"' and kdunit='"+this.kdunit+"' and kdprogram='"+this.cb_prog.getText()+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.kdgiat,line.nmgiat]);
				}
			} else this.sg1.clear(1);
		}
		else system.alert(this,"Satker dan Program harus terpilih.","");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{								
					var sts_admin="";

					if (this.c_status.getText()=="Administrator") {sts_admin="A"};
					if (this.c_status.getText()=="User") {sts_admin="U"};
					if (this.c_status.getText()=="PP") {sts_admin="P"};
					if (this.c_status.getText()=="Verifikator") {sts_admin="V"};
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses, path_view) values  "+
							"	('"+this.cb_kode.getText()+"','"+this.cb_kode.rightLabelCaption+"','"+this.e_pass.getText()+"','"+sts_admin+"','"+this.app._lokasi+"','"+this.c_menu.getText()+"','ADMIN','"+this.e_path.getText()+"')");
							
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into karyawan_pp(nik,kode_lokasi,kode_pp) values "+
										"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
							}
						}
					}

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into uin_user(nik,kode_lokasi,kdsatker,kddept,kdunit,kdprogram,kdgiat) values "+
										"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_satker.getText()+"','"+this.kddept+"','"+this.kdunit+"','"+this.cb_prog.getText()+"','"+this.sg1.cells(0,i)+"')");
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
					if (this.c_status.getText()=="PP") {sts_admin="P"};
					if (this.c_status.getText()=="Verifikator") {sts_admin="V"};
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from karyawan_pp where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from uin_user where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses, path_view) values  "+
							"	('"+this.cb_kode.getText()+"','"+this.cb_kode.rightLabelCaption+"','"+this.e_pass.getText()+"','"+sts_admin+"','"+this.app._lokasi+"','"+this.c_menu.getText()+"','ADMIN','"+this.e_path.getText()+"')");
							
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into karyawan_pp(nik,kode_lokasi,kode_pp) values "+
										"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
							}
						}
					}			
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into uin_user(nik,kode_lokasi,kdsatker,kddept,kdunit,kdprogram,kdgiat) values "+
										"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_satker.getText()+"','"+this.kddept+"','"+this.kdunit+"','"+this.cb_prog.getText()+"','"+this.sg1.cells(0,i)+"')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from karyawan_pp where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from uin_user where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg.clear(1);
					this.sg1.clear(1);
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select distinct a.status_admin,a.kode_klp_menu,a.status_admin,a.pass,c.kdsatker,c.kdprogram,c.kddept,c.kdunit,a.path_view "+
						   "from hakakses a "+
						   "inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
						   "inner join uin_user c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
						   "where a.nik ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				
				if (typeof data == "object"){
					
					var line = data.rs.rows[0];							
					if (line != undefined){
						var sts_admin="";
						if (line.status_admin=="A") {sts_admin="Administrator"};
						if (line.status_admin=="U") {sts_admin="User"};
						if (line.status_admin=="P") {sts_admin="PP"};
						if (line.status_admin=="V") {sts_admin="Verifikator"};

						this.e_pass.setText(line.pass);
						this.c_status.setText(sts_admin);
						this.c_menu.setText(line.kode_klp_menu);
						this.e_path.setText(line.path_view);

						this.cb_satker.setText(line.kdsatker); 	
						this.kddept = line.kddept;
						this.kdunit = line.kdunit;					
						this.cb_prog.setText(line.kdprogram);
						
						var data = this.dbLib.getDataProvider("select a.kode_pp,b.nama "+
									"from karyawan_pp a "+
									"inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
									"where a.nik='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg.appendData([line.kode_pp,line.nama]);
							}
						} else this.sg.clear(1);

						var data = this.dbLib.getDataProvider("select a.kdgiat,a.nmgiat "+
									"from uin_giat a "+
									"inner join uin_user b on a.kdgiat=b.kdgiat and a.kddept='"+this.kddept+"' and a.kdunit='"+this.kdunit+"' and a.kdprogram='"+this.cb_prog.getText()+"' "+
									"where b.nik='"+this.cb_kode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg1.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg1.appendData([line.kdgiat,line.nmgiat]);
							}
						} else this.sg1.clear(1);

						setTipeButton(tbUbahHapus);						
					}
					else{
						setTipeButton(tbSimpan);
					}
				}
			}

			if (sender == this.cb_satker && this.cb_satker.getText() != ""){
				var strSQL = "select kddept,kdunit from uin_satker where kdsatker ='"+this.cb_satker.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.kddept = line.kddept;
						this.kdunit = line.kdunit;						
					}
				}
				this.cb_prog.setSQL("select kdprogram, nmprogram from uin_program where kddept='"+this.kddept+"' and kdunit='"+this.kdunit+"'",["kdprogram","nmprogram"],false,["Kode","Nama"],"and","Data Program",true);				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
													"select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
													"select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
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
						this.standarLib.showListDataForSG(this, "Daftar PP",this.sg, this.sg.row, this.sg.col, 
														"select kode_pp, nama  from pp where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_pp","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
							
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doEllipsClick1: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Kegiatan",sender, sender.row, sender.col, 
														"select kdgiat, nmgiat  from uin_giat",
														"select count(*) from uin_giat",
														 new Array("kdgiat","nmgiat"),"and",new Array("Kode","Nama"),false);					
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataPP = new portalui_arrayMap();																										
							this.dataGiat = new portalui_arrayMap();																										
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataPP.set(line.kode_pp, line.nama);										
								}								
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataGiat.set(line.kdgiat, line.nmgiat);										
								}								
							}							
						}else throw result;
					break;						
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doChangeCells: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);	    					
		if (col == 0) {
			if (sender.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode PP "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCells");		
	},
	doChangeCell1: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);	    					
		if (col == 0) {
			if (sender.cells(0,row) != "") {
				var giat = this.dataGiat.get(sender.cells(0,row));
				if (giat) sender.cells(1,row,giat);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Kegiatan "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell1");		
	}
});