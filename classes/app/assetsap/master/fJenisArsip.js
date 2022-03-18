window.app_assetsap_master_fJenisArsip = function(owner)
{
	if (owner)
	{
		window.app_assetsap_master_fJenisArsip.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_master_fJenisArsip";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis Arsip", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		try
		{		
			uses("saiCBBL;util_standar");
			this.ed_kode = new saiCBBL(this, {
				bound: [20, 10, 200, 20],
				caption: "Kode Jenis",
				multiSelection:false, 
				rightLabelVisible:false,
				sql:["select kode_jenis, nama from amu_jenis where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_jenis", "nama"], false, ["Kode Jenis","Nama"], "and", "Daftar  Jenis Arsip",false]
			});			
			this.ed_nama = new saiLabelEdit(this, {
				bound: [20, 32, 600, 20],
				caption: "Nama"
			});							
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);		
			
			this.ed_kode.onChange.set(this, "doEditChange");					
			
			this.setTabChildIndex();		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_assetsap_master_fJenisArsip.extend(window.childForm);
//------------------------------------------------------------------ event
window.app_assetsap_master_fJenisArsip.implement({
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
		var tgl = new Date();
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
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into amu_jenis(kode_jenis, nama, kode_lokasi,nik_user,tgl_input)  values "+
								"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',now())");
						this.dbLib.execArraySQL(sql);	
					}
					catch(e)
					{
						system.alert(this, e,"");
					}
				}
				break;
			case "ubah" :
				if (modalResult == mrOk)
				{
						uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("update amu_jenis set  "+
								"nama = '"+this.ed_nama.getText()+"', nik_user='"+this.app._userLog+"',tgl_input = now() "+
								"where kode_jenis = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);	
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
					uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from amu_jenis where kode_jenis='"+this.ed_kode.getText()+"' and kode_lokasi ="+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);	
			   }
				break;
		}
		this.ed_kode.setFocus();
	},
	doEditChange: function(sender){
		if (sender == this.ed_kode) 
		{
			if (this.ed_kode.getText() != "")
			{
				try
				{
					uses("server_util_arrayMap");
					var data = this.dbLib.getDataProvider("select nama  "+
													"from amu_jenis "+
													"where kode_jenis = '"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
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
					  this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nama.getText()+")");
					  this.app._mainForm.bClear.click();              
					}else
						 system.alert(this, result,"");
					break;
			}
		}
	}
});
