/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_master_fTarif = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fTarif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fTarif";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Norma Tarif Transport SPPD", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,24,180,20],caption:"Tahun",tag:2,tipeText:ttAngka,maxLength:4,change:[this,"doEditChange"]});
			this.eKode = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Tarif", multiSelection:false,change:[this,"doEditChange"]});

			this.eRute = new portalui_saiCBBL(this,{bound:[20,22,200,20],caption:"Kode Rute", multiSelection:false});
			this.eBand = new portalui_saiCBBL(this,{bound:[20,23,200,20],caption:"Kode Band", multiSelection:false});
			this.eTarif = new portalui_saiLabelEdit(this,{bound:[20,25,200,20], caption:"Tarif Transport",tipeText:ttNilai,text:"0",tag:"1",change:[this,"doChange"]});
			this.ePp = new portalui_saiLabelEdit(this,{bound:[20,26,200,20], caption:"Tarif PP",tipeText:ttNilai,text:"0",readOnly:true,tag:"1",change:[this,"doChange"]});
			this.eAirtax = new portalui_saiLabelEdit(this,{bound:[20,27,200,20], caption:"Airport Tax",tipeText:ttNilai,text:"0",tag:"1",change:[this,"doChange"]});
			this.eKa = new portalui_saiLabelEdit(this,{bound:[20,28,200,20], caption:"Tiket KA",tipeText:ttNilai,text:"0",tag:"1",change:[this,"doChange"]});
			this.eTaxi = new portalui_saiLabelEdit(this,{bound:[20,29,200,20], caption:"Biaya Taksi",tipeText:ttNilai,text:"0",tag:"1",change:[this,"doChange"]});			
			this.eJumlah = new portalui_saiLabelEdit(this,{bound:[20,32,200,20], caption:"Jumlah",tipeText:ttNilai,text:"0",tag:"1",readOnly:true});
			this.ePersen = new portalui_saiLabelEdit(this,{bound:[20,30,200,20], caption:"% Kenaikan",tipeText:ttNilai,text:"0",tag:"1",change:[this,"doChange"]});
			this.eNilai = new portalui_saiLabelEdit(this,{bound:[20,31,200,20], caption:"Nilai Akhir",tipeText:ttNilai,text:"0",tag:"1"});
			this.bTampil = new portalui_button(this,{bound:[829,31,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,32,900,203],caption:"Daftar Norma Tarif SPPD"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,160],
					colTitle:["Kode Tarif","Kode Rute","Nama Rute","Band","Tarif","PP","AirPort Tax","Taksi","Kereta Api","Jumlah","% Kenaikan","Nilai Akhir"],readOnly:true,tag:"9"});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,180,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
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
			
			this.eBand.setSQL("select kode_band, nama from agg_band ",["kode_band","nama"],false,["Kode Band","Nama"],"and","Data Band",true);
			this.eRute.setSQL("select kode_rute, nama from agg_rute ",["kode_rute","nama"],false,["Kode Rute","Nama"],"and","Data Rute",true);

		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fTarif.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fTarif.implement({
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
					if (this.standarLib.checkEmptyByTag(this, [0,1,2]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_norma_trans (kode_tarif, kode_band, kode_rute, tahun, tarif, pp, airtax, taxi, ka, persen, nilai) "+
						        "values ('"+this.eKode.getText()+"','"+this.eBand.getText()+"','"+this.eRute.getText()+"','"+this.eTahun.getText()+"',"+
								nilaiToFloat(this.eTarif.getText())+","+nilaiToFloat(this.ePp.getText())+","+nilaiToFloat(this.eAirtax.getText())+","+
								nilaiToFloat(this.eTaxi.getText())+","+nilaiToFloat(this.eKa.getText())+","+nilaiToFloat(this.ePersen.getText())+","+nilaiToFloat(this.eNilai.getText())+")");
						this.dbLib.execArraySQL(sql);	
						this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);
					}
					break;
				case "ubah" :
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add(" update agg_norma_trans set tarif="+parseNilai(this.eTarif.getText())+", pp="+parseNilai(this.ePp.getText())+", airtax="+parseNilai(this.eAirtax.getText())+", taxi="+parseNilai(this.eTaxi.getText())+", ka="+parseNilai(this.eKa.getText())+", persen="+parseNilai(this.ePersen.getText())+", nilai="+parseNilai(this.eNilai.getText())+
								" where kode_tarif='"+this.eKode.getText()+"' and tahun ='"+this.eTahun.getText()+"' ");
						this.dbLib.execArraySQL(sql);
						this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);
					}
					break;
				case "hapus" :
				    uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from agg_norma_trans where kode_tarif='"+this.eKode.getText()+"' and tahun ='"+this.eTahun.getText()+"' ");
					this.dbLib.execArraySQL(sql);		
					this.standarLib.clearByTag(this, new Array("0","1"),this.eKode);
					break;
			}
			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doChange: function(sender) {
		try {
			if (sender==this.eTarif && this.eTarif.getText()!="") {
				this.ePp.setText(floatToNilai(nilaiToFloat(this.eTarif.getText())*2));
			}
			if (sender == this.ePp || sender == this.eAirtax || sender == this.eKa || sender == this.eTaxi || sender == this.ePersen) {
				if (this.ePp.getText()!="" && this.eAirtax.getText()!="" && this.eKa.getText()!="" && this.eTaxi.getText()!="" && this.ePersen.getText()!="") {
					var tot = nilaiToFloat(this.ePp.getText()) + nilaiToFloat(this.eAirtax.getText()) + nilaiToFloat(this.eKa.getText()) + nilaiToFloat(this.eTaxi.getText());
					var persen = nilaiToFloat(this.ePersen.getText()) + 100;
					var totAkhir = Math.round(persen / 100 * tot);
					this.eJumlah.setText(floatToNilai(tot));
					this.eNilai.setText(floatToNilai(totAkhir));
				}
			}
		} catch(e) {
			system.alert(this, e,"");
		}
	},
	doEditChange: function(sender){
		if (sender == this.eTahun && this.eTahun.getText()!="") {
			this.eKode.setSQL("select kode_tarif, (kode_rute+' | '+kode_band) as nama from agg_norma_trans where tahun = '"+this.eTahun.getText()+"' ",["kode_tarif","nama"],false,["Kode","Rute | Band"],"and","Data Tarif Transport",false);
		}
		if (sender == this.eKode || sender == this.eTahun){
			if (this.eKode.getText() != "" && this.eTahun.getText() != ""){
				try{			
				    this.standarLib.clearByTag(this, new Array("1"),this.eKode);	
					var sql="select a.kode_rute,a.kode_band,b.nama as nama_rute,c.nama as nama_band , "+
							"       a.tarif,a.pp,a.airtax,a.taxi,a.ka,(a.tarif+a.pp+a.airtax+a.taxi+a.ka) as jumlah,a.persen,a.nilai  "+
							"from agg_norma_trans a "+
							"	inner join agg_rute b on a.kode_rute=b.kode_rute "+
							"	inner join agg_band c on a.kode_band=c.kode_band "+
							"where a.kode_tarif='"+this.eKode.getText()+"' and a.tahun = '"+this.eTahun.getText()+"' ";
					var data = this.dbLib.getDataProvider(sql,true)
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.eRute.setText(line.kode_rute,line.nama_rute);
							this.eBand.setText(line.kode_band,line.nama_band);
							
							this.eTarif.setText(floatToNilai(line.tarif));
							this.ePp.setText(floatToNilai(line.pp));
							this.eAirtax.setText(floatToNilai(line.airtax));
							this.eKa.setText(floatToNilai(line.ka));
							this.eTaxi.setText(floatToNilai(line.taxi));
							this.eJumlah.setText(floatToNilai(line.jumlah));
							this.ePersen.setText(floatToNilai(line.persen));
							this.eNilai.setText(floatToNilai(line.nilai));
							setTipeButton(tbUbahHapus);
						}
						else{
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
			var temp = this.dbLib.runSQL("select a.kode_tarif,a.kode_rute,b.nama,a.kode_band,a.tarif, a.pp, a.airtax, a.taxi, a.ka, (a.pp+a.airtax+a.taxi+a.ka) as jumlah,a.persen, a.nilai "+
										"from agg_norma_trans a "+
										"inner join agg_rute b on a.kode_rute=b.kode_rute where a.tahun ='"+this.eTahun.getText()+"' ");
			
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
