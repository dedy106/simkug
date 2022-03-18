/**
 * @author dweexfuad
 */
window.app_assetsap_master_fKlpAlt = function(owner)
{
	if (owner)
	{
		window.app_assetsap_master_fKlpAlt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_master_fKlpAlt";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Mapping Prosedur", 0);	

		this.bTampil = new button(this,{bound:[400,12,80,20], caption:"Tampil", click:"doTampil"});
		this.p1 = new panel(this,{bound:[20,14,500,400],caption:"Data Class Asset"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,498,380], colCount:3, colTitle:"Class, Asset Class, Prosedur",
			colWidth:[[2,1,0],[100,250,80]],buttonStyle:[[2],[bsAuto]],
			colAlign:[[2],[alCenter]], readOnly:true
		});
		
		setTipeButton(tbSimpan);			
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		try
		{		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();
			var sql = new server_util_arrayList();
			sql.add("select distinct a.kode_klpfa, a.nama, ifnull(b.jenis_proc,'-') as jns "+
				" from amu_klp a left outer join amu_klp_alt b on b.kode_klpfa = a.kode_klpfa  and b.periode = '"+this.app._periode+"' "+
				" inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'ALTERNATIF' "+
				" where a.kode_lokasi = '"+this.app._lokasi+"' and c.periode = '"+this.app._periode+"' order by a.kode_klpfa ");
			sql.add("select kode_klp, nama from amu_alt_klp");
			this.dbLib.getMultiDataProviderA(sql);
			this.sysCode = 0;
		}catch(e)
		{
			systemAPI.alert(e);
		}
	}
};
window.app_assetsap_master_fKlpAlt.extend(window.childForm);
window.app_assetsap_master_fKlpAlt.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear){
			if (this.sysCode == 0)
				system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
			else system.confirm(this, "clear", "Transaksi sukses disimpan("+this.ed_kode.getText()+")","<br>Screen akan dibersihkan?");	
		}if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, modalResult){			
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, [0,1],this.ed_kode);				
				this.sysCode = 0;
				this.ed_periode.setText(this.app._periode);				
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					try
					{					
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();						
						sql.add("delete from amu_klp_alt where periode = '"+this.app._periode+"' ");
						for (var i=0; i < this.sg.getRowCount();i++){
							if (this.sg.cells(2,i) != "-"){
								sql.add("insert into amu_klp_alt(kode_klpfa, jenis_proc, periode)values('"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.app._periode+"' )");
							}
						}
						this.sysCode = 0;
						this.dbLib.execArraySQL(sql);	
					}
					catch(e)
					{
						system.alert(this, e,"");
					}
				}
				break;
			case "ubah" :
				if (modalResult == mrOk)
				{
						uses("server_util_arrayList");					
						var sql = new server_util_arrayList();						
						this.dbLib.execArraySQL(sql);	
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
					uses("server_util_arrayList");					
						var sql = new server_util_arrayList();						
						this.dbLib.execArraySQL(sql);	
			   }
				break;
		}
	},
	doEditChange: function(sender){		
		if (this.ed_kode.getText() != "")
		{
			try
			{
			
			}catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{
			if (sender == this.dbLib)
			{
				switch	(methodName)
				{
					case "execArraySQL" :
						if (result.toLowerCase().search("error") == -1)					
						{				
							this.sysCode = 1;		  
							this.app._mainForm.bClear.click();              
						}else
							system.alert(this, result,"");
						break;
						
					case "getMultiDataProvider" :																						
						result = JSON.parse(result);
						var line, items = new arrayMap();
						for (var i in result.result[1].rs.rows){
							line = result.result[1].rs.rows[i];					
							items.set(line.kode_klp, line.nama);
						}
						this.sg.columns.get(2).setPicklist(items);
						result = result.result[0].rs.rows;
						for (var i in result){
							line = result[i];
							this.sg.appendData([line.kode_klpfa, line.nama, line.jns]);							
						}
					break;
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doGridChange: function(sender, col, row){		
	},
	doTampil: function(sender){		
		var data = this.dbLib.getDataProvider("select a.kode_klpfa, a.nama, ifnull(b.jenis_proc,'-') as jns "+
				" from amu_klp a left outer join amu_klp_alt b on b.kode_klpfa = a.kode_klpfa  and b.periode = '"+this.app._periode+"'"+
				" inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'ALTERNATIF' "+
				" where a.kode_lokasi = '"+this.app._lokasi+"' and c.periode= '"+this.app._periode+"' order by a.kode_klpfa ", true);
		if (typeof data != "string"){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];
				this.sg.appendData([line.kode_klpfa, line.nama, line.jns]);
			}
		}
		
	}, 
	initColumn : function(result){		
	}
});
