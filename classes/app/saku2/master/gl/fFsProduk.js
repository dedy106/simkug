window.app_saku2_master_gl_fFsProduk = function(owner)
{
	if (owner)
	{
		window.app_saku2_master_gl_fFsProduk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_master_gl_fFsProduk";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Versi Anggaran", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar");
			this.elokasi = new portalui_saiCBBL(this,{bound:[20,20,150,20],caption:"Lokasi", multiSelection:false,change:[this,"doEditChange"]});				
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode ", multiSelection:false,change:[this,"doEditChange"]});					
			this.e1 = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama "});
							
			this.cb1 = new portalui_checkBox(this,{bound:[120,23,120,20],caption:"Status Aktif"});			
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			this.elokasi.setText(this.app._lokasi);
			var lokasi = (this.app._userStatus == "A" ? "%" : this.app._lokasi);				
			this.elokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi like '"+lokasi+"' ",["kode_lokasi","nama"],undefined,["Kode","Nama"],"and","Data Lokasi");	
			this.e0.setSQL("select kode_fs, nama from fsproduk where kode_lokasi = '"+this.app._lokasi+"' ",["kode_fs","nama"],undefined,["Kode FS","Nama"],"and","Data Versi Laporan",false);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku2_master_gl_fFsProduk.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_saku2_master_gl_fFsProduk.implement({
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
		if (modalResult != mrOk) return;
		try{
			var status  = this.cb1.isSelected() ? '1': '0';
			switch (event)
			{
				case "clear" :
					this.e0.setText("");
					this.e0.setRightLabelCaption("");
					this.e1.setText("");												
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into fsproduk (kode_fs, kode_lokasi,nama,flag_status, tgl_input,nik_user ) values ('"+this.e0.getText()+"','"+this.app._lokasi+"','"+this.e1.getText()+"','"+status+"','"+(new Date).getDateStr()+"','"+this.app._userLog+"') ");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update fsproduk set nama = '"+this.e1.getText()+"',flag_status = '"+status+"',nik_user='"+this.app._userLog+"' where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						var rs = this.dbLib.runSQL("select kode_fs from neracaproduk where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						if (rs instanceof portalui_arrayMap)
							if (rs.getTag1() != 0)
								throw("kode fs ini sudah terpakai. tidak dapat dihapus");
						sql.add("delete from  fsproduk where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.e0.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){
		if (sender === this.elokasi){
			this.e0.setSQL("select kode_fs, nama from fsproduk where kode_lokasi = '"+this.app._lokasi+"' ",["kode_fs","nama"],undefined,["Kode FS","Nama"],"and","Data Versi Laporan",false);
		}
		if(sender == this.e0){
			if (this.e0.getText() != "")
			{
				try
				{			
					var data = this.dbLib.runSQL("select * from fsproduk where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ");
								
					if (data instanceof portalui_arrayMap)
					{				
						if (data.get(0) != undefined){
							this.e1.setText(data.get(0).get("nama"));
							this.e0.setRightLabelCaption(data.get(0).get("nama"));
							this.cb1.setSelected(data.get(0).get("flag_status") == '1'?true:false);								
							setTipeButton(tbUbahHapus);
						}else setTipeButton(tbSimpan);
					}else
						setTipeButton(tbSimpan);					
				}catch(e){
					system.alert(this, e,"");
				}
			}
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