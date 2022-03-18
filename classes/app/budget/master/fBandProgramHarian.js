/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_master_fBandProgramHarian = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fBandProgramHarian.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fBandProgramHarian";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Norma Tarif Uang Harian SPPD", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("saiGrid;panel;sgNavigator;button;saiLabelEdit;saiCBBL;datePicker;checkBox;util_standar");
			this.eTahun = new saiLabelEdit(this,{bound:[20,19,180,20], caption:"Tahun",tipeText:ttAngka,maxLength:4,change:[this,"doEditChange"]});
			this.eBand = new saiCBBL(this,{bound:[20,20,200,20],caption:"Kode Band", multiSelection:false,change:[this,"doEditChange"]});				
			this.eAkun = new saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Akun", multiSelection:false});				
			this.eTarif = new saiLabelEdit(this,{bound:[20,23,180,20], caption:"Tarif", tipeText:ttNilai, text:"0"});
			
			this.bTampil = new button(this,{bound:[529,23,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new panel(this,{bound:[10,25,600,400],caption:"Daftar Uang Harian SPPD per Band"});
			this.sg1 = new saiGrid(this.p1,{bound:[0,20,600,350],colCount:3,
								colTitle: ["Band","Kode Akun","Nama Akun","Tarif","Tahun"],
								colFormat:[[2],[cfNilai]], 
								colWidth:[[0,1,2],[100,120,120]],defaultRow:1});		
			this.sgn = new sgNavigator(this.p1,{bound:[0,375,600,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});					
			
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

			this.eBand.setSQL("select kode_band, nama from agg_band ",["kode_band","nama"],false,["Kode Band","Nama"],"where","Data Band",true);			
			this.eAkun.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi='"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fBandProgramHarian.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fBandProgramHarian.implement({
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
					this.eBand.setText("");
					this.eBand.setRightLabelCaption("");
					this.eTarif.setText("0");												
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_program_harian (kode_band,kode_akun,tahun,tarif ) values ('"+this.eBand.getText()+"','"+this.eAkun.getText()+"','"+this.eTahun.getText()+"',"+parseNilai(this.eTarif.getText())+") ");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_program_harian set kode_akun='"+this.eAkun.getText()+"',tarif="+parseNilai(this.eTarif.getText())+" where tahun = '"+this.eTahun.getText()+"' and kode_band = '"+this.eBand.getText()+"' ");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_program_harian where tahun = '"+this.eTahun.getText()+"' and kode_band = '"+this.eBand.getText()+"' ");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.eTahun.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doEditChange: function(sender){
		if(sender == this.eBand || sender == this.eTahun){
			if (this.eBand.getText() != "" || this.eTahun.getText() != ""){
				try{			
					var data = this.dbLib.runSQL("select a.tarif,a.kode_akun,b.nama "+
												 "from agg_program_harian a inner join agg_masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi= '"+this.app._lokasi+"' "+
					                             "where a.tahun = '"+this.eTahun.getText()+"' and a.kode_band='"+this.eBand.getText()+"' ");
								
					if (data instanceof portalui_arrayMap){				
						if (data.get(0) != undefined){
							this.eTarif.setText(floatToNilai(data.get(0).get("tarif")));
							this.eAkun.setText(data.get(0).get("kode_akun"),data.get(0).get("nama"));
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
			var temp = this.dbLib.runSQL("select a.kode_band,a.kode_akun,b.nama,a.tarif,a.tahun "+
										"from agg_program_harian a inner join agg_masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi= '"+this.app._lokasi+"'  "+
										"where a.tahun='"+this.eTahun.getText()+"' order by a.kode_band");
			if (temp instanceof portalui_arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sg1.columns.get(1).setColumnFormat(cfNilai);
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
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eBand.getText()+")");
						this.eBand.setText("");
						this.eBand.setRightLabelCaption("");
						this.eTarif.setText("0");												
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});
