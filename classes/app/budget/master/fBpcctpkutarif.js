/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_master_fBpcctpkutarif = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fBpcctpkutarif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fBpcctpkutarif";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif TPKU", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar");
			this.eTahun = new saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doEditChange"]});
			this.eJenis = new portalui_saiCB(this,{bound:[20,23,200,20],caption:"Jenis",items:["NONFFS","FFS"],tag:"5"});
			this.eKode = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode", multiSelection:false,change:[this,"doEditChange"],rightLabelVisible:false});					
			this.eNama = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama",tag:"1"});	
			this.eTarif = new portalui_saiLabelEdit(this,{bound:[20,24,170,20],caption:"Tarif",tipeText:ttNilai,text:"0",tag:"1"});
			this.eNilai = new portalui_saiLabelEdit(this,{bound:[20,23,170,20],caption:"Nilai Min",tipeText:ttNilai,text:"0",tag:"1"});
			this.bTampil = new portalui_button(this,{bound:[529,23,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
			this.p1 = new portalui_panel(this,{bound:[10,24,600,280],caption:"Daftar Tarif TPKU"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,600,230],tag:"9",
						colTitle: ["Kode", "Nama", "Jenis","Tarif", "Nilai Minimal"]});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,255,600,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbAllFalse);
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

			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fBpcctpkutarif.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fBpcctpkutarif.implement({
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);										
					break;
				case "simpan" :
				    if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_bpcc_jenis_tpku (kode_tpku,nama,tarif,nilai,tahun,jenis) values ('"+this.eKode.getText()+"','"+this.eNama.getText()+"',"+parseNilai(this.eTarif.getText())+","+parseNilai(this.eNilai.getText())+",'"+this.eTahun.getText()+"','"+this.eJenis.getText()+"') ");
						this.dbLib.execArraySQL(sql);	
					}
					break;
				case "ubah" :	
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_bpcc_jenis_tpku set jenis='"+this.eJenis.getText()+"',nama = '"+this.eNama.getText()+"',tarif="+parseNilai(this.eTarif.getText())+",nilai="+parseNilai(this.eNilai.getText())+" where tahun = '"+this.eTahun.getText()+"' and kode_tpku = '"+this.eKode.getText()+"'");							
						this.dbLib.execArraySQL(sql);
					}
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_bpcc_jenis_tpku where tahun = '"+this.eTahun.getText()+"' and kode_tpku = '"+this.eKode.getText()+"'");							
						this.dbLib.execArraySQL(sql);	
					break;
			}
			this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){
		if (sender == this.eTahun) {
			if (this.eTahun.getText()!="") {
				this.eKode.setSQL("select kode_tpku, nama from agg_bpcc_jenis_tpku where tahun = '"+this.eTahun.getText()+"' ",["kode_tpku","nama"],undefined,["Kode","Nama"],"and","Data Jenis TPKU",false);
			}
		}
		if(sender == this.eKode){
			if (this.eKode.getText() != "")
			{
				try
				{			
				    this.standarLib.clearByTag(this, new Array("1"),this.eKode);	
					var sql="select nama,tarif,nilai,jenis from agg_bpcc_jenis_tpku where kode_tpku= '"+this.eKode.getText()+"' and tahun = '"+this.eTahun.getText()+"'";
					var data = this.dbLib.getDataProvider(sql,true)
					if (typeof data == "object")
					{
						var line = data.rs.rows[0];							
						if (line != undefined)
						{
							this.eNama.setText(line.nama);
							this.eTarif.setText(floatToNilai(line.tarif));
							this.eNilai.setText(floatToNilai(line.nilai));
							this.eJenis.setText(line.jenis);
							setTipeButton(tbUbahHapus);
						}
						else
						{
							setTipeButton(tbSimpan);
						}
					}			
				}catch(e){
					system.alert(this, e,"");
				}
			}
		}
	},	
	
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select kode_tpku,nama,jenis,tarif,nilai from agg_bpcc_jenis_tpku where tahun = '"+this.eTahun.getText()+"' order by kode_tpku");
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
					if (result.toLowerCase().search("error") == -1)
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eKode.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});