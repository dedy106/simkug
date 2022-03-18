window.app_saku_inventory_master_fKlpbrg = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_master_fKlpbrg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_master_fKlpbrg";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kelompok Barang", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Kelompok",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[225,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:50});		
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,12,200,20],caption:"Akun Persediaan",btnClick:[this,"doBtnClick"]});
		this.cb_hpp = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Akun HPP",btnClick:[this,"doBtnClick"]});
		this.cb_jual = new portalui_saiCBBL(this,{bound:[20,14,200,20],caption:"Akun Penjualan",btnClick:[this,"doBtnClick"]});
		this.cb_beli = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Akun Pembelian",btnClick:[this,"doBtnClick"]});		
		this.bTampil = new portalui_button(this,{bound:[829,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});			
		
		this.p1 = new portalui_panel(this,{bound:[10,17,900,400],caption:"Daftar Kelompok Barang"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,374],tag:"9"});		
	
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
window.app_saku_inventory_master_fKlpbrg.extend(window.portalui_childForm);
window.app_saku_inventory_master_fKlpbrg.implement({
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
					sql.add("insert into inv_brg_klp(kode_klpbrg,nama,kode_akun,akun_hpp,kode_lokasi,akun_jual,akun_beli) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_hpp.getText()+"','"+this.app._lokasi+"','"+this.cb_jual.getText()+"','"+this.cb_beli.getText()+"')");
										
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
					sql.add("update inv_brg_klp set nama = '"+this.e_nama.getText()+"',kode_akun='"+this.cb_akun.getText()+"',akun_hpp='"+this.cb_hpp.getText()+"', "+
				 	        "                       akun_jual='"+this.cb_jual.getText()+"',akun_beli='"+this.cb_beli.getText()+"' "+
						    "where kode_klpbrg = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
										
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
					sql.add("delete from inv_brg_klp "+
						    "where kode_klpbrg = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
										
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
				break;
			case "simpan" :	
			    var data = this.dbLib.getDataProvider("select kode_akun from inv_brg_klp where kode_lokasi = '"+this.app._lokasi+"' and akun_hpp<>'"+this.cb_hpp.getText()+"' ");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						systemAPI.alert(this,"Transaksi tidak valid.","Data Akun HPP tidak konsisten dengan data sebelumnya.");
						return false;
					}
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				var data = this.dbLib.getDataProvider("select kode_akun from inv_brg_klp where kode_lokasi = '"+this.app._lokasi+"' and akun_hpp<>'"+this.cb_hpp.getText()+"' ");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						systemAPI.alert(this,"Transaksi tidak valid.","Data Akun HPP tidak konsisten dengan data sebelumnya.");
						return false;
					}
				}
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
				var data = this.dbLib.getDataProvider(" select a.nama,a.kode_akun,b.nama as nama_akun,a.akun_hpp,c.nama as nama_hpp,a.akun_jual,a.akun_beli,e.nama as nama_jual,g.nama as nama_beli "+
				           "from inv_brg_klp a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						   "                   inner join masakun c on a.akun_hpp=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						   "                   inner join masakun e on a.akun_jual=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
						   "                   inner join masakun g on a.akun_beli=g.kode_akun and a.kode_lokasi=g.kode_lokasi "+
					       " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpbrg ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.e_nama.setText(line.nama);
						this.cb_akun.setText(line.kode_akun,line.nama_akun);
						this.cb_hpp.setText(line.akun_hpp,line.nama_hpp);
						this.cb_jual.setText(line.akun_jual,line.nama_jual);
						this.cb_beli.setText(line.akun_beli,line.nama_beli);
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
			this.sg1.setColTitle(new Array("No","Kode Kelompok","Nama Kelompok","Akun Persd.","Nama Akun","Akun HPP.","Nama Akun","Akun Piutang","Nama Akun","Akun Penjualan","Nama Akun","Akun Hutang","Nama Akun","Akun Pembelian","Nama Akun"));				
			var data = this.dbLib.runSQL(" select a.kode_klpbrg, a.nama, a.kode_akun, b.nama as nama_akun,a.akun_hpp, c.nama as nama_hpp, "+
					   "                 a.akun_jual,a.akun_beli,e.nama as nama_jual,g.nama as nama_beli "+
			           " from inv_brg_klp a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "                    inner join masakun c on a.akun_hpp=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					   "                    inner join masakun e on a.akun_jual=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
					   "                    inner join masakun g on a.akun_beli=g.kode_akun and a.kode_lokasi=g.kode_lokasi "+
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
			    this.standarLib.showListData(this, "Daftar Kelompok Barang",sender,undefined, 
											  "select kode_klpbrg, nama  from inv_brg_klp where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_klpbrg) from inv_brg_klp where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_klpbrg","nama"],"and",["Kode Klp","Nama"],false);				
			}
			if (sender == this.cb_akun) 
			{   
			    this.standarLib.showListData(this, "Daftar Akun Persediaan Barang",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='005' ",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='005' ",
											  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"],false);				
			}
			if (sender == this.cb_hpp) 
			{   
			    this.standarLib.showListData(this, "Daftar Akun HPP",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='027' ",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='027' ",
											  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"],false);				
			}
			if (sender == this.cb_jual) 
			{   
			    this.standarLib.showListData(this, "Daftar Akun Penjualan",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022' ",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022' ",
											  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"],false);				
			}
			if (sender == this.cb_beli) 
			{   
			    this.standarLib.showListData(this, "Daftar Akun Pembelian",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='027' ",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='027' ",
											  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"],false);				
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