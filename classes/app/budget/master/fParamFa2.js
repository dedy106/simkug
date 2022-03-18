/**
 * @author dweexfuad, mr
 */
window.app_budget_master_fParamFa2 = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fParamFa2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fParamFa2";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setting Volume BPP Aktiva Tetap : Input/Koreksi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiGrid");
			this.eLokasi = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"Lokasi", multiSelection:false,tag:2,change:[this,"doChange"]});	
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,24,180,20],caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});
			this.eKlp = new portalui_saiCBBL(this,{bound:[20,22,200,20],caption:"Kelompok Aktap", multiSelection:false,change:[this,"doEditChange"]});				
			
			this.bHitung = new portalui_button(this,{bound:[890,22,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
			this.p1 = new portalui_panel(this);
			this.p1.setLeft(20);
			this.p1.setTop(208);
			this.p1.setWidth(950);
			this.p1.setHeight(368);
			this.p1.setName('p1');
			this.p1.setCaption('Item Data Parameter BPP');
			
			uses("portalui_saiGrid;portalui_sgNavigator");	
			this.sg1 = new portalui_saiGrid(this.p1, {
				bound: [1, 20, 945, 315],
				tag: 2,colCount:8,
				colTitle: ["Kode Param","Nama Param","Kode Akun","Nama Akun","Satuan","Tarif","Volume","Total"],
				colWidth:[[0,1,2,3,4,5,6,7],[70,200,80,200,60,80,70,100]],
				colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
				colReadOnly:[true,[0,1,2,3,4,5,7],[6]],
				defaultRow:1,autoAppend:true,
				change:[this,"doChangeCell"],selectCell:[this,"doSelectCell"]
			});
			this.sgNav1 =  new portalui_sgNavigator(this.p1,{bound:[1,340,945,25], grid:this.sg1, border:0, buttonStyle:2});
			
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
								
			this.eLokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.eLokasi.setText(this.app._lokasi);
			this.sg1.clear(1);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fParamFa2.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fParamFa2.implement({
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
					this.eKlp.setText("");
					this.eKlp.setRightLabelCaption("");
					this.sg1.clear(1);
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						
						sql.add("delete from agg_fasusut_d where tahun= '"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from agg_fasusut_m where tahun ='"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from agg_d where modul in ('ASSET','BP','BPP') and tahun = '"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("update agg_fa_param_d set volume="+nilaiToFloat(this.sg1.cells(6,i))+" where kode_param = '"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.eLokasi.getText()+"'");
							}
						}
						this.dbLib.execArraySQL(sql);					
					break;
			}
			this.eKlp.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doEditChange: function(sender) {
		this.sg1.clear(1);
	},
	doChange: function(sender) {
		if (sender == this.eLokasi && this.eLokasi.getText()!="") {
			this.eKlp.setSQL("select kode_klpfa, nama from agg_fa_klp where tipe = 'posting' ",["kode_klpfa","nama"],false,["Kode","Nama"],"and","Kelompok Aktiva Tetap");
		}
	},
	doChangeCell: function(sender, col, row){
		try{
			if ( col == 6 || col == 5 ){
				if ((this.sg1.getCell(6,row) != "") && (this.sg1.getCell(5,row) != "")) {
					var vTot = Math.round(nilaiToFloat(this.sg1.cells(5,row)) * nilaiToFloat(this.sg1.cells(6,row)));
					this.sg1.setCell(7,row,floatToNilai(vTot));
				}			
			}
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib){
			switch	(methodName){
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1) {
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eKlp.getText()+")");
						this.app._mainForm.bClear.click();   
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	},
	doTampilClick: function(sender){
		if (this.eKlp.getText() != "") {
				var data = this.dbLib.getDataProvider(
					"select a.kode_param,c.nama,a.satuan, a.kode_akun, b.nama as nm2, a.satuan,a.tarif,a.volume,round(a.tarif*a.volume*a.jumlah,0) as total "+
				    "from agg_fa_param_d a "+
				    "		inner join agg_masakun b on b.kode_akun= a.kode_akun and b.kode_lokasi = a.kode_lokasi "+
				    "		inner join agg_fa_param_m c on a.kode_param= c.kode_param and a.kode_lokasi = '"+this.eLokasi.getText()+"' "+
				    "where a.tahun='"+this.eTahun.getText()+"' and a.kode_lokasi = '"+this.eLokasi.getText()+"' and a.kode_klpfa = '"+this.eKlp.getText()+"' order by a.kode_param",true);
			if (typeof data != "string"){
				this.sg1.clear();
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.kode_param, line.nama, line.kode_akun, line.nm2, line.satuan, floatToNilai(line.tarif),floatToNilai(line.volume),floatToNilai(line.total)]);
				}
			}		
		}
	}
});
