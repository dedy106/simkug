window.app_smsadmin_parameter_fKeyword = function(owner)
{
	if (owner)
	{
		window.app_smsadmin_parameter_fKeyword.prototype.parent.constructor.call(this, owner);
		this.className = "app_smsadmin_parameter_fKeyword";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Parameter Kata Kunci", 0);	
		
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
		
		this.eReply = new portalui_saiLabelEdit(this);
		this.eReply.setTop(24);
		this.eReply.setLeft(10);
		this.eReply.setWidth(700);
		this.eReply.setCaption("Default Balasan");
		
		this.eSQL = new portalui_saiLabelEdit(this);
		this.eSQL.setTop(25);
		this.eSQL.setLeft(10);
		this.eSQL.setWidth(700);
		this.eSQL.withPetik = true;
		this.eSQL.setCaption("Data Provider(SQL)");		
		
		this.eSQL2 = new portalui_saiLabelEdit(this);
		this.eSQL2.setTop(26);
		this.eSQL2.setLeft(10);
		this.eSQL2.setWidth(700);
		this.eSQL2.withPetik = true;
		this.eSQL2.setCaption("SQL Effect");		
		
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
window.app_smsadmin_parameter_fKeyword.extend(window.portalui_childForm);

window.app_smsadmin_parameter_fKeyword.prototype.mainButtonClick = function(sender)
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

window.app_smsadmin_parameter_fKeyword.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_smsadmin_parameter_fKeyword.prototype.doModalResult = function(event, modalResult, value)
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
					var sqlt = this.eSQL.getText();
					sqlt = sqlt.replace(/\\/g,'');	
					sqlt = sqlt.replace(/'/g,"\\'");						
					var sqlt2 = this.eSQL2.getText();
					sqlt2 = sqlt2.replace(/\\/g,'');	
					sqlt2 = sqlt2.replace(/'/g,"\\'");						
					sql.add("insert into sms_kunci(kode_kunci, nama, replytext, sqltext, addsql,kode_folder, kode_lokasi) "+
						"	values('"+this.id.getText()+"','"+this.eNama.getText()+"','"+this.eReply.getText()+"','"+sqlt+"','"+sqlt2+"','"+this.eFolder.getText()+"','"+this.app._lokasi+"')");							
					this.dbLib.execArraySQL(sql);	
				}				
				break;
			case "ubah" :
				if (modalResult == mrOk)
				{					
					var sqlt = this.eSQL.getText();					
					sqlt = sqlt.replace(/\\/g,'');						
					sqlt = sqlt.replace(/'/g,"\\'");						
					var sqlt2 = this.eSQL2.getText();
					sqlt2 = sqlt2.replace(/\\/g,'');	
					sqlt2 = sqlt2.replace(/'/g,"\\'");						
					var sql = new server_util_arrayList();
					sql.add("update sms_kunci set  nama='"+this.eNama.getText()+"', replytext='"+this.eReply.getText()+"' "+
						"	, sqltext='"+sqlt+"', addsql='"+sqlt2+"', kode_folder='"+this.eFolder.getText()+"' "+
						"	where kode_lokasi = '"+this.app._lokasi+"' and kode_kunci ='"+this.id.getText()+"' ");							
					this.dbLib.execArraySQL(sql);	
				}				
				break;
			case "hapus" :
				if (modalResult == mrOk)
				{
					var sql = new server_util_arrayList();
					sql.add("delete from sms_kunci where kode_lokasi = '"+this.app._lokasi+"' and kode_kunci ='"+this.id.getText()+"' ");							
					this.dbLib.execArraySQL(sql);	
				}
				break;
		}
	}catch(e)
	{
	}
};

window.app_smsadmin_parameter_fKeyword.prototype.doClick = function(sender){	
	try{
		this.id.setText(this.standar.noBuktiOtomatis(this.dbLib,"sms_kunci", "kode_kunci", "KW", "00000",""));
	}catch(e){
		alert(e);
	}
};
window.app_smsadmin_parameter_fKeyword.prototype.findBtnClick = function(sender){	
	if (sender == this.id){
		this.standar.showListData(this, "Data Parameter Kunci",sender,undefined, 
				  "select kode_kunci, nama from sms_kunci ","select count(*) from sms_kunci",
				  ["kode_kunci","nama"],"where",["Kode","Deskripsi"]);
	}
	if (sender == this.eFolder){
		this.standar.showListData(this, "Data Folder",this.eFolder,undefined, 
				  "select kode_folder, nama from sms_folder ","select count(*) from sms_folder",
				  ["kode_folder","nama"],"where",["Kode","Deskripsi"]);
	}
};
window.app_smsadmin_parameter_fKeyword.prototype.doChange = function(sender){	
	if (sender == this.id){
		var rs = this.dbLib.getDataProvider("select a.nama, a.replytext, a.sqltext, a.addsql, a.kode_folder, b.nama as nmfolder "+
		"	from sms_kunci a left outer join sms_folder b on b.kode_folder = a.kode_folder and a.kode_lokasi = a.kode_lokasi "+
		" where kode_kunci = '"+sender.getText()+"' ");		
		rs = eval("("+rs+")");		
		if (rs.rs.rows.length > 0){
			setTipeButton(tbUbahHapus);
			this.eNama.setText(rs.rs.rows[0].nama);
			this.eReply.setText(rs.rs.rows[0].replytext);
			this.eSQL.setText(rs.rs.rows[0].sqltext);
			this.eSQL2.setText(rs.rs.rows[0].addsql);
			this.eFolder.setText(rs.rs.rows[0].kode_folder);
			this.eFolder.setRightLabelCaption(rs.rs.rows[0].nmfolder);
		}else{
			setTipeButton(tbSimpan);
			this.eNama.setText("");
			this.eReply.setText("");
			this.eSQL.setText("");
			this.eSQL2.setText("");
			this.eFolder.setText("");
		}
		
	}
};