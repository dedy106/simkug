/**
 * @author mr
 */
window.app_budget_transaksi_fTpkkAdd = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fTpkkAdd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fTpkkAdd";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Rencana TPKK Tahun Anggaran [n]: Input/Koreksi",0);
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],tag:2,caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});								
		
		uses("portalui_saiGrid");
		this.p1 = new portalui_panel(this,{bound:[20,10,900,this.height - 50],caption:"Daftar Rencana TPKK Tahun Anggaran [n]"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,this.p1.height - 45], colCount:11,rowCount:1,
			colTitle:"Kamar Periksa, Nama, Periode Operasi, Status, Kode Band, Nama Band, Kode PP, Nama PP, Kode Kota, Nama Kota, Jumlah Dokter",
			colWidth:[[0,1,2,3,4,5,6,7,8,9,10],[80,150,80,80,80,80,80,120,80,120,80]],
			colReadOnly:[true,[0,5,7,9],[]],
			colFormat:[[10],[cfNilai]], 
			buttonStyle:[[2,3,4,6,8],[bsAuto, bsAuto, bsEllips, bsEllips, bsEllips]],
			picklist:[[2,3],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]}),
							 new portalui_arrayMap({items:["Dr.PJTPK","Dr.TPKK","Drg.PJTPK","Drg.TPKK"]})]],
			ellipsClick: [this,"doEllipsClick"],change:[this,"doSgChange"]
		});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.sg1.height + 20, 898, 25], grid:this.sg1,buttonStyle:bsTrans});
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		this.sg1.onCellEnter.set(this, "doCellEnter");
			
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
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
window.app_budget_transaksi_fTpkkAdd.extend(window.portalui_childForm);
window.app_budget_transaksi_fTpkkAdd.implement({
	mainButtonClick :function(sender){
		if (sender == this.app._mainForm.bClear)
		{
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
		}
		if (sender == this.app._mainForm.bSimpan)
		{
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
		}
		if (sender == this.app._mainForm.bEdit)
		{
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		}
		if (sender == this.app._mainForm.bHapus)
		{
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
		}
	},
	simpan: function(){	
		if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2"))){
			try{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				var format = this.app._lokasi+'-'+this.eTahun.getText().substr(2,2)+'.';
				var nb = this.standarLib.noBuktiOtomatis(this.dbLib,'agg_dokter','kode_dokter',format,'0000');
				var lastId = parseFloat(nb.substr(format.length),10);			
				for (var i=0; i < this.sg1.getRowCount();i++){			
					if (this.sg1.rowValid(i)) {
						var tglOperasi = this.eTahun.getText()+'-'+this.sg1.cells(2,i)+'-01';
						sql.add("insert into agg_dokter(kode_dokter,kode_lokasi,kode_band,kode_loker,kode_kota,nama,status,vol,tahun,jenis_agg,tgl_operasi) values "+ 
									"('"+
									nb+"','"+this.app._lokasi+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(6,i)+"','"+this.sg1.cells(8,i)+"','"+
									this.sg1.cells(1,i)+"','"+this.sg1.cells(3,i)+"',"+parseNilai(this.sg1.cells(10,i))+",'"+this.eTahun.getText()+"','T','"+tglOperasi+
									"')");
						lastId++;
						this.sg1.cells(0,i, nb);
						nb = format + formatNumeric("0000",lastId.toString());
					}
				}
				this.dbLib.execArraySQL(sql);					
			}
			catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);						
					this.sg1.clear(1);
				}
				break;
			case "simpan" :	
				this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
				{
					case "execArraySQL" :
						step="info";
					if (result.toLowerCase().search("error") == -1)					
					{
						this.app.alert(this,"transaksi telah sukses tersimpan "+this.eTahun.getText(),"");
						this.app._mainForm.bClear.click();              
					}else system.info(this,result,"");
					break;
				break;
				}    		
			}
			catch(e)
			{
				alert("step : "+step+"; error = "+e);
			}
		}
	},
	doCellEnter: function(sender, col, row){
		try{
			switch(col){
				case 0 : 
					lastId = row+1;
					var nb = this.app._lokasi+'-'+this.eTahun.getText().substr(2,2) + '.' + formatNumeric("0000",lastId.toString());
					this.sg1.setCell(0,row,nb);
					break;
			}
		}catch(e){
			alert("doFindBtnClick : " + e);
		}	
	},
	doEllipsClick: function(sender, col, row){
		switch(col){
			case 4:
				this.standarLib.showListDataForSG(this, "Daftar Band",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_band,nama   from agg_band",
											  "select count(kode_band) from agg_band",
											  new Array("kode_band","nama"),"and",new Array("Kode","Nama"),false);
			break;
			case 6:
				this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_pp,nama   from agg_pp where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'posting'",
											  "select count(kode_pp) from agg_pp where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'posting'",
											  new Array("kode_pp","nama"),"and",new Array("Kode","Nama"),false);
			break;
			case 8:
				this.standarLib.showListDataForSG(this, "Daftar Kota",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_kota,nama   from agg_kota",
											  "select count(kode_kota) from agg_kota",
											  new Array("kode_kota","nama"),"and",new Array("Kode","Nama"),false);
			break;
		}
	}
});
