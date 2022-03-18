/**
 * @author dweexfuad
 */
window.app_budget_master_fInvParam = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fInvParam.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fInvParam";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Investasi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar;portalui_saiTable");
			this.elokasi = new portalui_saiCBBL(this,{bound:[20,20,150,20],caption:"Lokasi", multiSelection:false,change:[this,"doEditChange"]});				
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Param", multiSelection:false,change:[this,"doEditChange"],tag:"1"});					
			this.eNama = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama",tag:"2"});	
			this.eAkun = new portalui_saiCBBL(this,{bound:[20,23,200,20],caption:"Kode Akun",multiSelection:false,tag:"2"});	
			this.eDrk = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Kode DRK",multiSelection:false,tag:"2"});
			this.eRka = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"Kode RKA",multiSelection:false,tag:"2"});
			this.bTampil = new portalui_button(this,{bound:[729,25,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,26,800,323],caption:"Daftar"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,800,280]});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,300,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"],tag:"9"});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			this.elokasi.setText(this.app._lokasi);
			var lokasi = (this.app._userStatus == "A" ? "%" : this.app._lokasi);				
			this.elokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi like '"+lokasi+"' ",["kode_lokasi","nama"],undefined,["Kode","Nama"],"and","Data Lokasi");			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fInvParam.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fInvParam.implement({
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
		if (modalResult != mrOk) return;
		try{
			switch (event)
			{
				case "clear" :
					this.standarLib.clearByTag(this, new Array("1","2"),this.e0);
					this.sg1.clear(1);
					setTipeButton(tbAllFalse);											
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_param (kode_param, kode_lokasi, nama, jenis, kode_akun, kode_drk, kode_rka) "+
						        "values ('"+this.e0.getText()+"','"+this.app._lokasi+"','"+this.eNama.getText()+"','PDPT','"+this.eAkun.getText()+"','"+this.eDrk.getText()+"','"+this.eRka.getText()+"') ");
						//alert(sql.get(0));
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_param set nama = '"+this.eNama.getText()+"',kode_akun='"+this.eAkun.getText()+"',kode_drk='"+this.eDrk.getText()+"',kode_rka='"+this.eRka.getText()+"' where kode_param = '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from  agg_param where kode_param = '"+this.e0.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.standarLib.clearByTag(this, new Array("1","2"),this.e0);
			this.e0.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){
		if (sender == this.elokasi)
		{
			this.e0.setSQL("select kode_param, nama from agg_param where kode_lokasi = '"+this.elokasi.getText()+"' ",["kode_param","nama"],undefined,["Kode Band","Nama"],"and","Data Parameter",false);
			this.eAkun.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi='"+this.elokasi.getText()+"' ",["kode_akun","nama"],undefined,["Kode Akun","Nama"],"and","Data Akun",true);
			this.eDrk.setSQL("select kode_drk, nama from agg_drk where kode_lokasi='"+this.elokasi.getText()+"' ",["kode_drk","nama"],undefined,["Kode DRK","Nama"],"and","Data DRK",true);
			this.eRka.setSQL("select kode_rka, nama from agg_rka where kode_lokasi='"+this.elokasi.getText()+"' ",["kode_rka","nama"],undefined,["Kode RKA","Nama"],"and","Data RKA",true);
		}
		if(sender == this.e0){
			if (this.e0.getText() != "")
			{
				try
				{			
					this.standarLib.clearByTag(this, new Array("2"),this.e0);
					var sql="select a.kode_param,a.nama as nama_param,a.kode_akun,b.nama as nama_akun,a.kode_drk,c.nama as nama_drk,a.kode_rka,d.nama as nama_rka "+
											"from agg_param a "+
											"left join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"left join agg_drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi "+ 
											"left join agg_rka d on a.kode_rka=d.kode_rka and a.kode_lokasi=d.kode_lokasi "+ 
											"where a.kode_param='"+this.e0.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
					var data = this.dbLib.getDataProvider(sql,true);			
					//data = JSON.parse(data);
					if (typeof data == "object")
					{
						var line = data.rs.rows[0];							
						if (line != undefined)
						{
							this.eNama.setText(line.nama_param);
							this.eAkun.setText(line.kode_akun,line.nama_akun);
							this.eDrk.setText(line.kode_drk,line.nama_drk);
							this.eRka.setText(line.kode_rka,line.nama_rka);
							setTipeButton(tbUbahHapus);
						}
						else
						{
							setTipeButton(tbSimpan);
						}
					}				
				}catch(e){
					system.alert(this, e,"");
				}
			}
		}
	},	
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select a.kode_param,a.nama as nama_param,a.kode_akun,b.nama as nama_akun,a.kode_drk,c.nama as nama_drk,a.kode_rka,d.nama as nama_rka from agg_inv_param a "+
											"left join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											"left join agg_drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi "+ 
											"left join agg_rka d on a.kode_rka=d.kode_rka and a.kode_lokasi=d.kode_lokasi "+ 
											"where a.kode_lokasi='"+this.app._lokasi+"' "+
											"order by a.kode_param");
			if (temp instanceof portalui_arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page){
		this.sg1.selectPage(page);
	
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});