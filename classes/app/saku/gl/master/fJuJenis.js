window.app_saku_gl_master_fJuJenis = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_master_fJuJenis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_master_fJuJenis";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis JU", 0);	
		
//------------------------------------------------------------------------
		uses("portalui_saiCBBL");
		this.elokasi = new portalui_saiCBBL(this);
		this.elokasi.setTop(20);
		this.elokasi.setLeft(20);
		this.elokasi.setWidth(150);
		this.elokasi.setCaption("Lokasi");
		this.elokasi.onBtnClick.set(this,"FindBtnClick");		
		
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(45);
		this.e0.setWidth(200);
		this.e0.setCaption("Kode Jenis");
		this.e0.setText("");
		this.e0.setReadOnly(false);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100);
		this.e0.setRightLabelVisible(false);
		this.e0.setRightLabelCaption(" ");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(70);
		this.e1.setWidth(400);
		this.e1.setCaption("Nama Jenis");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e){
			alert(e);
		}
	}
};
window.app_saku_gl_master_fJuJenis.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_saku_gl_master_fJuJenis.implement({
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
	doModalResult: function(event, modalResult){
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.e0.setText("");
					this.e0.setRightLabelCaption("");
					this.e1.setText("");				
					
				}
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					try
					{
						/*var status  = '0';
						if (this.cb1.isSelected())
							status = '1';*/
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into ju_jenis (kode_jenis, nama, kode_lokasi) values ('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.elokasi.getText()+"') ");
						this.dbLib.execArraySQL(sql);	
					}catch(e){
						system.alert(this, e,"");
					}
				}
				break;
			case "ubah" :
				if (modalResult == mrOk)
				{
					try
					{
						var status  = '0';
						if (this.cb1.isSelected())
							status = '1';
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update ju_jenis set nama = '"+this.e1.getText()+"'  where kode_jenis= '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
						this.dbLib.execArraySQL(sql);	
					}catch(e){
						system.alert(this, e,"");
					}
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
				    try
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from  ju_jenis where kode_jenis = '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
						this.dbLib.execArraySQL(sql);	
					}catch(e){
						system.alert(this, e,"");
					}
			   }
				break;
		}
		this.e0.setFocus();
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){	
	   var data = this.dbLib.getDataProvider("select nama from ju_jenis where kode_lokasi = '"+this.app._lokasi+"' and kode_jenis = '"+sender.getText()+"' ",true);
	   if (typeof data != "string"){
	       if (data.rs.rows[0] != undefined) setTipeButton(tbUbahHapus);   
	       else setTipeButton(tbSimpan);
       }	   
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.elokasi){
				var lokasi = this.app._lokasi;
				if (this.app._userStatus == "A") lokasi = "%";
				this.standarLib.showListData(this, "Data Lokasi",sender,undefined, 
											  "select kode_lokasi, nama from lokasi where kode_lokasi like '"+lokasi+"'","select count(*) from lokasi where kode_lokasi like '"+lokasi+"'",
											  new Array("kode_lokasi","nama"),"and",new Array("Kode Lokasi","Nama"));
			}if (sender == this.e0)
				this.standarLib.showListData(this, "Data Versi Cash Flow",sender,this.e1, 
											  "select kode_jenis, nama from ju_jenis where kode_lokasi = '"+this.elokasi.getText()+"' ",
											  "select count(*) from ju_jenis where kode_lokasi = '"+this.elokasi.getText()+"' ",
											  new Array("kode_jenis","nama"),"and",new Array("Kode Jenis","Nama"));
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
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});
