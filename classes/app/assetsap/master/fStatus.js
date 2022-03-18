/**
 * @author dweexfuad
 */
window.app_assetsap_master_fStatus = function(owner)
{
	if (owner)
	{
		window.app_assetsap_master_fStatus.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_master_fStatus";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Status Aset", 0);	

		uses("saiCBBL");
		this.ed_jenis = new saiCB(this, {
			bound: [20, 10, 185, 20],
			caption: "Jenis",
			items: ["TB", "NTB"]
		});
		this.ed_kode = new saiCBBL(this, {
			bound: [20, 11, 185, 20],
			caption: "Kode",
			rightLabelVisible:false,
			change: [this,"showClick"]
		});							
		
		this.ed_nama = new saiLabelEdit(this, {
			bound: [20, 12, 600, 20],
			caption: "Nama"
		});
		this.rearrangeChild(10,23);		
		setTipeButton(tbSimpan);		
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");		
		
		this.setTabChildIndex();
		try
		{		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();
		
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_assetsap_master_fStatus.extend(window.childForm);
//------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------
window.app_assetsap_master_fStatus.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");s	
};
window.app_assetsap_master_fStatus.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);				
			}
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into amu_status (kode_status,nama,jenis)  values "+
							"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_jenis.getText()+"') ");
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
					sql.add("update amu_status set  "+
							"nama = '"+this.ed_nama.getText()+"' where kode_status='"+this.ed_kode.getText()+"' and jenis = '"+this.ed_jenis.getText()+"' ");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from amu_status where kode_status='"+this.ed_kode.getText()+"' and jenis = '"+this.ed_jenis.getText()+"' ");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
	this.ed_kode.setFocus();
};
window.app_assetsap_master_fStatus.prototype.showClick = function(sender)
{
	try 
	{
		this.standarLib.clearByTag(this, new Array("1"),undefined);				
		setTipeButton(tbSimpan);
		var line,data = this.dbLib.runSQL(" select nama,jenis "+
										  " from amu_status "+
										  " where kode_status = '"+this.ed_kode.getText()+"' and jenis = '"+this.ed_jenis.getText()+"' ");
		if (data instanceof arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_nama.setText(line.get("nama"));				
				setTipeButton(tbUbahHapus);				
			} 
		}else 
		{
			setTipeButton(tbSimpan);
		}
	} catch(e)
	{
		system.alert(this,e,"");
	}
};											  
window.app_assetsap_master_fStatus.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Status Asset",this.ed_kode,undefined, 
										  "select kode_status, nama   from amu_status where jenis = '"+this.ed_jenis.getText()+"'",
										  "select count(kode_status)  from amu_status where jenis = '"+this.ed_jenis.getText()+"'",
										  ["kode_status","nama"],"where",["Kode Status","Deskripsi"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);		
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_assetsap_master_fStatus.prototype.doRequestReady = function(sender, methodName, result)
{
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
			   	     system.info(this, result,"");
				break;
		}
	}
};
