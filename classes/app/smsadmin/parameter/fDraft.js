window.app_smsadmin_parameter_fDraft = function(owner)
{
	if (owner)
	{
		window.app_smsadmin_parameter_fDraft.prototype.parent.constructor.call(this, owner);
		this.className = "app_smsadmin_parameter_fDraft";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Draft / SMS Template", 0);	
		
		this.maximize();
		
		this.id = new portalui_saiCBBL(this);
		this.id.setTop(20);
		this.id.setLeft(10);
		this.id.setWidth(200);
		this.id.setCaption("ID");
		this.id.setRightLabelVisible(false);
		this.id.onBtnClick.set(this,"findBtnClick");
		this.id.onChange.set(this,"doChange");
		
		this.bGen = new portalui_button(this);
		this.bGen.setTop(20);
		this.bGen.setLeft(250);
		this.bGen.setWidth(100);
		this.bGen.setCaption("Generate");
		this.bGen.onClick.set(this,"doClick");
		
		this.eNama = new portalui_saiLabelEdit(this);
		this.eNama.setTop(21);
		this.eNama.setLeft(10);
		this.eNama.setWidth(700);
		this.eNama.setCaption("Deskripsi");		
				
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.standar = new util_standar();	
		this.dbLib = new util_dbLib();
		setTipeButton(tbSimpan);
	}
};
window.app_smsadmin_parameter_fDraft.extend(window.portalui_childForm);

window.app_smsadmin_parameter_fDraft.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","");
	}
};

window.app_smsadmin_parameter_fDraft.prototype.doRequestReady = function(sender, methodName, result)
{

	switch (methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
				else this.app._mainForm.pesan(0, result); 
				break;
		}
};
window.app_smsadmin_parameter_fDraft.prototype.doModalResult = function(event, modalResult, value)
{
	try
	{
		switch (event)
		{
			case "simpan" :
				if (modalResult == mrOk)
				{
					var sql = new server_util_arrayList();
					sql.add("insert into sms_draft(kode_draft, nama, keterangan,nik_user, kode_lokasi, tgl_input) "+
						"	values('"+this.id.getText()+"','"+this.eNama.getText()+"','-','"+this.app._nikUser+"','"+this.app._lokasi+"',now())");							
					this.dbLib.execArraySQL(sql);	
				}				
				break;
			case "ubah" :
				if (modalResult == mrOk)
				{
					var sql = new server_util_arrayList();
					sql.add("update sms_draft set  nama='"+this.eNama.getText()+"', tgl_input=now() "+
						"	"+
						"	where kode_lokasi = '"+this.app._lokasi+"' and kode_draft ='"+this.id.getText()+"' ");							
					this.dbLib.execArraySQL(sql);	
				}				
				break;
			case "hapus" :
				if (modalResult == mrOk)
				{
					var sql = new server_util_arrayList();
					sql.add("delete from sms_draft where kode_lokasi = '"+this.app._lokasi+"' and kode_draft ='"+this.id.getText()+"' ");							
					this.dbLib.execArraySQL(sql);	
				}
				break;
		}
	}catch(e)
	{
	}
};

window.app_smsadmin_parameter_fDraft.prototype.doClick = function(sender){	
	try{
		this.id.setText(this.standar.noBuktiOtomatis(this.dbLib,"sms_draft", "kode_draft", "DR", "0000000",""));
	}catch(e){
		alert(e);
	}
};
window.app_smsadmin_parameter_fDraft.prototype.findBtnClick = function(sender){	
	if (sender == this.id){
		this.standar.showListData(this, "Data Draft",sender,this.eNama, 
				  "select kode_draft, nama from sms_draft ","select count(*) from sms_draft",
				  ["kode_draft","nama"],"where",["Kode","Deskripsi"]);
	}
};
window.app_smsadmin_parameter_fDraft.prototype.doChange = function(sender){	
	
};