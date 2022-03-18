/**
 * @author mr
*/
window.app_budget_master_fBpcccs = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fBpcccs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fBpcccs";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Tarif Sharing Cost<--- TIDAK DIPAKAI: Input/Koreksi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiTable");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,text:"2010",change:[this,"doChange"]});					
			this.eParam = new portalui_saiCBBL(this,{bound:[20,19,200,20],caption:"Parameter", multiSelection:false,change:[this,"doChange"]});
			this.eBand = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Band", multiSelection:false,change:[this,"doChange"]});
			this.eStatus = new portalui_saiCB(this,{bound:[20,27,200,20],caption:"Status",items:["NIK","PASANGAN","ANAK"],tag:"1",change:[this,"doChange"]});
			this.eTarif = new portalui_saiLabelEdit(this,{bound:[20,30,200,20],caption:"Tarif",tipeText:ttNilai,text:"0"});
			
			this.bTampil = new portalui_button(this,{bound:[629,30,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,31,700,333],caption:"Daftar Tarif Biaya dan Kunjungan"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,700,280],colCount:6,
					colTitle:["Kode","Nama Parameter","Band","Status","Tarif","Tahun Angg."],
					colWidth:[[0,1,2,3,4,5],[80,240,80,80,80,80]],readOnly:true,defaultRow:1});		
					colFormat:[[4],[cfNilai]],
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,305,700,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
			this.rearrangeChild(10,23);
			setTipeButton(tbAllFalse);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			
			this.eTahun.setText("2010");		
			this.eBand.setSQL("select kode_band, nama from agg_band ",["kode_band","nama"],undefined,["Kode Band","Nama"],"and","Data Band",true);
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fBpcccs.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fBpcccs.implement({
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
					this.eTarif.setText("0"); 
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_bpcc_cs (kode_param,kode_band,jenis_pst,tarif,tahun) values "+
						        "('"+this.eParam.getText()+"','"+this.eBand.getText()+"','"+this.eStatus.getText()+"',"+parseNilai(this.eTarif.getText())+",'"+this.eTahun.getText()+"')");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_bpcc_cs set tarif="+parseNilai(this.eTarif.getText())+"  "+
						        "where tahun='"+this.eTahun.getText()+"' and kode_band= '"+this.eBand.getText()+"' and jenis_pst= '"+this.eStatus.getText()+"' and kode_param='"+this.eParam.getText()+"' ");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_bpcc_cs "+
						        "where tahun='"+this.eTahun.getText()+"' and kode_band= '"+this.eBand.getText()+"' and jenis_pst= '"+this.eStatus.getText()+"'  and kode_param='"+this.eParam.getText()+"' ");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.eBand.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doChange: function(sender){
		if (sender == this.eTahun) {
			if (this.eTahun.getText()!="")
				this.eParam.setSQL("select kode_param, nama, kode_bpcc from agg_bpcc_param where tahun='"+this.eTahun.getText()+"' ",["kode_param","nama","kode_bpcc"],undefined,["Kode Parameter","Nama","Jenis"],"and","Data Parameter",true);						
		}
		if (sender == this.eTahun || sender == this.eBand || sender == this.eStatus ) {
			if (this.eTahun.getText()!="" && this.eBand.getText()!="" && this.eStatus.getText()!="") {
				var data = this.dbLib.getDataProvider(
							 "select tarif "+
							 "from agg_bpcc_cs "+
							 "where  kode_param='"+this.eParam.getText()+"' and kode_band = '"+this.eBand.getText()+"' and jenis_pst = '"+this.eStatus.getText()+"' and tahun='"+this.eTahun.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.eTarif.setText(floatToNilai(line.tarif));
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				} setTipeButton(tbSimpan);
			}
		}
	},     
	doTampilClick: function(sender){
		try{			
			if (this.eTahun.getText() != "") {
				var temp = this.dbLib.runSQL("select a.kode_param,b.nama as nama_param,a.kode_band,a.jenis_pst,a.tarif,a.tahun "+
				                             "from agg_bpcc_cs a inner join agg_bpcc_param b on a.kode_param=b.kode_param "+
											 "where  a.tahun='"+this.eTahun.getText()+"'");
				if (temp instanceof portalui_arrayMap) {
					this.sg1.setData(temp,true,20);
					this.sgn.setTotalPage(this.sg1.pageCount);				
					this.sgn.rearrange();
					this.sgn.activePage = 0;
				}else systemAPI.alert(temp);
			}
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
						this.app._mainForm.bClear.click();  
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});