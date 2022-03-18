window.app_budget_master_fLokSika = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fLokSika.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fLokSika";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis Arsip", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		try
		{		
			uses("saiCBBL;util_standar");
			this.ed_kode = new saiCBBL(this, {
				bound: [20, 10, 200, 20],
				caption: "No RAK Ordner",
				multiSelection:false, 
				sql:["select kode_rak, awal, akhir from amu_rak where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_rak", "awal","akhir"], false, ["No Ordner","No  Lokasi Awal","No Lokasi Akhir"], "and", "Daftar Rak Ordner",false]
			});			
			this.ed_awal = new saiLabelEdit(this, {
				bound: [20, 32, 600, 20],
				caption: "No.Lokasi Awal"
			});							
			this.ed_akhir = new saiLabelEdit(this, {
				bound: [20, 32, 600, 20],
				caption: "No.Lokasi Akhir"
			});							
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);		
			
			this.ed_kode.onChange.set(this, "doEditChange");
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");
			this.cb_satuan.onBtnClick.set(this, "FindBtnClick");
			
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
window.app_budget_master_fLokSika.extend(window.childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fLokSika.implement({
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
							sql.add("insert into amu_rak(kode_rak, awal, akhir, kode_lokasi,nik_user,tgl_input)  values "+
									"('"+this.ed_kode.getText()+"','"+this.ed_awal.getText()+"','"+this.ed_akhir.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',now())");
							this.dbLib.execArraySQL(sql);							
					}
					break;
				case "ubah" :
					if (modalResult == mrOk)
					{
							uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("update amu_rak set  "+
									"awal = '"+this.ed_awal.getText()+"', akhir = '"+this.ed_akhir.getText()+"', nik_user='"+this.app._userLog+"',tgl_input = now() "+
									"where kode_rak = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							this.dbLib.execArraySQL(sql);	
					}
					break;
				case "hapus" :
				   if (modalResult == mrOk)
				   {
						uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("delete from amu_rak where kode_rak='"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
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
					var data = this.dbLib.getDataProvider("select awal, akhir  "+
													"from amu_rak "+
													"where kode_rak = '"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (data){
						if  (data.rs.rows[0]) {
							var line = data.rs.rows[0];
							this.ed_awal.setText(line.awal);						
							this.ed_akhir.setText(line.akhir);						
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
