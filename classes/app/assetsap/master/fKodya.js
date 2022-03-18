window.app_assetsap_master_fKodya = function(owner)
{
	if (owner)
	{
		window.app_assetsap_master_fKodya.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_master_fKodya";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis Arsip", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		try
		{		
			uses("saiCBBL;util_standar");
			this.ed_kode = new saiCBBL(this, {
				bound: [20, 10, 200, 20],
				caption: "Kode Kodya",
				multiSelection:false, 
				rightLabelVisible:false,
				sql:["select a.kode_kodya, a.nama,a.kode_kodya, b.nama as nmprop  from amu_kodya a inner join amu_propinsi b on b.kode_prop = a.kode_prop and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' ", ["a.kode_kodya", "a.nama","a.kode_prop","b.nama"], false, ["Kode Kodya","Nama","Kode Propinsi","Nama Propinsi"], "and", "Daftar Kodya",false]
			});			
			this.ed_nama = new saiLabelEdit(this, {
				bound: [20, 32, 600, 20],
				caption: "No.Lokasi Awal"
			});							
			this.ed_prop = new saiCBBL(this, {
				bound: [20, 10, 200, 20],
				caption: "Propinsi",
				multiSelection:false, 
				sql:["select kode_prop, nama from amu_propinsi where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_prop", "nama"], false, ["Kode Propinsi","Nama"], "and", "Daftar Propinsi",false]
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
window.app_assetsap_master_fKodya.extend(window.childForm);
//------------------------------------------------------------------ event
window.app_assetsap_master_fKodya.implement({
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
							sql.add("insert into amu_kodya(kode_kodya, nama, kode_prop, kode_lokasi,nik_user,tgl_input)  values "+
									"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_prop.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',now())");
							this.dbLib.execArraySQL(sql);							
					}
					break;
				case "ubah" :
					if (modalResult == mrOk)
					{
							uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("update amu_kodya set  "+
									"nama = '"+this.ed_nama.getText()+"', kode_prop = '"+this.ed_prop.getText()+"', nik_user='"+this.app._userLog+"',tgl_input = now() "+
									"where kode_kodya = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							this.dbLib.execArraySQL(sql);	
					}
					break;
				case "hapus" :
				   if (modalResult == mrOk)
				   {
						uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("delete from amu_kodya where kode_kodya='"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							this.dbLib.execArraySQL(sql);	
				   }
					break;
			}
			this.ed_kode.setFocus();
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
					var data = this.dbLib.getDataProvider("select a.nama, a.kode_prop, b.nama as nm "+
													"from amu_kodya a inner join amu_propinsi b on b.kode_prop = a.kode_prop and a.kode_lokasi = b.kode_lokasi "+
													"where a.kode_kodya = '"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data != "string"){
						if  (data.rs.rows[0]) {
							var line = data.rs.rows[0];
							this.ed_nama.setText(line.nama);													
							this.ed_prop.setText(line.kode_prop, line.nm);						
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
