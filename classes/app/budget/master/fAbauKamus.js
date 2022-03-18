/**
 * @author dweexfuad, mr
 */
window.app_budget_master_fAbauKamus = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fAbauKamus.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fAbauKamus";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kamus Relasi RKA - Variabel : Input/Koreksi/Copy", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiTable");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tahun",maxLength:4,change:[this,"doEditChange"]});
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Variabel", multiSelection:false,change:[this,"doEditChange"]}); 
			this.eJenis = new portalui_saiCB(this,{bound:[20,23,200,20],caption:"Jenis",items:["LOCKED","UNLOCK"]});
			
			this.eTahun2 = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],caption:"Tahun Angg. [N-1]",maxLength:4,readOnly:true});								
			this.i_viewer = new portalui_imageButton(this,{bound:[200,22,20,20],hint:"Copy dan Simpan Data Kamus Tahun Angg. [N-1]",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doCopy"]});
			
			this.p1 = new portalui_panel(this);
			this.p1.setLeft(20);
			this.p1.setTop(208);
			this.p1.setWidth(500);
			this.p1.setHeight(368);
			this.p1.setName('p1');
			this.p1.setCaption('Daftar Kamus ABAU');
			
			uses("portalui_saiGrid;portalui_sgNavigator");	
			this.sg1 = new portalui_saiGrid(this.p1, {
				bound: [1, 20, 495, 315],
				tag: 2,
				colCount:2,
				colTitle: ["Kode RKA","Nama"],
				colWidth:[[0,1],[100,320]],
				buttonStyle:[[0],[bsEllips]],
				columnReadOnly:[true,[1],[0]],
				defaultRow:1,autoAppend:true,
				ellipsClick:[this,"doEllipseClick"]
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
			
			this.e0.setSQL("select kode_var, nama from agg_var ",["kode_var","nama"],false,["Kode Variabel","Nama"],"where","Data Variabel",true);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fAbauKamus.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fAbauKamus.implement({
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
						sql.add("delete from agg_abau_kamus where kode_var ='"+this.e0.getText()+"' and tahun='"+this.eTahun.getText()+"'");
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into agg_abau_kamus (kode_var,kode_rka,tahun,jenis) "+
								        "values ('"+this.e0.getText()+"','"+this.sg1.getCell(0,i)+"','"+this.eTahun.getText()+"','"+this.eJenis.getText()+"')");
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
	doCopy: function(sender) {
		if (this.eTahun2.getText()!="") {
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			sql.add("delete from agg_abau_kamus where tahun = '"+this.eTahun.getText()+"'");
			sql.add("insert into agg_abau_kamus (kode_var,kode_rka,tahun,jenis) "+
					"select kode_var,kode_rka,'"+this.eTahun.getText()+"',jenis from agg_abau_kamus where tahun='"+this.eTahun2.getText()+"'");									
			this.dbLib.execArraySQL(sql);			
		}
	},
	doEditChange: function(sender){
		this.sg1.clear(1);
		if (sender == this.eTahun && this.eTahun.getText()!="") {			
			this.eTahun2.setText(parseFloat(this.eTahun.getText())-1);
		}
		if (this.eTahun.getText() != "" &&this.e0.getText() != "" ) {
			var data = this.dbLib.getDataProvider("select a.kode_rka,b.nama from agg_abau_kamus a inner join agg_rka b on a.kode_rka=b.kode_rka and a.tahun=b.tahun "+
												  "where a.tahun='"+this.eTahun.getText()+"' and a.kode_var='"+this.e0.getText()+"'",true);
			if (typeof data == "object"){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line !== undefined)
						this.sg1.appendData([line.kode_rka, line.nama]);
				}
			}
		}
	},
	doEllipseClick: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar RKA",sender,undefined, 
											  "select kode_rka,nama   from agg_rka where tahun='"+this.eTahun.getText()+"'",
											  "select count(kode_rka) from agg_rka where tahun='"+this.eTahun.getText()+"'",
											  ["kode_rka","nama"],"and",["Kode","Nama"],false);				
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