/**
 * @author dweexfuad
 */
window.app_budget_master_fKunjPeserta = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fKunjPeserta.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fKunjPeserta";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Peserta", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar;portalui_saiTable");
			this.elokasi = new portalui_saiCBBL(this,{bound:[20,20,150,20],caption:"Lokasi", multiSelection:false,change:[this,"doEditChange"]});				
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,150,20],caption:"Kode ", multiSelection:false,change:[this,"doEditChange"]});					
			this.e1 = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama"});		
			this.e2 = new portalui_saiLabelEdit(this,{bound:[20,23,200,20],caption:"Satuan"});		
			this.e3 = new portalui_saiLabelEdit(this,{bound:[20,24,200,20],caption:"Tahun"});		
			this.bTampil = new portalui_button(this,{bound:[729,24,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,25,800,323],caption:"Daftar"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,800,280]});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,300,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		

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
			this.e0.setSQL("select kode_band, nama from agg_band where kode_lokasi = '"+this.app._lokasi+"' ",["kode_band","nama"],undefined,["Kode PK","Nama"],"and","Data Program Kerja",false);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fKunjPeserta.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fKunjPeserta.implement({
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
			var status  = this.cb1.isSelected() ? '1': '0';
			switch (event)
			{
				case "clear" :
					this.e0.setText("");
					this.e0.setRightLabelCaption("");
					this.e1.setText("");												
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_band (kode_band, kode_lokasi,nama ) values ('"+this.e0.getText()+"','"+this.app._lokasi+"','"+this.e1.getText()+"') ");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_band set nama = '"+this.e1.getText()+"'where kode_band = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from  agg_band where kode_band = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.e0.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){
		if (sender === this.elokasi){
			this.e0.setSQL("select kode_band, nama from agg_band where kode_lokasi = '"+this.app._lokasi+"' ",["kode_band","nama"],undefined,["Kode Band","Nama"],"and","Data Program Kerja",false);
		}
		if(sender == this.e0){
			if (this.e0.getText() != "")
			{
				try
				{			
					var data = this.dbLib.runSQL("select * from agg_band where kode_band = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ");
								
					if (data instanceof portalui_arrayMap)
					{				
						if (data.get(0) != undefined){
							this.e1.setText(data.get(0).get("nama"));
							this.e0.setRightLabelCaption(data.get(0).get("nama"));							
							setTipeButton(tbUbahHapus);
						}else setTipeButton(tbSimpan);
					}else
						setTipeButton(tbSimpan);					
				}catch(e){
					system.alert(this, e,"");
				}
			}
		}
	},	
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("SELECT kode_peserta, nama, satuan, tahun,jml_nik, jml_pas, jml_anak, jml_nik1, jml_pas1, jml_anak1, jml_nik2, jml_pas2, jml_anak2 FROM agg_kunj_peserta");
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