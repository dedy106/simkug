/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_master_fParam = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fParam.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fParam";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Gaji", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar");			
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,25,180,20],caption:"Tahun",maxLength:4,change:[this,"doEditChange"]});
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Parameter", multiSelection:false,change:[this,"doEditChange"],tag:"1",rightLabelVisible:false});
			this.eNama = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama",tag:"2"});
			this.eAkun = new portalui_saiCBBL(this,{bound:[20,23,200,20],caption:"Kode Akun",multiSelection:false,tag:"2"});	
			this.eDrk = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Kode DRK",multiSelection:false,tag:"2"});
			this.eRka = new portalui_saiCBBL(this,{bound:[20,26,200,20],caption:"Kode RKA",multiSelection:false,tag:"2"});
			this.cPP = new portalui_saiCB(this,{bound:[20,25,230,20],caption:"Jenis PP",items:["KARYAWAN","INPUT"],tag:2});
			this.cPeriode = new portalui_saiCB(this,{bound:[20,27,230,20],caption:"Periode",items:["01","02","03","04","05","06","07","08","09","10","11","12","A. 01,04,07,10","B. 01,07","C. 01-12"],tag:2});
			this.cJenis = new portalui_saiCB(this,{bound:[20,25,230,20],caption:"Jenis",items:["B.GAJI","B.TRANSPORT","B.PENYELENGGARA","B.TPKK"],tag:2});
			this.bTampil = new portalui_button(this,{bound:[829,25,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
			this.p1 = new portalui_panel(this,{bound:[10,26,900,333],caption:"Daftar Parameter Penggajian"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,285],tag:10,
					colTitle: ["Kd Parameter","Nama Parameter","Kode Akun","Nama Akun","Kode DRK","Nama DRK","Kode RKA","Nama RKA","Jns Periode","Jenis","Jenis PP"]});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,310,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"],tag:"9"});		

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
window.app_budget_master_fParam.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fParam.implement({
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
			if (this.cJenis.getText() == "B.GAJI") 			var vJenis = "PDPT";
			if (this.cJenis.getText() == "B.TRANSPORT") 	var vJenis = "TRANS";
			if (this.cJenis.getText() == "B.PENYELENGGARA") var vJenis = "PMBN";
			if (this.cJenis.getText() == "B.TPKK") 			var vJenis = "TPKK";
			
			switch (event)
			{
				case "clear" :
					this.standarLib.clearByTag(this, new Array("1","2"),this.e0);
					this.sg1.clear(1);
					setTipeButton(tbAllFalse);											
					break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this, [0,1,2]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();												
						sql.add("insert into agg_param (kode_param,nama, jenis, kode_akun, kode_drk, kode_rka, tahun, jns_periode, jns_pp) "+
						        "values ('"+this.e0.getText()+"','"+this.eNama.getText()+"','"+vJenis+"','"+this.eAkun.getText()+"','"+this.eDrk.getText()+"','"+this.eRka.getText()+"','"+this.eTahun.getText()+"','"+this.cPeriode.getText()+"','"+this.cPP.getText()+"')");						
						this.dbLib.execArraySQL(sql);		
						//this.standarLib.clearByTag(this, new Array("1","2"),this.e0);
					}
					break;
				case "ubah" :	
					if (this.standarLib.checkEmptyByTag(this, [0,1,2]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_param set jns_pp = '"+this.cPP.getText()+"',jenis = '"+vJenis+"',jns_periode='"+this.cPeriode.getText()+"', nama = '"+this.eNama.getText()+"',kode_akun='"+this.eAkun.getText()+"',kode_drk='"+this.eDrk.getText()+"',kode_rka='"+this.eRka.getText()+"' where kode_param = '"+this.e0.getText()+"' and tahun = '"+this.eTahun.getText()+"'");
						this.dbLib.execArraySQL(sql);							
						//this.standarLib.clearByTag(this, new Array("1","2"),this.e0);
					}
					break;
				case "hapus" :
				    uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from  agg_param where kode_param = '"+this.e0.getText()+"' and tahun = '"+this.eTahun.getText()+"'");
					this.dbLib.execArraySQL(sql);									
					//this.standarLib.clearByTag(this, new Array("1","2"),this.e0);
					break;
			}
			this.e0.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doEditChange: function(sender){
		if (sender == this.eTahun || sender == this.cJenis) {
			if (this.eTahun.getText()!="") {
				this.e0.setSQL("select kode_param, nama from agg_param where tahun = '"+this.eTahun.getText()+"' ",["kode_param","nama"],undefined,["Kode Parameter","Nama"],"and","Data Parameter",false);
				this.eAkun.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi='"+this.app._lokasi+"' ",["kode_akun","nama"],undefined,["Kode Akun","Nama"],"and","Data Akun",true);
				this.eDrk.setSQL("select kode_drk, nama from agg_drk where tahun = '"+this.eTahun.getText()+"' ",["kode_drk","nama"],undefined,["Kode DRK","Nama"],"and","Data DRK",true);
				this.eRka.setSQL("select kode_rka, nama from agg_rka where tahun = '"+this.eTahun.getText()+"' ",["kode_rka","nama"],undefined,["Kode RKA","Nama"],"and","Data RKA",true);
			}
		}
		if(sender == this.e0){
			if (this.e0.getText()!= "" && this.cJenis.getText()!=""){
				try{			
					this.standarLib.clearByTag(this, new Array("2"),this.e0);
					var sql="select a.kode_param,a.nama as nama_param,a.kode_akun,b.nama as nama_akun,a.kode_drk,c.nama as nama_drk,a.kode_rka,d.nama as nama_rka,a.jns_periode,a.jns_pp,"+
							"case a.jenis when 'PDPT' 	then 'B.GAJI' "+
							"			  when 'TRANS'  then 'B.TRANSPORT' "+
							"			  when 'PMBN'  	then 'B.PENYELENGGARA' "+
							"			  when 'TPKK'  	then 'B.TPKK' "+
							"end as jenis "+
							"from agg_param a "+
							"	left join agg_masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi ='"+this.app._lokasi+"' "+
							"	left join agg_drk c on a.kode_drk=c.kode_drk and a.tahun=c.tahun "+ 
							"	left join agg_rka d on a.kode_rka=d.kode_rka and a.tahun=d.tahun "+ 
							"where a.kode_param='"+this.e0.getText()+"' and a.tahun='"+this.eTahun.getText()+"' ";
					var data = this.dbLib.getDataProvider(sql,true);			
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.eNama.setText(line.nama_param);
							this.eAkun.setText(line.kode_akun,line.nama_akun);
							this.eDrk.setText(line.kode_drk,line.nama_drk);
							this.eRka.setText(line.kode_rka,line.nama_rka);
							this.cPeriode.setText(line.jns_periode);
							this.cJenis.setText(line.jenis.toUpperCase());			
							this.cPP.setText(line.jns_pp);			
							setTipeButton(tbUbahHapus);
						}
						else{
							setTipeButton(tbSimpan);
						}
					}				
				}catch(e){
					system.alert(this, e,"");
				}
			}
		}
	},	
	doTampilClick: function(sender){
		try{													
			if (this.cJenis.getText() == "B.GAJI") 			var vJenis = "PDPT";
			if (this.cJenis.getText() == "B.TRANSPORT") 	var vJenis = "TRANS";
			if (this.cJenis.getText() == "B.PENYELENGGARA") var vJenis = "PMBN";
			if (this.cJenis.getText() == "B.TPKK") 			var vJenis = "TPKK";

			var temp = this.dbLib.runSQL("select a.kode_param,a.nama as nama_param,a.kode_akun,b.nama as nama_akun,a.kode_drk,c.nama as nama_drk,a.kode_rka,d.nama as nama_rka,a.jns_periode,a.jenis,a.jns_pp "+
			                            "from agg_param a "+
										"	left join agg_masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi ='"+this.app._lokasi+"' "+
										"	left join agg_drk c on a.kode_drk=c.kode_drk and a.tahun=c.tahun "+ 
										"	left join agg_rka d on a.kode_rka=d.kode_rka and a.tahun=d.tahun "+ 
										"where a.jenis='"+vJenis+"' and a.tahun='"+this.eTahun.getText()+"' "+
										"order by a.kode_param");
			if (temp instanceof portalui_arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page){
		this.sg1.selectPage(page);
	
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
			}
		}
	}
});