/**
 * @author mr
 */
window.app_budget_transaksi_fTPKUload = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fTPKUload.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fTPKUload";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data TPKU: Input/Koreksi",0);
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],tag:2,caption:"Tahun Anggaran",tipeText: ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.bTampil = new portalui_button(this, {bound: [835, 23, 80, 20],caption: "Tampil"});
		
		uses("portalui_saiGrid");
		this.p1 = new portalui_panel(this,{bound:[20,10,900,this.height - 50],caption:"Daftar Rencana Aktiva Tetap Tahun Anggaran"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,this.p1.height - 45], colCount:10,rowCount:1,
			colTitle:"No Kontrak, Nama Dokter, Alamat, Kode RKA, Nama RKA, Kode Akun, Nama Akun, Jml Kunj, Nilai Kontrak,Jenis",
			colWidth:[[0,1,2,3,4,5,6,7,8,9],[150,150,200,70,100,70,100,100,100,80]],
			colFormat:[[7,8],[cfNilai, cfNilai]],
			colReadOnly:[true,[3,4,5,6],[]],
			picklist:[[9],[new portalui_arrayMap({items:["FFS","NONFFS"]})]],
			buttonStyle:[[3,5,9],[bsEllips, bsEllips, bsAuto]],
			ellipsClick: [this,"doEllipsClick"],change:[this,"doSgChange"]
		});
		//this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.sg1.height + 20, 898, 25], grid:this.sg1,buttonStyle:bsTrans});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.sg1.height + 20, 898, 25],buttonStyle:2,grid:this.sg1});		
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
			this.bTampil.onClick.set(this, "doTampil");
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
window.app_budget_transaksi_fTPKUload.extend(window.portalui_childForm);
window.app_budget_transaksi_fTPKUload.implement({
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
			if (this.prog != "0") {
				system.alert(this,"Transaksi tidak valid.","Transaksi Aktiva tetap telah di Close.");
				return false;
			}
			try{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();				
				//mesti hitung ulang
				sql.add("delete from agg_d where modul = 'BTPKU' and tahun = '"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from agg_tpku where tahun= '"+this.eTahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				for (var i=0; i < this.sg1.getRowCount();i++){			
					if (this.sg1.rowValid(i)) {
						for (var j=1; j <= 12; j++){
							sql.add("insert into agg_tpku (no_kontrak,kode_lokasi,dokter,alamat,kode_kota,kode_tpku,tahun,nilai,kode_pp,kode_rka,kode_akun,periode,jumlah,tarif,nilai_final,p_derita,p_kunjungan,jml_kunjungan,p_diskon,tarif_final) "+
									"values ('"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(2,i)+"','-','"+this.sg1.cells(9,i)+"','"+this.eTahun.getText()+"',0,'"+this.app._lokasi+"1000','"+this.sg1.cells(3,i)+"','"+
									this.sg1.cells(5,i)+"','"+this.eTahun.getText()+(j<10?"0":"")+j+"',"+parseNilai(this.sg1.cells(7,i))+",0,"+parseNilai(this.sg1.cells(8,i))+",0,0,0,0,0)");
						}
					}
				}				
				sql.add("insert into agg_d ( "+
					" kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai, "+
					" tahun,no_bukti,modul,keterangan,progress,jenis_agg) "+
					" select "+
					" a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode, "+
					" substring(a.periode,5,2),1,1,a.nilai_final,a.tahun,a.no_kontrak,'BTPKU',b.nama,'0','E' "+
					" from agg_tpku a  "+
					" inner join agg_rka b on a.kode_rka=b.kode_rka and substring(a.periode,1,4)=b.tahun  "+
					" inner join agg_drk c on b.kode_drk=c.kode_drk and b.tahun=c.tahun "+
					" where a.periode like '"+this.eTahun.getText()+"%'  and a.nilai_final<> 0 "+
					" and a.kode_lokasi='"+this.app._lokasi+"'");


				this.dbLib.execArraySQL(sql);					
			}
			catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	doChange: function(sender){	
		this.bTampil.click();
		var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'YANKESTA' and tahun = '"+this.eTahun.getText()+"'",true);
		if (typeof data == "object"){
			this.prog = data.rs.rows[0].progress;
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
	doTampil: function(sender){	
		if (this.eTahun.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.no_kontrak,a.dokter,a.alamat,a.kode_rka,b.nama as nama_rka,a.kode_akun,c.nama as nama_akun,a.jumlah,a.nilai_final,a.kode_tpku "+
			                                      "from agg_tpku a inner join agg_rka b on a.kode_rka=b.kode_rka and a.tahun=b.tahun "+
												  "                inner join agg_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
												  "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.eTahun.getText()+"01' "); 
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.no_kontrak,line.dokter, line.alamat,line.kode_rka,line.nama_rka,line.kode_akun,line.nama_akun,floatToNilai(line.jumlah),floatToNilai(line.nilai_final),line.kode_tpku]);
				}
			}
		}
	},
	doEllipsClick: function(sender, col, row){
		switch(col){
			case 3:
				this.standarLib.showListDataForSG(this, "Daftar RKA",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_rka,nama   from agg_rka where tahun='"+this.eTahun.getText()+"'",
											  "select count(kode_rka) from agg_rka where tahun='"+this.eTahun.getText()+"'",
											  new Array("kode_rka","nama"),"and",new Array("Kode","Nama"),false);
			break;
			case 5:
				this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
											  "select kode_akun,nama from agg_masakun where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_akun) from agg_masakun where kode_lokasi='"+this.app._lokasi+"'",
											  new Array("kode_akun","nama"),"and",new Array("Kode","Nama"),false);
			break;
		}
	}
});
