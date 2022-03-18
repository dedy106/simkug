window.app_smsadmin_parameter_fFilter = function(owner)
{
	if (owner)
	{
		window.app_smsadmin_parameter_fFilter.prototype.parent.constructor.call(this, owner);
		this.className = "app_smsadmin_parameter_fFilter";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Parameter Filter SMS", 0);	
		
		this.maximize();
		
		uses("portalui_saiCBBL");
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
		
		this.eFilter = new portalui_saiLabelEdit(this);
		this.eFilter.setTop(24);
		this.eFilter.setLeft(10);
		this.eFilter.setWidth(700);
		this.eFilter.setCaption("Filter Text");
		
		this.eFolder = new portalui_saiCBBL(this);
		this.eFolder.setTop(25);
		this.eFolder.setLeft(10);
		this.eFolder.setWidth(200);		
		this.eFolder.setCaption("Folder");
		this.eFolder.onBtnClick.set(this,"findBtnClick");				
		
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.standar = new util_standar();	
		this.dbLib = new util_dbLib();
		setTipeButton(tbSimpan);
	}
};
window.app_smsadmin_parameter_fFilter.extend(window.portalui_childForm);

window.app_smsadmin_parameter_fFilter.prototype.mainButtonClick = function(sender)
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

window.app_smsadmin_parameter_fFilter.prototype.doRequestReady = function(sender, methodName, result)
{

	switch (methodName)
		{
			case "runQuery" : 																			
				this.loadMenu(result);
				break;
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1){
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.id.getText()+")");
					this.app._mainForm.bClear.click();
				}else this.app._mainForm.pesan(0, result); 
				break;
		}
};
window.app_smsadmin_parameter_fFilter.prototype.doModalResult = function(event, modalResult, value)
{
	try
	{
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standar.clearByTag(this,[0],this.id);
				}
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{					
					var sql = new server_util_arrayList();										
					sql.add("insert into sms_filter(kode_filter, nama, filtertext, kode_folder, kode_lokasi) "+
						"	values('"+this.id.getText()+"','"+this.eNama.getText()+"','"+this.eFilter.getText()+"','"+this.eFolder.getText()+"','"+this.app._lokasi+"')");							
					this.dbLib.execArraySQL(sql);	
				}				
				break;
			case "ubah" :
				if (modalResult == mrOk)
				{															
					var sql = new server_util_arrayList();
					sql.add("update sms_filter set  nama='"+this.eNama.getText()+"', filtertext='"+this.eFilter.getText()+"' "+
						"	, kode_folder='"+this.eFolder.getText()+"' "+
						"	where kode_lokasi = '"+this.app._lokasi+"' and kode_filter ='"+this.id.getText()+"' ");							
					this.dbLib.execArraySQL(sql);	
				}				
				break;
			case "hapus" :
				if (modalResult == mrOk)
				{
					var sql = new server_util_arrayList();
					sql.add("delete from sms_filter where kode_lokasi = '"+this.app._lokasi+"' and kode_filter ='"+this.id.getText()+"' ");							
					this.dbLib.execArraySQL(sql);	
				}
				break;
		}
	}catch(e)
	{
	}
};

window.app_smsadmin_parameter_fFilter.prototype.doClick = function(sender){	
	try{
		this.id.setText(this.standar.noBuktiOtomatis(this.dbLib,"sms_filter", "kode_filter", "FI", "00000",""));
	}catch(e){
		alert(e);
	}
};
window.app_smsadmin_parameter_fFilter.prototype.findBtnClick = function(sender){	
	if (sender == this.id){
		this.standar.showListData(this, "Data Filter",sender,undefined, 
				  "select kode_filter, nama from sms_filter ","select count(*) from sms_filter",
				  ["kode_filter","nama"],"where",["Kode","Deskripsi"]);
	}
	if (sender == this.eFolder){
		this.standar.showListData(this, "Data Folder",this.eFolder,undefined, 
				  "select kode_folder, nama from sms_folder ","select count(*) from sms_folder",
				  ["kode_folder","nama"],"where",["Kode","Deskripsi"]);
	}
};
window.app_smsadmin_parameter_fFilter.prototype.doChange = function(sender){	
	if (sender == this.id){
		var rs = this.dbLib.getDataProvider("select a.nama, a.filtertext, a.kode_folder, b.nama as nmfolder  "+
		"	from sms_filter a left outer join sms_folder b on b.kode_folder = a.kode_folder and a.kode_lokasi = a.kode_lokasi "+
		"	where kode_filter = '"+sender.getText()+"' ");		
		rs = eval("("+rs+")");		
		if (rs.rs.rows.length > 0){
			setTipeButton(tbUbahHapus);
			this.eNama.setText(rs.rs.rows[0].nama);
			this.eFilter.setText(rs.rs.rows[0].filtertext);
			this.eFolder.setText(rs.rs.rows[0].kode_folder);
			this.eFolder.setRightLabelCaption(rs.rs.rows[0].nmfolder);
		}else{
			setTipeButton(tbSimpan);
			this.eNama.setText("");
			this.eFilter.setText("");
			this.eFolder.setText("");		
		}
		
	}
};