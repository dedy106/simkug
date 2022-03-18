window.app_saku_dmt_master_fFaReg = function(owner){
	if (owner)
	{
		window.app_saku_dmt_master_fFaReg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_master_fFaReg";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Regional", 0);	
		
		uses("portalui_saiCBBL");
		this.cb_lokasi = new portalui_saiCBBL(this, {bound:[20,10,185,20], caption:"Kode Lokasi",readOnly:true, text:"",tag:9});					
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,11,185,20], caption:"Kode Regional", text:"",rightLabelVisible:false});									
		this.ed_nama = new portalui_saiLabelEdit(this,{bound:[20,13,185,20], caption:"Nama Regional",lengthChar:50});		
		
		setTipeButton(tbSimpan);			
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");		
		this.rearrangeChild(10, 23);
		this.setTabChildIndex();
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_lokasi.setRightLabelCaption(this.app._namalokasi);
		
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_dmt_master_fFaReg.extend(window.portalui_childForm);
window.app_saku_dmt_master_fFaReg.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_dmt_master_fFaReg.prototype.doModalResult = function(event, modalResult){	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
				this.standarLib.clearByTag(this, [0],this.ed_kode);						
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into dmt_reg (kode_reg,nama,kode_lokasi,nik_user, tgl_input)  values "+
							"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.cb_lokasi.getText()+"','"+this.app._userLog+"',now())");
					this.dbLib.execArraySQL(sql);	
				}catch(e){
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk)
			{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add(" update dmt_reg set  "+
							" nama = '"+this.ed_nama.getText()+
							"' where kode_reg='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from dmt_reg where kode_reg='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_dmt_master_fFaReg.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Regional",this.ed_kode,this.ed_nama, 
										  "select kode_reg, nama  from dmt_reg where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  "select count(kode_reg) from dmt_reg where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  ["kode_reg","nama"],"and",["Kode Regional","Nama Regional"],false);
			this.ed_nama.setText("");
		}
	}catch(e){
		systemAPI.alert(e);
	}
};
window.app_saku_dmt_master_fFaReg.prototype.doRequestReady = function(sender, methodName, result)
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