/**
 * @author dweexfuad
 */
window.app_tanbang_master_fFasilitas = function(owner)
{
	if (owner)
	{
		window.app_tanbang_master_fFasilitas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_tanbang_master_fFasilitas";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Fasilitas", 0);	

		uses("saiCBBL",true);		
		this.ed_kode = new saiCBBL(this, {
			bound: [20, 11, 185, 20],
			caption: "Kode",
			rightLabelVisible:false,
			multiSelection:false,
			labelChange:[this,"doChange"], 
			sql:["select kode_fasilitas, nama from tb_fasilitas",["kode_fasilitas","nama"], false, ["Kode Jab","Nama"], "and", "Daftar Jabatan", false ]
		});							
		
		this.ed_nama = new saiLabelEdit(this, {
			bound: [20, 12, 600, 20],
			caption: "Nama"
		});
		this.rearrangeChild(10,23);		
		setTipeButton(tbSimpan);		
		
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
window.app_tanbang_master_fFasilitas.extend(window.childForm);
//------------------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------
window.app_tanbang_master_fFasilitas.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");s	
	},
	doModalResult: function(event, modalResult){			
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
						sql.add("insert into tb_fasilitas (kode_fasilitas,nama, kode_lokasi)  values "+
								"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.app._lokasi+"') ");
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
						sql.add("update tb_fasilitas set  "+
								"nama = '"+this.ed_nama.getText()+"' where kode_fasilitas='"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+" '");
						this.dbLib.execArraySQL(sql);	
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
					uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from tb_fasilitas where kode_fasilitas='"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);	
			   }
				break;
		}
		this.ed_kode.setFocus();
	},
	showClick: function(sender){		
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.ed_kode) 
			{
				this.standarLib.showListData(this, "Daftar Fasilitas",this.ed_kode,undefined, 
											  "select kode_fasilitas, nama   from tb_fasilitas where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_fasilitas)  from tb_fasilitas where kode_lokasi = '"+this.app._lokasi+"' ",
											  new Array("kode_fasilitas","nama"),"where",new Array("Kode","Deskripsi"),false);
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
			}
		}catch(e)
		{
			alert(e);
		}
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
						 system.info(this, result,"");
					break;
			}
		}
	},
	doChange: function(sender){
		if (this.ed_kode.rightLabelCaption == "") setTipeButton(tbSimpan);
		else setTipeButton(tbUbahHapus);
		this.ed_nama.setText(this.ed_kode.rightLabelCaption);
	}
});
