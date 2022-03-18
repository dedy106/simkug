window.app_budget_master_fBrg = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fBrg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fBrg";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Barang", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		uses("portalui_saiCBBL");
		this.ed_kode = new portalui_saiCBBL(this, {
			bound: [20, 10, 200, 20],
			caption: "Kode Barang"
		});			
		this.ed_nama = new portalui_saiLabelEdit(this, {
			bound: [20, 32, 600, 20],
			caption: "Nama"
		});					
		this.ed_klp = new portalui_saiCBBL(this, {
			bound: [20, 21, 200, 20],
			caption: "Kelompok Brg",
			sql:["select kode_klpbrg, nama from agg_barang_klp",["kode_klp","nama"],false,["Kode Kelompok","Nama"],"and","Daftar Kelompok",true]
		});
		this.cb_satuan = new portalui_saiCBBL(this, {
			bound: [20, 33, 200, 20],
			caption: "Satuan",
			sql:["select kode_sat, nama from agg_satuan",["kode_sat","nama"],false,["Kode Satuan","Nama"],"and","Daftar Satuan",true]
			
		});				
		this.ed_kurs = new portalui_saiCBBL(this, {
			bound: [20, 34, 200, 20],
			caption: "Currency",
			sql:["select kode_curr, nama from curr",["kode_curr","nama"],false,["Kode Currency","Nama"],"and","Daftar Currency",true]
			
		});
		this.ed_merk = new portalui_saiLabelEdit(this, {
			bound: [20, 73, 400, 20],
			caption: "Merk/ Brand"
		});		
		
		this.ed_tipe = new portalui_saiLabelEdit(this, {
			bound: [20, 74, 200, 20],
			caption: "Tipe"
		});			
		
		this.ed_harga = new portalui_saiLabelEdit(this, {
			bound: [20, 75, 200, 20],
			caption: "Harga Ref",
			tipeText: ttNilai
		});
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);		
		
		this.ed_kode.onChange.set(this, "doEditChange");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		this.cb_satuan.onBtnClick.set(this, "FindBtnClick");
		
		this.setTabChildIndex();
		try
		{		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fBrg.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fBrg.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_budget_master_fBrg.prototype.doModalResult = function(event, modalResult)
{			
	var tgl = new Date();
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
				try
				{					
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into agg_barang_m(kode_brg,kode_sat,kode_lokasi,nama,merk,tipe,nik_user,tgl_input)  values "+
							"('"+this.ed_kode.getText()+"','"+this.cb_satuan.getText()+"','"+this.app._lokasi+"','"+this.ed_nama.getText()+"','"+
							     this.ed_merk.getText()+"','"+this.ed_tipe.getText()+"','"+this.app._userLog+"',now())");
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
					sql.add("update agg_barang_m set  "+
							"nama = '"+this.ed_nama.getText()+"',kode_sat = '"+this.cb_satuan.getText()+
							"',merk='"+this.ed_merk.getText()+"',tipe='"+this.ed_tipe.getText()+"',nik_user='"+this.app._userLog+"',tgl_input = now() "+
							"where kode_brg = '"+this.ed_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);	
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {
				uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from agg_barang_m where kode_brg='"+this.ed_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
	this.ed_kode.setFocus();
};
window.app_budget_master_fBrg.prototype.doEditChange = function(sender)
{
	if (sender == this.ed_kode) 
	{
		if (this.ed_kode.getText() != "")
		{
			try
			{
				uses("server_util_arrayMap");
				var data = this.dbLib.loadQuery("select a.kode_brg,a.nama,a.kode_sat,a.merk,a.tipe,b.nama as nama_sat "+
				                                "from agg_barang_m a inner join agg_satuan b on a.kode_sat=b.kode_sat "+
												"where a.kode_brg = '"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			    if (data != undefined) 
			    {
		          if  (data != "") 
				  {
					var field = data.split("\r\n");
	  				var field = field[1].split(";");
					
					this.ed_nama.setText(field[1]);
					this.cb_satuan.setText(field[2]);
					this.ed_merk.setText(field[3]);
					this.ed_tipe.setText(field[4]);
					this.cb_satuan.setRightLabelCaption(field[5]);
				    setTipeButton(tbUbahHapus);
				  }
				  else
			    {	
				  this.ed_nama.setText("");
				  setTipeButton(tbSimpan);
				}
				}
				else
			    {	
				  this.ed_nama.setText("");
				  setTipeButton(tbSimpan);
				}
			}catch(e)
			{
				system.alert(this, e,"");
			}
		}
    } 
};											  
window.app_budget_master_fBrg.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Master Jenis Asset",this.ed_kode,this.ed_nama, 
										  "select kode_brg, nama  from agg_barang_m where kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(kode_brg) from agg_barang_m where kode_lokasi = '"+this.app._lokasi+"'",
										  new Array("kode_brg","nama"),"and",new Array("Kode Jenis","Deskripsi"),false);
		}
		if (sender == this.cb_satuan) 
		{
		    this.standarLib.showListData(this, "Daftar Satuan",this.cb_satuan,undefined, 
										  "select kode_sat,nama   from agg_satuan ",
										  "select count(kode_sat) from agg_satuan ",
										  new Array("kode_klpbrg","nama"),"where",new Array("Kode Satuan","Deskripsi"),false);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_budget_master_fBrg.prototype.doRequestReady = function(sender, methodName, result)
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
