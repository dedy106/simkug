/**
 * @author dweexfuad/
 */
window.app_budget_master_fProgram = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fProgram.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fProgram";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Program SPPD", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar");
			this.eLokasi = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"Lokasi", multiSelection:false,tag:2,change:[this,"doEditChange"]});	
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,20,180,20], caption:"Tahun",tag:2,tipeText:ttAngka,maxLength:4,change:[this,"doEditChange"]});
			this.eKode = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Program", multiSelection:false,rightLabelVisible:false,change:[this,"doEditChange"]});					
			this.eNama = new portalui_saiLabelEdit(this,{bound:[20,24,400,20],caption:"Nama",tag:"1"});									
			this.bTampil = new portalui_button(this,{bound:[429,24,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,25,500,323],caption:"Daftar Program SPPD"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,500,275],tag:"9",
					colTitle: "Kode Program, Nama Program, Tahun"});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,300,500,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();	

			this.eLokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokkonsol = '"+this.app._lokKonsol+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Bisnis Area",true);
			this.eLokasi.setText(this.app._lokasi);			
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
window.app_budget_master_fProgram.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fProgram.implement({
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
					this.eKode.setText("");
					this.eKode.setRightLabelCaption("");
					this.eNama.setText("");												
					this.sg1.clear(1);
					break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_program (kode_program,nama,kode_lokasi,tahun) values ('"+this.eKode.getText()+"','"+this.eNama.getText()+"','"+this.eLokasi.getText()+"','"+this.eTahun.getText()+"') ");
						this.dbLib.execArraySQL(sql);
						this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);	
					}
					break;
				case "ubah" :					
					if (this.standarLib.checkEmptyByTag(this, [0,1])){
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_program set nama = '"+this.eNama.getText()+"' where kode_program = '"+this.eKode.getText()+"' and kode_lokasi='"+this.eLokasi.getText()+"' and tahun='"+this.eTahun.getText()+"'");
						this.dbLib.execArraySQL(sql);		
						this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);
					}
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_program where kode_program = '"+this.eKode.getText()+"' and kode_lokasi='"+this.eLokasi.getText()+"' and tahun='"+this.eTahun.getText()+"'");
						this.dbLib.execArraySQL(sql);
						this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);
					break;
			}
			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doEditChange: function(sender){
		if (sender == this.eLokasi || sender == this.eTahun) {			
			this.standarLib.clearByTag(this, new Array("0","1"),undefined);
			this.sg1.clear(1);
			if (this.eLokasi.getText() != "" && this.eTahun.getText() != "") {
				this.eKode.setSQL("select kode_program, nama from agg_program where kode_lokasi='"+this.eLokasi.getText()+"' and tahun='"+this.eTahun.getText()+"'",["kode_program","nama"],undefined,["Kode","Nama"],"where","Data Program SPPD",false);
			}
		}
		if (sender == this.eLokasi || sender == this.eTahun || sender == this.eKode){
			if (this.eLokasi.getText() != "" && this.eTahun.getText() != "" && this.eKode.getText() != ""){
				try {			
					var data = this.dbLib.runSQL("select a.nama "+
					                             "from agg_program a "+
					                             "where a.kode_lokasi='"+this.eLokasi.getText()+"' and a.kode_program = '"+this.eKode.getText()+"' and a.tahun='"+this.eTahun.getText()+"'");
								
					if (data instanceof portalui_arrayMap)
					{				
						if (data.get(0) != undefined){
							this.eNama.setText(data.get(0).get("nama"));
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
			var temp = this.dbLib.runSQL("select a.kode_program,a.nama,a.tahun "+
			                             "from agg_program a "+
										 "where a.kode_lokasi='"+this.eLokasi.getText()+"' and a.tahun ='"+this.eTahun.getText()+"' order by a.kode_program");
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
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eKode.getText()+")");
						this.standarLib.clearByTag(this, new Array("0","1"),undefined);
						this.sg1.clear(1);
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});