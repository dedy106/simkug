window.app_assetsap_master_fLokSTO = function(owner)
{
	if (owner)
	{
		window.app_assetsap_master_fLokSTO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_master_fLokSTO";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Location / STO", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		try
		{		
			uses("saiCBBL;util_standar");
			this.cb_ba = new saiCBBL(this,{bound:[20,0,200,20], caption:"BA", multiSelection: false, change:[this,"doEditChange"],
				sql: ["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ",["kode_lokfa","nama"],false,["Kode BA","Nama"],"and","Daftar BA",false]
			});
			this.ed_plnt = new saiCBBL(this, {bound:[20,1,180,20], caption:"Plant", 
				items:["TDV1","TDV2","TDV3","TDV4","TDV5","TDV6","TDV7","TCS2","TCS3","TCS4","TCS6","TCS7","TCS8","TCS9"],
				multiSelection: false,
				sql:["select kode_regional, nama from amu_regional ", ["kode_regional", "nama"], false, ["Kode Regional","Deskripsi"], "where", "Daftar Regional",false],
				change:[this,"doEditChange"]});
			this.ed_kode = new saiCBBL(this, {
				bound: [20, 10, 200, 20],
				caption: "Location",
				multiSelection:false, 
				rightLabelVisible:false,
				sql:["select kode_loksto, nama from amu_loksto ", ["kode_loksto", "nama"], false, ["Location","Deskripsi"], "where", "Daftar Location/STO",false]
			});			
			this.ed_nama = new saiLabelEdit(this, {
				bound: [20, 32, 600, 20],
				caption: "Nama"
			});			
			this.ed_area = new saiCBBL(this, {bound:[20,33,200,20], caption:"Area", multiSelection:false,
				sql:["select kode_area, nama from amu_dcsarea ",["kode_area","nama"],false, ["Kode Area","Nama"],"where","Daftar Area",true]
			});
			this.p1 = new panel(this,{bound:[20,11,600,200], caption:"Data Kabel Primer"});
			this.sg = new saiGrid(this.p1,{bound:[0,20,600,150], colCount:3, colTitle:["RK","PRIMER","KAP"], colWidth:[[2,1,0],[100,100,200]], rowCount:1,autoPaging:true, rowPerPage:20, pasteEnable:true, afterPaste:[this,"doAfterPaste"]});
			this.sgn = new sgNavigator(this.p1,{bound:[0,this.p1.height - 25, 600, 25], borderStyle:3, buttonStyle:bsTransNav, grid:this.sg, pager:[this,"doPager"]});
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);		
			
			this.ed_kode.onChange.set(this, "doEditChange");
			
			
			this.setTabChildIndex();		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_assetsap_master_fLokSTO.extend(window.childForm);
//------------------------------------------------------------------ event
window.app_assetsap_master_fLokSTO.implement({
	mainButtonClick : function(sender){
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
		try{					
			switch (event)
			{
				case "clear" :
					if (modalResult == mrOk)
					{
						this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);				
					}
					break;
				case "simpan" :
					if (modalResult == mrOk)
					{
						
							uses("server_util_arrayList");
							sql = new server_util_arrayList();
							sql.add("insert into amu_loksto(kode_lokfa, kode_loksto, nama, plant, kode_area)  values "+
									"('"+this.cb_ba.getText()+"','"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_plnt.getText()+"','"+this.ed_area.getText()+"')");
							
							for (var i = 0; i < this.sg.getRowCount() ; i++){
								if (this.sg.rowValid(i))
									sql.add("insert into amu_loksto_d(kode_loksto, no_rk, primer, kap )values('"+this.ed_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"')");
							}
							this.dbLib.execArraySQL(sql);							
					}
					break;
				case "ubah" :
					if (modalResult == mrOk)
					{
							uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("update amu_loksto set  "+
									" plant = '"+this.ed_plnt.getText()+"' "+
									", nama = '"+this.ed_nama.getText()+"' "+
									", kode_area = '"+this.ed_area.getText()+"' "+
									"where kode_loksto = '"+this.ed_kode.getText()+"' and plant = '"+this.ed_plnt.getText()+"' ");
							sql.add("delete from amu_loksto_d where kode_loksto = '"+this.ed_kode.getText()+"'");
							for (var i = 0; i < this.sg.getRowCount() ; i++){
								if (this.sg.rowValid(i))
									sql.add("insert into amu_loksto_d(kode_loksto, no_rk, primer, kap )values('"+this.ed_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"')");
							}
							this.dbLib.execArraySQL(sql);	
					}
					break;
				case "hapus" :
				   if (modalResult == mrOk)
				   {
						uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("delete from amu_loksto_d where kode_loksto ='"+this.ed_kode.getText()+"' and plant = '"+this.ed_plnt.getText()+"' ");
							sql.add("delete from amu_loksto where kode_loksto ='"+this.ed_kode.getText()+"' and plant = '"+this.ed_plnt.getText()+"' ");
							this.dbLib.execArraySQL(sql);	
				   }
					break;
			}			
		}
		catch(e)
		{
			system.alert(this, e,"");
		}	
	},
	doEditChange: function(sender){		
		if (sender == this.ed_kode) 
		{
			if (this.ed_kode.getText() != "")
			{
				try
				{					
					uses("server_util_arrayMap");
					var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
						"select nama, kode_area "+
						"from amu_loksto a "+
						"where kode_loksto = '"+this.ed_kode.getText()+"' and plant = '"+this.ed_plnt.getText()+"' ",
						"select no_rk, primer, kap "+
						"from amu_loksto_d a "+
						"where kode_loksto = '"+this.ed_kode.getText()+"'  "
					]}),true);
					if (typeof data != "string"){
						if  (data.result[0].rs.rows[0]) {
							var line = data.result[0].rs.rows[0];
							this.ed_nama.setText(line.nama);													
							this.ed_area.setText(line.kode_area);
							this.sg.clear();
							for (var i in data.result[1].rs.rows){
								var line = data.result[1].rs.rows[i];
								this.sg.appendData([line.no_rk, line.primer, line.kap]);
							}
							setTipeButton(tbUbahHapus);
						}else{	
							this.ed_nama.setText("");
							this.ed_area.setText("");
							setTipeButton(tbSimpan);
						}
					}else{	
					  this.ed_nama.setText("");
					  setTipeButton(tbSimpan);
					}
				}catch(e){
					system.alert(this, e,"");
				}
			}
		} 
		if (sender == this.ed_plnt || sender == this.cb_ba){//and kode_lokfa = '"+this.cb_ba.getText()+"' 
			this.ed_kode.setSQL("select kode_loksto, nama from amu_loksto where plant = '"+this.ed_plnt.getText()+"' ", ["kode_loksto", "nama"], false, ["Kode Lokasi","Nama Lokasi"], "where", "Daftar Lokasi",false);
		}
		
	},
	FindBtnClick: function(sender, event){				
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)					
					{
					  this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nama.getText()+")");
					  this.app._mainForm.bClear.click();              
					}else
						 system.alert(this, result,"");
					break;
			}
		}
	},	
	doPager: function(sender, page){
		this.sg.doSelectPage(page);
	},
	doAfterPaste: function(sender, rowCount, page){
		this.sgn.setTotalPage(sender.getTotalPage());
		this.sgn.rearrange();
		this.sgn.activePage = page;
	}
});
