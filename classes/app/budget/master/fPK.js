/**
 * @author dweexfuad, mr
 */
window.app_budget_master_fPK = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fPK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fPK";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Program Kerja : Input/Koreksi/Copy", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiGrid");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,19,180,20],caption:"Tahun Anggaran",maxLength:4, tipeText:ttAngka, change:[this,"doEditChange"]});
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode PK", multiSelection:false,change:[this,"doEditChange"],rightLabelVisible:false});
			this.e1 = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama",maxLength:200});
			this.eTahun2 = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Tahun Angg. [N-1]",maxLength:4,readOnly:true});								
			this.i_load = new portalui_imageButton(this,{bound:[200,23,20,20],hint:"Load Data PK Tahun Angg. [N-1]",image:"icon/"+system.getThemes()+"/reload.png",click:[this,"doTampilClick"]});
			this.i_viewer = new portalui_imageButton(this,{bound:[220,23,20,20],hint:"Copy dan Simpan Data PK Tahun Angg. [N-1]",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doCopy"]});
			
			this.bTampil = new portalui_button(this,{bound:[429,23,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,24,500,400],caption:"Daftar Program Kerja"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,500,355],
					colTitle:["Kode PK","Program Kerja","Tahun Angg."],readOnly:true,defaultRow:1});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,380,500,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fPK.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fPK.implement({
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
						sql.add("insert into agg_pk (kode_pk, nama,tahun ) values ('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.eTahun.getText()+"')");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_pk set nama='"+this.e1.getText()+"' where tahun='"+this.eTahun.getText()+"' and kode_pk='"+this.e0.getText()+"'");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from  agg_pk where tahun='"+this.eTahun.getText()+"' and kode_pk='"+this.e0.getText()+"'");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.e0.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doCopy: function(sender) {
		if (this.eTahun2.getText()!="") {
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			sql.add("delete from agg_pk where tahun = '"+this.eTahun.getText()+"'");
			sql.add("insert into agg_pk (kode_pk,nama,tahun) "+
					"select kode_pk,nama,'"+this.eTahun.getText()+"' from agg_pk where tahun='"+this.eTahun2.getText()+"'");									
			this.dbLib.execArraySQL(sql);			
		}
	},
	doEditChange: function(sender){
		if (sender == this.eTahun && this.eTahun.getText()!=""){
			this.e0.setSQL("select kode_pk, nama from agg_pk where tahun = '"+this.eTahun.getText()+"' ",["kode_pk","nama"],false,["Kode PK","Nama"],"and","Data Program Kerja",false);
			this.eTahun2.setText(parseFloat(this.eTahun.getText())-1);
		}
		if(sender == this.e0){
			if (this.e0.getText() != "" && this.eTahun.getText()!=""){
				try{			
					var data = this.dbLib.runSQL("select * from agg_pk where tahun='"+this.eTahun.getText()+"' and kode_pk = '"+this.e0.getText()+"' ");
					if (data instanceof portalui_arrayMap){				
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
			if (sender == this.i_load) {
				if (this.eTahun2.getText() != "") {
					var temp = this.dbLib.runSQL("select kode_pk,nama,tahun from agg_pk where tahun = '"+this.eTahun2.getText()+"' order by kode_pk");
					if (temp instanceof portalui_arrayMap) {
						this.sg1.setData(temp,true,20);
						this.sgn.setTotalPage(this.sg1.pageCount);				
						this.sgn.rearrange();
						this.sgn.activePage = 0;
					}else systemAPI.alert(temp);
				}
			} 
			else {
				if (this.eTahun.getText()!="") {
					var temp = this.dbLib.runSQL("select kode_pk,nama,tahun from agg_pk where tahun = '"+this.eTahun.getText()+"' order by kode_pk");
					if (temp instanceof portalui_arrayMap) {
						this.sg1.setData(temp,true,20);
						this.sgn.setTotalPage(this.sg1.pageCount);				
						this.sgn.rearrange();
						this.sgn.activePage = 0;
					}else systemAPI.alert(temp);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page){
		this.sg1.selectPage(page);
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib){
			switch	(methodName){
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1) {
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
						this.app._mainForm.bClear.click();  
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});