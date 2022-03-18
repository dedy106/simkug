/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_master_fKota = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fKota.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fKota";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Indeks Kota", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar");
			this.eKode = new portalui_saiCBBL(this,{bound:[20,21,170,20],caption:"Kode", multiSelection:false,change:[this,"doEditChange"],rightLabelVisible:false});					
			this.eNama = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama",tag:"1"});	
			this.eIdx = new portalui_saiLabelEdit(this,{bound:[20,23,170,20],caption:"Index Kota",tipeText:ttNilai,text:"0",tag:"1"});
			this.bTampil = new portalui_button(this,{bound:[429,23,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
			this.p1 = new portalui_panel(this,{bound:[10,24,500,380],caption:"Daftar Index Kota"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,500,330],tag:"9",
						colTitle: ["Kode", "Nama Kota", "Index"]});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,355,500,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbAllFalse);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			this.eKode.setSQL("select kode_kota, nama from agg_kota ",["kode_kota","nama"],undefined,["Kode Kota","Nama"],"and","Data Kota",false);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fKota.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fKota.implement({
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);										
					break;
				case "simpan" :
				    if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_kota (kode_kota,nama,idx ) values ('"+this.eKode.getText()+"','"+this.eNama.getText()+"','"+parseNilai(this.eIdx.getText())+"') ");
						this.dbLib.execArraySQL(sql);	
					}
					break;
				case "ubah" :	
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_kota set nama = '"+this.eNama.getText()+"',idx="+parseNilai(this.eIdx.getText())+" where kode_kota = '"+this.eKode.getText()+"'");							
						this.dbLib.execArraySQL(sql);
					}
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from  agg_kota where kode_kota = '"+this.eKode.getText()+"'");
						this.dbLib.execArraySQL(sql);	
					break;
			}
			this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){
		if(sender == this.eKode){
			if (this.eKode.getText() != "")
			{
				try
				{			
				    this.standarLib.clearByTag(this, new Array("1"),this.eKode);	
					var sql="select nama,idx from agg_kota where kode_kota = '"+this.eKode.getText()+"' ";
					var data = this.dbLib.getDataProvider(sql,true)
					if (typeof data == "object")
					{
						var line = data.rs.rows[0];							
						if (line != undefined)
						{
							this.eNama.setText(line.nama);
							this.eIdx.setText(floatToNilai(line.idx));
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
			var temp = this.dbLib.runSQL("select kode_kota,nama,idx from agg_kota order by kode_kota");
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
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eKode.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});