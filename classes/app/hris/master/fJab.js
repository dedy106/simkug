window.app_hris_master_fJab = function(owner)
{
	if (owner)
	{
		window.app_hris_master_fJab.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_master_fJab";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jabatan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;checkBox");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this,{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doGenerate"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama", maxLength:100});		
		this.cb_klp = new saiCBBL(this,{bound:[20,13,200,20],caption:"Kelompok",multiSelection:false,maxLength:10});
		this.cb_komp = new saiCBBL(this,{bound:[20,14,200,20],caption:"Kode Kompetensi",multiSelection:false,maxLength:10});
		this.c_jenis = new saiCB(this,{bound:[20,15,180,20],caption:"Jenis Jab",readOnly:true,items:["MGR","NON"],tag:2}); 
		this.cb_aktif = new portalui_checkBox(this,{bound:[230,15,100,20],caption:"Status Aktif", selected:false});	
		this.bTampil = new button(this,{bound:[729,15,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,800,413],caption:"Daftar Jabatan"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,795,370],tag:9,readOnly:true,colTitle: ["Kode","Nama","Jenis","Kode Klp","Nama Kelompok","Flag Aktif","Kompetensi"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,388,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_klp.setSQL("select kode_klpjab, nama from gr_klpjab where kode_lokasi='"+this.app._lokasi+"'",["kode_klpjab","nama"],false,["Kode","Nama"],"and","Data Kelompok Jabatan",true);						
			this.cb_komp.setSQL("select kode_komp, nama from gr_komp where kode_lokasi='"+this.app._lokasi+"'",["kode_komp","nama"],false,["Kode","Nama"],"and","Data Kompetensi",true);						

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_master_fJab.extend(window.childForm);
window.app_hris_master_fJab.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var flag_aktif="0";
					if (this.cb_aktif.isSelected())
					{
						flag_aktif="1";
					}
					sql.add("insert into gr_jab(kode_jab,nama,kode_lokasi,jenis,kode_klpjab,flag_aktif,kode_komp) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.c_jenis.getText()+"','"+this.cb_klp.getText()+"','"+flag_aktif+"','"+this.cb_komp.getText()+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var flag_aktif="0";
					if (this.cb_aktif.isSelected())
					{
						flag_aktif="1";
					}
					sql.add("update gr_jab set nama = '"+this.e_nama.getText()+"',jenis='"+this.c_jenis.getText()+"',kode_klpjab='"+this.cb_klp.getText()+"',flag_aktif='"+flag_aktif+"',kode_komp='"+this.cb_komp.getText()+"' where kode_jab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from gr_jab where kode_jab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				this.cb_aktif.setSelected(false);
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
				this.cb_aktif.setSelected(false);
				var data = this.dbLib.getDataProvider("select a.nama,a.jenis,a.kode_klpjab,b.nama as nama_klp,a.flag_aktif,a.kode_komp,c.nama as nama_komp "+
				           " from gr_jab a inner join gr_klpjab b on a.kode_klpjab=b.kode_klpjab and a.kode_lokasi=b.kode_lokasi "+
						   "inner join gr_komp c on a.kode_komp=c.kode_komp and a.kode_lokasi=c.kode_lokasi "+
						   " where a.kode_jab ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.c_jenis.setText(line.jenis);
						this.cb_klp.setText(line.kode_klpjab,line.nama_klp);
						this.cb_komp.setText(line.kode_komp,line.nama_komp);
						if (line.flag_aktif=="1")
						{
							this.cb_aktif.setSelected(true);
						}
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
			var temp = this.dbLib.runSQL("select a.kode_jab,a.nama,a.jenis,b.kode_klpjab,b.nama as nama_klp,a.flag_aktif,c.nama as nama_komp "+
										"from gr_jab a inner join gr_klpjab b on a.kode_klpjab=b.kode_klpjab and a.kode_lokasi=b.kode_lokasi "+
										"inner join gr_komp c on a.kode_komp=c.kode_komp and a.kode_lokasi=c.kode_lokasi "+
			                             "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_jab");
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
			    this.standarLib.showListData(this, "Daftar Jabatan",sender,undefined, 
											  "select kode_jab, nama  from gr_jab where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_jab) from gr_jab where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_jab","nama"],"and",["Kode","Nama"],false);				
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
	},
	doGenerate:function(sender){
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_jab","kode_jab","","000"));
		this.e_nama.setFocus();
	}
});
