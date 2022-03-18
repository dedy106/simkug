/**
 * @author mr
	
 */
window.app_budget_master_fNormaVarCalc = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fNormaVarCalc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fNormaVarCalc";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Evaluasi Tarif Norma Biaya Variable : Input", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiTable");			
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Tahun Angg.",maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});								
			this.ePersen = new portalui_saiLabelEdit(this,{bound:[20,25,180,20],caption:"% Perubahan",tipeText: ttNilai,text:"100"});
			this.bHitung = new portalui_button(this,{bound:[888,25,80,18],caption:"Tampil",hint:"Tampil Data Tahun Angg.",click:[this,"doHitungClick"]});		
		
			this.p1 = new portalui_panel(this);
			this.p1.setLeft(20);
			this.p1.setTop(208);
			this.p1.setWidth(950);
			this.p1.setHeight(388);
			this.p1.setName('p1');
			this.p1.setCaption('Item Data Normal Variable');
			
			uses("portalui_saiGrid;portalui_sgNavigator");	
			this.sg1 = new portalui_saiGrid(this.p1, {bound: [1, 20, 945, 335],tag: 2,colCount:8,
				colTitle: ["Kode Var","Nama Variable Biaya","Kode Akun","Nama Akun","Satuan","Tarif Acuan","% Perubahan","Tarif Final"],
				colWidth:[[0,1,2,3,4,5,6,7],[70,200,100,250,60,80,70,80]],
				colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
				colReadOnly:[true,[0,1,2,3,4,5],[6,7]],
				defaultRow:1,autoAppend:true,
				change:[this,"doChangeCell"],selectCell:[this,"doSelectCell"]
			});    			
			this.sgNav1 =  new portalui_sgNavigator(this.p1,{bound:[1,360,945,25], grid:this.sg1, border:0, buttonStyle:3, pager:[this,"doPager"]});
					
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

		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fNormaVarCalc.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fNormaVarCalc.implement({
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
					this.sg1.clear(1);
					break;
				case "simpan" :
						if (this.prog != "1") {
							system.alert(this,"Transaksi tidak valid.","Progress modul ABAU tidak 1 [belum close].");
							return false;
						}
						uses("server_util_arrayList");
						sql = new server_util_arrayList();			
						sql.add("delete from agg_abau_d where progress = '1' and tahun='"+this.eTahun.getText()+"' ");
						sql.add("delete from agg_d where progress = '1' and tahun='"+this.eTahun.getText()+"' ");
						sql.add("delete from agg_norma_var_ubah where progress = '1' and tahun='"+this.eTahun.getText()+"' ");
						
						sql.add("insert into agg_abau_d(no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,posted,progress) "+
								"select no_abau,kode_lokasi,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,kode_pp,bulan,jumlah,volume,periode,nilai,tahun,tarif,no_urut,'F','1' "+
								"from agg_abau_d where tahun = '"+this.eTahun.getText()+"' and progress = '0'");
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into agg_norma_var_ubah (kode_var,kode_akun,tarif,tahun,progress) values "+
										"('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"',"+parseNilai(this.sg1.cells(7,i))+",'"+this.eTahun.getText()+"','1')");								
								sql.add("update agg_abau_d set nilai=jumlah*volume*"+parseNilai(this.sg1.cells(7,i))+", tarif="+parseNilai(this.sg1.cells(7,i))+" "+
										"where progress = '1' and tahun='"+this.eTahun.getText()+"' and kode_var= '"+this.sg1.cells(0,i)+"' and kode_akun= '"+this.sg1.cells(2,i)+"' ");
							}
						}					
						sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress) "+
								"       select kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_abau,'ABAU','1' "+
								"       from agg_abau_d "+
								"       where progress = '1' and tahun='"+this.eTahun.getText()+"' ");				
						this.dbLib.execArraySQL(sql);					
					break;
			}
			this.eTahun.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
    doHitungClick: function(sender){
		try{
			if (this.eTahun.getText() != "" && this.ePersen.getText() != ""){
				var totPersen = nilaiToFloat(this.ePersen.getText());
				var data = this.dbLib.getDataProvider(
							    "select a.kode_var,b.nama as nama_var,a.kode_akun,c.nama as nama_akun,a.satuan,round(a.tarif,0) as tarif,"+parseNilai(this.ePersen.getText())+" as persen,round((round(a.tarif,0)*"+totPersen+"/100),0) as tarif2  "+
								"from agg_norma_var a inner join agg_var b on a.kode_var=b.kode_var "+
								"                     inner join agg_masakun c on a.kode_akun=c.kode_akun and c.kode_lokasi='"+this.app._lokasi+"' "+
								"where c.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.eTahun.getText()+"' order by a.kode_akun");
				eval("data = "+data+";");				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_var,line.nama_var,line.kode_akun,line.nama_akun,line.satuan,floatToNilai(line.tarif),  
											 floatToNilai(line.persen),floatToNilai(line.tarif2)]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();			
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},   
	doChange: function(sender){
		if (sender == this.eTahun && this.eTahun.getText()!="") {			
			this.prog = "1";
			var data = this.dbLib.getDataProvider("select progress from agg_close where progress <> '1' and modul = 'ABAU' and tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}
		}
	},
	doPager: function(sender, page){
		try{
			if (sender == this.sgNav1) this.sg1.selectPage(page);
		}catch(e)
		{alert(e);}
	},
	doChangeCell: function(sender, col, row){
		try{
			if (col == 7 || col == 5 || col == 6){
				this.sg1.onChange.set(this,undefined);				
				if ((this.sg1.getCell(5,row) != "") && (this.sg1.getCell(6,row) != "")) {					
					var tarifBaru = Math.round(nilaiToFloat(this.sg1.cells(5,row)) * ((nilaiToFloat(this.sg1.getCell(6,row))) / 100));
					this.sg1.setCell(7,row,floatToNilai(tarifBaru));
				}
				this.sg1.validasi();
				this.sg1.onChange.set(this,"doChangeCell");
			}
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1) {
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eTahun.getText()+")");
						this.app._mainForm.bClear.click();  
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});