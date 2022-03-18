window.app_assetsap_transaksi_fClosing = function(owner)
{
	if (owner)
	{
		window.app_assetsap_transaksi_fClosing.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_transaksi_fClosing";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Aplikasi", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		try
		{		
			uses("util_standar");
			this.ed_periode = new saiLabelEdit(this, {
				bound: [20, 10, 200, 20],
				caption: "Periode",
				text: this.app._periode			
			});			
	
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);							
			this.app._mainForm.bSimpan.setCaption("Close");
			
			this.setTabChildIndex();		
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.onClose.set(this,"doClose");
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fClosing.extend(window.childForm);
//------------------------------------------------------------------ event
window.app_assetsap_transaksi_fClosing.implement({
	doClose: function(sender){
		this.app._mainForm.bSimpan.setCaption("<u>S</u>impan");
	},
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
		try{					
			switch (event)
			{
				case "clear" :
					if (modalResult == mrOk)
					{
						this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);				
					}
					break;
				case "simpan" :
					if (modalResult == mrOk)
					{
						
							uses("server_util_arrayList");
							sql = new server_util_arrayList();							
							
							sql.add("insert into amu_asset_h select * from amu_asset where periode = '"+this.app._periode+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add("delete from amu_asset where periode = '"+this.app._periode+"' and kode_lokasi = '"+this.app._lokasi+"'");
							this.dbLib.execArraySQL(sql);							
					}
					break;
				case "ubah" :
					if (modalResult == mrOk)
					{
							uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("update amu_aplikasi set  "+
									"nama = '"+this.ed_nama.getText()+"' "+
									"where kode_aplikasi = '"+this.ed_kode.getText()+"' ");
							this.dbLib.execArraySQL(sql);	
					}
					break;
				case "hapus" :
				   if (modalResult == mrOk)
				   {
						uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("delete from amu_aplikasi where kode_aplikasi='"+this.ed_kode.getText()+"' ");
							this.dbLib.execArraySQL(sql);	
				   }
					break;
			}			
		}
		catch(e)
		{
			system.alert(this, e,"");
		}	
	},
	doEditChange: function(sender){		
		if (sender == this.ed_kode) 
		{
			if (this.ed_kode.getText() != "")
			{
				try
				{					
					uses("server_util_arrayMap");
					var data = this.dbLib.getDataProvider("select nama "+
													"from amu_aplikasi a "+
													"where kode_aplikasi = '"+this.ed_kode.getText()+"' ",true);
					if (typeof data != "string"){
						if  (data.rs.rows[0]) {
							var line = data.rs.rows[0];
							this.ed_nama.setText(line.nama);													
							setTipeButton(tbUbahHapus);
						}else{	
							this.ed_nama.setText("");
							setTipeButton(tbSimpan);
						}
					}else{	
					  this.ed_nama.setText("");
					  setTipeButton(tbSimpan);
					}
				}catch(e){
					system.alert(this, e,"");
				}
			}
		} 
	},
	FindBtnClick: function(sender, event){				
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)					
					{
					  this.app._mainForm.pesan(2,"Transaksi sudah diclosing ("+ this.ed_periode.getText()+")");
					  this.app._mainForm.bClear.click();          
					  //this.app._periode = this.standarLib.getNextPeriode(this.ed_periode.getText());
					}else
						 system.alert(this, result,"");
					break;
			}
		}
	}
});
