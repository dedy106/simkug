/**
 * @author mr
 */
window.app_budget_master_fVarM = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fVarM.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fVarM";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Variabel", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiGrid");
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Biaya", multiSelection:false,change:[this,"doEditChange"],rightLabelVisible:false});					
			this.e1 = new portalui_saiLabelEdit(this,{bound:[20,23,400,20],caption:"Nama"});									
			this.eJenis = new portalui_saiCB(this,{bound:[20,22,200,20],caption:"Jenis",items:["UMUM","TPK"],tag:2});
			this.bTampil = new portalui_button(this,{bound:[429,22,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,23,500,450],caption:"Daftar Variable Biaya"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,500,400],
			        colTitle:["Kode Biaya","Nama Variable Biaya","Jenis"],
					readOnly:true,defaultRow:1});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,423,500,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			this.e0.setSQL("select kode_var, nama, jenis from agg_var ",["kode_var","nama","jenis"],false,["Kode Biaya","Nama","Jenis"],"where","Data Variable Biaya",false);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fVarM.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fVarM.implement({
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
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_var (kode_var,nama,jenis ) values ('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.eJenis.getText()+"') ");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_var set jenis='"+this.eJenis.getText()+"',nama = '"+this.e1.getText()+"'where kode_var = '"+this.e0.getText()+"'");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_var where kode_var = '"+this.e0.getText()+"'");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.e0.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doEditChange: function(sender){
		if(sender == this.e0){
			if (this.e0.getText() != ""){
				try{			
					var data = this.dbLib.runSQL("select * from agg_var where kode_var = '"+this.e0.getText()+"' ");
					if (data instanceof portalui_arrayMap){				
						if (data.get(0) != undefined){
							this.e1.setText(data.get(0).get("nama"));
							this.e0.setRightLabelCaption(data.get(0).get("nama"));							
							this.eJenis.setText(data.get(0).get("jenis"));							
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
			var temp = this.dbLib.runSQL("select kode_var,nama,jenis from agg_var order by kode_var");
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
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1) {
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
						this.app._mainForm.bClear.click();  
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	},
	doPager: function(sender, page){
		this.sg1.selectPage(page);
	
	}
});
