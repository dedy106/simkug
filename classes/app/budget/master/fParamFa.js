/**
 * @author dweexfuad, mr
 */
window.app_budget_master_fParamFa = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fParamFa.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fParamFa";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setting BPP Aktiva Tetap : Input/Koreksi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiGrid");
			this.eLokasi = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"Lokasi", multiSelection:false,tag:2,change:[this,"doChange"]});	
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,24,180,20],caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});
			this.eKlp = new portalui_saiCBBL(this,{bound:[20,22,200,20],caption:"Kelompok Aktap", multiSelection:false,change:[this,"doEditChange"]});				
			
			this.eTahun2 = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Tahun Angg.[n-1]",tipeText:ttAngka,maxLength:4,readOnly:true});								
			this.ePersen = new portalui_saiLabelEdit(this,{bound:[20,25,180,20],caption:"%Kenaikan",tipeText: ttNilai,text:"0"});
			this.i_viewer = new portalui_imageButton(this,{bound:[200,25,20,20],hint:"Copy dan Simpan Data BPP Tahun Angg. [N-1] dgn % Kenaikan Tarif",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doCopy"]});
			
			//this.bCopy = new portalui_button(this,{bound:[790,25,80,18],caption:"Copy Lokasi",click:[this,"doCopyLok"]});		
			this.bHitung = new portalui_button(this,{bound:[890,25,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
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
				tag: 2,
				colCount:10,
				colTitle: ["Kode Param","Nama Param","Kode Akun","Nama Akun","Satuan","Tarif","Volume","Jumlah","Total","Periode"],
				colWidth:[[0,1,2,3,4,5,6,7,8,9],[70,150,80,150,60,80,70,70,100,100]],
				colFormat:[[5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai]],
				buttonStyle:[[0,9],[bsEllips,bsAuto]],
				colReadOnly:[true,[0,1,2,3,4,8,9],[]],
				picklist:[[9],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12","A. 01,04,07,10","B. 01,07","C. 01-12","X"]})]],
				defaultRow:1,autoAppend:true,
				ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],selectCell:[this,"doSelectCell"]
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
								
			this.eLokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokkonsol = '"+this.app._lokKonsol+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.eLokasi.setText(this.app._lokasi);
			this.sg1.clear(1);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fParamFa.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fParamFa.implement({
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
						sql.add("delete from agg_fa_param_d where kode_klpfa='"+this.eKlp.getText()+"' and tahun='"+this.eTahun2.getText()+"' and kode_lokasi='"+this.eLokasi.getText()+"'");
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into agg_fa_param_d (kode_param,kode_klpfa,kode_lokasi,kode_akun,satuan,tarif,volume,jumlah,jns_periode,tahun) values "+
										"('"+this.sg1.cells(0,i)+"','"+this.eKlp.getText()+"','"+this.eLokasi.getText()+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(4,i)+"',"+parseNilai(this.sg1.cells(7,i))+","+parseNilai(this.sg1.cells(8,i))+","+parseNilai(this.sg1.cells(9,i))+",'"+this.sg1.cells(11,i)+"','"+this.eTahun2.getText()+"')");
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
	doCopy: function(sender) {
		if (this.eTahun2.getText()!="") {
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			sql.add("delete from agg_fa_param_d where tahun = '"+this.eTahun.getText()+"'");
			var vPersen = (nilaiToFloat(this.ePersen.getText()) +100) /100;
			sql.add("insert into agg_fa_param_d (kode_param,kode_klpfa,kode_lokasi,kode_akun,satuan,tarif,volume,jumlah,jns_periode,tahun) "+
					"select kode_param,kode_klpfa,kode_lokasi,kode_akun,satuan,round("+vPersen+"*tarif,0),volume,jumlah,jns_periode,'"+this.eTahun.getText()+"' "+
					"from agg_fa_param_d where tahun='"+this.eTahun2.getText()+"'");									
			this.dbLib.execArraySQL(sql);			
		}
	},
	/*
	doCopyLok: function(sender) {
		if (this.eLokasi.getText()!="") {
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			sql.add("delete from agg_fa_param_d where tahun = '"+this.eTahun.getText()+"' and kode_lokasi<>'"+this.eLokasi.getText()+"' ");
			var strSql = " select kode_lokasi from lokasi where kode_lokasi<> '"+this.eLokasi.getText()+"' and kode_lokkonsol = '"+this.app._lokKonsol+"' ";
			var data = this.dbLib.runSQL(strSql);
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){									
					for (var i in data.objList){
						line = data.get(i);
						sql.add("insert into agg_fa_param_d (kode_param,kode_klpfa,kode_lokasi,kode_akun,satuan,tarif,volume,jumlah,jns_periode,tahun) "+
								"select kode_param,kode_klpfa,'"+line.get("kode_lokasi")+"',kode_akun,satuan,tarif,volume,jumlah,jns_periode,tahun "+
								"from agg_fa_param_d where kode_lokasi = '"+this.eLokasi.getText()+"' and tahun='"+this.eTahun.getText()+"'");									
					}
				} 
			}
			this.dbLib.execArraySQL(sql);			
		}
	},
	*/
	doChange: function(sender) {
		if (sender == this.eTahun && this.eTahun.getText()!="") {
			this.eTahun2.setText(parseFloat(this.eTahun.getText())-1);
		}
		if (sender == this.eLokasi && this.eLokasi.getText()!="") {
			this.eKlp.setSQL("select kode_klpfa, nama from agg_fa_klp where tipe = 'posting' ",["kode_klpfa","nama"],false,["Kode","Nama"],"and","Kelompok Aktiva Tetap");
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg1.setCell(4,row,this.sg1.dataFromList[2]);
			this.sg1.setCell(2,row,this.sg1.dataFromList[3]);
			this.sg1.setCell(3,row,this.sg1.dataFromList[4]);
		}
		try{
			if ( col == 7 || col == 6 || col == 5 ){
				this.sg1.onChange.set(this,undefined);				
				if ((this.sg1.getCell(7,row) != "") && (this.sg1.getCell(6,row) != "") && (this.sg1.getCell(5,row) != "")) {
					this.sg1.setCell(8,row,floatToNilai(nilaiToFloat(this.sg1.getCell(7,row)) * nilaiToFloat(this.sg1.getCell(6,row)) * nilaiToFloat(this.sg1.getCell(5,row))));
				}			
				this.sg1.validasi();
				this.sg1.onChange.set(this,"doChangeCell");
			}
		}catch(e){
			alert(e);
		}
	},
	doEllipseClick: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Parameter BPP",sender,undefined, 
											  "select a.kode_param,a.nama,a.satuan, a.kode_akun, b.nama as nm2  from agg_fa_param_m a inner join agg_masakun b on b.kode_akun= a.kode_akun and b.kode_lokasi =  '"+this.eLokasi.getText()+"'",
											  "select count(kode_param) from agg_fa_param_m ",
											  ["a.kode_param","a.nama","a.satuan","a.kode_akun","b.nama"],"and",["Kode","Nama","Satuan","Akun","Nama Akun"],false);				
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
					"select a.kode_param,c.nama,a.satuan, a.kode_akun, b.nama as nm2, a.satuan,a.tarif,a.volume,a.jumlah,(a.tarif*a.volume*a.jumlah) as total,a.jns_periode "+
				    "from agg_fa_param_d a "+
				    "		inner join agg_masakun b on b.kode_akun= a.kode_akun and b.kode_lokasi = a.kode_lokasi "+
				    "		inner join agg_fa_param_m c on a.kode_param= c.kode_param and a.kode_lokasi = '"+this.eLokasi.getText()+"' "+
				    "where a.tahun='"+this.eTahun.getText()+"' and a.kode_lokasi = '"+this.eLokasi.getText()+"' and a.kode_klpfa = '"+this.eKlp.getText()+"' order by a.kode_param",true);
			if (typeof data != "string"){
				this.sg1.clear();
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.kode_param, line.nama, line.kode_akun, line.nm2, line.satuan, floatToNilai(line.tarif),floatToNilai(line.volume), floatToNilai(line.jumlah), floatToNilai(line.total), line.jns_periode]);
				}
			}		
		}
	}
});
