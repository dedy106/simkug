/**
 * @author mr
 */
window.app_budget_transaksi_fTpkkAddGar = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fTpkkAddGar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fTpkkAddGar";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Load Data TPKK Tahun Angg. [n-1]: Input/Koreksi",0);
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],tag:2,caption:"Thn Angg[n-1] + Bln",tipeText:ttAngka,maxLength:6});								
		this.i_viewer = new portalui_imageButton(this,{bound:[200,23,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadData"]});
		
		uses("portalui_saiGrid");
		this.p1 = new portalui_panel(this,{bound:[20,10,900,this.height - 50],caption:"Daftar TPKK Tahun Angg. [n-1] Belum Terrealisasi"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,this.p1.height - 45], colCount:9,rowCount:1,
			colTitle:"Status,Kamar Periksa, Nama,  Tgl Operasi, Status, Kode Band, Kode Loker, Kode Kota, Jumlah Dokter",
			colWidth:[[0,1,2,3,4,5,6,7,8],[60,80,230,70,80,80,80,80,80]], 
			colFormat:[[8],[cfNilai]], 
			readOnly:true,
			buttonStyle:[[0],[bsAuto]],readOnly:true,
			picklist:[[0],[new portalui_arrayMap({items:["APP","NONAPP"]})]]
		});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.sg1.height + 20, 898, 25], grid:this.sg1,buttonStyle:bsTrans});
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		
			
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
			
			this.eTahun.setText('2010');		
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fTpkkAddGar.extend(window.portalui_childForm);
window.app_budget_transaksi_fTpkkAddGar.implement({
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
				var statusOrg = "";
				for (var i=0; i < this.sg1.getRowCount();i++){			
					if (this.sg1.rowValid(i) && this.sg1.cells(0,i).toUpperCase() == "APP"){
						sql.add("insert into agg_dokter (kode_dokter, kode_lokasi, kode_band, kode_loker, kode_kota, nama,  status,vol,tahun,jenis_agg,tgl_operasi) values "+ 
								"('"+
								this.sg1.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','"+this.sg1.cells(7,i)+"','"+this.sg1.cells(2,i)+"','"+
								this.sg1.cells(4,i)+"',"+parseNilai(this.sg1.cells(8,i))+",'"+this.eTahun.getText()+"','P','"+this.sg1.getCellDateValue(3,i)+
								"')");
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
	doLoadData: function(sender){	
		if (this.ePeriode.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.kode_dokter,a.nama, convert(varchar,a.tgl_operasi,103) as tgl_operasi,a.status,a.kode_band,a.kode_loker,a.kode_kota,a.vol "+
												  "from agg_dokter a "+
												  "where a.tahun = '"+this.ePeriode.getText().substr(0,4)+"' and jenis_agg = 'T' and substring(convert(varchar,a.tgl_operasi,112),1,6) between '"+this.ePeriode.getText()+"' and '"+this.ePeriode.getText().substr(0,4)+'12'+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData(['NONAPP',line.kode_dokter,line.nama,line.tgl_operasi,line.status,line.kode_band,line.kode_loker,line.kode_kota,floatToNilai(line.vol)]);
				}
			} else systemAPI.alert(data);
		}
	},
	doChange: function(sender)	{
		var thn = parseFloat(this.eTahun.getText()) - 1;
		this.ePeriode.setText(thn+"12");
	}
});
