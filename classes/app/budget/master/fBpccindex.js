/**
 * @author dweexfuad, mr
 */
window.app_budget_master_fBpccindex = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fBpccindex.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fBpccindex";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Indeks Lokasi BPCC : Input/Koreksi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiTable");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tahun",maxLength:4,change:[this,"doEditChange"]});
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Lokasi", multiSelection:false,change:[this,"doEditChange"]});
			this.eIdx = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Index",tipeText:ttNilai,text:"0"});
			
			this.bTampil = new portalui_button(this,{bound:[440,12,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
			this.p1 = new portalui_panel(this);
			this.p1.setLeft(20);
			this.p1.setTop(208);
			this.p1.setWidth(500);
			this.p1.setHeight(368);
			this.p1.setName('p1');
			this.p1.setCaption('Daftar Indeks Lokasi BPCC');
			
			uses("portalui_saiGrid;portalui_sgNavigator");	
			this.sg1 = new portalui_saiGrid(this.p1, {
				bound: [1, 20, 495, 315],tag: 2,colCount:3,
				colTitle: ["Kode BA","Nama","Indeks"],
				colWidth:[[0,1,2],[100,220,100]], readOnly:true,
				defaultRow:1
			});
			this.sgNav1 =  new portalui_sgNavigator(this.p1,{bound:[1,340,495,25], grid:this.sg1, border:0, buttonStyle:2});

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

			this.e0.setSQL("select kode_lokasi, nama from lokasi where kode_lokkonsol = '"+this.app._lokKonsol+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fBpccindex.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fBpccindex.implement({
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
					this.sg1.clear(1);
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_bpcc_index (kode_lokasi,persen,tahun) values ('"+this.e0.getText()+"',"+this.eIdx.getText()+",'"+this.eTahun.getText()+"')");
						this.dbLib.execArraySQL(sql);					
					break;
			}
			this.e0.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doTampilClick: function(sender){
		try{			
			if (this.eTahun.getText() != "" ) {
				var data = this.dbLib.runSQL("select a.kode_lokasi,a.nama,b.persen from lokasi a inner join agg_bpcc_index b on a.kode_lokasi=b.kode_lokasi and b.tahun='"+this.eTahun.getText()+"' "+
						   " ");
				this.sg1.clear();
				this.sg1.setData(data);
			}
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