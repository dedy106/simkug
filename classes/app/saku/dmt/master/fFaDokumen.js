window.app_saku_dmt_master_fFaDokumen = function(owner){
	if (owner)
	{
		window.app_saku_dmt_master_fFaDokumen.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_master_fFaDokumen";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelengkapan Dokumen", 0);	
		
		uses("portalui_saiCBBL");		
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,11,185,20], caption:"Kode", text:"",rightLabelVisible:false});									
		this.ed_nama = new portalui_saiLabelEdit(this,{bound:[20,13,500,20], caption:"Nama Dokumen",lengthChar:150});		
		
		setTipeButton(tbSimpan);			
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");		
		this.ed_kode.onChange.set(this, "doChange");
		this.rearrangeChild(10, 23);
		this.setTabChildIndex();
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();					
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_dmt_master_fFaDokumen.extend(window.portalui_childForm);
window.app_saku_dmt_master_fFaDokumen.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, modalResult){	
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, [0],this.ed_kode);						
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into dmt_dokumen (kode,nama,kode_lokasi,nik_user,tgl_input)  values "+
								"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',now())");
						this.dbLib.execArraySQL(sql);	
					}catch(e){
						system.alert(this, e,"");
					}
				}
				break;
			case "ubah" :
				if (modalResult == mrOk)
				{
						uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add(" update dmt_dokumen set  "+
								" nama = '"+this.ed_nama.getText()+
								"' where kode='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.dbLib.execArraySQL(sql);	
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
					uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from dmt_dokumen where kode='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.dbLib.execArraySQL(sql);	
			   }
				break;
		}
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.ed_kode) 
			{
				this.standarLib.showListData(this, "Daftar Kelengkapan Dokumen",this.ed_kode,this.ed_nama, 
											  "select kode, nama  from dmt_dokumen where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode) from dmt_dokumen where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode","nama"],"and",["Kode","Nama Dokumen"],false);
				this.ed_nama.setText("");
			}		
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)					
		            {
		              this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nama.getText()+")");
		              this.app._mainForm.bClear.click();              
		            }else
				   	     system.info(this, result,"");
					break;
			}
		}
	},
	doChange: function(sender){
		if (sender.getText() != ""){
			var data = this.dbLib.getDataProvider("select nama from dmt_dokumen where kode = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data ="+data+";");
			if (typeof(data) == "object"){
				if (data.rs.rows[0] !== undefined){
					this.ed_nama.setText(data.rs.rows[0].nama);
					setTipeButton(tbUbahHapus);
				}else setTipeButton(tbSimpan);
			}else setTipeButton(tbSimpan);
		}
	}
});
