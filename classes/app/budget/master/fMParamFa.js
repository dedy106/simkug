/**
 * @author dweexfuad, mr
 */
window.app_budget_master_fMParamFa = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fMParamFa.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fMParamFa";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter BPP Aktiva Tetap : Input/Koreksi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiTable");
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Parameter", rightLabelVisible:false, multiSelection:false,change:[this,"doEditChange"]});					
			this.e1 = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama Parameter"});			
			this.eSat = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Satuan"});			
			this.eAkun = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Akun BPP", multiSelection:false,change:[this,"doEditChange"]});					
			this.bTampil = new portalui_button(this,{bound:[779,24,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
			this.p1 = new portalui_panel(this,{bound:[10,25,850,450],caption:"Daftar Parameter BPP Aktiva Tetap"});
			this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,845,420],tag:"9"});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			
			this.e0.setSQL("select kode_param, nama from agg_fa_param_m  ",["kode_param","nama"],false,["Kode","Nama"],"where","Data Parameter BPP Aktap",false);
			this.eAkun.setSQL("select kode_akun, nama from agg_masakun  ",["kode_akun","nama"],false,["Kode","Nama"],"where","Daftar Akun");						
		
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fMParamFa.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fMParamFa.implement({
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
						sql.add("insert into agg_fa_param_m (kode_param,nama,satuan,kode_akun) values "+
								"('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.eSat.getText()+"','"+this.eAkun.getText()+"')");
								
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_fa_param_m set nama = '"+this.e1.getText()+"',satuan='"+this.eSat.getText()+"',kode_akun='"+this.eAkun.getText()+"' where kode_param = '"+this.e0.getText()+"'");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_fa_param_m where kode_param = '"+this.e0.getText()+"'");
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
					var data = this.dbLib.runSQL("select a.*,b.nama as nama_akun from agg_fa_param_m a inner join agg_masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='"+this.app._lokasi+"' "+
					                             "where a.kode_param = '"+this.e0.getText()+"' ");
					if (data instanceof portalui_arrayMap){				
						if (data.get(0) != undefined){
							this.e1.setText(data.get(0).get("nama"));
							this.e0.setRightLabelCaption(data.get(0).get("nama"));							
							this.eSat.setText(data.get(0).get("satuan"));
							this.eAkun.setText(data.get(0).get("kode_akun"));							
							this.eAkun.setRightLabelCaption(data.get(0).get("nama_akun"));							
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
			this.sg1.setColTitle(new Array("No","Kode Parameter","Nama Parameter","Satuan","Kode Akun","Nama Akun"));				
			var data = this.dbLib.runSQL("select a.kode_param,a.nama,a.satuan,a.kode_akun,b.nama as nama_akun "+
					   "from agg_fa_param_m a inner join agg_masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi ='"+this.app._lokasi+"' order by a.kode_param");
			this.sg1.clearAll();
			this.sg1.setData(data);			
		}catch(e){
			systemAPI.alert(e);
		}
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