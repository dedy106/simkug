window.app_rra_master_fKaryawan = function(owner)
{
	if (owner)
	{
		window.app_rra_master_fKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_master_fKaryawan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;checkBox");
		
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama",maxLength:100});	
		this.cb_jab = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Jabatan",tag:2});
		this.cb_gubis = new saiCBBL(this,{bound:[20,1,200,20], caption:"GUBIS",multiSelection:false, change:[this,"doChange"],
			sql:["select kode_gubis, nama from rra_gubis where kode_lokasi ='"+this.app._lokasi+"' ", ["kode_gubis","nama"],false,["Kode","Nama"],"and","Daftar GUBIS",true]
		});
		this.cb_ubis = new saiCBBL(this,{bound:[20,2,200,20], caption:"UBIS",multiSelection:false, change:[this,"doChange"]});
		this.cb_ba = new saiCBBL(this,{bound:[20,3,200,20], caption:"BA", multiSelection:false, btnVisible:true,
			sql:["select kode_ba, nama from rra_ba where kode_lokasi ='"+this.app._lokasi+"' ", ["kode_ba","nama"],false,["Kode","Nama"],"and","Daftar BA",true]
		});
		this.cb_cc = new saiCBBL(this,{bound:[20,2,200,20], caption:"Cost Center",multiSelection:false, change:[this,"doChange"]});
		this.e_email = new saiLabelEdit(this,{bound:[20,5,400,20], caption:"Email"});
		this.cb_email = new checkBox(this,{bound:[430,5,120,20],caption:"Menerima Notifikasi"});
		this.e_mobile = new saiLabelEdit(this, {bound:[20,6,400,20], caption:"No Telepon", tipeText: ttAngka});
		this.cb_mobile = new checkBox(this,{bound:[430,6,120,20],caption:"Menerima Notifikasi"});
		this.cb_kota = new saiCBBL(this,{bound:[20,4,200,20], caption:"Kota",multiSelection:false,
			sql:["select kode_kota, nama from rra_kota  ", ["kode_kota","nama"],false,["Kode","Nama"],"and","Daftar Kota",true]
		});
		this.cb_sts = new saiCB(this,{bound:[20,5,200,20], caption:"Status",items:["UBIS","GUBIS","MA","FC"]});		
	
		this.bTampil = new button(this,{bound:[529,5,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,600,250],caption:"Daftar Karyawan"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,595,200],tag:9,readOnly:true,colTitle: ["NIK","Nama","Jabatan","Kode GUBIS","GUBIS","Kode UBIS","UBIS","Kode BA","BA","Kode Kota","Kota","Status","Email","No Telp","CC"], dblClick:[this,"doDblClick"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,223,595,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		this.e_cari = new saiLabelEdit(this.sgn,{bound:[308,2,220,20],caption:"Cari", labelWidth:50,tag:100, keyDown:[this,"doCariKeyDown"] } );
		this.ib_cari = new button(this.sgn,{bound:[560,2,25,20],icon:"image/cursor.gif",caption:" ", click:[this,"doFind"]});
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = this.app.dbLib;
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();
			
			//this.cb_jab.setSQL("select kode_jab, nama from rra_jab where kode_lokasi='"+this.app._lokasi+"'",["kode_jab","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);
			this.cb_ubis.setSQL("select kode_ubis, nama from rra_ubis where kode_lokasi ='"+this.app._lokasi+"'  ", ["kode_ubis","nama"],false,["Kode","Nama"],"and","Daftar UBIS",true);				
			this.cb_cc.setSQL("select kode_cc, nama from rra_cc where kode_lokasi ='"+this.app._lokasi+"' ", ["kode_cc","nama"],false,["Kode","Nama"],"and","Daftar Cost Center",true);				
			this.onClose.set(this,"doClose");			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_master_fKaryawan.extend(window.childForm);
window.app_rra_master_fKaryawan.implement({
	doClose: function(){
		this.dbLib.delListener(this);
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
	isEmailValid: function(email){
		var isEmailValid = true;
		if (this.cb_email.isSelected()){
			isEmailValid = email.indexOf("@") > -1;
			if (isEmailValid){
				email = email.split("@");
				isEmailValid = trim(email[0]) != "";
				if (isEmailValid){
					isEmailValid = email[1].indexOf(".") > -1;
					if (isEmailValid){
						var site = email[1].split(".");					
						isEmailValid = site.length > 1;
					}
				}
			}
			if (!isEmailValid){
				system.alert(this,"Email tidak valid",this.e_email.getText());
				this.e_email.setFocus();
				return false;
			}
			
		}
		return isEmailValid;
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{
					var sts1 = this.cb_email.isSelected() ? "1" : "0";
					var sts2 = this.cb_mobile.isSelected() ? "1" : "0";					
					
					if (!this.isEmailValid(this.e_email.getText())){
						return;
					}					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					
					sql.add("insert into rra_karyawan(nik,nama,jabatan, kode_gubis, kode_ubis, kode_ba, kode_kota, status, kode_lokasi, email, no_telp, sts_email, sts_telp, kode_cc) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_jab.getText()+"','"+this.cb_gubis.getText()+"','"+this.cb_ubis.getText()+"','"+this.cb_ba.getText()+"', '"+this.cb_kota.getText()+"','"+this.cb_sts.getText()+"','"+this.app._lokasi+"','"+this.e_email.getText()+"','"+this.e_mobile.getText()+"','"+sts1+"','"+sts2+"','"+this.cb_cc.getText()+"')");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
					var sts1 = this.cb_email.isSelected() ? "1" : "0";
					var sts2 = this.cb_mobile.isSelected() ? "1" : "0";					
					
					if (!this.isEmailValid(this.e_email.getText())){
						return;
					}
					sql.add("update rra_karyawan set nama = '"+this.e_nama.getText()+"', jabatan='"+this.cb_jab.getText()+"' "+
						" 	, kode_gubis='"+this.cb_gubis.getText()+"', kode_ubis='"+this.cb_ubis.getText()+"', kode_ba ='"+this.cb_ba.getText()+"' "+
						"	, kode_kota = '"+this.cb_kota.getText()+"', status = '"+this.cb_sts.getText()+"' "+
						"	, email = '"+this.e_email.getText()+"', no_telp='"+this.e_mobile.getText()+"', sts_email='"+sts1+"' "+
						"	, sts_telp='"+sts2+"', kode_cc = '"+this.cb_cc.getText()+"' "+
						"  where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
					sql.add("delete from rra_karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
			if (sender == this.cb_gubis){
				//this.cb_ubis.setSQL("select kode_ubis, nama from rra_ubis where kode_lokasi ='"+this.app._lokasi+"' and kode_gubis = '"+sender.getText()+"' ", ["kode_ubis","nama"],false,["Kode","Nama"],"and","Daftar UBIS",true);				
			}
			if (sender == this.cb_ubis){
				this.cb_cc.setSQL("select kode_cc, nama from rra_cc where kode_lokasi ='"+this.app._lokasi+"' and kode_ubis = '"+sender.getText()+"' ", ["kode_cc","nama"],false,["Kode","Nama"],"and","Daftar Cost Center",true);				
								
			}
			if (sender == this.cb_kode){
				if (this.cb_kode.getText() != ""){
					var data = this.dbLib.getDataProvider("select a.nama,a.kode_jab,a.jabatan, a.kode_gubis, a.kode_ubis, a.kode_ba, a.kode_kota, a.status, email, no_telp, sts_email, sts_telp, kode_cc "+
							   " from rra_karyawan a where a.nik ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.cb_ubis.onChange.set(this,undefined);
							this.e_nama.setText(line.nama);
							//this.cb_jab.setText(line.kode_jab,line.nama_jab);							
							this.cb_jab.setText(line.jabatan);
							this.cb_gubis.setText(line.kode_gubis);
							this.cb_ubis.setText(line.kode_ubis);
							this.cb_ba.setText(line.kode_ba);
							this.cb_sts.setText(line.status);
							this.cb_kota.setText(line.kode_kota);
							this.e_email.setText(line.email);
							this.e_mobile.setText(line.no_telp);
							this.cb_email.setSelected(line.sts_email == "1");
							this.cb_mobile.setSelected(line.sts_telp == "1");
							this.cb_cc.setText(line.kode_cc);
							this.cb_ubis.onChange.set(this,"doChange");
							setTipeButton(tbUbahHapus);
						}
						else{
							setTipeButton(tbSimpan);
						}
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select a.nik,a.nama,a.jabatan "+
				" 	,a.kode_gubis "+
				"	,c.nama as nmgubis,a.kode_ubis,  d.nama as nmubis,a.kode_ba,  e.nama as nmba, a.kode_kota,f.nama as nmkota, a.status, a.email, a.no_telp, a.kode_cc "+
				"	from rra_karyawan a "+//inner join rra_jab b on a.kode_jab=b.kode_jab 
				"	inner join rra_gubis c on c.kode_gubis = a.kode_gubis and c.kode_lokasi = a.kode_lokasi "+
				"	inner join rra_ubis d on d.kode_ubis = a.kode_ubis and d.kode_lokasi = a.kode_lokasi "+
				"	inner join rra_ba e on e.kode_ba = a.kode_ba and e.kode_lokasi = a.kode_lokasi "+
				"	inner join rra_kota f on f.kode_kota = a.kode_kota  "+
				" where a.kode_lokasi='"+this.app._lokasi+"' order by a.nik");			
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
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from rra_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(nik) from rra_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["nik","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
	},
	doRequestReady: function(sender, methodName, result, callObj, conn){
		if (sender == this.dbLib && callObj == this){
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
	},
	doDblClick: function(sender, col, row){
		this.cb_kode.setText(sender.cells(0, row));
	},
	doFind: function(){
		try{			
			var temp = this.dbLib.runSQL("select a.nik,a.nama,a.jabatan "+
				" 	,a.kode_gubis "+
				"	,c.nama as nmgubis,a.kode_ubis,  d.nama as nmubis,a.kode_ba,  e.nama as nmba, a.kode_kota,f.nama as nmkota, a.status, a.email, a.no_telp, a.kode_cc "+
				"	from rra_karyawan a "+//inner join rra_jab b on a.kode_jab=b.kode_jab 
				"	inner join rra_gubis c on c.kode_gubis = a.kode_gubis and c.kode_lokasi = a.kode_lokasi "+
				"	inner join rra_ubis d on d.kode_ubis = a.kode_ubis and d.kode_lokasi = a.kode_lokasi "+
				"	inner join rra_ba e on e.kode_ba = a.kode_ba and e.kode_lokasi = a.kode_lokasi "+
				"	inner join rra_kota f on f.kode_kota = a.kode_kota  "+
				" where a.kode_lokasi='"+this.app._lokasi+"' and "+
				" ( upper(a.nama) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				"   upper(nik) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				"   upper(a.kode_cc) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				"   upper(a.kode_ba) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				"   upper(a.kode_ubis) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				"   upper(a.kode_gubis) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				"   upper(c.nama) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				"   upper(d.nama) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				"   upper(e.nama) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				" 	upper(jabatan) like '%"+this.e_cari.getText().toUpperCase()+"%' ) order by a.nik");
			
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
	doCariKeyDown: function(sender, keyCode, buttonState){
		if (keyCode == 13){
			this.doFind();
			return false;
		}
	}
});
