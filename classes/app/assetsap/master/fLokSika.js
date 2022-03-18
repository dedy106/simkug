window.app_assetsap_master_fLokSika = function(owner)
{
	if (owner)
	{
		window.app_assetsap_master_fLokSika.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_master_fLokSika";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Lokasi Arsip", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		try
		{		
			uses("saiCBBL;util_standar");
			this.ed_kode = new saiCBBL(this, {
				bound: [20, 10, 200, 20],
				caption: "Kode Lokasi",
				multiSelection:false, 
				sql:["select kode_lokfa, alamat, kel, kec from amu_lokfa where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_lokfa", "alamat","kel","kec"], false, ["Kode Lokfa","Alamat","Kelurahan","Kecamatan"], "and", "Daftar Lokasi Aset",false]
			});			
			this.ed_almt = new saiLabelEdit(this, {
				bound: [20, 32, 600, 20],
				caption: "Alamat"
			});							
			this.ed_kel = new saiLabelEdit(this, {
				bound: [20, 33, 600, 20],
				caption: "Keluaran"
			});							
			this.ed_kec = new saiLabelEdit(this, {
				bound: [20, 34, 600, 20],
				caption: "Kecamatan"
			});			
			this.ed_prop = new saiCBBL(this, {
				bound: [20, 11, 200, 20],
				caption: "Propinsi",
				change:[this,"doEditChange"],
				multiSelection:false, 
				sql:["select kode_prop, nama from amu_propinsi where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_prop", "nama"], false, ["Kode Propinsi","Nama"], "and", "Daftar Propinsi",true]
			});	
			this.ed_kodya = new saiCBBL(this, {
				bound: [20, 12, 200, 20],
				caption: "Kodya",
				multiSelection:false
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
window.app_assetsap_master_fLokSika.extend(window.childForm);
//------------------------------------------------------------------ event
window.app_assetsap_master_fLokSika.implement({
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
							sql.add("insert into amu_lokfa(kode_lokfa, alamat, kel, kec, kode_kodya, kode_prop, kode_lokasi,nik_user,tgl_input)  values "+
									"('"+this.ed_kode.getText()+"','"+this.ed_almt.getText()+"','"+this.ed_kel.getText()+"','"+this.ed_kec.getText()+"','"+this.ed_kodya.getText()+"','"+this.ed_prop.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',now())");
							this.dbLib.execArraySQL(sql);							
					}
					break;
				case "ubah" :
					if (modalResult == mrOk)
					{
							uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("update amu_lokfa set  "+
									"alamat = '"+this.ed_almt.getText()+"', kel = '"+this.ed_kel.getText()+"',kec = '"+this.ed_kec.getText()+"', kode_kodya = '"+this.ed_kodya.getText()+"', kode_prop = '"+this.ed_prop.getText()+"', nik_user='"+this.app._userLog+"',tgl_input = now() "+
									"where kode_lokfa = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							this.dbLib.execArraySQL(sql);	
					}
					break;
				case "hapus" :
				   if (modalResult == mrOk)
				   {
						uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("delete from amu_lokfa where kode_lokfa='"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
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
		if (sender == this.ed_prop){
			this.ed_kodya.setSQL("select a.kode_kodya, a.nama,a.kode_kodya, b.nama as nmprop  from amu_kodya a inner join amu_propinsi b on b.kode_prop = a.kode_prop and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_prop = '"+sender.getText()+"' ", ["a.kode_kodya", "a.nama","a.kode_prop","b.nama"], false, ["Kode Kodya","Nama","Kode Propinsi","Nama Propinsi"], "and", "Daftar Kodya",true);
		}
		if (sender == this.ed_kode) 
		{
			if (this.ed_kode.getText() != "")
			{
				try
				{
					uses("server_util_arrayMap");
					var data = this.dbLib.getDataProvider("select a.alamat, a.kel, a.kec, a.kode_kodya, a.kode_prop "+
													"from amu_lokfa a "+
													"where kode_lokfa = '"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data != "string"){
						if  (data.rs.rows[0]) {
							var line = data.rs.rows[0];
							this.ed_almt.setText(line.alamat);						
							this.ed_kel.setText(line.kel);
							this.ed_kec.setText(line.kec);
							this.ed_prop.setText(line.kode_prop);
							this.ed_kodya.setText(line.kode_kodya);
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
