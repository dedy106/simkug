/**
 * @author dweexfuad, mr
 */
window.app_budget_master_fLockApp = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fLockApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fLockApp";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Transaksi : Setting", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiTable");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tahun",maxLength:4,change:[this,"doEditChange"]});
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Lokasi", multiSelection:false,change:[this,"doEditChange"]}); 
			this.eBidang = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"Bidang", multiSelection:false,tag:2,change:[this,"doEditChange"]});	
			
			this.p1 = new portalui_panel(this);
			this.p1.setLeft(20);
			this.p1.setTop(208);
			this.p1.setWidth(500);
			this.p1.setHeight(368);
			this.p1.setName('p1');
			this.p1.setCaption('Daftar Modul');
			
			uses("portalui_saiGrid;portalui_sgNavigator");	
			this.sg1 = new portalui_saiGrid(this.p1, {
				bound: [1, 20, 495, 315],
				tag: 2,
				colCount:2,
				colTitle: ["Status","Modul"],
				colWidth:[[0,1],[100,320]],
				buttonStyle:[[0],[bsAuto]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","NON"]})]],
				columnReadOnly:[true,[0,1],[]],
				defaultRow:1,autoAppend:false
			});
			//this.sgNav1 =  new portalui_sgNavigator(this.p1,{bound:[1,340,495,25], grid:this.sg1, border:0, buttonStyle:2});

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

			this.e0.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi='"+this.app._lokasi+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.e0.setText(this.app._lokasi);
			if (this.app._userStatus == "A")
				this.eBidang.setSQL("select kode_bidang, nama from agg_bidang ",["kode_bidang","nama"],false,["Kode","Nama"],"where","Data Bidang",true);
			else this.eBidang.setSQL("select kode_bidang, nama from agg_bidang where kode_bidang = '"+this.app._kodeBidang+"' ",["kode_bidang","nama"],false,["Kode","Nama"],"and","Data Bidang",true);
			this.eBidang.setText(this.app._kodeBidang);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fLockApp.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fLockApp.implement({
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
						sql.add("delete from agg_app where kode_lokasi ='"+this.e0.getText()+"' and tahun='"+this.eTahun.getText()+"' and kode_bidang='"+this.eBidang.getText()+"'");
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								if (this.sg1.getCell(0,i) == "APP") var progress = "1";
								else var progress = "0";
								sql.add("insert into agg_app (kode_lokasi,modul,tahun,progress,kode_bidang) "+
								        "values ('"+this.e0.getText()+"','"+this.sg1.getCell(1,i)+"','"+this.eTahun.getText()+"','"+progress+"','"+this.eBidang.getText()+"')");
							}
						}
						this.dbLib.execArraySQL(sql);	
					break;
			}
			this.e0.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doEditChange: function(sender){
		this.sg1.clear(1);
		if (this.eTahun.getText() != "" && this.e0.getText() != "" && this.eBidang.getText() != "") {
			var data = this.dbLib.getDataProvider("select progress, modul from agg_app "+
												  "where tahun='"+this.eTahun.getText()+"' and kode_lokasi='"+this.e0.getText()+"' and kode_bidang = '"+this.eBidang.getText()+"' ",true);
			if (typeof data == "object"){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line !== undefined)
						if (line.progress == "0") var vProg = "NON"; else var vProg = "APP";
						this.sg1.appendData([vProg, line.modul]);
				}
			}
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