/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_master_fNormaFix = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fNormaFix.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fNormaFix";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Norma Biaya Gaji", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar;portalui_sgNavigator");
			this.eBand = new portalui_saiCBBL(this,{bound:[20,23,200,20],caption:"Kode Band", multiSelection:false,change:[this,"doChange"]});					
			this.eParam = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Kode Parameter", multiSelection:false,change:[this,"doChange"]});					
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,25,180,20],caption:"Tahun",maxLength:4,change:[this,"doChange"]});
			this.eNilai = new portalui_saiLabelEdit(this,{bound:[20,28,200,20],caption:"Nilai Parameter",tipeText:ttNilai,text:"0",tag:"1"});
			this.eVol = new portalui_saiLabelEdit(this,{bound:[20,29,200,20],caption:"Volume",tipeText:ttNilai,text:"0",tag:"1"});
			this.bTampil = new portalui_button(this,{bound:[629,29,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
			this.p1 = new portalui_panel(this,{bound:[10,30,700,393],caption:"Daftar Norma Biaya Gaji"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,700,340],tag:"9",
					colTitle: ["Band", "Kd Parameter", "Nama Parameter", "Tahun", "Nilai","Jumlah"]});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,370,700,25],buttonStyle:bsViewExt, grid:this.sg1, pager:[this,"doPager"], xlsClick:[this,"doXlsClick"]});		
			
			this.rearrangeChild(10,22);
			setTipeButton(tbAllFalse);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			this.eBand.setSQL("select kode_band, nama from agg_band ",["kode_band","nama"],false,["Kode Band","Nama"],"where","Data Band",true);			
			
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
window.app_budget_master_fNormaFix.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fNormaFix.implement({
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.eBand);
					break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						
						sql.add("insert into agg_norma_fix (kode_band, kode_param,persen, nilai_sat, nilai, tahun, jumlah ) "+
						        "values ('"+this.eBand.getText()+"','"+this.eParam.getText()+"',0,0,"+parseNilai(this.eNilai.getText())+",'"+this.eTahun.getText()+"',"+parseNilai(this.eVol.getText())+")");
						this.dbLib.execArraySQL(sql);
						this.standarLib.clearByTag(this, new Array("0","1"),this.eBand);
					}
					break;
				case "ubah" :	
					if (this.standarLib.checkEmptyByTag(this, [0,1]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_norma_fix set jumlah="+parseNilai(this.eVol.getText())+",nilai="+parseNilai(this.eNilai.getText())+
						        " where kode_band='"+this.eBand.getText()+"' and kode_param='"+this.eParam.getText()+"' and tahun='"+this.eTahun.getText()+"'");
						this.dbLib.execArraySQL(sql);							
					}
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_norma_fix "+
							    " where kode_band='"+this.eBand.getText()+"' and kode_param='"+this.eParam.getText()+"' and tahun='"+this.eTahun.getText()+"'");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doChange: function(sender) {
		if (sender == this.eTahun) {
			if (this.eTahun.getText()!=""){ 
				this.eParam.setSQL("select kode_param,nama from agg_param where tahun = '"+this.eTahun.getText()+"' ",["kode_param","nama"],false,["Kode Parameter","Nama"],"and","Data Parameter",true);
				this.dbLib.getDataProviderA("select distinct a.kode_param, b.nama  "+
											 "from agg_norma_fix a "+
											 "inner join agg_param b on a.kode_param=b.kode_param "+
											 "where a.tahun = '"+this.eTahun.getText()+"' ");
			}
		}
		if (sender == this.eTahun || sender == this.eBand || sender == this.eParam ) {
			if (this.eBand.getText() != "" && this.eParam.getText() != "" && this.eTahun.getText() != ""){
				var sql = "select jumlah,nilai from agg_norma_fix "+
						   "where kode_band='"+this.eBand.getText()+"' and kode_param='"+this.eParam.getText()+"' and tahun='"+this.eTahun.getText()+"'";
				var data = this.dbLib.getDataProvider(sql,true);			
				if (typeof data == "object"){
					this.standarLib.clearByTag(this, new Array("1"),this.eTahun);
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.eNilai.setText(floatToNilai(line.nilai));
						this.eVol.setText(floatToNilai(line.jumlah));
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}			
			}
		}
	},
	doTampilClick: function(sender){
		try{			
			
			var sql = "select a.kode_band ";
			for (var i in this.kodeParam){
				sql += ",sum(case when a.kode_param = '"+this.kodeParam[i]+"' then nilai else 0 end) as "+this.kodeParam[i];
			}
			sql += "  from agg_norma_fix a "+
										 "inner join agg_param b on a.kode_param=b.kode_param "+
										 "where a.tahun = '"+this.eTahun.getText()+"' group by a.kode_band order by a.kode_band";
			this.sqlTampil = sql;
			var temp = this.dbLib.getDataProvider(sql,true);
			if (typeof temp != "string") {
				this.dataBand = temp.rs.rows;
				this.sgn.setTotalPage(Math.ceil(this.dataBand.length / 20));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
				this.tampilPerPage(1);
				/*this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
				* */
			}else systemAPI.alert(temp);
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page){
		//this.sg1.selectPage(page);
		this.tampilPerPage(page);
	},
	tampilPerPage: function(page){
		this.sg1.clear();
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataBand.length ? this.dataBand.length : start + 20);
		var line;
		for (var i=start; i < finish; i++){
			line = this.dataBand[i];
			data = [];			
			for (var c in line){
				if (c != "kode_band") data[data.length] = floatToNilai(line[c]);
				else data[data.length] = line[c];
			}
			this.sg1.appendData(data);
		}
		this.sg1.setNoUrut(start);
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
				case "getDataProvider":
					this.sg1.clear();
					var temp = JSON.parse(result);
					if (temp.rs.rows[0]){
						var title = ["Band"], colWidth = [80], kodeParam = [], column = [0];
						var line;
						this.sg1.setColCount(temp.rs.rows.length + 1);
						for (var i in temp.rs.rows){
							line = temp.rs.rows[i];
							title[title.length] = line.nama;
							colWidth[colWidth.length] = (line.nama.length * 7 > 80? line.nama.length * 7 :80);
							kodeParam[kodeParam.length] = line.kode_param;
							column[column.length] = parseInt(i, 10) + 1;
							this.sg1.columns.get( parseInt(i,10) + 1 ).setColumnFormat(cfNilai);
						}
						this.sg1.setColTitle(title);
						this.sg1.setColWidth(column, colWidth);					
					}
					this.kodeParam = kodeParam;
					this.colTitle = title;
				break;
			}
		}
	},
	doXlsClick: function(){		
		try {
			//title,width, fieldType, withTotal,groupBy,file
			var title = new server_util_arrayList();			
			for (var i in this.colTitle) {
				title.add(this.colTitle[i]);				
			}			
			window.location = this.dbLib.sqlToXls2(this.sqlTampil, title, "NormaFix.xls");
		}catch(e){
			alert(e);
		}
		
	}
	
});
