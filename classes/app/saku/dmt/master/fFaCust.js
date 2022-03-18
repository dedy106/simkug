window.app_saku_dmt_master_fFaCust = function(owner)
{
	if (owner)
	{
		window.app_saku_dmt_master_fFaCust.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_dmt_master_fFaCust";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Customer", 0);	

		uses("portalui_saiCBBL");
		this.cb_lokasi = new portalui_saiCBBL(this,{bound:[20,10, 185,20],caption:"Kode Lokasi",tag:9, readOnly:true});				
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,11, 185,20],caption:"Kode Cust", tag:1,rightLabelVisible: false});						
		this.bShow = new portalui_imageButton(this,{bound:[202,11, 22,22],hint:"Load Data", image:"icon/"+system.getThemes()+"/reload.png"});											
		this.ed_nama = new portalui_saiLabelEdit(this,{bound:[20,12, 400,20],caption:"Nama", lengthChar:50,tag:1});				
		this.ed_alamat = new portalui_saiLabelEdit(this,{bound:[20,13, 600,20],caption:"Alamat", lengthChar:150,tag:1});						
		this.ed_kota = new portalui_saiLabelEdit(this,{bound:[20,14, 250,20],caption:"Kota", lengthChar:50,tag:1});				
		this.ed_pos = new portalui_saiLabelEdit(this,{bound:[20,15, 140,20],caption:"Kode Pos", lengthChar:5,tag:1, tipeText:ttAngka});				
		this.ed_tel = new portalui_saiLabelEdit(this,{bound:[20,16, 250,20],caption:"No Telepon", lengthChar:50,tag:1, tipeText:ttAngka});
		this.ed_fax = new portalui_saiLabelEdit(this,{bound:[20,17, 250,20],caption:"No Faximile", lengthChar:50,tag:1, tipeText:ttAngka});		
		this.ed_npwp = new portalui_saiLabelEdit(this,{bound:[20,18, 186,20],caption:"NPWP", lengthChar:20,tag:1, tipeText: ttAngka});				
		this.ed_alamat2 = new portalui_saiLabelEdit(this,{bound:[20,24, 600,20],caption:"Alamat  NPWP", lengthChar:150,tag:1});
		this.ed_pic = new portalui_saiLabelEdit(this,{bound:[20,19, 250,20],caption:"Contact Person", lengthChar:50,tag:1});				
		this.ed_bank = new portalui_saiLabelEdit(this,{bound:[20,20, 400,20],caption:"Bank", lengthChar:50,tag:1});				
		this.ed_cabang = new portalui_saiLabelEdit(this,{bound:[20,21, 400,20],caption:"Cabang", lengthChar:50,tag:1});				
		this.ed_norek = new portalui_saiLabelEdit(this,{bound:[20,22, 250,20],caption:"No Rekening", lengthChar:50,tag:1});				
		this.ed_namarek = new portalui_saiLabelEdit(this,{bound:[20,23, 250,20],caption:"Nama Rekening", lengthChar:150,tag:1});
			
		setTipeButton(tbAllFalse);
		
		this.bShow.onClick.set(this, "showClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");				
		this.ed_kode.onChange.set(this, "showClick");
		this.setTabChildIndex();
		this.rearrangeChild(10, 23);
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
			systemAPI.alert(e);
		}
	}
};
window.app_saku_dmt_master_fFaCust.extend(window.portalui_childForm);
window.app_saku_dmt_master_fFaCust.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
};
window.app_saku_dmt_master_fFaCust.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, [0,1],this.ed_kode);	
				setTipeButton(tbAllFalse);
			}
			break;
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into dmt_cust (kode_cust,nama,alamat,kota,kode_pos,no_telp,no_fax,npwp,pic,kode_lokasi,bank,cabang,no_rek,nama_rek,nik_user, tgl_input,alamat2)  values "+
							"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_alamat.getText()+"','"+
							     this.ed_kota.getText()+"','"+this.ed_pos.getText()+"','"+this.ed_tel.getText()+"','"+this.ed_fax.getText()+"','"+
								 this.ed_npwp.getText()+"','"+this.ed_pic.getText()+"','"+this.cb_lokasi.getText()+"','"+this.ed_bank.getText()+"','"+this.ed_cabang.getText()+"','"+this.ed_norek.getText()+"','"+this.ed_namarek.getText()+"','"+this.app._userLog+"',now(),'"+this.ed_alamat2.getText()+"') ");
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
					sql.add("update dmt_cust set  "+
							" nama='"+this.ed_nama.getText()+"',alamat='"+this.ed_alamat.getText()+
							"',kota='"+this.ed_kota.getText()+"',kode_pos='"+this.ed_pos.getText()+"',no_telp='"+this.ed_tel.getText()+
							"',no_fax='"+this.ed_fax.getText()+"',npwp='"+this.ed_npwp.getText()+"',pic='"+this.ed_pic.getText()+"',bank='"+this.ed_bank.getText()+
							"',cabang='"+this.ed_cabang.getText()+"',no_rek='"+this.ed_norek.getText()+"',nama_rek='"+this.ed_namarek.getText()+"' "+
							" ,alamat2='"+this.ed_alamat2.getText()+"' "+
							" where kode_cust='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from dmt_cust where kode_cust='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_dmt_master_fFaCust.prototype.showClick = function(sender)
{
	try
	{	
		uses("server_util_arrayMap");
		var data = this.dbLib.getDataProvider("select a.kode_cust,a.nama,a.alamat,a.kota,a.kode_pos,a.no_telp,a.no_fax,a.npwp,a.pic,"+
										"       a.bank,a.cabang,a.no_rek,a.nama_rek, a.alamat2 "+
										"from dmt_cust a  "+
										"where a.kode_cust = '"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'");		
		eval("data = "+ data +";");
		if (typeof(data) == "object") 
		{
			if  (data.rs.rows[0] != undefined) 
			{
				var field = data.rs.rows[0];
				
				this.ed_nama.setText(field.nama);
				this.ed_alamat.setText(field.alamat);
				this.ed_kota.setText(field.kota);
				this.ed_pos.setText(field.kode_pos);
				this.ed_tel.setText(field.no_telp);
				this.ed_fax.setText(field.no_fax);
				this.ed_npwp.setText(field.npwp);
				this.ed_pic.setText(field.pic);
				this.ed_bank.setText(field.bank);
				this.ed_cabang.setText(field.cabang);
				this.ed_norek.setText(field.no_rek);
				this.ed_namarek.setText(field.nama_rek);					
				this.ed_alamat2.setText(field.alamat2);
				setTipeButton(tbUbahHapus);
			}else{
				setTipeButton(tbSimpan);
			}
		}else
		  setTipeButton(tbSimpan);		
	}catch(e)
	{
		system.alert(this, e,"");
	}
};											  
window.app_saku_dmt_master_fFaCust.prototype.FindBtnClick = function(sender, event){
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Customer",this.ed_kode,this.ed_nama, 
										  "select kode_cust, nama  from dmt_cust where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  "select count(kode_cust) from dmt_cust where kode_lokasi='"+this.cb_lokasi.getText()+"'",
										  ["kode_cust","nama"],"and",["Kode Customer","Nama Customer"],false);
			this.standarLib.clearByTag(this, [1],undefined);				
		}		
	}catch(e){
		systemAPI.alert(e);
	}
};
window.app_saku_dmt_master_fFaCust.prototype.doRequestReady = function(sender, methodName, result)
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