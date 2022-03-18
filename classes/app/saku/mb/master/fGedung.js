window.app_saku_mb_master_fGedung = function(owner)
{
	if (owner)
	{
		window.app_saku_mb_master_fGedung.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_mb_master_fGedung";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Gedung", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Gedung",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[225,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:150});		
		this.e_alamat = new portalui_saiLabelEdit(this,{bound:[20,12,600,20],caption:"Alamat", maxLength:150});		
		this.cb_kota = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Kota",btnClick:[this,"doBtnClick"]});
		this.cb_klp = new portalui_saiCBBL(this,{bound:[20,14,200,20],caption:"Kelompok",btnClick:[this,"doBtnClick"]});
		this.cb_kelas = new portalui_saiCB(this,{bound:[20,15,200,20],caption:"Kelas",items:["1","2","3","4"]});
		this.bTampil = new portalui_button(this,{bound:[829,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
		this.p1 = new portalui_panel(this);
		this.p1.setTop(16);
		this.p1.setWidth(900);
		this.p1.setLeft(10);
		this.p1.setHeight(358);
		this.p1.setCaption("Daftar Gedung");
		
		this.sg1 = new portalui_saiTable(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(895);
		this.sg1.setHeight(332);
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_mb_master_fGedung.extend(window.portalui_childForm);
window.app_saku_mb_master_fGedung.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into mb_gedung(kode_gedung,nama,alamat,kelas,kode_kota,kode_klpgedung,kode_lokasi) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.cb_kelas.getText()+"','"+this.cb_kota.getText()+"','"+this.cb_klp.getText()+"','"+this.app._lokasi+"')");
										
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update mb_gedung set nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',kelas='"+this.cb_kelas.getText()+"',kode_kota='"+this.cb_kota.getText()+"',kode_klpgedung='"+this.cb_klp.getText()+"' "+
						    "where kode_gedung = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
										
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from mb_gedung "+
						    "where kode_gedung = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
										
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);															
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
	doLoadClick: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider(" select a.nama,a.alamat,b.nama as nama_kota,c.nama as nama_klp,a.kelas,a.kode_kota,a.kode_klpgedung "+
				           "from mb_gedung a inner join mb_kota b on a.kode_kota=b.kode_kota and a.kode_lokasi=b.kode_lokasi "+
						   "                 inner join mb_gedung_klp c on a.kode_klpgedung = c.kode_klpgedung and a.kode_lokasi=c.kode_lokasi "+
					       " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_gedung ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.cb_kota.setText(line.kode_kota,line.nama_kota);
						this.cb_klp.setText(line.kode_klpgedung,line.nama_klp);
						this.cb_kelas.setText(line.kelas);
						setTipeButton(tbUbahHapus);
					}
					else
					{
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
			this.sg1.setColTitle(new Array("No","Kode Gedung","Nama","Kelompok","Alamat","Kota","Kelas"));				
			var data = this.dbLib.runSQL(" select a.kode_gedung,a.nama,b.nama as nama_klp,a.alamat,c.nama as nama_kota,a.kelas from mb_gedung a "+
					   " inner join mb_gedung_klp b on a.kode_klpgedung=b.kode_klpgedung and a.kode_lokasi = b.kode_lokasi "+
					   " inner join mb_kota c on a.kode_kota=c.kode_kota and a.kode_lokasi = c.kode_lokasi "+
					   " where a.kode_lokasi = '"+this.app._lokasi+"' ");
			this.sg1.clearAll();
			this.sg1.setData(data);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_kode) 
			{   
			    this.standarLib.showListData(this, "Daftar Gedung",sender,undefined, 
											  "select kode_gedung, nama  from mb_gedung where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_gedung) from mb_gedung where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_gedung","nama"],"and",["Kode Gedung","Nama"],false);				
			}
			if (sender == this.cb_klp) 
			{   
			    this.standarLib.showListData(this, "Daftar Kelompok Gedung",sender,undefined, 
											  "select kode_klpgedung, nama  from mb_gedung_klp where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_klpgedung) from mb_gedung_klp where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_klpgedung","nama"],"and",["Kode Klp Gedung","Nama"],false);				
			}
			if (sender == this.cb_kota) 
			{   
			    this.standarLib.showListData(this, "Daftar Kota",sender,undefined, 
											  "select kode_kota, nama  from mb_kota where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_kota) from mb_kota where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_kota","nama"],"and",["Kode Kota","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
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
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});