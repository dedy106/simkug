/**
 * @author mr
 */
window.app_budget_transaksi_fBpccrumus = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fBpccrumus.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fBpccrumus";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Persentase Kunjungan: Input/Koreksi",0);
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],tag:2,caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.eBA = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Lokasi", multiSelection:false, change:[this,"doChange"]});
		
		uses("portalui_saiGrid");
		this.p1 = new portalui_panel(this,{bound:[20,10,900,this.height - 50],caption:"Daftar Persentase Kunjungan"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,this.p1.height - 45], colCount:10,rowCount:1,
			colTitle:"Jenis TPK, Kode Param, Nama Param, Band, Nama Band, Sts Pegawai, Status, Bulan, %Penderita, %Kunjungan",
			colWidth:[[0,1,2,3,4,5,6,7,8,9],[70,70,200,60,60,80,80,80,80,80]],
			colReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
			colFormat:[[9,8],[cfNilai, cfNilai]],
			buttonStyle:[[0,1,3,6,7],[bsAuto,bsEllips,bsEllips,bsAuto,bsAuto]],
			picklist:[[0,6,7],
							[
								new portalui_arrayMap({items:["TPKK","TPKU","NONTPK"]}),
								new portalui_arrayMap({items:["KK","ISU","ANAK","JADU"]}),
								new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})
							]
					],
			ellipsClick: [this,"doEllipsClick"],change:[this,"doCellChange"]
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
			
			this.eBA.setSQL("select kode_lokasi, nama from lokasi where kode_lokkonsol = '"+this.app._lokKonsol+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.eBA.setText(this.app._lokasi);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fBpccrumus.extend(window.portalui_childForm);
window.app_budget_transaksi_fBpccrumus.implement({
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
				for (var i=0; i < this.sg1.getRowCount();i++){			
					if (this.sg1.rowValid(i)) {
						sql.add("insert into agg_bpcc_rumus (kode_param,kode_band,status_pst,jenis_pst,jenis_tpk,kode_lokasi,tahun,bulan,p_derita,p_kunjungan) values "+
								"('"+this.sg1.cells(1,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(6,i)+"','"+this.sg1.cells(0,i)+"','"+this.eBA.getText()+"','"+this.eTahun.getText()+"','"+this.sg1.cells(7,i)+"',"+parseNilai(this.sg1.cells(8,i))+","+parseNilai(this.sg1.cells(9,i))+") ");
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
	/*
	doChange: function (sender) {
		if (this.eTahun.getText() != "" && this.eBA.getText() != "") {
			var temp = this.dbLib.runSQL("select  a.jenis_tpk,b.kode_param,b.nama as nama_param,a.kode_band,c.nama as nama_band,a.status_pst,a.jenis_pst,a.bulan,p_derita,p_kunjungan "+
										 "from agg_bpcc_rumus a inner join agg_bpcc_param b on a.kode_param=b.kode_param and a.tahun=b.tahun "+
										 "                      inner join agg_band c on a.kode_band=c.kode_band "+
										 "where  a.tahun='"+this.eTahun.getText()+"' and a.kode_lokasi = '"+this.eBA.getText()+"' ");
			if (temp instanceof portalui_arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
		}
	},
	*/
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
	doCellChange: function(sender, col, row){
		switch(col){
			case 1:
				this.sg1.setCell(5,row,this.sg1.dataFromList[2]);
			break;
		}
	},
	doEllipsClick: function(sender, col, row){
		switch(col){
			case 1:
				this.standarLib.showListDataForSG(this, "Daftar Parameter",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_param, nama, status_pst   from agg_bpcc_param where tahun='"+this.eTahun.getText()+"' ",
											  "select count(kode_param)  from agg_bpcc_param where tahun='"+this.eTahun.getText()+"' ",
											  new Array("kode_param","nama","status_pst"),"and",new Array("Kode","Nama","Status"),false);
			break;
			case 3:
				this.standarLib.showListDataForSG(this, "Daftar Band",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_band, nama   from agg_band ",
											  "select count(kode_band)  from agg_band ",
											  new Array("kode_band","nama"),"and",new Array("Kode","Nama"),false);
			break;
		}
	}
});
