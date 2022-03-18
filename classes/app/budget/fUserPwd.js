/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_fUserPwd = function(owner)
{
	if (owner)
	{
		window.app_budget_fUserPwd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_fUserPwd";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Ubah Password", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("util_standar");
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			this.e0 = new portalui_saiLabelEdit(this,{bound:[20,20,200,20],caption:"User",readOnly:true});
			this.e1 = new portalui_saiLabelEdit(this,{bound:[20,21,400,20],caption:"Nama",readOnly:true});
			this.e2 = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Password Lama",password:true,tag:1});
			this.e3 = new portalui_saiLabelEdit(this,{bound:[20,23,400,20],caption:"Password Baru",password:true,tag:1});
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan)
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();	
			this.e0.setText(this.app._userLog);
			this.e1.setText(this.app._namaUser);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_fUserPwd.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_fUserPwd.implement({
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
			switch (event)
			{
				case "clear" :
					this.standarLib.clearByTag(this, [1],this.e2);											
					break;
				case "simpan" :
					
					if (this.standarLib.checkEmptyByTag(this, [0]))
					{
						this.lama=this.dbLib.getPeriodeFromSQL("select pass as periode from hakakses where nik='"+this.e0.getText()+"'");
						if (this.e2.getText()!=this.lama)
						{
							system.alert(this, "Data password lama tidak sesuai", "Mohon ulangi kembali ","");
						}
						else
						{
							uses("server_util_arrayList");
							sql = new server_util_arrayList();
							sql.add("update hakakses set pass='"+this.e3.getText()+"' where nik='"+this.e0.getText()+"'");
							this.dbLib.execArraySQL(sql);
						}
					}
					this.standarLib.clearByTag(this, [1],this.e2);
					break;
				
			}
			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1) {
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
						setTipeButton(tbSimpan);
						
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});
