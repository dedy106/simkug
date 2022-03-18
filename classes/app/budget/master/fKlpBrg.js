/**
 * @author dweexfuad
 */
window.app_budget_master_fKlpBrg = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fKlpBrg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fKlpBrg";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Barang", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar");
			this.elokasi = new portalui_saiCBBL(this,{bound:[20,20,150,20],caption:"Lokasi", multiSelection:false,change:[this,"doEditChange"]});				
			this.eKd = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode", multiSelection:false,change:[this,"doEditChange"]});							
			this.eNama = new portalui_saiCBBL(this,{bound:[20,25,400,20],caption:"Nama"});
			this.eAkun = new portalui_saiLabelEdit(this,{bound:[20,23,400,20],caption:"Akun Pers."});
			this.eJns = new portalui_saiLabelEdit(this,{bound:[20,27,200,20], caption:"Jenis"});			
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
			this.eKd.setSQL("select kode_klpbrg, nama from agg_barang_klp where kode_lokasi = '"+this.app._lokasi+"' ",["kode_klpbrg","nama"],undefined,["Kode Var","Nama"],"and","Data Variabel",false);
			this.eAkun.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],undefined,["Kode Var","Nama"],"and","Data Akun",false);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fKlpBrg.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fKlpBrg.implement({
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
						sql.add("insert into agg_barang_klp (kode_klpbrg, kode_lokasi,nama ) values ('"+this.e0.getText()+"','"+this.app._lokasi+"','"+this.e1.getText()+"') ");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_barang_klp set nama = '"+this.e1.getText()+"'where kode_klpbrg = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from  agg_barang_klp where kode_klpbrg = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
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
			this.e0.setSQL("select kode_klpbrg, nama from agg_barang_klp where kode_lokasi = '"+this.app._lokasi+"' ",["kode_klpbrg","nama"],undefined,["Kode Band","Nama"],"and","Data Program Kerja",false);
		}
		if(sender == this.e0){
			if (this.e0.getText() != "")
			{
				try
				{			
					var data = this.dbLib.runSQL("select * from agg_barang_klp where kode_klpbrg = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ");
								
					if (data instanceof portalui_arrayMap)
					{				
						if (data.get(0) != undefined){
							this.e1.setText(data.get(0).get("nama"));
							this.e0.setRightLabelCaption(data.get(0).get("nama"));							
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