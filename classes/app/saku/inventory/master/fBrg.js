window.app_saku_inventory_master_fBrg = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_master_fBrg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_master_fBrg";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Master Barang", 0);	
		
		uses("portalui_saiCBBL;portalui_saiCBB;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Barang",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[225,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:150});		
		this.e_tipe = new portalui_saiLabelEdit(this,{bound:[20,12,600,20],caption:"Tipe", maxLength:150});		
		this.cb_klp = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Kelompok",btnClick:[this,"doBtnClick"]});
		this.cb_sat = new portalui_saiCB(this,{bound:[20,14,200,20],caption:"Satuan",mustCheck: false});
		this.e_harga = new portalui_saiLabelEdit(this,{bound:[20,15,200,20],caption:"Harga Jual",maxLength:15,tipeText:ttNilai,text:"0"});		
		this.bTampil = new portalui_button(this,{bound:[829,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
		this.p1 = new portalui_panel(this,{bound:[10,16,900,343],caption:"Daftar Master Barang"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,320],tag:"9"});		
		
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
			var data = this.dbLib.runSQL("select distinct sat from inv_brg where kode_lokasi = '"+this.app._lokasi+"' ");
			this.cb_sat.setItem(data);
			
			var prd = this.dbLib.getDataProvider("select distinct sat from inv_brg where kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].sat);			
				this.cb_sat.setItem(new portalui_arrayMap({items:items}));
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_inventory_master_fBrg.extend(window.portalui_childForm);
window.app_saku_inventory_master_fBrg.implement({
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
					sql.add("insert into inv_brg(kode_brg,nama,tipe,kode_klpbrg,sat,harga,kode_lokasi) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_tipe.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_sat.getText()+"',"+parseNilai(this.e_harga.getText())+",'"+this.app._lokasi+"')");
										
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
					sql.add("update inv_brg set nama='"+this.e_nama.getText()+"',tipe='"+this.e_tipe.getText()+"',kode_klpbrg='"+this.cb_klp.getText()+"',sat='"+this.cb_sat.getText()+"',harga="+parseNilai(this.e_harga.getText())+" "+
						    "where kode_brg = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
										
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
					sql.add("delete from inv_brg "+
						    "where kode_brg = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
										
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
				setTipeButton(tbAllFalse);
				var prd = this.dbLib.getDataProvider("select distinct sat from inv_brg where kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof prd == "object"){						
					var items = [];
					for (var i in prd.rs.rows) items.push(prd.rs.rows[i].sat);			
					this.cb_sat.setItem(new portalui_arrayMap({items:items}));
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
		}
	},
	doLoadClick: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider(" select a.nama,a.tipe,b.nama as nama_klp,a.sat,a.harga,a.kode_klpbrg "+
				           " from inv_brg a inner join inv_brg_klp b on a.kode_klpbrg = b.kode_klpbrg and a.kode_lokasi=b.kode_lokasi "+
					       " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_brg ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.e_nama.setText(line.nama);
						this.e_tipe.setText(line.tipe);
						this.cb_klp.setText(line.kode_klpbrg,line.nama_klp);
						this.cb_sat.setText(line.sat);
						this.e_harga.setText(floatToNilai(parseFloat(line.harga)));
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
			this.sg1.setColTitle(new Array("No","Kode Brg","Nama","Tipe","Kelompok","Satuan","Harga Jual"));				
			var data = this.dbLib.runSQL(" select a.kode_brg,a.nama,a.tipe,b.nama as nama_klp,a.sat,a.harga from inv_brg a "+
					   " inner join inv_brg_klp b on a.kode_klpbrg=b.kode_klpbrg and a.kode_lokasi = b.kode_lokasi "+
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
			    this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
											  "select kode_brg, nama  from inv_brg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from inv_brg where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_brg","nama"],"and",["Kode Barang","Nama"],false);				
			}
			if (sender == this.cb_klp) 
			{   
			    this.standarLib.showListData(this, "Daftar Kelompok Barang",sender,undefined, 
											  "select kode_klpbrg, nama  from inv_brg_klp where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_klpbrg) from inv_brg_klp where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_klpbrg","nama"],"and",["Kode Klp Barang","Nama"],false);				
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