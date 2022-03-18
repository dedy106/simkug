window.app_saku_logistik_master_fBrg = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_master_fBrg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_master_fBrg";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Barang", 0);	

		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("Kode Barang");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
		
		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(202);
		this.bShow.setTop(10);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(32);
		this.ed_nama.setWidth(600);
		this.ed_nama.setCaption("Nama Barang");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(200);
		this.ed_nama.setTag("1");
		
		this.cb_klp = new portalui_saiCBBL(this);
		this.cb_klp.setLeft(20);
		this.cb_klp.setTop(54);
		this.cb_klp.setWidth(185);
		this.cb_klp.setCaption("Kelompok Brg");
		this.cb_klp.setText("");
		this.cb_klp.setReadOnly(false);
		this.cb_klp.setLabelWidth(100);
		this.cb_klp.setRightLabelVisible(true);
		this.cb_klp.setRightLabelCaption("");
		this.cb_klp.setTag("1");
		
		this.cb_sat = new portalui_saiCBBL(this);
		this.cb_sat.setLeft(20);
		this.cb_sat.setTop(76);
		this.cb_sat.setWidth(185);
		this.cb_sat.setCaption("Satuan");
		this.cb_sat.setText("");
		this.cb_sat.setReadOnly(false);
		this.cb_sat.setLabelWidth(100);
		this.cb_sat.setRightLabelVisible(true);
		this.cb_sat.setRightLabelCaption("");
		this.cb_sat.setTag("1");
		
		this.ed_merk = new portalui_saiLabelEdit(this);
		this.ed_merk.setLeft(20);
		this.ed_merk.setTop(98);
		this.ed_merk.setWidth(400);
		this.ed_merk.setCaption("Merk / Brand");
		this.ed_merk.setText("");
		this.ed_merk.setReadOnly(false);
		this.ed_merk.setLength(100);
		this.ed_merk.setTag("1");
		
		this.ed_tipe = new portalui_saiLabelEdit(this);
		this.ed_tipe.setLeft(20);
		this.ed_tipe.setTop(120);
		this.ed_tipe.setWidth(400);
		this.ed_tipe.setCaption("Tipe");
		this.ed_tipe.setText("");
		this.ed_tipe.setReadOnly(false);
		this.ed_tipe.setLength(100);
		this.ed_tipe.setTag("1");
		
		this.ed_harga = new portalui_saiLabelEdit(this);
		this.ed_harga.setLeft(20);
		this.ed_harga.setTop(142);
		this.ed_harga.setWidth(200);
		this.ed_harga.setTipeText(ttNilai);
		this.ed_harga.setAlignment(alRight);
		this.ed_harga.setCaption("Harga Ref.");
		this.ed_harga.setText("0"); 
		this.ed_harga.setReadOnly(false);
		this.ed_harga.setTag("1");
		
		this.ed_curr = new portalui_saiLabelEdit(this);
		this.ed_curr.setLeft(269);
		this.ed_curr.setTop(142);
		this.ed_curr.setWidth(150);
		this.ed_curr.setCaption("Kode Currency");
		this.ed_curr.setText("IDR"); 
		this.ed_curr.setReadOnly(true);
		this.ed_curr.setTag("9");
		setTipeButton(tbAllFalse);
		this.rearrangeChild(10,23);
        this.bShow.onClick.set(this, "showClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		this.cb_klp.onBtnClick.set(this, "FindBtnClick");
		this.cb_sat.onBtnClick.set(this, "FindBtnClick");
		this.setTabChildIndex();
        	
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.ed_curr.setText("IDR");			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_master_fBrg.extend(window.portalui_childForm);
window.app_saku_logistik_master_fBrg.implement({    
    mainButtonClick:function(sender){
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
    					sql.add("insert into barang_m (kode_brg,nama,kode_klpbrg,kode_sat,kode_lokasi,merk,tipe,harga_ref,kode_curr)  values "+
    							"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.cb_klp.getText()+"','"+
    							     this.cb_sat.getText()+"','"+this.app._lokasi+"','"+this.ed_merk.getText()+"','"+this.ed_tipe.getText()+"',"+
    								 parseNilai(this.ed_harga.getText())+",'"+this.ed_curr.getText()+"') ");
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
    					sql.add("update barang_m set  "+
    							"nama = '"+this.ed_nama.getText()+"',kode_curr='"+this.ed_curr.getText()+"',kode_klpbrg = '"+this.cb_klp.getText()+
    							"',kode_sat = '"+this.cb_sat.getText()+"',merk='"+this.ed_merk.getText()+"',tipe='"+this.ed_tipe.getText()+"',harga_ref="+parseNilai(this.ed_harga.getText())+" "+
    							"where kode_brg = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
    					this.dbLib.execArraySQL(sql);	
    			}
    			break;
    		case "hapus" :
    		   if (modalResult == mrOk)
    		   {
    				uses("server_util_arrayList");					
    					var sql = new server_util_arrayList();
    					sql.add("delete from barang_m where kode_brg='"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
    					this.dbLib.execArraySQL(sql);	
    		   }
    			break;
    	}
    	this.ed_kode.setFocus();
    },
    showClick : function(sender){
    	try 
    	{
    		this.standarLib.clearByTag(this, new Array("1"),undefined);				
    		setTipeButton(tbSimpan);
    		var line,data = this.dbLib.runSQL(" select a.kode_brg,a.nama,a.kode_klpbrg,a.kode_sat,a.merk,a.tipe,a.harga_ref,b.nama as nama_klp,c.nama as nama_sat "+
    				                          " from barang_m a inner join barang_klp b on a.kode_klpbrg=b.kode_klpbrg and a.kode_lokasi=b.kode_lokasi "+
    										  "                 inner join satuan c on a.kode_sat=c.kode_sat "+
    										  " where a.kode_brg = '"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
    		if (data instanceof portalui_arrayMap)
    		{
    			line = data.get(0);
    			if (line != undefined)
    			{
    				this.ed_nama.setText(line.get("nama"));
    				this.cb_klp.setText(line.get("kode_klpbrg"));
    				this.cb_klp.setRightLabelCaption(line.get("nama_klp"));
    				this.cb_sat.setText(line.get("kode_sat"));
    				this.cb_sat.setRightLabelCaption(line.get("nama_sat"));
    				this.ed_merk.setText(line.get("merk"));
    				this.ed_tipe.setText(line.get("tipe"));
    				this.ed_harga.setText(floatToNilai(parseFloat(line.get("harga_ref"))));
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
    },
    FindBtnClick : function(sender, event){
    	try
    	{
    		if (sender == this.ed_kode) 
    		{
    			this.standarLib.showListData(this, "Daftar Master Barang",this.ed_kode,undefined, 
    										  "select kode_brg, nama  from barang_m where kode_lokasi='"+this.app._lokasi+"'",
    										  "select count(kode_brg) from barang_m where kode_lokasi='"+this.app._lokasi+"'",
    										  new Array("kode_brg","nama"),"and",new Array("Kode Barang","Nama Barang"),false);
    			this.standarLib.clearByTag(this, new Array("1"),this.ed_kode);				
    		}
    		if (sender == this.cb_klp) 
    		{
    		    this.standarLib.showListData(this, "Daftar Kelompok Barang",this.cb_klp,undefined, 
    										  "select kode_klpbrg,nama   from barang_klp where kode_lokasi='"+this.app._lokasi+"'",
    										  "select count(kode_klpbrg) from barang_klp where kode_lokasi='"+this.app._lokasi+"'",
    										  new Array("kode_klpbrg","nama"),"and",new Array("Kode Kelompok","Deskripsi"),false);
    		}
    		if (sender == this.cb_sat) 
    		{
    		    this.standarLib.showListData(this, "Daftar Satuan",this.cb_sat,undefined, 
    										  "select kode_sat,nama   from satuan ",
    										  "select count(kode_sat) from satuan ",
    										  new Array("kode_sat","nama"),"where",new Array("Kode Satuan","Deskripsi"),false);
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
    		            this.app._mainForm.pesan(2,"Transaksi Sukses ("+this.ed_nama.getText()+")");
    		            this.app._mainForm.bClear.click();              
    	            }else
    					system.info(this, result,"");
    			break;
    		}
    	}
    }
});
