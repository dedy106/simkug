/**
 * @author dweexfuad, mr
 */
window.app_budget_master_fKlpAsset2 = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fKlpAsset2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fKlpAsset2";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kelompok Aktiva Tetap: Input/Koreksi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiTable");
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Kelompok", rightLabelVisible:false, multiSelection:false,change:[this,"doEditChange"]});					
			this.e1 = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama Kelompok"});			
			this.eNilai = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Harga Ref",tipeText:ttNilai});			
			this.eAkun = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Kelompok Akun", multiSelection:false});					
			this.bTampil = new portalui_button(this,{bound:[779,24,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
			this.p1 = new portalui_panel(this,{bound:[10,25,850,300],caption:"Daftar Kelompok Aktiva Tetap"});
			this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,845,278],tag:"9"});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();		
			this.eNilai.setText("0");
			
			this.e0.setSQL("select kode_klpfa, nama from agg_fa_klp ",["kode_klpfa","nama"],false,["Kode","Nama"],"where","Data Kelompok Aktap",false);
			this.eAkun.setSQL("select kode_klpakun, nama from agg_fa_klpakun ",["kode_klpakun","nama"],false,["Kode","Nama"],"where","Data Kelompok Akun Aktap",true);

		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fKlpAsset2.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fKlpAsset2.implement({
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
					this.eNilai.setText("0");	
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_fa_klp(kode_klpfa, nama, tipe, rowindex, kode_induk,sum_header, level_lap,level_spasi, kode_klpakun,  nik_user, tgl_input,nilai) values "+
								"('"+this.e0.getText()+"', '"+this.e1.getText()+"', 'posting', 0, '00','-', 0,0, '"+this.eAkun.getText()+"',  '"+this.app._userLog+"', now(),"+parseNilai(this.eNilai.getText())+") ");						
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_fa_klp set nama='"+this.e1.getText()+"',nilai="+parseNilai(this.eNilai.getText())+",kode_klpakun='"+this.eAkun.getText()+"'  "+
								"where kode_klpfa='"+this.e0.getText()+"'");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_fa_klp where kode_klpfa='"+this.e0.getText()+"'");
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
					var data = this.dbLib.runSQL("select a.nama,a.nilai,a.kode_klpakun,b.nama as nama_akun "+
					                             "from agg_fa_klp a inner join agg_fa_klpakun b on a.kode_klpakun=b.kode_klpakun "+
					                             "where a.kode_klpfa = '"+this.e0.getText()+"' ");
					if (data instanceof portalui_arrayMap){				
						if (data.get(0) != undefined){
							this.e1.setText(data.get(0).get("nama"));
							this.eNilai.setText(floatToNilai(data.get(0).get("nilai")));
							this.eAkun.setText(data.get(0).get("kode_klpakun"),data.get(0).get("nama_akun"));
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
			this.sg1.setColTitle(new Array("No","Kode Pok","Nama Kelompok","Nilai","Pok Akun Aktap","Nama Pok Akun"));				
			var data = this.dbLib.runSQL("select a.kode_klpfa,a.nama as nama_klpfa,a.nilai,b.kode_klpakun,b.nama as nama_klpakun "+
										 "from agg_fa_klp a inner join agg_fa_klpakun b on a.kode_klpakun=b.kode_klpakun");
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