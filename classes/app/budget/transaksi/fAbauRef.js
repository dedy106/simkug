/**
 * @author mr
 */
window.app_budget_transaksi_fAbauRef = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fAbauRef.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fAbauRef";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Referensi Biaya Variabel : Input/Koreksi", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");			
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,tag:2,change:[this,"doChange"]});
			this.eKode = new portalui_saiCBBL(this,{bound:[20,23,200,20],caption:"Kode Ref", multiSelection:false,change:[this,"doChange"],rightLabelVisible:false});					
			this.eNama = new portalui_saiLabelEdit(this,{bound:[20,24,500,20],caption:"Nama Ref",maxLength:200});									
			
			this.p1 = new portalui_panel(this,{bound: [20, 232, 900, 355],caption: "Daftar Item"});	    				
			this.sg1 = new portalui_saiGrid(this.p1, {bound: [1, 20, 895, 308],colCount: 16,
					colTitle:[
							  "Kode PK","Nama PK","Kode DRK","Nama DRK","Kode RKA","Nama RKA",  
							  "Kode Var","Nama Variabel","Kode Akun","Nama Akun","Tarif",
							  "Deskripsi",
							  "Jns Periode","Jumlah","Volume","Total"],
					colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
					         [100,70,70,100,   200,  70,150,80,150,70   ,150,80,150,80,150,80]],
					colFormat:[[10,13,14,15],[cfNilai,cfNilai,cfNilai,cfNilai]],
					colHide: [[0,1,2,3],true],
					buttonStyle:[[4,6,12],[bsEllips,bsEllips,bsAuto]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10, 12,15],[11,13,14]],
					picklist:[[12],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12","A. 01,04,07,10","B. 01,07","C. 01-12"]})]],
					change:[this,"doChangeCell"],ellipsClick: [this,"doEllipsClick"],defaultRow:1
			});    			
			this.sgNav = new portalui_sgNavigator(this.p1, {bound: [1, 330, 897, 25],grid: this.sg1,border: 0,buttonStyle: 2});		
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();
			this.sgNav.onPager.set(this, "doSelectedPage");
			this.standarLib.clearByTag(this,["0","1"],undefined);				
			this.sg1.clear(1);
			
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
window.app_budget_transaksi_fAbauRef.extend(window.portalui_childForm);
window.app_budget_transaksi_fAbauRef.implement({
	mainButtonClick : function(sender){
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
		if (modalResult != mrOk) return false;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, new Array("0","8"),undefined);				
					this.sg1.clear(1); 
				}
				break;
			case "simpan" :				
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (!this.sg1.rowValid(i)) {
						var j = i+1;
						system.alert(this,"Data tidak valid.","Terdapat data tidak lengkap di baris "+j);
						return false;
					}
				}
				if (!this.standarLib.checkEmptyByTag(this, new Array("0","2"))){
					return false;
				}
				var vTahun = this.eTahun.getText();				
				var sql = new server_util_arrayList();
				sql.add("delete from agg_abau_ref_m where kode_ref='"+this.eKode.getText()+"' and tahun='"+this.eTahun.getText()+"'");		
				sql.add("delete from agg_abau_ref where kode_ref='"+this.eKode.getText()+"' and tahun='"+this.eTahun.getText()+"'");		
				
				sql.add("insert into agg_abau_ref_m(kode_ref,nama,tahun) values ('"+this.eKode.getText()+"','"+this.eNama.getText()+"','"+this.eTahun.getText()+"')");
				var idx = 0;
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){
						idx++;
						sql.add("insert into agg_abau_ref(kode_ref,kode_rka,kode_drk,kode_pk,kode_var,kode_akun,keterangan,kode_pp,jns_periode,jumlah,volume,nilai,tahun,tarif,no_urut)"+
								" values('"+this.eKode.getText()+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(6,i)+"' "+
								" ,'"+this.sg1.cells(8,i)+"','"+this.sg1.cells(11,i)+"','-','"+this.sg1.cells(12,i)+"',"+parseNilai(this.sg1.cells(13,i))+","+parseNilai(this.sg1.cells(14,i))+","+parseNilai(this.sg1.cells(15,i))+",'"+vTahun+"',"+parseNilai(this.sg1.cells(10,i))+","+idx+")");
					}
				}			
				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	doChange: function(sender){
		if (sender == this.eTahun && this.eTahun.getText()!="") {
			this.eKode.setSQL("select kode_ref, nama from agg_abau_ref_m where tahun = '"+this.eTahun.getText()+"'",["kode_ref","nama"],false,["Kode","Nama"],"and","Ref. Angg. Norma Biaya Variable",false);
		}
		if (sender == this.eTahun || sender == this.eKode) {
			if (this.eTahun.getText()!="" && this.eKode.getText()!="") {
				this.sg1.clear();
				var data = this.dbLib.getDataProvider(
						   "select z.nama as nama_ref,b.kode_rka,d.nama as nama_rka,b.kode_drk,e.nama as nama_drk,x.kode_pk,x.nama as nama_pk,b.kode_var,f.nama as nama_var,"+
						   "       b.kode_akun,g.nama as nama_akun,b.jns_periode,b.jumlah,b.volume,b.tarif,b.nilai,b.keterangan "+
						   "from agg_abau_ref b inner join agg_abau_ref_m z on z.kode_ref=b.kode_ref and b.tahun=z.tahun "+
						   "     inner join agg_rka d on b.kode_rka=d.kode_rka and b.tahun=d.tahun "+
						   "     inner join agg_drk e on d.kode_drk=e.kode_drk and d.tahun=e.tahun "+
						   "     inner join agg_pk x on e.kode_pk=x.kode_pk and x.tahun=e.tahun "+
						   "     inner join agg_var f on b.kode_var=f.kode_var "+
						   "     inner join agg_masakun g on b.kode_akun=g.kode_akun and g.kode_lokasi='"+this.app._lokasi+"' "+
						   " where b.kode_ref = '"+this.eKode.getText()+"' and b.tahun = '"+this.eTahun.getText()+"' order by b.no_urut");
				eval("data = "+data+";");				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_pk,line.nama_pk,line.kode_drk,line.nama_drk,line.kode_rka,line.nama_rka,
											 line.kode_var,line.nama_var,line.kode_akun,line.nama_akun,floatToNilai(line.tarif),  
											 line.keterangan,
											 line.jns_periode,floatToNilai(line.jumlah),floatToNilai(line.volume),floatToNilai(line.nilai)]);
					}
					this.eNama.setText(line.nama_ref);
				} else this.sg1.clear(1);
				this.sg1.validasi();			
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
					if (result.toLowerCase().search("error") == -1)					
					{						
						this.app._mainForm.pesan(2,"Transaksi sukses tersimpan");						
						this.app._mainForm.bClear.click();              						
					}else system.info(this,result,"");
	    			break;	      			
					case "listData" :
						this.sg1.clear(1); 
					break;
	    		}
			}
			catch(e)
			{
				alert(e);
			}
	    }
	},
	doChangeCell: function(sender, col, row){
		switch (col) {
			case 4:
				var sql = new server_util_arrayList();
				sql.add("select x.kode_drk,x.nama as nama_drk,y.kode_pk,y.nama as nama_pk "+
						"from agg_rka a "+
					    "				inner join agg_drk x on a.kode_drk = x.kode_drk and a.tahun = x.tahun "+
						"				inner join agg_pk y on y.kode_pk = x.kode_pk and y.tahun = x.tahun "+
						"where a.tahun = '" +this.eTahun.getText() +"' and a.kode_rka = '" +this.sg1.cells(4, this.sg1.row) +"' ");
				
				sql.add("select a.kode_var,a.nama as nama_var,c.kode_akun,c.nama as nama_akun,b.tarif "+
						"from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var and b.tahun = '"+this.eTahun.getText()+"' "+
						"               inner join agg_abau_kamus d on a.kode_var=d.kode_var and d.tahun = '"+this.eTahun.getText()+"' "+
						"               inner join agg_masakun c on b.kode_akun=c.kode_akun and c.kode_lokasi = '"+this.app._lokasi+"' "+
						"where d.kode_rka = '" +this.sg1.cells(4,this.sg1.row) +"' and b.tahun = '" +this.eTahun.getText() +"'");

				var data = this.dbLib.getMultiDataProvider(sql,true);				
				if (typeof data != "string") {					
					if (data.result[0].rs.rows[0] != undefined) {
						var line = data.result[0].rs.rows[0];
						this.sg1.cells(0, row,line.kode_pk);
						this.sg1.cells(1, row,line.nama_pk);
						this.sg1.cells(2, row,line.kode_drk);
						this.sg1.cells(3, row,line.nama_drk);
						this.sg1.cells(6, row,"");
						this.sg1.cells(7, row,"");
						this.sg1.cells(8,row,"");
						this.sg1.cells(9,row,"");
						this.sg1.cells(10,row,"");
					}
					if (data.result[1].rs.rows[0] != undefined) {
						var line = data.result[1].rs.rows[0];
						this.sg1.cells(6, row,line.kode_var);
						this.sg1.cells(7, row,line.nama_var);
						this.sg1.cells(8,row, line.kode_akun);
						this.sg1.cells(9,row, line.nama_akun);
						this.sg1.cells(10,row, floatToNilai(line.tarif));
						
					}
				}
				break;
			case 6:
				var data = this.dbLib.getDataProvider(
						"select c.kode_akun,c.nama as nama_akun,b.tarif "+
						"from agg_norma_var b inner join agg_masakun c on b.kode_akun=c.kode_akun and c.kode_lokasi = '"+this.app._lokasi+"' "+
						"where b.kode_var = '" +this.sg1.cells(6,this.sg1.row) +"' and b.tahun = '" +this.eTahun.getText() +"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line !== undefined) {
						this.sg1.cells(8,row, line.kode_akun);
						this.sg1.cells(9,row, line.nama_akun);
						this.sg1.cells(10,row, floatToNilai(line.tarif));
					}
				}
				break;
			case 13 : 
			case 14 : 
					if (this.sg1.cells(10,row) != "" && this.sg1.cells(13,row) != "" && this.sg1.cells(14,row) != "") {
						var vTot = nilaiToFloat(this.sg1.cells(10,row)) * nilaiToFloat(this.sg1.cells(13,row)) * nilaiToFloat(this.sg1.cells(14,row));
						this.sg1.cells(15,row,vTot);
					}
			break;
		}		
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 4 :
						this.standarLib.showListDataForSG(this, "Daftar RKA",this.sg1, this.sg1.row, this.sg1.col, 
														"select kode_rka,nama   from agg_rka where tahun = '"+this.eTahun.getText()+"' and tf_aktif='1' ",
														"select count(kode_rka) from agg_rka where tahun = '"+this.eTahun.getText()+"' and tf_aktif='1' ",
														 new Array("kode_rka","nama"),"and",new Array("Kode","Nama"),false);					
						break;								  
				case 6 : 
						this.jenisRKA = "UNLOCK";
						var data = this.dbLib.runSQL("select top 1 jenis from agg_abau_kamus where kode_rka='"+this.sg1.cells(4,row)+"' and tahun ='"+this.eTahun.getText()+"'");
						if (data instanceof portalui_arrayMap){
							if (data.get(0) != undefined){
								line = data.get(0);
								this.jenisRKA = line.get("jenis");
							} 
						}
						if (this.jenisRKA.toUpperCase() == "UNLOCK") {
							this.standarLib.showListDataForSG(this, "Daftar Variable Biaya",this.sg1, this.sg1.row, this.sg1.col, 
														"select a.kode_var,a.nama from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var where b.tahun = '"+this.eTahun.getText()+"'",
														"select count(a.kode_var) from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var where b.tahun = '"+this.eTahun.getText()+"'",
														 new Array("a.kode_var","a.nama"),"and",new Array("Kode","Nama"),false);					
						}
						else {
							this.standarLib.showListDataForSG(this, "Daftar Variable Biaya",this.sg1, this.sg1.row, this.sg1.col, 
														"select a.kode_var,a.nama from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var and b.tahun='"+this.eTahun.getText()+"' inner join agg_abau_kamus c on b.kode_var=c.kode_var and c.tahun=b.tahun where c.kode_rka = '"+this.sg1.cells(4,row)+"' and b.tahun = '"+this.eTahun.getText()+"'",
														"select count(a.kode_var) from agg_var a inner join agg_norma_var b on a.kode_var=b.kode_var and b.tahun='"+this.eTahun.getText()+"' inner join agg_abau_kamus c on b.kode_var=c.kode_var and c.tahun=b.tahun where c.kode_rka = '"+this.sg1.cells(4,row)+"' and b.tahun = '"+this.eTahun.getText()+"'",
														 new Array("a.kode_var","a.nama"),"and",new Array("Kode","Nama"),false);
						
						}
						break;								  
			}
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	}
});
