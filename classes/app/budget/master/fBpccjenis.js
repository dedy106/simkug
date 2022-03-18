/**
 * @author mr
 */
window.app_budget_master_fBpccjenis = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fBpccjenis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fBpccjenis";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis Layanan", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standare");
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,170,20],caption:"Kode Layanan", multiSelection:false,change:[this,"doEditChange"]});					
			this.e1 = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama"});									
			this.bTampil = new portalui_button(this,{bound:[429,22,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,23,500,433],caption:"Daftar Layanan"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,495,380],tag:9,
					colTitle: ["Kode Layanan","Nama Layanan"]});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,408,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbAllFalse);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();	
			this.e0.setSQL("select kode_bpcc, nama from agg_bpcc_jenis ",["kode_bpcc","nama"],false,["Kode Layanan","Nama"],"where","Data Layanan",false);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fBpccjenis.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fBpccjenis.implement({
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
					this.e0.setText("");
					this.e0.setRightLabelCaption("");
					this.e1.setText("");												
					break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this, [0]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_bpcc_jenis (kode_bpcc,nama ) values ('"+this.e0.getText()+"','"+this.e1.getText()+"') ");
						this.dbLib.execArraySQL(sql);
					}
					break;
				case "ubah" :					
					if (this.standarLib.checkEmptyByTag(this, [0])){
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_bpcc_jenis set nama = '"+this.e1.getText()+"'where kode_bpcc = '"+this.e0.getText()+"'");
						this.dbLib.execArraySQL(sql);							
					}
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from  agg_bpcc_jenis where kode_bpcc = '"+this.e0.getText()+"' ");
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
		if(sender == this.e0){
			if (this.e0.getText() != "")
			{
				try
				{			
					var data = this.dbLib.runSQL("select * from agg_bpcc_jenis where kode_bpcc = '"+this.e0.getText()+"' ");
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
			var temp = this.dbLib.runSQL("select kode_bpcc,nama from agg_bpcc_jenis order by kode_bpcc");
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
					if (result.toLowerCase().search("error") == -1) {
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
						setTipeButton(tbAllFalse);
						this.e0.clear();
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});
