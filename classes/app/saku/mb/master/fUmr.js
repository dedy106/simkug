window.app_saku_mb_master_fUmr = function(owner)
{
	if (owner)
	{
		window.app_saku_mb_master_fUmr.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_mb_master_fUmr";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","UMR", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kota",btnClick:[this,"doBtnClick"],readOnly:true});
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,11,150,20],caption:"Tahun",maxLength:4,tipeText:ttAngka,alignment:alRight,tag:1});		
		this.bLoad = new portalui_imageButton(this,{bound:[175,11,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"Nilai",textLength:15,tipeText:ttNilai});		
		this.bTampil = new portalui_button(this,{bound:[429,12,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
						
		this.p1 = new portalui_panel(this);
		this.p1.setTop(13);
		this.p1.setWidth(500);
		this.p1.setLeft(10);
		this.p1.setHeight(415);
		this.p1.setCaption("Daftar UMR");
		
		this.sg1 = new portalui_saiTable(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(495);
		this.sg1.setHeight(389);
		
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
			
			this.e_tahun.setText(this.app._periode.substr(0,4));
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_mb_master_fUmr.extend(window.portalui_childForm);
window.app_saku_mb_master_fUmr.implement({
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into mb_umr(kode_kota,tahun,nilai,kode_lokasi) values "+
						    "	('"+this.cb_kode.getText()+"',"+this.e_tahun.getText()+","+parseNilai(this.e_nilai.getText())+",'"+this.app._lokasi+"')");
										
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
			if (this.standarLib.checkEmptyByTag(this, [0,1]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add(" update mb_umr set nilai = "+parseNilai(this.e_nilai.getText())+
						    " where kode_kota = '"+this.cb_kode.getText()+"' and tahun = "+parseNilai(this.e_tahun.getText())+" and kode_lokasi = '"+this.app._lokasi+"'");
										
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
					sql.add("delete from mb_umr "+
						    "where kode_kota = '"+this.cb_kode.getText()+"' and tahun = "+parseNilai(this.e_tahun.getText())+" and kode_lokasi = '"+this.app._lokasi+"'");
										
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
				var data = this.dbLib.getDataProvider(" select nilai from mb_umr "+
					       " where kode_lokasi = '"+this.app._lokasi+"' and tahun = "+parseNilai(this.e_tahun.getText())+" and kode_kota ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.e_nilai.setText(floatToNilai(parseFloat(line.nilai)));
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
			if (this.e_tahun.getText() != "")
			{
				this.sg1.setColTitle(new Array("No","Kota","Tahun","Nilai UMR"));				
				var data = this.dbLib.runSQL(" select b.nama as nama_kota,a.tahun,a.nilai from mb_umr a inner join mb_kota b on a.kode_kota=b.kode_kota and a.kode_lokasi=b.kode_lokasi "+
						   " where a.kode_lokasi = '"+this.app._lokasi+"' and a.tahun='"+parseNilai(this.e_tahun.getText())+"' order by b.nama");
				this.sg1.clearAll();
				this.sg1.setData(data);
			} 
			else{
				throw("Data tahun harus diisi.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_kode) 
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