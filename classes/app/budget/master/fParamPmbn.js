/**
 * @author dweexfuad
 */
window.app_budget_master_fParamPmbn = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fParamPmbn.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fParamPmbn";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Tunjangan Pembina", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar;portalui_saiTable");
			this.elokasi = new portalui_saiCBBL(this,{bound:[20,20,150,20],caption:"Lokasi", multiSelection:false,change:[this,"doEditChange"]});				
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Param", multiSelection:false,change:[this,"doEditChange"]});					
			this.eMama = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama"});	
			this.eAKun = new portalui_saiCBBL(this,{bound:[20,23,200,20],caption:"Kode Akun"});	
			this.eDrk = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Kode DRK"});		
			this.bTampil = new portalui_button(this,{bound:[729,24,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,25,800,323],caption:"Daftar Param"});
			this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,795,300],tag:"9"});
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
			this.e0.setSQL("select kode_param, nama from agg_param where kode_lokasi = '"+this.app._lokasi+"' ",["kode_param","nama"],undefined,["Kode PK","Nama"],"and","Data Program Kerja",false);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fParamPmbn.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fParamPmbn.implement({
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
						sql.add("insert into agg_param (kode_param, kode_lokasi,nama ) values ('"+this.e0.getText()+"','"+this.app._lokasi+"','"+this.e1.getText()+"') ");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_param set nama = '"+this.e1.getText()+"'where kode_param = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from  agg_param where kode_param = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
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
			this.e0.setSQL("select kode_param, nama from agg_param where kode_lokasi = '"+this.app._lokasi+"' ",["kode_param","nama"],undefined,["Kode Band","Nama"],"and","Data Program Kerja",false);
		}
		if(sender == this.e0){
			if (this.e0.getText() != "")
			{
				try
				{			
					var data = this.dbLib.runSQL("select * from agg_param where kode_param = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ");
								
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
	doTampilClick: function(sender){
		try{			
				this.sg1.setColTitle(new Array("No","Kode Param ","Nama Param","Kode Akun","Nama Akun","Kode DRK","Nama DRK"));				
				var data = this.dbLib.runSQL("select a.kode_param,a.nama as nama_param,a.kode_akun,b.nama as nama_akun,a.kode_drk,c.nama as nama_drk from agg_param a "+
											"inner join agg_masakun b on a.kode_akun=b.kode_akun "+
											"inner join agg_drk c on a.kode_drk=c.kode_drk "+
											"where a.jenis='PMBN' "+
											"order by a.kode_param");
				this.sg1.clear();
				this.sg1.setData(data);
			
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