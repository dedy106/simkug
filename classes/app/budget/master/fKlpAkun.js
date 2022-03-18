/**
 * @author dweexfuad, mr
 */
window.app_budget_master_fKlpAkun = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fKlpAkun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fKlpAkun";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kelompok Akun Aktiva Tetap: Input/Koreksi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiTable");
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Kelompok", rightLabelVisible:false, multiSelection:false,change:[this,"doEditChange"]});					
			this.e1 = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama Kelompok"});			
			this.eUmur = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Umur",tipeText:ttNilai,change:[this,"doEditChange"]});			
			this.ePersen = new portalui_saiLabelEdit(this,{bound:[20,27,180,20],caption:"% Susut[Thn]",tipeText:ttNilai,readOnly:true});			
			this.eAkun = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Akun Aktap", multiSelection:false});					
			this.eBP = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"Akun BP", multiSelection:false});					
			this.eAkum = new portalui_saiCBBL(this,{bound:[20,26,200,20],caption:"Akun Depresiasi", multiSelection:false});					
			this.bTampil = new portalui_button(this,{bound:[779,26,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
			this.p1 = new portalui_panel(this,{bound:[10,25,850,300],caption:"Daftar Kelompok Akun Aktiva Tetap"});
			this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,845,278],tag:"9"});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();		
			this.eUmur.setText("0");
			this.ePersen.setText("0");
			
			this.e0.setSQL("select kode_klpakun, nama from agg_fa_klpakun ",["kode_klpakun","nama"],false,["Kode","Nama"],"where","Data Kelompok Akun Aktap",false);
			this.eAkun.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun");						
			this.eBP.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun");						
			this.eAkum.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun");									
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fKlpAkun.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fKlpAkun.implement({
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
					this.eUmur.setText("0");	
					this.ePersen.setText("0");	
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_fa_klpakun (kode_klpakun,nama,umur,persen,kode_akun,akun_bp,akun_deprs)  values "+
								"('"+this.e0.getText()+"','"+this.e1.getText()+"',"+parseNilai(this.eUmur.getText())+","+parseNilai(this.ePersen.getText())+",'"+this.eAkun.getText()+"','"+this.eBP.getText()+"','"+this.eAkum.getText()+"') ");						
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_fa_klpakun set nama='"+this.e1.getText()+"',umur="+parseNilai(this.eUmur.getText())+",persen="+parseNilai(this.ePersen.getText())+",kode_akun='"+this.eAkun.getText()+"',akun_bp='"+this.eBP.getText()+"',akun_deprs='"+this.eAkum.getText()+"' "+
								"where kode_klpakun='"+this.e0.getText()+"'");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_fa_klpakun where kode_klpakun = '"+this.e0.getText()+"'");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.e0.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doEditChange: function(sender){
		if (sender == this.eUmur) {
			if (this.eUmur.getText() != ""){
				try{
					this.ePersen.setText(floatToNilai(100/(nilaiToFloat(this.eUmur.getText()))));
				}catch(e){
					system.alert(this, e,"");
				}
			}
		}
		if(sender == this.e0){
			if (this.e0.getText() != ""){
				try{			
					var data = this.dbLib.runSQL("select a.nama,a.umur,a.persen,a.kode_akun,b.nama as nama_akun,a.akun_bp,c.nama as nama_bp,a.akun_deprs,d.nama as nama_deprs "+
					                             "from agg_fa_klpakun a inner join agg_masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='"+this.app._lokasi+"' "+
												 "					    inner join agg_masakun c on a.akun_bp=c.kode_akun and c.kode_lokasi='"+this.app._lokasi+"' "+
												 "					    inner join agg_masakun d on a.akun_deprs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
					                             "where a.kode_klpakun = '"+this.e0.getText()+"' ");
					if (data instanceof portalui_arrayMap){				
						if (data.get(0) != undefined){
							this.e1.setText(data.get(0).get("nama"));
							this.eUmur.setText(floatToNilai(data.get(0).get("umur")));
							this.ePersen.setText(floatToNilai(data.get(0).get("persen")));
							this.eAkun.setText(data.get(0).get("kode_akun"),data.get(0).get("nama_akun"));							
							this.eBP.setText(data.get(0).get("akun_bp"),data.get(0).get("nama_bp"));							
							this.eAkum.setText(data.get(0).get("akun_deprs"),data.get(0).get("nama_deprs"));							
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
			this.sg1.setColTitle(new Array("No","Kode Pok","Nama Kelompok","Umur","% Susut/Thn","Akun Aktap","Nama Akun","Akun BP","Nama Akun BP","Akun Deprs.","Nama Akun Deprs."));				
			var data = this.dbLib.runSQL("select a.kode_klpakun,a.nama,a.umur,a.persen,a.kode_akun,b.nama as nama_akun,a.akun_bp,c.nama as nama_bp,a.akun_deprs,d.nama as nama_deprs "+
										 "from agg_fa_klpakun a inner join agg_masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi = '"+this.app._lokasi+"' "+
										 "					    inner join agg_masakun c on a.akun_bp=c.kode_akun and c.kode_lokasi='"+this.app._lokasi+"' "+
										 "					    inner join agg_masakun d on a.akun_deprs=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' ");
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