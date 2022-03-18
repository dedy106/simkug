window.app_saku_fa_transaksi_fFaAddInfo = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFaAddInfo.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFaAddInfo";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Informasi Tower", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker");
		uses("portalui_checkBox;portalui_selection"),uses("portalui_uploader");		
		this.e_fa = new portalui_saiCBBL(this, {bound:[20,8,200,20], caption :"Site Id"});				
		this.e_fa.onBtnClick.set(this,"doBtnClick");
		this.e_fa.onChange.set(this, "doChange");				
		this.e_long = new portalui_saiLabelEdit(this, {bound:[20, 11,200,20], caption:"Longitude", tipeText:ttNilai, alignment:alRight});		
		this.e_lat = new portalui_saiLabelEdit(this, {bound:[20, 12,200,20], caption:"Latitude", tipeText:ttNilai, alignment:alRight});		
		this.e_almt = new portalui_saiLabelEdit(this, {bound:[20, 13,500,20], caption:"Alamat"});		
		this.e_kota = new portalui_saiLabelEdit(this, {bound:[20, 14,200,20], caption:"Kota"});		
		this.e_tipe = new portalui_saiCB(this, {bound:[20, 15,200,20], caption:"Type"});
		this.e_tipe.addItem(0,"4-legs");
		this.e_tipe.addItem(1,"3-legs");
		this.e_tipe.addItem(2,"Monopole");	
		this.e_tinggi = new portalui_saiLabelEdit(this, {bound:[20, 16,200,20], caption:"Tinggi"});		
		this.e_site = new portalui_saiCB(this, {bound:[20, 17,200,20], caption:"Type Site"});	
		this.e_site.addItem(0,"Green Field");
		this.e_site.addItem(1,"Roof Top");
		this.e_site.addItem(2,"Colocation TSel");
		this.e_shelter = new portalui_saiCB(this, {bound:[20, 18,200,20], caption:"Shelter", mustCheck: false});	
		this.e_shelter.addItem(0,"3 x 2");
		this.e_shelter.addItem(1,"4 x 3");		
		this.e_pemelihara = new portalui_saiCBBL(this, {bound:[20,20,200,20], caption :"Pemeliharaan"});		
		this.e_pemelihara.onBtnClick.set(this,"doBtnClick");		
		this.cb_status = new portalui_checkBox(this,{bound:[20,21,200,20], caption :"Status(On/Off)"});
		this.l_layout = new portalui_saiLabelEdit(this,{bound:[20,22,200,20], caption :"Layout Site"});
		this.upl_layout = new portalui_uploader(this,{bound:[220,22,80,18],afterUpload:[this, "doAfterUpload"],param1:"uploadTo",param2:"server/media/",onChange:[this,"doFileChange"]});
		this.l_peta = new portalui_saiLabelEdit(this,{bound:[20,23,200,20], caption :"Peta Lokasi"});
		this.upl_peta = new portalui_uploader(this,{bound:[220,23,80,18],afterUpload:[this, "doAfterUpload"], param1:"uploadTo",param2:"server/media/",onChange:[this,"doFileChange"]});		
		this.l_dok = new portalui_label(this,{bound:[20,25,100,20], caption :"Batas Waktu IMB", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,25,100,20]});
		this.l_dok = new portalui_label(this,{bound:[20,26,100,20], caption :"Akhir Sewa Tanah", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,26,100,20]});
		this.l_dok = new portalui_label(this,{bound:[20,24,100,20], caption :"Kelengkapan Dok", underline:true});
		this.lb_dokumen = new portalui_selection(this,{bound:[120,24,180,100],multiple:"multiple", size:5});
		
		
		this.rearrangeChild(10, 23);
		systemAPI.flashIsReady = false;		
		//this.upl_scan = new portalui_uploader(this,{bound:[550,10,300,205],usingFlash:true, title:"Scan Dokumen", afterUpload:[this, "doAfterUpload"]});				
		this.p1 = new portalui_panel(this,{bound:[550,10,300,205],caption:"Upload Dokumen"});
		this.sgUpld = new portalui_saiGrid(this.p1,{bound:[1,20,298,180],colCount:2,colTitle:["Dokumen","Upload"],buttonStyle:[[1],[bsUpload]]});
		//systemAPI.obj = this.upl_scan;
		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{		    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
		    
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();						
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_fa);						
			this.dbLib.getDataProviderA("select kode, nama from dmt_dokumen");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFaAddInfo.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFaAddInfo.implement({
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
		
			if (this.standarLib.checkEmptyByTag(this, [0,1]))
			{
				try
				{				
					var files = this.upl_scan.getListFiles();
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from dmt_tower where no_fa = '"+this.e_fa.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("delete from dmt_kelengkapan where no_fa = '"+this.e_fa.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("delete from dmt_scandok where no_fa = '"+this.e_fa.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("insert into dmt_tower(no_fa, barcode, kode_lokasi, longitude, latitude, alamat, kota, tipe, tinggi, tipe_site, shelter, kode_cust, status, kode_vendor, gbr_layout, gbr_peta, batas_imb, akhir_sewa) "+
						"	values('"+this.e_fa.getText()+"', '-','"+this.app._lokasi+"', '"+parseNilai(this.e_long.getText())+"', '"+parseNilai(this.e_lat.getText())+"' "+
						"	,'"+this.e_almt.getText()+"', '"+this.e_kota.getText()+"','"+this.e_tipe.getText()+"','"+parseNilai(this.e_tinggi.getText())+"','"+this.e_site.getText()+"' "+
						"	, '"+this.e_shelter.getText()+"','-','"+(this.cb_status.selected ? "On" : "Off")+"', '"+this.e_pemelihara.getText()+"' "+
						" 	,'"+this.l_layout.getText()+"','"+this.l_peta.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"' )");			
					if (files.length > 0){
						var scan = "insert into dmt_scandok(no_fa, kode_lokasi, nama_file)values ";						
						var first = true;
						for (var i in files){							
							if (!first) scan +=",";
							scan += "('"+this.e_fa.getText()+"','"+this.app._lokasi+"','"+files[i].name+"')";
							first = false;
						}						
						sql.add(scan);										
					}
					var a = this.lb_dokumen.getSelectedTextAndId();
					if (a.getLength() > 0){
						var dok = "insert into dmt_kelengkapan(no_fa, kode_lokasi, kode_dok)values ";
						var first = true;
						for (var i in a.objList){
							if (!first) dok +=",";
							dok += "('"+this.e_fa.getText()+"','"+this.app._lokasi+"','"+i+"')";
							first = false;
						}	
						sql.add(dok);
					}					
					this.dbLib.execArraySQL(sql);	
					this.uplFile = 0;
					this.upl_layout.upload();
					this.upl_peta.upload();
					this.upl_scan.upload();
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_fa);															
				break;
			
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.e_fa)
			{
				this.standarLib.clearByTag(this, new Array("1"),undefined);				
				var line,data = this.dbLib.getDataProvider("select a.*, c.nama as nmpemelihara from dmt_tower a "+												
												"	left outer join dmt_vendor c on c.kode_vendor = a.kode_vendor and c.kode_lokasi = a.kode_lokasi "+
												" where a.no_fa='"+this.e_fa.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
				eval("data = "+data+";");
				if (typeof(data) == "object")
				{
					line = data.rs.rows[0];
					if (line != undefined){
						this.e_long.setText(line.longitude);
						this.e_lat.setText(line.latitude);
						this.e_almt.setText(line.alamat);
						this.e_kota.setText(line.kota);
						this.e_tipe.setText(line.tipe);
						this.e_tinggi.setText(line.tinggi);
						this.e_site.setText(line.tipe_site);
						this.e_shelter.setText(line.shelter);						
						this.e_pemelihara.setText(line.kode_vendor);
						this.e_pemelihara.setRightLabelCaption(line.nmpemelihara);
						this.l_layout.setText(line.gbr_layout);
						this.l_peta.setText(line.gbr_peta);
						this.cb_status.setSelected(line.status == "On");
						
						data = this.dbLib.getDataProvider("select a.kode_dok, b.nama "+
							" from dmt_kelengkapan a inner join dmt_dokumen b on b.kode = a.kode_dok and b.kode_lokasi = a.kode_lokasi "+
							"	where a.no_fa = '"+this.e_fa.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");						
						eval("data = "+data+";");	
						if (typeof(data) == "object"){
							var item = {};
							for (var i in data.rs.rows){
								item[data.rs.rows[i].kode_dok] = data.rs.rows[i].nama;
							}							
							this.lb_dokumen.setSelectedItems(item);
						}
					} 
				}
			}
		}catch(e){
			systemAPI.alert(e, data);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.e_fa) 
			{   
			    this.standarLib.showListData(this, "Daftar Tower",sender,undefined, 
											  "select no_fa, nama   from fa_asset where kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(no_fa) from fa_asset where kode_lokasi='"+this.app._lokasi+"' ",
											  ["no_fa","nama"],"and",["Site ID","Deskripsi"],false);				
			}			
			if (sender == this.e_pemelihara) 
			{   
			    this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
											  "select kode_vendor, nama   from dmt_vendor where kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(kode_vendor) from dmt_vendor where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_vendor","nama"],"and",["Kode Vendor","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Site ID : "+ this.e_fa.getText()+").. waiting upload");							
						}else system.info(this,result,"");
	    			break;
					case "getDataProvider": 
						eval("var data = "+result+";");
						if (typeof(data) == "object"){
							var item = {};
							for (var i in data.rs.rows){
								item[data.rs.rows[i].kode] = data.rs.rows[i].nama;								
							}
							this.lb_dokumen.setItems(item);
						}
					break;
	      		break;
	    		}    		
			}
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doAfterUpload: function(sender, result, data, filename){
		if (result){
			this.app._mainForm.pesan(2,"upload file "+filename+" sukses");							
			this.uplFile++;
			if (this.uplFile == 3) this.app._mainForm.bClear.click();              
		}else{
			systemAPI.alert("Gagal upload file");
		}
	},
	doFileChange: function(sender, filename, result, data){
		if (sender == this.upl_layout) this.l_layout.setText(filename);
		if (sender == this.upl_peta) this.l_peta.setText(filename);
	}
});
