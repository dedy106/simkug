window.app_saku_fa_master_fFaklpakun = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_master_fFaklpakun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_master_fFaklpakun";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Akun Asset", 0);	

		uses("portalui_saiCBBL");
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("Kode");
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
		this.ed_nama.setWidth(300);
		this.ed_nama.setCaption("Nama");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(false);
		this.ed_nama.setLength(50);
		this.ed_nama.setTag("1");
				
		this.ed_umur = new portalui_saiLabelEdit(this);
		this.ed_umur.setLeft(20);
		this.ed_umur.setTop(54);
		this.ed_umur.setWidth(150);
		this.ed_umur.setTipeText(ttNilai);
		this.ed_umur.setAlignment(alRight);
		this.ed_umur.setCaption("Umur [Bulan]");
		this.ed_umur.setText("0"); 
		this.ed_umur.setReadOnly(false);
		this.ed_umur.setTag("1");

		this.ed_persen = new portalui_saiLabelEdit(this);
		this.ed_persen.setLeft(20);
		this.ed_persen.setTop(76);
		this.ed_persen.setWidth(150);
		this.ed_persen.setTipeText(ttNilai);
		this.ed_persen.setAlignment(alRight);
		this.ed_persen.setCaption("Persentase [Tahun]");
		this.ed_persen.setText("0"); 
		this.ed_persen.setReadOnly(true);
		this.ed_persen.setTag("1");
		
		uses("portalui_saiCBBL");
		this.cb_asset = new portalui_saiCBBL(this);
		this.cb_asset.setLeft(20);
		this.cb_asset.setTop(98);
		this.cb_asset.setWidth(185);
		this.cb_asset.setCaption("Akun Asset");
		this.cb_asset.setText(""); 
		this.cb_asset.setReadOnly(true);
		this.cb_asset.setLabelWidth(100);
		this.cb_asset.setRightLabelVisible(true);
		this.cb_asset.setRightLabelCaption("");	
		this.cb_asset.setTag("1");
		
		this.cb_bp = new portalui_saiCBBL(this);
		this.cb_bp.setLeft(20);
		this.cb_bp.setTop(120);
		this.cb_bp.setWidth(185);
		this.cb_bp.setCaption("Akun Beban Peny.");
		this.cb_bp.setText(""); 
		this.cb_bp.setReadOnly(true);
		this.cb_bp.setLabelWidth(100);
		this.cb_bp.setRightLabelVisible(true);
		this.cb_bp.setRightLabelCaption("");	
		this.cb_bp.setTag("1");
		
		this.cb_susut = new portalui_saiCBBL(this);
		this.cb_susut.setLeft(20);
		this.cb_susut.setTop(142);
		this.cb_susut.setWidth(185);
		this.cb_susut.setCaption("Akun Depresiasi");
		this.cb_susut.setText(""); 
		this.cb_susut.setReadOnly(true);
		this.cb_susut.setLabelWidth(100);
		this.cb_susut.setRightLabelVisible(true);
		this.cb_susut.setRightLabelCaption("");	
		this.cb_susut.setTag("1");
		
		setTipeButton(tbAllFalse);
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		this.bShow.onClick.set(this, "showClick");
		this.ed_umur.onChange.set(this, "doEditChange");
		this.cb_asset.onBtnClick.set(this, "FindBtnClick");
		this.cb_bp.onBtnClick.set(this, "FindBtnClick");
		this.cb_susut.onBtnClick.set(this, "FindBtnClick");
		
		this.setTabChildIndex();
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
		}catch(e)
		{
			systemAPI.alert(e);
		}
	}
};
window.app_saku_fa_master_fFaklpakun.extend(window.portalui_childForm);
window.app_saku_fa_master_fFaklpakun.implement({
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
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);				
				}
				break;
			case "simpan" :
				if ((modalResult == mrOk) && (this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
				{
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into fa_klpakun (kode_klpakun,kode_lokasi,nama,umur,persen,kode_akun,akun_bp,akun_deprs)  values "+
								"('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.ed_nama.getText()+"',"+parseNilai(this.ed_umur.getText())+","+parseNilai(this.ed_persen.getText())+",'"+this.cb_asset.getText()+"','"+this.cb_bp.getText()+"','"+this.cb_susut.getText()+"') ");
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
						sql.add("update fa_klpakun set  "+
								"nama = '"+this.ed_nama.getText()+"',umur="+parseNilai(this.ed_umur.getText())+",persen="+parseNilai(this.ed_persen.getText())+",kode_akun='"+this.cb_asset.getText()+"',akun_bp='"+this.cb_bp.getText()+"',akun_deprs='"+this.cb_susut.getText()+"' where kode_klpakun='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.dbLib.execArraySQL(sql);	
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
					uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from fa_klpakun where kode_klpakun='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.dbLib.execArraySQL(sql);	
			   }
				break;
		}
		this.ed_kode.setFocus();
	},
	showClick: function(sender){
		try 
		{
			this.standarLib.clearByTag(this, new Array("1"),undefined);				
			setTipeButton(tbSimpan);		
			var line,data = this.dbLib.runSQL("select a.kode_klpakun,a.nama,a.umur,a.persen,a.kode_akun,a.akun_bp,a.akun_deprs,b.nama as nama_asset,c.nama as nama_bp,d.nama as nama_susut "+
											"from fa_klpakun a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"                  inner join masakun c on a.akun_bp=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
											"                  inner join masakun d on a.akun_deprs=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
											"where a.kode_klpakun = '"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			
			
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.ed_nama.setText(line.get("nama"));
					this.ed_umur.setText(floatToNilai(parseFloat(line.get("umur"))));
					this.ed_persen.setText(floatToNilai(parseFloat(line.get("persen"))));
					this.cb_asset.setText(line.get("kode_akun"));
					this.cb_asset.setRightLabelCaption(line.get("nama_asset"));
					this.cb_bp.setText(line.get("akun_bp"));
					this.cb_bp.setRightLabelCaption(line.get("nama_bp"));
					this.cb_susut.setText(line.get("akun_deprs"));
					this.cb_susut.setRightLabelCaption(line.get("nama_susut"));
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
	doEditChange: function(sender){
		if (sender == this.ed_umur) 
		{
			if (this.ed_umur.getText() != "")
			{
				try
				{
					this.ed_persen.setText(floatToNilai(100/(nilaiToFloat(this.ed_umur.getText())/12)));
				}catch(e)
				{
					system.alert(this, e,"");
				}
				
			}
		} 
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.ed_kode) 
			{
				this.standarLib.showListData(this, "Daftar Kelompok Akun Asset",this.ed_kode,this.ed_nama, 
											  "select kode_klpakun, nama  from fa_klpakun where kode_lokasi = '"+this.app._lokasi+"'",
											  "select count(kode_klpakun) from fa_klpakun where kode_lokasi = '"+this.app._lokasi+"'",
											  new Array("kode_klpakun","nama"),"and",new Array("Kode Kelompok Akun","Deskripsi"),false);
				this.standarLib.clearByTag(this, new Array("1"),undefined);	
			}
			if (sender == this.cb_asset) 
			{
				this.standarLib.showListData(this, "Daftar Akun Asset",this.cb_asset,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='006'",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='006'",
											  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
			}
			if (sender == this.cb_bp) 
			{
				this.standarLib.showListData(this, "Daftar Akun Beban Penyusutan Asset",this.cb_bp,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='007'",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='007'",
											  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
			}
			if (sender == this.cb_susut) 
			{
				this.standarLib.showListData(this, "Daftar Akun Depresiasi Asset",this.cb_susut,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='008'",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='008'",
											  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
			}
		}catch(e)
		{
			systemAPI.alert(e);
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
	}
});